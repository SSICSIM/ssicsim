import { useEffect } from "react";

type SeoProps = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noindex?: boolean;
};

const DEFAULT_IMAGE = "/assets/photos/branding/GoldLogo.png";

const toAbsoluteUrl = (url: string, baseUrl: string) => {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  return `${baseUrl}${url.startsWith("/") ? url : `/${url}`}`;
};

const upsertMeta = (attribute: "name" | "property", key: string, content: string) => {
  const selector = `meta[${attribute}="${key}"]`;
  let element = document.head.querySelector(selector) as HTMLMetaElement | null;

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
};

const upsertLink = (rel: string, href: string) => {
  const selector = `link[rel="${rel}"]`;
  let element = document.head.querySelector(selector) as HTMLLinkElement | null;

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
};

const Seo = ({ title, description, path, image, noindex = false }: SeoProps) => {
  useEffect(() => {
    const baseUrl = window.location.origin;
    const fullTitle = title.includes("SSICSIM")
      ? title
      : `${title} | SSICSIM 2026`;
    const url = path ? `${baseUrl}${path}` : window.location.href;
    const imageUrl = toAbsoluteUrl(image ?? DEFAULT_IMAGE, baseUrl);

    document.title = fullTitle;

    upsertMeta("name", "description", description);
    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:image", imageUrl);
    upsertMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow");
    upsertLink("canonical", url);
  }, [description, image, noindex, path, title]);

  return null;
};

export default Seo;
