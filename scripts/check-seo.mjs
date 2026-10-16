// Zero-dependency SEO/GEO release check for ArqOne Labs.
// Run locally: node scripts/check-seo.mjs
// Optional production check: node scripts/check-seo.mjs --live
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { resolve, dirname } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const origin = "https://arqonelabs.com";
const file = (p) => readFileSync(resolve(root, p), "utf8");
const failures = [];
const assert = (pass, msg) => { if (!pass) failures.push(msg); };
const sitemap = file("sitemap.xml");
const urls = [...sitemap.matchAll(/<loc>(https:\/\/arqonelabs\.com\/[^<]*)<\/loc>/g)].map(m => m[1]);

assert(sitemap.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'), "Invalid sitemap namespace");
assert(urls.length >= 4 && urls.length === new Set(urls).size, "Sitemap is empty or has duplicate URLs");
assert(file("robots.txt").includes("Sitemap: " + origin + "/sitemap.xml"), "robots.txt missing sitemap reference");
assert(!/Disallow:\s*\/(?:\s|$)/mi.test(file("robots.txt")), "robots.txt blocks all crawlers");

function sourcePath(url) {
  const pathname = new URL(url).pathname;
  if (pathname === "/") return "index.html";
  if (pathname === "/blog/") return "blog/index.html";
  return pathname.slice(1) + ".html";
}
for (const url of urls) {
  const path = sourcePath(url);
  assert(existsSync(resolve(root, path)), url + ": source file " + path + " missing");
  if (!existsSync(resolve(root, path))) continue;
  const html = file(path);
  const head = html.split(/<\/head>/i)[0];
  const canonicals = [...head.matchAll(/<link\s+[^>]*rel="canonical"\s+href="([^"]+)"[^>]*>/ig)].map(m => m[1]);
  assert(canonicals.length === 1 && canonicals[0] === url, path + ": canonical URL missing or mismatched");
  assert(/<title>[^<]+<\/title>/i.test(head), path + ": title missing");
  assert(/<meta name="description" content="[^"]+"/i.test(head), path + ": meta description missing");
  assert(!/<meta[^>]*name="robots"[^>]*noindex/i.test(head), path + ": unexpected noindex");
  const structured = [...head.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
  for (const entry of structured) {
    try { JSON.parse(entry[1]); } catch { assert(false, path + ": invalid JSON-LD"); }
  }
  if (path === "index.html" || path.startsWith("blog/") && path !== "blog/index.html") {
    assert(structured.length > 0, path + ": organisation or article structured data missing");
  }
}

if (process.argv.includes("--live")) {
  for (const url of urls) {
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(12000), headers: { "User-Agent": "ArqOne-SEO-Healthcheck/1.0" } });
      assert(response.ok, url + ": live HTTP " + response.status);
      if (response.ok) {
        const html = await response.text();
        assert(html.includes('rel="canonical" href="' + url + '"'), url + ": live canonical mismatch");
      }
    } catch (error) { assert(false, url + ": live check failed: " + error.message); }
  }
}
if (failures.length) {
  for (const error of failures) console.error("FAIL:", error);
  process.exit(1);
}
console.log("PASS: " + urls.length + " indexed pages; canonical, sitemap, metadata and structured data checks completed" + (process.argv.includes("--live") ? " (production verified)" : ""));
