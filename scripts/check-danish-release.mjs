// Focused zero-dependency checks for the Danish Advisory content release.
import { readFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = path => readFileSync(resolve(root, path), 'utf8');
const errors = [];
const requireTrue = (condition, message) => { if (!condition) errors.push(message); };

const index = read('da/index.html');
const blog = read('da/blog/index.html');
const contact = read('da/contact.html');
const articles = [
  'da/blog/ai-i-danske-virksomheder-2026.html',
  'da/blog/automatisering-af-administrative-opgaver.html'
];

requireTrue(index.includes('hello@arqonelabs.com'), 'Danish homepage missing direct email');
requireTrue(index.includes('Dansk kontaktformular'), 'Danish homepage missing explicit contact form');
requireTrue(index.includes('Se produktfilmen på engelsk (valgfrit)'), 'Optional English media is not clearly labeled');
requireTrue(!/<video\b/i.test(index), 'Danish homepage still embeds English-language product videos');
requireTrue(contact.includes('id="contactForm"'), 'Danish contact form missing');
requireTrue(contact.includes("WORKER_URL = 'https://arqone-contact.pierosaleme.workers.dev'"), 'Danish contact handler changed');
requireTrue(blog.includes('Nye artikler på dansk') && blog.includes('Flere perspektiver på engelsk'), 'Blog language sections missing');

for (const path of articles) {
  const html = read(path);
  requireTrue(blog.includes('/' + path), 'Danish blog does not link to ' + path);
  requireTrue(html.includes('<html lang="da">'), path + ': Danish language marker missing');
  requireTrue(html.includes('"inLanguage":"da"'), path + ': article structured data missing language');
  requireTrue(html.includes('Piero Saleme'), path + ': author missing');
  requireTrue(html.includes('https://ec.europa.eu/eurostat/'), path + ': primary Eurostat source missing');
  requireTrue(html.includes('mailto:hello@arqonelabs.com'), path + ': direct enquiry path missing');
  requireTrue(html.includes('href="/da/contact.html'), path + ': contact form route missing');
  requireTrue(read('sitemap.xml').includes('https://arqonelabs.com/' + path), path + ': sitemap entry missing');
  for (const [, href] of html.matchAll(/href="(\/[^"]+)"/g)) {
    if (href.includes('?') || href.includes('#')) continue;
    const relative = href.endsWith('/') ? href.slice(1) + 'index.html' : href.slice(1);
    requireTrue(existsSync(resolve(root, relative)), path + ': broken local link ' + href);
  }
}

if (errors.length) {
  for (const error of errors) console.error('FAIL:', error);
  process.exit(1);
}
console.log('PASS: Danish content, local links, contact options, and language-sensitive media checks');
