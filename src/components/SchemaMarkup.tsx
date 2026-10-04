type SchemaType =
  | "organization"
  | "website"
  | "breadcrumb"
  | "faq"
  | "article";

export interface SchemaMarkupProps {
  type: SchemaType;
  data: any;
}

export function SchemaMarkup({ type, data }: SchemaMarkupProps) {
  let schemaData: any = null;

  const baseOrganization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "TechSolvent",
    url: "https://techsolvent.in",
    logo: "https://techsolvent.in/logo.png",
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+91 77720 22077",
        contactType: "customer service",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi"]
      }
    ],
    sameAs: [
      "https://www.linkedin.com/company/techsolvent",
      "https://www.instagram.com/techsolvent"
    ]
  };

  switch (type) {
    case "organization":
      schemaData = {
        ...baseOrganization,
        ...data,
      };
      break;

    case "website":
      schemaData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "TechSolvent",
        url: "https://techsolvent.in",
        ...data,
      };
      break;

    case "breadcrumb":
      schemaData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: data.map((item: any, index: number) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.item.startsWith("http") ? item.item : `https://techsolvent.in${item.item}`,
        })),
      };
      break;

    case "faq":
      if (!Array.isArray(data) || data.length === 0) return null;
      schemaData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: data
          .filter((faq: any) => (faq.question || faq.q) && (faq.answer || faq.a))
          .map((faq: any) => ({
            "@type": "Question",
            name: faq.question || faq.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer || faq.a,
            },
          })),
      };
      break;

    case "article":
      schemaData = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: data.title,
        description: data.metaDescription || data.excerpt || data.content?.slice(0, 160),
        image: data.image,
        author: {
          "@type": "Organization",
          name: data.author || "TechSolvent Team",
        },
        publisher: {
          "@type": "Organization",
          name: "TechSolvent",
          logo: {
            "@type": "ImageObject",
            url: "https://techsolvent.in/logo.png"
          }
        },
        datePublished: data.datePublished || data.date,
        dateModified: data.dateModified || data.datePublished || data.date,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": data.canonical || `https://techsolvent.in/blog/${data.slug || data.id}`
        },
        ...data,
      };
      break;

    default:
      schemaData = null;
  }

  if (!schemaData) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
