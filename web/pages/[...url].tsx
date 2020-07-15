import { SearchNavigateWidget } from "../src/search";

const { buildDocumentFromURL, Document } = require("content");

const { prepareDoc } = require("../doc-fix");
import { Document as DocumentView } from "../src/document";

type StaticProps<T> = T extends (
  ...params: unknown[]
) => Promise<{ props: infer P }>
  ? P
  : never;

const isDevelopment = process.env.NODE_ENV === "development";

export async function getStaticPaths() {
  return isDevelopment
    ? { paths: [], fallback: true }
    : {
        paths: Document.listURLs(),
        fallback: false,
      };
}

export async function getStaticProps(props) {
  const {
    params: { url },
  } = props;
  const doc = await buildDocumentFromURL("/" + url.join("/"));
  if (doc) {
    prepareDoc(doc);
  }

  return { props: { doc } };
}

export default ({ doc }: StaticProps<typeof getStaticProps>) => {
  return (
    <div>
      <header>
        <SearchNavigateWidget />
      </header>
      <DocumentView doc={doc} />
    </div>
  );
};
