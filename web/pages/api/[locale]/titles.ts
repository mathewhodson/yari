const { Document, popularities, watch } = require("content");

const titlesByLocale = {};
let isReady = false;

watch({
  onReady() {
    isReady = true;
  },
  onCreate(folder) {
    try {
      const document = Document.read(folder, { metadata: true });
      if (!document) {
        return;
      }
      const { metadata, url } = document;
      const locale = url.split("/")[1];

      if (!titlesByLocale[locale]) {
        titlesByLocale[locale] = {};
      }
      titlesByLocale[locale][url] = {
        title: metadata.title,
        popularity: Number((popularities[url] || 0).toPrecision(4)),
      };
    } catch (e) {
      console.error(`Error while adding document ${folder} to index:`, e);
    }
  },
  onUpdate() {},
  onDelete(folder) {
    const { url } = Document.read(folder, { metadata: true });
    delete titlesByLocale[url.split("/")[1]][url];
  },
});

export default (req, res) => {
  res.statusCode = 200;
  const jsonString = JSON.stringify({
    isReady,
    titles: titlesByLocale[req.query.locale] || {},
  });
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Content-Length", Buffer.byteLength(jsonString, "utf8"));
  res.end(jsonString);
};
