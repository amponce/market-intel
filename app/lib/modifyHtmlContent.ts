import { JSDOM } from "jsdom";

export default function modifyHtmlContent(html: string): string {
  const dom = new JSDOM(html);
  const document = dom.window.document;

  document.querySelectorAll("a").forEach((link) => {
    if (link.hostname !== dom.window.location.hostname) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
  });

  return dom.serialize();
}
