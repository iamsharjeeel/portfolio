import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";

const PORT = process.env.SEO_AUDIT_PORT || "4173";
const BASE = (process.env.SEO_AUDIT_URL || `http://127.0.0.1:${PORT}`).replace(
  /\/$/,
  ""
);
const SITE = "https://sharjeel.cc";
const FAKE_PATH = "/this-route-does-not-exist-seo-audit";
const START_SERVER = !process.env.SEO_AUDIT_URL;

const errors = [];

function fail(message) {
  errors.push(message);
}

function attr(html, pattern) {
  const match = html.match(pattern);
  return match ? match[1].trim() : "";
}

function all(html, pattern) {
  return [...html.matchAll(pattern)].map((match) => match[1].trim());
}

function decode(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

async function fetchText(url) {
  const res = await fetch(url, { redirect: "manual" });
  const text = await res.text();
  return { res, text };
}

async function waitForServer() {
  for (let i = 0; i < 80; i += 1) {
    try {
      const res = await fetch(BASE, { redirect: "manual" });
      if (res.status) return;
    } catch {
      await delay(250);
    }
  }
  throw new Error(`Server did not start at ${BASE}`);
}

function parseSitemap(xml) {
  return all(xml, /<loc>([^<]+)<\/loc>/g).map(decode);
}

function inspectPage(url, html, status) {
  const title = attr(html, /<title>([^<]*)<\/title>/i);
  const description = attr(
    html,
    /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i
  ) || attr(
    html,
    /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i
  );
  const canonical = attr(
    html,
    /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i
  ) || attr(
    html,
    /<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i
  );
  const robots = (
    attr(html, /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']*)["']/i) ||
    attr(html, /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']robots["']/i)
  ).toLowerCase();
  const ogTitle =
    attr(html, /<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']*)["']/i) ||
    attr(html, /<meta[^>]+content=["']([^"']*)["'][^>]+property=["']og:title["']/i);
  const ogDescription =
    attr(html, /<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']*)["']/i) ||
    attr(html, /<meta[^>]+content=["']([^"']*)["'][^>]+property=["']og:description["']/i);
  const ogUrl =
    attr(html, /<meta[^>]+property=["']og:url["'][^>]+content=["']([^"']*)["']/i) ||
    attr(html, /<meta[^>]+content=["']([^"']*)["'][^>]+property=["']og:url["']/i);
  const ogImage =
    attr(html, /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']*)["']/i) ||
    attr(html, /<meta[^>]+content=["']([^"']*)["'][^>]+property=["']og:image["']/i);
  const twitterCard =
    attr(html, /<meta[^>]+name=["']twitter:card["'][^>]+content=["']([^"']*)["']/i) ||
    attr(html, /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']twitter:card["']/i);
  const twitterTitle =
    attr(html, /<meta[^>]+name=["']twitter:title["'][^>]+content=["']([^"']*)["']/i) ||
    attr(html, /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']twitter:title["']/i);
  const h1s = all(html, /<h1\b[^>]*>([\s\S]*?)<\/h1>/gi).map((value) =>
    decode(value.replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim()
  );
  const jsonBlocks = all(
    html,
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi
  );
  const lang = attr(html, /<html[^>]+lang=["']([^"']+)["']/i);
  const viewport = attr(
    html,
    /<meta[^>]+name=["']viewport["'][^>]+content=["']([^"']*)["']/i
  );
  const hrefs = all(html, /<a\b[^>]+href=["']([^"']+)["']/gi);

  return {
    url,
    status,
    title: decode(title),
    description: decode(description),
    canonical: decode(canonical),
    robots,
    ogTitle: decode(ogTitle),
    ogDescription: decode(ogDescription),
    ogUrl: decode(ogUrl),
    ogImage: decode(ogImage),
    twitterCard: decode(twitterCard),
    twitterTitle: decode(twitterTitle),
    h1s,
    jsonBlocks,
    lang,
    viewport,
    hrefs,
    bytes: Buffer.byteLength(html),
  };
}

async function main() {
  let child;
  if (START_SERVER) {
    child = spawn("npx", ["next", "start", "-p", PORT], {
      stdio: ["ignore", "pipe", "pipe"],
      env: { ...process.env, PORT },
    });
    child.stderr.on("data", () => {});
  }

  try {
    await waitForServer();

    const robots = await fetchText(`${BASE}/robots.txt`);
    if (robots.res.status !== 200) {
      fail(`robots.txt returned ${robots.res.status}`);
    } else {
      if (!/allow:\s*\//i.test(robots.text)) fail("robots.txt does not allow /");
      if (!/disallow:\s*\/api\//i.test(robots.text)) {
        fail("robots.txt does not disallow /api/");
      }
      if (!robots.text.includes(`${SITE}/sitemap.xml`)) {
        fail("robots.txt is missing the canonical sitemap URL");
      }
      if (/^host:/im.test(robots.text)) {
        fail("robots.txt contains an obsolete host directive");
      }
    }

    const sitemap = await fetchText(`${BASE}/sitemap.xml`);
    if (sitemap.res.status !== 200) {
      fail(`sitemap.xml returned ${sitemap.res.status}`);
      throw new Error("Cannot continue without sitemap");
    }

    const sitemapUrls = parseSitemap(sitemap.text);
    if (sitemapUrls.length === 0) fail("sitemap.xml contains no URLs");

    for (const url of sitemapUrls) {
      if (!url.startsWith(SITE)) {
        fail(`sitemap URL is not canonical: ${url}`);
      }
      if (url.includes("localhost") || url.includes("127.0.0.1")) {
        fail(`sitemap leaks a local URL: ${url}`);
      }
      if (url.includes("/api/")) fail(`sitemap includes API URL: ${url}`);
    }

    const pages = [];
    for (const url of sitemapUrls) {
      const local = url.replace(SITE, BASE);
      const { res, text } = await fetchText(local);
      if (res.status !== 200) {
        fail(`sitemap URL ${url} returned ${res.status}`);
        continue;
      }
      pages.push(inspectPage(url, text, res.status));
    }

    const titles = new Map();
    const descriptions = new Map();
    const canonicals = new Map();

    for (const page of pages) {
      if (!page.title) fail(`missing title: ${page.url}`);
      if (!page.description) fail(`missing description: ${page.url}`);
      if (!page.canonical) fail(`missing canonical: ${page.url}`);
      if (!page.h1s.length) fail(`missing H1: ${page.url}`);
      if (page.h1s.length > 1) {
        fail(`multiple H1s (${page.h1s.length}) on ${page.url}: ${page.h1s.join(" | ")}`);
      }
      if (!page.ogTitle) fail(`missing og:title: ${page.url}`);
      if (!page.ogDescription) fail(`missing og:description: ${page.url}`);
      if (!page.ogUrl) fail(`missing og:url: ${page.url}`);
      if (!page.ogImage) fail(`missing og:image: ${page.url}`);
      if (!page.twitterCard) fail(`missing twitter:card: ${page.url}`);
      if (!page.twitterTitle) fail(`missing twitter:title: ${page.url}`);
      if (page.lang !== "en") fail(`html lang should be en on ${page.url}`);
      if (!page.viewport) fail(`missing viewport: ${page.url}`);
      if (page.robots.includes("noindex")) {
        fail(`accidental noindex on indexable page: ${page.url}`);
      }
      if (page.canonical && !page.canonical.startsWith(SITE)) {
        fail(`canonical is not ${SITE}: ${page.url} -> ${page.canonical}`);
      }
      if (
        page.canonical.includes("localhost") ||
        page.ogUrl.includes("localhost") ||
        page.ogImage.includes("localhost")
      ) {
        fail(`localhost leaked into production metadata: ${page.url}`);
      }
      if (page.canonical !== page.url && page.canonical !== `${page.url}/`) {
        fail(`canonical mismatch: ${page.url} -> ${page.canonical}`);
      }
      if (page.bytes > 500_000) {
        fail(`HTML exceeds 500KB budget: ${page.url} (${page.bytes})`);
      }

      if (page.title) {
        if (titles.has(page.title)) {
          fail(`duplicate title "${page.title}": ${titles.get(page.title)} and ${page.url}`);
        }
        titles.set(page.title, page.url);
      }
      if (page.description) {
        if (descriptions.has(page.description)) {
          fail(
            `duplicate description on ${descriptions.get(page.description)} and ${page.url}`
          );
        }
        descriptions.set(page.description, page.url);
      }
      if (page.canonical) {
        if (canonicals.has(page.canonical)) {
          fail(
            `duplicate canonical ${page.canonical}: ${canonicals.get(page.canonical)} and ${page.url}`
          );
        }
        canonicals.set(page.canonical, page.url);
      }

      for (const block of page.jsonBlocks) {
        try {
          JSON.parse(block);
        } catch {
          fail(`invalid JSON-LD on ${page.url}`);
        }
      }
    }

    const internal = new Set();
    for (const page of pages) {
      for (const href of page.hrefs) {
        if (!href.startsWith("/") || href.startsWith("//")) continue;
        if (href.startsWith("/api/")) continue;
        const path = href.split("#")[0].split("?")[0];
        if (!path || path === "/") continue;
        internal.add(path);
      }
    }

    for (const path of internal) {
      const { res, text } = await fetchText(`${BASE}${path}`);
      if (res.status >= 400) {
        fail(`broken internal link ${path} returned ${res.status}`);
      }
      if (
        res.status === 200 &&
        /this-route-does-not-exist/.test(path) === false &&
        /<title>Page not found/i.test(text)
      ) {
        fail(`soft 404 at ${path}`);
      }
    }

    const missing = await fetchText(`${BASE}${FAKE_PATH}`);
    if (missing.res.status !== 404) {
      fail(`invalid path returned ${missing.res.status} instead of 404`);
    } else if (/Sharjeel — Full-stack developer and growth engineer/.test(missing.text) && !/isn&apos;t here|isn't here|Page not found/i.test(missing.text)) {
      fail("soft 404: missing path served the homepage");
    }

    const home = pages.find((page) => page.url === SITE);
    if (home) {
      const linked = new Set(
        home.hrefs
          .map((href) => href.split("#")[0].split("?")[0])
          .filter((href) => href.startsWith("/"))
      );
      for (const url of sitemapUrls) {
        const path = url === SITE ? "/" : url.slice(SITE.length);
        if (path === "/") continue;
        if (!linked.has(path)) {
          fail(`orphan indexable route (not linked from homepage): ${path}`);
        }
      }
    }
  } finally {
    if (child) {
      child.kill("SIGTERM");
    }
  }

  if (errors.length) {
    console.error("SEO audit failed:");
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
  }

  console.log(`SEO audit passed (${BASE})`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
