import express from "express";
import connectDb from "./config/database.js";
const app = express();
import User from "./models/user.js";

app.use(express.json());
app.post("/signup", async(req, res) => {
const user = new User(req.body);
  console.log(req.body);

  try {
     await user.save();
  res.send("user added successfully");
  } catch (error) {
    res.statusCode(501).send("error saving user" , + error.message);
  }
 
 });

const port = 7777;
connectDb()
  .then(() => {
    console.log("database connection successfully");
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("database cannot be connected");
  });
