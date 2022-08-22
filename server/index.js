const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/user.model");
const Profile = require("./models/profile.model");

app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb://root:root@localhost:27017/agritech?&authSource=admin"
);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/api/users/login", async (req, res) => {
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

app.post("/api/users/register", async (req, res) => {
    try{
        await Profile.create({
            uid: req.body.uid,
            name: req.body.name,
            dist: req.body.dist,
            aadhar: req.body.aadhar,
            phone: req.body.phone,
        });
        return res.json({ status: "ok" });
    }catch(err){
        return res.json({ status: "error", error: err });
    }
})

app.listen(8080, () => {
  console.log("Server started at port 8080");
});
