const { Document, popularities, watch } = require("content");

const titles = {};
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
      titles[url] = {
        title: metadata.title,
        popularity: popularities[url] || 0,
      };
    } catch (e) {
      console.error(`Error while adding document ${folder} to index:`, e);
    }
  },
  onUpdate() {},
  onDelete(folder) {
    delete titles[Document.read(folder, { metadata: true }).url];
  },
});

export default (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(titles));
};
