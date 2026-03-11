import express from "express";
import connectDb from "./config/database.js";
const app = express();
import User from "./models/user.js";

app.post("/signup", async(req, res) => {
  const user = new User({
    firstName: "vikram",
    lastName: "soni",
    emailId: "jays8174@gmail.com",
    password: "123456",
  });
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
