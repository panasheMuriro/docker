const express = require("express");
const app = express();

app.get("/", (req, res) => {
  console.log(`[INFO] Request received at / - ${new Date().toISOString()}`);
  res.send("Hello, logging world!");
});

app.get("/error", (req, res) => {
  console.error(`[ERROR] Something went wrong at /error - ${new Date().toISOString()}`);
  res.status(500).send("Error triggered");
});

const port = 4000;
app.listen(port, () => {
  console.log(`[INFO] Server started on port ${port}`);
});
