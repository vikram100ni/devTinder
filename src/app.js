import express from "express";
import connectDb from "./config/database.js";
const app = express();
import User from "./models/user.js";
import { validateSignUpData } from "./utils/validation.js";
import bcrypt from "bcrypt";

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello server");
});
//signup api......
app.post("/signup", async (req, res) => {
  try {
    //validation of data...
    validateSignUpData(req);
    const { firstName, lastName, emailId, password, age, gender } = req.body;
    console.log(req.body);

    //encrypt password
    const hashPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashPassword,
      age,
      gender,
    });

    await user.save();
    res.send("user added successfully");
  } catch (error) {
    res.status(501).send("ERROR " + error.message);
  }
});

//login api
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId });
    if (!user) {
      throw new Error("invalid credentials");
    }
    const isComparePassword = await bcrypt.compare(password, user.password);
    console.log(isComparePassword);
    if (!isComparePassword) {
      throw new Error("invalid credentials"); 
    } else {
      res.send("login successfully");
    }
  } catch (error) {
    res.status(500).send("ERROR " + error.message);
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

//delete api
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("user deleted");
  } catch (error) {
    res.status(400).send("something went wrong");
  }
});

//update user api
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k),
    );
    if (!isUpdateAllowed) {
      throw new Error("update not allowed");
    }
    if (data?.skills && data.skills.length > 10) {
      throw new Error("Skills cannot be more than 10");
    }
    await User.findByIdAndUpdate({ _id: userId }, data);
    res.send("updated successfully");
  } catch (error) {
    res.status(400).send("something went wrong");
  }
});
const port = 7666;
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
