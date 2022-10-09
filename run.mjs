import cluster from "node:cluster";

if (cluster.isPrimary) {
  for (let i = 0; i < 4; i++) {
    cluster.fork();
  }
  import("./primary.mjs");
} else {
  import("./worker.mjs");
}