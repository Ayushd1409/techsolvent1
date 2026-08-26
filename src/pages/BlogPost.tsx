import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { ArrowLeft, Calendar, Clock, Tag, Share2 } from "lucide-react";
import { Helmet } from "react-helmet-async";
import NotFound from "./NotFound";

function parseLinks(text: string) {
    if (!text) return text;
    const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;
    while ((match = regex.exec(text)) !== null) {
        if (match.index > lastIndex) {
            parts.push(text.substring(lastIndex, match.index));
        }
        parts.push(
            <a key={match.index} href={match[2]} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold hover:underline">
                {match[1]}
            </a>
        );
        lastIndex = regex.lastIndex;
    }
    if (lastIndex < text.length) {
        parts.push(text.substring(lastIndex));
    }
    return parts.length > 0 ? parts : text;
}

export default function BlogPost() {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:8080/api/blogs")
            .then(res => res.json())
            .then(data => {
                const found = data?.find((p: any) => p.id === id);
                setPost(found || null);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch blog post", err);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <PageLayout>
                <div className="py-24 bg-background text-center text-muted-foreground">
                    Loading post...
                </div>
            </PageLayout>
        );
    }

    if (!post) {
        return <NotFound />;
    }

    const metaTitle = post.metaTitle || `${post.title} | TechSolvent`;
    const metaDescription = post.metaDescription || post.content;

    return (
        <PageLayout>
            <Helmet>
                <title>{metaTitle}</title>
                <meta name="description" content={metaDescription} />
            </Helmet>
            <div className="py-24 bg-background">
                <article className="container mx-auto px-4 lg:px-8 max-w-4xl">
                    <div className="mb-8 animate-fade-in">
                        <Link to="/blog" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors mb-8">
                            <ArrowLeft className="w-4 h-4" /> Back to Blog
                        </Link>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                            <div className="flex items-center gap-1.5">
                                <Tag className="w-4 h-4 text-primary" />
                                <span className="font-medium text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">{post.category}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Calendar className="w-4 h-4" />
                                <span>{post.date}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Clock className="w-4 h-4" />
                                <span>{post.read}</span>
                            </div>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight mb-8">
                            {parseLinks(post.title)}
                        </h1>
                    </div>

                    <div className="w-full h-64 md:h-96 rounded-3xl mb-12 overflow-hidden border border-border shadow-sm">
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                    </div>

                    <div className="prose prose-lg dark:prose-invert max-w-none text-foreground/80 leading-relaxed">
                        <p className="text-2xl text-foreground font-medium leading-relaxed mb-10 border-l-4 border-primary pl-6 py-2 bg-gradient-to-r from-primary/5 to-transparent rounded-r-xl">
                            {parseLinks(post.content)}
                        </p>

                        <div className="space-y-8">
                            {post.sections && post.sections.map((section: any, idx: number) => (
                                <div key={idx} className="mb-12">
                                    <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground tracking-tight">{parseLinks(section.title)}</h2>
                                    {section.image && (
                                        <img src={section.image} alt={section.title} className="w-full h-auto max-h-[500px] object-cover rounded-2xl mb-8 border border-border shadow-sm" />
                                    )}
                                    {section.paragraphs && section.paragraphs.map((p: string, pIdx: number) => (
                                        <p key={pIdx} className="mb-4">{parseLinks(p)}</p>
                                    ))}
                                </div>
                            ))}

                            {post.quote && (
                                <blockquote className="border-border border rounded-2xl p-8 my-10 bg-secondary/30 relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                                    <p className="text-2xl italic font-medium text-foreground relative z-10 mb-0">
                                        "{parseLinks(post.quote)}"
                                    </p>
                                </blockquote>
                            )}

                            {post.takeaways && (
                                <>
                                    <h3 className="text-2xl font-bold mt-12 mb-6 text-foreground tracking-tight">Key Takeaways</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                                        {post.takeaways.map((item: string, id: number) => (
                                            <div key={id} className="flex gap-3 bg-card border border-border rounded-xl p-4 shadow-sm">
                                                <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 font-bold text-sm">
                                                    {id + 1}
                                                </div>
                                                <span className="text-sm font-medium">{parseLinks(item)}</span>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl ring-4 ring-background shadow-md">
                                TS
                            </div>
                            <div>
                                <h4 className="font-bold text-lg">Team TechSolvent</h4>
                                <p className="text-sm text-primary font-medium">Growth Experts</p>
                            </div>
                        </div>

                        <div className="flex gap-3 w-full sm:w-auto">
                            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-full bg-secondary text-foreground hover:bg-secondary/80 transition-colors shadow-sm">
                                <Share2 className="w-4 h-4" /> Share Article
                            </button>
                        </div>
                    </div>
                </article>
            </div>
        </PageLayout>
    );
}
