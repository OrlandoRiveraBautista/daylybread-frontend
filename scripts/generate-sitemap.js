#!/usr/bin/env node
/**
 * Generates public/sitemap.xml with every Bible chapter URL for all
 * translations returned by the live API.
 *
 * Usage:
 *   node scripts/generate-sitemap.js                  # uses API
 *   node scripts/generate-sitemap.js --offline        # uses built-in fallback only
 *
 * Env vars (optional — falls back to hardcoded list on failure):
 *   REACT_APP_API_URL   e.g. https://api.daylybread.com/graphql
 */

const fs = require("fs");
const path = require("path");

const BASE_URL = "https://bible.daylybread.com";
const LASTMOD = new Date().toISOString().split("T")[0] + "T10:00:00+00:00";
const OFFLINE = process.argv.includes("--offline");

// ── Fallback translations (used when API is unreachable) ──────────────────────
// Format: { languageId, abbr, name }
const FALLBACK_TRANSLATIONS = [
  // English (17045)
  { languageId: 17045, abbr: "ENGKJV", name: "King James Version" },
  { languageId: 17045, abbr: "ENGESV", name: "English Standard Version" },
  { languageId: 17045, abbr: "ENGNIV", name: "New International Version" },
  { languageId: 17045, abbr: "ENGNLT", name: "New Living Translation" },
  { languageId: 17045, abbr: "ENGNAS", name: "New American Standard Bible" },
  { languageId: 17045, abbr: "ENGNRS", name: "New Revised Standard Version" },
  { languageId: 17045, abbr: "ENGMSG", name: "The Message" },
  // Spanish (6411)
  { languageId: 6411, abbr: "SPANTV", name: "Traducción en Lenguaje Actual" },
  { languageId: 6411, abbr: "SPANVI", name: "Nueva Versión Internacional" },
  { languageId: 6411, abbr: "SPANRV", name: "Reina-Valera 1960" },
  { languageId: 6411, abbr: "SPANBLA", name: "Biblia de las Américas" },
  { languageId: 6411, abbr: "SPANNVI", name: "Nueva Versión Internacional" },
  { languageId: 6411, abbr: "SPANRVR", name: "Reina-Valera Revisada" },
];

// ── All 66 Bible books with chapter counts ────────────────────────────────────
const BIBLE_BOOKS = [
  // Old Testament
  { bookId: "GEN", chapters: 50 },
  { bookId: "EXO", chapters: 40 },
  { bookId: "LEV", chapters: 27 },
  { bookId: "NUM", chapters: 36 },
  { bookId: "DEU", chapters: 34 },
  { bookId: "JOS", chapters: 24 },
  { bookId: "JDG", chapters: 21 },
  { bookId: "RUT", chapters: 4 },
  { bookId: "1SA", chapters: 31 },
  { bookId: "2SA", chapters: 24 },
  { bookId: "1KI", chapters: 22 },
  { bookId: "2KI", chapters: 25 },
  { bookId: "1CH", chapters: 29 },
  { bookId: "2CH", chapters: 36 },
  { bookId: "EZR", chapters: 10 },
  { bookId: "NEH", chapters: 13 },
  { bookId: "EST", chapters: 10 },
  { bookId: "JOB", chapters: 42 },
  { bookId: "PSA", chapters: 150 },
  { bookId: "PRO", chapters: 31 },
  { bookId: "ECC", chapters: 12 },
  { bookId: "SNG", chapters: 8 },
  { bookId: "ISA", chapters: 66 },
  { bookId: "JER", chapters: 52 },
  { bookId: "LAM", chapters: 5 },
  { bookId: "EZK", chapters: 48 },
  { bookId: "DAN", chapters: 12 },
  { bookId: "HOS", chapters: 14 },
  { bookId: "JOL", chapters: 3 },
  { bookId: "AMO", chapters: 9 },
  { bookId: "OBA", chapters: 1 },
  { bookId: "JON", chapters: 4 },
  { bookId: "MIC", chapters: 7 },
  { bookId: "NAM", chapters: 3 },
  { bookId: "HAB", chapters: 3 },
  { bookId: "ZEP", chapters: 3 },
  { bookId: "HAG", chapters: 2 },
  { bookId: "ZEC", chapters: 14 },
  { bookId: "MAL", chapters: 4 },
  // New Testament
  { bookId: "MAT", chapters: 28 },
  { bookId: "MRK", chapters: 16 },
  { bookId: "LUK", chapters: 24 },
  { bookId: "JHN", chapters: 21 },
  { bookId: "ACT", chapters: 28 },
  { bookId: "ROM", chapters: 16 },
  { bookId: "1CO", chapters: 16 },
  { bookId: "2CO", chapters: 13 },
  { bookId: "GAL", chapters: 6 },
  { bookId: "EPH", chapters: 6 },
  { bookId: "PHP", chapters: 4 },
  { bookId: "COL", chapters: 4 },
  { bookId: "1TH", chapters: 5 },
  { bookId: "2TH", chapters: 3 },
  { bookId: "1TI", chapters: 6 },
  { bookId: "2TI", chapters: 4 },
  { bookId: "TIT", chapters: 3 },
  { bookId: "PHM", chapters: 1 },
  { bookId: "HEB", chapters: 13 },
  { bookId: "JAS", chapters: 5 },
  { bookId: "1PE", chapters: 5 },
  { bookId: "2PE", chapters: 3 },
  { bookId: "1JN", chapters: 5 },
  { bookId: "2JN", chapters: 1 },
  { bookId: "3JN", chapters: 1 },
  { bookId: "JUD", chapters: 1 },
  { bookId: "REV", chapters: 22 },
];

// ── GraphQL helpers ───────────────────────────────────────────────────────────

async function gql(apiUrl, query, variables) {
  const res = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  if (json.errors) throw new Error(json.errors[0].message);
  return json.data;
}

/**
 * Fetches all Bibles for a given language ISO code, paginating automatically.
 * Returns array of { languageId, abbr, name }.
 */
async function fetchBiblesForLanguage(apiUrl, languageCode) {
  const query = `
    query GetListOfBibles($options: BibleArgs!) {
      getListOFBibles(options: $options) {
        data {
          abbr
          name
          languageId
        }
        meta {
          pagination {
            currentPage
            lastPage
          }
        }
      }
    }
  `;

  const results = [];
  let page = 1;
  let lastPage = 1;

  do {
    const data = await gql(apiUrl, query, {
      options: { languageCode, page },
    });
    const { data: bibles, meta } = data.getListOFBibles;
    lastPage = meta.pagination.lastPage;

    for (const bible of bibles) {
      if (bible.abbr && bible.languageId) {
        results.push({
          languageId: bible.languageId,
          abbr: bible.abbr,
          name: bible.name || bible.abbr,
        });
      }
    }
    page++;
  } while (page <= lastPage);

  return results;
}

/**
 * Fetches translations for all target languages from the live API.
 * Falls back to FALLBACK_TRANSLATIONS on any error.
 */
async function fetchAllTranslations(apiUrl) {
  // ISO codes for languages to include in the sitemap
  const TARGET_LANGUAGES = ["eng", "spa"];

  console.log(`  Fetching translations from ${apiUrl}...`);
  const all = [];

  for (const iso of TARGET_LANGUAGES) {
    try {
      process.stdout.write(`    ${iso}: `);
      const bibles = await fetchBiblesForLanguage(apiUrl, iso);
      console.log(`${bibles.length} translations`);
      all.push(...bibles);
    } catch (err) {
      console.warn(`\n    ⚠ Could not fetch ${iso}: ${err.message}`);
    }
  }

  return all;
}

// ── URL builder ───────────────────────────────────────────────────────────────

function url(loc, priority, changefreq = "weekly") {
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${LASTMOD}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    <mobile:mobile/>
  </url>`;
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function generateSitemap() {
  let translations;

  if (OFFLINE) {
    console.log("  Using offline fallback translations (--offline flag set).");
    translations = FALLBACK_TRANSLATIONS;
  } else {
    // Load .env so REACT_APP_API_URL is available when run outside of CRA
    try {
      const envPath = path.join(__dirname, "../.env");
      if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, "utf8");
        for (const line of envContent.split("\n")) {
          const match = line.match(/^([^#=]+)=(.*)$/);
          if (match) {
            const key = match[1].trim();
            const val = match[2].trim().replace(/^["']|["']$/g, "");
            if (!process.env[key]) process.env[key] = val;
          }
        }
      }
    } catch (_) {}

    const apiUrl = process.env.REACT_APP_API_URL;

    if (!apiUrl) {
      console.warn(
        "  ⚠ REACT_APP_API_URL not set — using fallback translations."
      );
      translations = FALLBACK_TRANSLATIONS;
    } else {
      try {
        translations = await fetchAllTranslations(apiUrl);
        if (translations.length === 0) {
          console.warn("  ⚠ API returned 0 translations — using fallback.");
          translations = FALLBACK_TRANSLATIONS;
        }
      } catch (err) {
        console.warn(`  ⚠ API fetch failed (${err.message}) — using fallback.`);
        translations = FALLBACK_TRANSLATIONS;
      }
    }
  }

  // Deduplicate by abbr (API may return duplicates across pages)
  const seen = new Set();
  translations = translations.filter(({ abbr }) => {
    if (seen.has(abbr)) return false;
    seen.add(abbr);
    return true;
  });

  // Group by language for reporting
  const byLang = {};
  for (const t of translations) {
    byLang[t.languageId] = (byLang[t.languageId] || 0) + 1;
  }

  console.log(
    `  ${translations.length} translations across ${Object.keys(byLang).length} language(s)`
  );

  const entries = [];

  // ── Static routes ────────────────────────────────────────────────────────
  entries.push(url(`${BASE_URL}/`, "1.0", "daily"));
  entries.push(url(`${BASE_URL}/home`, "0.9", "daily"));
  entries.push(url(`${BASE_URL}/read`, "0.9", "daily"));
  entries.push(url(`${BASE_URL}/me`, "0.8", "weekly"));
  entries.push(url(`${BASE_URL}/login`, "0.7", "weekly"));
  entries.push(url(`${BASE_URL}/signup`, "0.7", "weekly"));
  entries.push(url(`${BASE_URL}/signupupdateuser`, "0.5", "monthly"));
  entries.push(url(`${BASE_URL}/?mood=checkin`, "0.8", "daily"));

  // ── Translation landing pages ─────────────────────────────────────────────
  for (const { languageId, abbr } of translations) {
    entries.push(url(`${BASE_URL}/read/${languageId}/${abbr}`, "0.8"));
  }

  // ── Book landing pages — one canonical per language (first translation) ───
  const seenLang = new Set();
  for (const { languageId, abbr } of translations) {
    if (seenLang.has(languageId)) continue;
    seenLang.add(languageId);
    for (const { bookId } of BIBLE_BOOKS) {
      entries.push(
        url(`${BASE_URL}/read/${languageId}/${abbr}/${bookId}`, "0.7")
      );
    }
  }

  // ── Every chapter × every translation ────────────────────────────────────
  for (const { languageId, abbr } of translations) {
    for (const { bookId, chapters } of BIBLE_BOOKS) {
      for (let ch = 1; ch <= chapters; ch++) {
        entries.push(
          url(
            `${BASE_URL}/read/${languageId}/${abbr}/${bookId}/${ch}`,
            "0.6"
          )
        );
      }
    }
  }

  const totalChapterUrls =
    translations.length * BIBLE_BOOKS.reduce((sum, b) => sum + b.chapters, 0);

  const langSummary = Object.entries(byLang)
    .map(([id, count]) => `${count} translations for languageId ${id}`)
    .join(", ");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0">
  <!-- Generated: ${new Date().toISOString()} -->
  <!-- Languages: ${langSummary} -->
  <!-- Total translations: ${translations.length} -->
  <!-- Total URLs: ${entries.length} (${totalChapterUrls} chapter pages) -->
${entries.join("\n")}
</urlset>
`;

  const outPath = path.join(__dirname, "../public/sitemap.xml");
  fs.writeFileSync(outPath, xml, "utf8");

  console.log(`\n✓ sitemap.xml written → ${outPath}`);
  console.log(`  ${entries.length} total URLs`);
  console.log(`  ${totalChapterUrls} chapter URLs`);
}

generateSitemap().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
