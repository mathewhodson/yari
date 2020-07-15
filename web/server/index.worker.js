const fs = require("fs");
const path = require("path");
const { parentPort } = require("worker_threads");

const chokidar = require("chokidar");

const { CONTENT_ROOT, Document } = require("content");

const titlesByLocale = {};

function getFolder(filePath) {
  return path.dirname(path.relative(CONTENT_ROOT, filePath));
}

function callWithFolder(callback) {
  return (filePath) => callback(getFolder(filePath));
}

const popularities = JSON.parse(
  fs.readFileSync(path.join(__dirname, "popularities.json"), "utf-8")
);

const watcher = chokidar.watch(CONTENT_ROOT, "**/*.html");

watcher.on("ready", () => {
  parentPort.postMessage(titlesByLocale);
});

watcher.on(
  "add",
  callWithFolder((folder) => {
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
  })
);

watcher.on(
  "unlink",
  callWithFolder((folder) => {
    const { url } = Document.read(folder, { metadata: true });
    delete titlesByLocale[url.split("/")[1]][url];
    parentPort.postMessage(titlesByLocale);
  })
);
