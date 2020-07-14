import { useRouter } from "next/router";

export function useDocumentURL() {
  const router = useRouter();
  return router.asPath;
  // const url = `/${locale}/docs/${slug}`;
  // If you're in local development Express will force the trailing /
  // on any URL. We can't keep that if we're going to compare the current
  // pathname with the document's mdn_url.
  // return url.endsWith("/") ? url.substring(0, url.length - 1) : url;
}
