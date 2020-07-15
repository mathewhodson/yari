import { Worker } from "worker_threads";

let titlesByLocale: any = null;

const worker = new Worker("../web/server/index-worker.js");
worker.on("message", (data) => {
  titlesByLocale = data;
});

export default (req, res) => {
  res.statusCode = 200;
  const jsonString = JSON.stringify({
    isReady: !!titlesByLocale,
    titles: titlesByLocale ? titlesByLocale[req.query.locale] : {},
  });
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Content-Length", Buffer.byteLength(jsonString, "utf8"));
  res.end(jsonString);
};
