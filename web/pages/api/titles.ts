const { watch } = require("content");

const index = new Map();
let isReady = false;

watch({ onReady() {}, onCreate() {}, onUpdate() {}, onDelete() {} });

export default (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ name: "John Doe" }));
};
