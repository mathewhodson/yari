const { parentPort } = require("worker_threads");

const { Document, popularities, watch } = require("content");

const titlesByLocale = {};

watch({
  onReady() {
    parentPort.postMessage(titlesByLocale);
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
        popularity: popularities[url] || 0,
      };
    } catch (e) {
      console.error(`Error while adding document ${folder} to index:`, e);
    }
  },
  onUpdate() {},
  onDelete(folder) {
    const { url } = Document.read(folder, { metadata: true });
    delete titlesByLocale[url.split("/")[1]][url];
    parentPort.postMessage(titlesByLocale);
  },
});
