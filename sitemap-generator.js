const fs = require("fs");
const path = require("path");

const baseUrl = "https://news.rfpenergysolutions.com"; // Replace with your actual domain
const contentDir = path.join(__dirname, "outstatic/content");
const sitemapPath = path.join(__dirname, "public/sitemap.xml");

let urls = [];

function processDirectory(directory) {
  fs.readdirSync(directory).forEach((file) => {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (path.extname(file) === ".md") {
      let urlPath = fullPath
        .replace(contentDir, "")
        .replace(".md", "")
        .replace(/\\/g, "/"); // Replace backslashes with forward slashes for URL
      urls.push(`${baseUrl}${urlPath}`);
    }
  });
}

processDirectory(contentDir);

let sitemapContent = '<?xml version="1.0" encoding="UTF-8"?>\n';
sitemapContent +=
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

urls.forEach((url) => {
  sitemapContent += "  <url>\n";
  sitemapContent += `    <loc>${url}</loc>\n`;
  sitemapContent += "  </url>\n";
});

sitemapContent += "</urlset>";

fs.writeFileSync(sitemapPath, sitemapContent);
console.log("Sitemap generated.");
