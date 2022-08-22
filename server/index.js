const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/user.model");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/users/login", async (req, res) => {
  const user = await User.findOne({ uid: req.body.uid });
  if (!user) {
    return res.json({ status: "error", error: "Invalid Credentials" });
  }
  const pass = req.body.pwd == user.pwd;
  if (!pass) {
    return res.json({ status: "error", error: "Invalid Credentials" });
  } else {
    return res.json({ status: "ok", user: user.uid });
  }
});

app.listen(8080, () => {
  console.log("Server started at port 8080");
});
