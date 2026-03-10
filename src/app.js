import express from "express";

const app = express();

app.get("/test", (req, res) => {
  res.send("hello node for testing api");
});

const port = 7777;

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running at http://localhost:${port}`);
});