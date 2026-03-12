import express from "express";
import connectDb from "./config/database.js";
const app = express();
import User from "./models/user.js";

app.use(express.json());
app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  console.log(req.body);

  try {
    await user.save();
    res.send("user added successfully");
  } catch (error) {
    res.statusCode(501).send("error saving user", +error.message);
  }
});
//get user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const user = await User.findOne({ emailId: userEmail });
    if (user.length === 0) {
      res.status(404).send("user not found");
    } else {
      res.send(user);
    }
  } catch (error) {
    res.status(400).send("something went wrong");
  }
});

//get all user
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(400).send("something went wrong");
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
