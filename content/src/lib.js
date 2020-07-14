const { buildDocumentFromURL } = require("./build");
const Document = require("./document");
const { resolveRedirect } = require("./redirects");
const watch = require("./watch");

module.exports = { buildDocumentFromURL, Document, resolveRedirect, watch };
