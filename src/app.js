import express from "express";

const app = express();

app.use(
  "/user",
  (req, res, next) => {
    console.log("handle the route user");
    next();
  },
  (req, res, next) => {
    console.log("handle the route user  2");
    res.send("response 2");
    next();
  },
  (req, res) => {
    console.log("handle the route user  3");
    res.send("response 3");
  },
);

const port = 7777;

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running at http://localhost:${port}`);
});
