const fs = require("fs");
const path = require("path");

const { buildDocumentFromURL } = require("./build");
const { DEFAULT_POPULARITIES_FILEPATH } = require("./constants");
const Document = require("./document");
const { resolveRedirect } = require("./redirects");
const watch = require("./watch");

const popularities = Object.fromEntries(
  Object.entries(
    JSON.parse(
      fs.readFileSync(
        path.join(__dirname, "..", "..", DEFAULT_POPULARITIES_FILEPATH),
        "utf-8"
      )
    )
  ).map(([key, value]) => [key.toLowerCase(), value])
);

module.exports = {
  buildDocumentFromURL,
  Document,
  popularities,
  resolveRedirect,
  watch,
};
