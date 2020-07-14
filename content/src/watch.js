const path = require("path");

const chokidar = require("chokidar");

const { DEFAULT_BUILD_ROOT } = require("./constants");

let watcher;
let folders = [];
let isReady = false;

function getFolder(filePath) {
  return path.dirname(path.relative(DEFAULT_BUILD_ROOT, filePath));
}

function callWithFolder(callback) {
  return (filePath) => callback(getFolder(filePath));
}

function watch({ onReady, onCreate, onUpdate, onDelete }) {
  watcher = chokidar.watch(DEFAULT_BUILD_ROOT, "**/*.html");

  watcher.on("ready", onReady);
  watcher.on("add", callWithFolder(onCreate));
  watcher.on("change", callWithFolder(onUpdate));
  watcher.on("unlink", callWithFolder(onDelete));
}

module.exports = watch;
