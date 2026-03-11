import { useEffect } from "react";

interface SEOConfig {
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
}

export const useSEO = (config: SEOConfig) => {
  const {
    title = "Daylybread: Smart Bible with AI | Feeds your spirit",
    description = "Your smart Bible companion with AI assistance, multiple translations, mood-based verses, and personalized spiritual growth features. Read the Bible in all languages for free.",
    keywords = "Bible app, AI Bible assistant, Bible reading, Christian app, spiritual growth, Bible study, devotionals, mood verses, multiple translations, Bible companion, free Bible app",
    image = "/assets/icon/Daylybread Icon.png",
    url = "https://bible.daylybread.com",
    type = "website",
    author = "Daylybread Team",
    publishedTime,
    modifiedTime,
    section = "Religion & Spirituality",
    tags = [],
    canonicalUrl = url,
    noindex = false,
    nofollow = false,
    jsonLd,
  } = config;

  const fullImageUrl = image.startsWith("http")
    ? image
    : `https://bible.daylybread.com${image}`;
  const robotsContent = `${noindex ? "noindex" : "index"}, ${
    nofollow ? "nofollow" : "follow"
  }, max-snippet:-1, max-image-preview:large, max-video-preview:-1`;

  useEffect(() => {
    // Update page title
    document.title = title;

    // Add structured data if provided
    if (jsonLd) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(jsonLd);
      script.id = "dynamic-jsonld";

      // Remove existing dynamic JSON-LD
      const existingScript = document.getElementById("dynamic-jsonld");
      if (existingScript) {
        existingScript.remove();
      }

      document.head.appendChild(script);

      return () => {
        const scriptToRemove = document.getElementById("dynamic-jsonld");
        if (scriptToRemove) {
          scriptToRemove.remove();
        }
      };
    }
  }, [title, jsonLd]);

  return {
    title,
    description,
    keywords,
    image: fullImageUrl,
    url,
    type,
    author,
    publishedTime,
    modifiedTime,
    section,
    tags,
    canonicalUrl,
    robotsContent,
    jsonLd,
  };
};

export const generateBiblePageSEO = ({
  book,
  chapter,
  verse,
  translation,
  verseText,
  languageId,
}: {
  book?: string;
  chapter?: number;
  verse?: number;
  translation?: string;
  verseText?: string;
  /** Bible Brain numeric language ID (e.g. 17045 for English, 6411 for Spanish) */
  languageId?: number;
}): SEOConfig => {
  const baseBibleUrl = "https://bible.daylybread.com/read";

  // Derive a human-readable display name for the translation (strip lang prefix)
  const translationDisplay = translation
    ? translation.length > 3
      ? translation.slice(3)
      : translation
    : undefined;

  let title = "Read the Bible";
  let description =
    "Read the Bible with AI assistance, multiple translations, and personalized features on Daylybread.";
  let url = baseBibleUrl;
  let keywords =
    "Bible reading, scripture study, biblical text, Christian app, Bible translations, Bible study tools";

  // Build the canonical URL using the real Bible Brain route format
  const buildUrl = (parts: (string | number | undefined)[]) =>
    [baseBibleUrl, ...parts.filter(Boolean)].join("/");

  if (book && chapter) {
    const ref = `${book} ${chapter}${verse ? `:${verse}` : ""}`;
    const trans = translationDisplay || "Bible";
    title = `${ref} (${trans}) | Daylybread`;

    if (verseText) {
      const preview =
        verseText.length > 160
          ? verseText.substring(0, 157) + "…"
          : verseText;
      description = `"${preview}" — ${ref} ${trans}. Read, study, and explore with AI assistance on Daylybread.`;
    } else {
      description = `Read ${book} chapter ${chapter} in the ${trans}. Study with AI assistance, cross-references, and commentary on Daylybread.`;
    }

    url = buildUrl([languageId, translation, book.toUpperCase(), chapter]);
    keywords = `${book} ${chapter}, ${trans} Bible, ${book} chapter ${chapter}, Bible verse, scripture study, ${book} commentary, Bible reading, ${trans} translation`;
  } else if (book) {
    const trans = translationDisplay || "Bible";
    title = `Book of ${book} (${trans}) | Daylybread`;
    description = `Read the complete Book of ${book} in the ${trans} with AI Bible assistance, study notes, and cross-references on Daylybread.`;
    url = buildUrl([languageId, translation, book.toUpperCase()]);
    keywords = `Book of ${book}, ${trans} Bible, ${book} chapters, Bible book study, scripture reading, ${book} commentary`;
  } else if (translation) {
    const trans = translationDisplay || translation;
    title = `${trans} Bible — Read Online | Daylybread`;
    description = `Read the complete ${trans} Bible online with AI assistance, study tools, and personalized features. Access all books and chapters free on Daylybread.`;
    url = buildUrl([languageId, translation]);
    keywords = `${trans} Bible, ${trans} translation, Bible online, read Bible, Bible study, scripture reading`;
  }

  const publisher = {
    "@type": "Organization",
    name: "Daylybread",
    logo: {
      "@type": "ImageObject",
      url: "https://bible.daylybread.com/assets/icon/Daylybread%20Icon.png",
    },
  };

  // Use SacredText schema when we have actual verse content
  const jsonLd: any =
    verseText && book && chapter
      ? {
          "@context": "https://schema.org",
          "@type": "SacredText",
          name: title,
          description,
          url,
          text: verseText,
          about: {
            "@type": "Book",
            name: book,
            isPartOf: {
              "@type": "Book",
              name: `${translationDisplay || translation} Bible`,
            },
          },
          publisher,
          mainEntityOfPage: { "@type": "WebPage", "@id": url },
          isPartOf: { "@type": "WebSite", name: "Daylybread", url: "https://bible.daylybread.com" },
        }
      : {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: title,
          description,
          url,
          author: publisher,
          publisher,
          dateModified: new Date().toISOString(),
          mainEntityOfPage: { "@type": "WebPage", "@id": url },
          articleSection: "Bible Study",
          keywords: keywords.split(", "),
          isPartOf: { "@type": "WebSite", name: "Daylybread", url: "https://bible.daylybread.com" },
        };

  return {
    title,
    description,
    keywords,
    url,
    canonicalUrl: url,
    type: "article",
    section: "Bible Study",
    tags: keywords.split(", "),
    jsonLd,
  };
};

export const generateMoodCheckInSEO = (mood?: string): SEOConfig => {
  const title = mood
    ? `${
        mood.charAt(0).toUpperCase() + mood.slice(1)
      } Mood Check-in - Bible Verses | Daylybread`
    : "Mood Check-in - Get Bible Verses for Your Heart | Daylybread";

  const description = mood
    ? `Feeling ${mood}? Get personalized Bible verses and spiritual guidance with AI assistance. Find comfort, encouragement, and hope in Scripture on Daylybread.`
    : "Check in with your mood and receive personalized Bible verses, spiritual guidance, and AI-powered encouragement. Find the perfect Scripture for your heart today.";

  const keywords = `mood check-in, ${
    mood || "emotional"
  } Bible verses, spiritual guidance, Christian encouragement, mood-based verses, Bible comfort, scripture for emotions, AI spiritual assistant, Christian mental health, faith and feelings`;

  const url = `https://bible.daylybread.com/?mood=checkin${
    mood ? `&feeling=${mood}` : ""
  }`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Mood Check-in",
    description: description,
    url: url,
    applicationCategory: "Religion & Spirituality",
    featureList: [
      "Mood-based Bible verse recommendations",
      "AI-powered spiritual guidance",
      "Personalized Scripture selection",
      "Emotional wellness through faith",
      "Daily spiritual check-ins",
    ],
    author: {
      "@type": "Organization",
      name: "Daylybread",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return {
    title,
    description,
    keywords,
    url,
    canonicalUrl: url,
    type: "website",
    section: "Spiritual Wellness",
    tags: keywords.split(", "),
    jsonLd,
  };
};

export default useSEO;
