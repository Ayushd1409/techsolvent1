import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  ogType?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  noindex?: boolean;
  googleVerification?: string;
  keywords?: string;
}

export function SEO({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  ogImage = "https://techsolvent.in/logo.png",
  ogUrl,
  ogType = "website",
  twitterCard = "summary_large_image",
  twitterTitle,
  twitterDescription,
  twitterImage,
  noindex = false,
  googleVerification,
  keywords,
}: SEOProps) {
  const currentUrl = typeof window !== "undefined" ? window.location.href : "https://techsolvent.in";
  const canonicalUrl = canonical || currentUrl;
  const resolvedOgTitle = ogTitle || title;
  const resolvedOgDescription = ogDescription || description;
  const resolvedOgImage = ogImage.startsWith("http")
    ? ogImage
    : typeof window !== "undefined"
    ? `${window.location.origin}${ogImage}`
    : `https://techsolvent.in${ogImage}`;

  // Keep immediate DOM fallback in addition to react-helmet-async
  useEffect(() => {
    document.title = title;

    const setMeta = (nameOrProperty: string, content: string | undefined, isProperty = false) => {
      if (content === undefined) {
        const selector = isProperty ? `meta[property="${nameOrProperty}"]` : `meta[name="${nameOrProperty}"]`;
        const el = document.head.querySelector(selector);
        if (el) el.remove();
        return;
      }
      const selector = isProperty ? `meta[property="${nameOrProperty}"]` : `meta[name="${nameOrProperty}"]`;
      let el = document.head.querySelector(selector);
      if (!el) {
        el = document.createElement("meta");
        if (isProperty) {
          el.setAttribute("property", nameOrProperty);
        } else {
          el.setAttribute("name", nameOrProperty);
        }
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", description);
    if (keywords) setMeta("keywords", keywords);

    let canonicalTag = document.head.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement("link");
      canonicalTag.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute("href", canonicalUrl);

    setMeta("og:title", resolvedOgTitle, true);
    setMeta("og:description", resolvedOgDescription, true);
    setMeta("og:url", ogUrl || canonicalUrl, true);
    setMeta("og:type", ogType, true);
    setMeta("og:image", resolvedOgImage, true);

    setMeta("twitter:card", twitterCard);
    setMeta("twitter:title", twitterTitle || resolvedOgTitle);
    setMeta("twitter:description", twitterDescription || resolvedOgDescription);
    setMeta("twitter:image", twitterImage || resolvedOgImage);

    if (noindex) {
      setMeta("robots", "noindex, nofollow");
    } else {
      setMeta("robots", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
    }

    if (googleVerification) {
      setMeta("google-site-verification", googleVerification);
    }
  }, [
    title,
    description,
    canonicalUrl,
    resolvedOgTitle,
    resolvedOgDescription,
    resolvedOgImage,
    ogUrl,
    ogType,
    twitterCard,
    twitterTitle,
    twitterDescription,
    twitterImage,
    noindex,
    googleVerification,
    keywords,
  ]);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />
      <meta
        name="robots"
        content={noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"}
      />
      <meta property="og:title" content={resolvedOgTitle} />
      <meta property="og:description" content={resolvedOgDescription} />
      <meta property="og:url" content={ogUrl || canonicalUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={resolvedOgImage} />
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={twitterTitle || resolvedOgTitle} />
      <meta name="twitter:description" content={twitterDescription || resolvedOgDescription} />
      <meta name="twitter:image" content={twitterImage || resolvedOgImage} />
      {googleVerification && <meta name="google-site-verification" content={googleVerification} />}
    </Helmet>
  );
}
