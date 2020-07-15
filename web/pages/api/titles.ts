const { Document, watch } = require("content");

const index = new Map();
let isReady = false;

watch({
  onReady() {},
  onCreate(folder) {
    const document = Document.read(folder, { metadata: true });
  },
  onUpdate() {},
  onDelete() {},
});

export default (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ name: "John Doe" }));
};
