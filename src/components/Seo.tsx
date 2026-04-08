import Head from "next/head";

type SeoProps = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noindex?: boolean;
};

const DEFAULT_IMAGE = "/assets/photos/branding/GoldLogo.png";
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ssicsim.ca";

const toAbsoluteUrl = (url: string) => {
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${BASE_URL}${url.startsWith("/") ? url : `/${url}`}`;
};

const Seo = ({
  title,
  description,
  path,
  image,
  noindex = false,
}: SeoProps) => {
  const fullTitle = title.includes("SSICSIM")
    ? title
    : `${title} | SSICSIM 2026`;
  const url = path ? toAbsoluteUrl(path) : BASE_URL;
  const imageUrl = toAbsoluteUrl(image ?? DEFAULT_IMAGE);

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={imageUrl} />
      <meta
        name="robots"
        content={noindex ? "noindex, nofollow" : "index, follow"}
      />
      <link rel="canonical" href={url} />
    </Head>
  );
};

export default Seo;
