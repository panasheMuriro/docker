const express = require("express");
const client = require("prom-client");

const app = express();
const register = new client.Registry();

// Collect system metrics automatically
client.collectDefaultMetrics({ register });

// Custom metric: HTTP request counter
const httpRequestCounter = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
});
register.registerMetric(httpRequestCounter);

// Custom metric: request duration
const httpRequestDuration = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  buckets: [0.1, 0.5, 1, 2, 5],
});
register.registerMetric(httpRequestDuration);

app.get("/", (req, res) => {
  httpRequestCounter.inc();
  const end = httpRequestDuration.startTimer();
  res.send("Hello, monitoring!");
  end();
});

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

app.listen(3000, () => console.log("Backend running on port 3000"));
