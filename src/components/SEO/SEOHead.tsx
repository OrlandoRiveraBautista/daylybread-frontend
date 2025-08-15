import React from "react";
import { Helmet } from "react-helmet";
import { useSEO } from "../../hooks/useSEO";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  canonicalUrl?: string;
  noindex?: boolean;
  nofollow?: boolean;
  jsonLd?: object;
  breadcrumbs?: Array<{
    name: string;
    url: string;
  }>;
}

const SEOHead: React.FC<SEOHeadProps> = ({ breadcrumbs, ...seoConfig }) => {
  const seo = useSEO(seoConfig);

  const generateBreadcrumbJsonLd = (
    breadcrumbs: Array<{ name: string; url: string }>
  ) => {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        item: crumb.url,
      })),
    };
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />
      <meta name="author" content={seo.author} />
      <meta name="robots" content={seo.robotsContent} />

      {/* Canonical URL */}
      <link rel="canonical" href={seo.canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:type" content={seo.type} />
      <meta property="og:site_name" content="Daylybread" />
      <meta property="og:locale" content="en_US" />

      {seo.publishedTime && (
        <meta property="article:published_time" content={seo.publishedTime} />
      )}
      {seo.modifiedTime && (
        <meta property="article:modified_time" content={seo.modifiedTime} />
      )}
      {seo.section && <meta property="article:section" content={seo.section} />}
      {seo.tags &&
        seo.tags.map((tag, index) => (
          <meta key={index} property="article:tag" content={tag} />
        ))}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@daylybread" />
      <meta name="twitter:creator" content="@daylybread" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:url" content={seo.url} />

      {/* Additional JSON-LD for breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify(generateBreadcrumbJsonLd(breadcrumbs))}
        </script>
      )}

      {/* Custom JSON-LD if provided */}
      {seo.jsonLd && (
        <script type="application/ld+json">{JSON.stringify(seo.jsonLd)}</script>
      )}
    </Helmet>
  );
};

export default SEOHead;
