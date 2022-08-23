const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/user.model");
const Profile = require("./models/profile.model");
const Product = require("./models/produce.model");
const Seller = require("./models/seller.model");
const Bid = require("./models/bid.model");

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
  try {
    if (req.body.role === "Farmer") {
      console.log(req.body);
      await Profile.create({
        uid: req.body.uid,
        name: req.body.name,
        dist: req.body.dist,
        aadhar: req.body.aadhar,
        phone: req.body.phone,
        role: req.body.role,
      });
    } else if (req.body.role === "State") {
      await Profile.create({
        uid: req.body.uid,
        name: req.body.name,
        dist: req.body.dist,
        aadhar: req.body.aadhar,
        phone: req.body.phone,
        role: req.body.role,
      });

      await Seller.create({
        uid: req.body.uid,
        limit: 200,
        crop: "Wheat",
        qty: 0
      });
    }
    return res.json({ status: "ok", role: req.body.role });
  } catch (err) {
    return res.json({ status: "error", error: err });
  }
});

app.post("/api/produce", async (req, res) => {
  try {
    const user = await Product.findOne({ crop: req.body.crop, uid: req.body.uid });
    console.log(user);
    if (!user) {
      await Product.create({
        uid: req.body.uid,
        produce: req.body.produce,
        dist: req.body.dist,
        state: req.body.state,
        crop: req.body.crop,
      });
    } else {
      await Product.updateOne(
        { crop: req.body.crop, uid: req.body.uid },
        {
          $set: {
            produce: parseInt(req.body.produce) + parseInt(user.produce),
          },
        }
      );
    }
    return res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    return res.json({ status: "error", error: err });
  }
});

app.post("/api/users/", async (req, res) => {
  try {
    const profile = await Profile.findOne({ uid: req.body.uid });
    if (profile) {
      return res.json({ status: "ok", user: profile });
    }
  } catch (err) {
    console.log(err);
    return res.json({ status: "error", error: err });
  }
});

app.post("/api/sell", async (req, res) => {
  const user = await Seller.findOne({ uid: req.body.uid });

  return res.json({ status: "ok", limit: user.limit , qty: user.qty });
});

app.post("/api/seller/buy", async (req, res) => {
  try {
    const user = await Seller.findOne({ uid: req.body.uid });
    await Seller.updateOne(
      { uid: req.body.uid },
      { $set: { limit: parseInt(user.limit) - parseInt(req.body.limit) , qty: parseInt(user.qty) + parseInt(req.body.limit) }}
    );
    return res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    return res.json({ status: "error", error: err });
  }
});
app.post("/api/users/add", async (req, res) => {
  try {
    await User.create({
      uid: req.body.uid,
      pwd: req.body.pwd,
    });
    res.json({ status: "ok" , user: req.body.uid});
  } catch (err) {
    res.json({ status: "error", error: "Duplicate email" });
  }
});

app.post("/api/seller/sell", async (req, res) => {
  try {
    const user = await Seller.findOne({ uid: req.body.uid });
    await Seller.updateOne(
      { uid: req.body.uid },
      { $set: { limit: parseInt(user.limit) + parseInt(req.body.limit) , qty: parseInt(user.qty) - parseInt(req.body.limit) }}
    );
    return res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    return res.json({ status: "error", error: err });
  }
});

app.post("/api/add/bid", async (req, res) => {
  try{
    const user = await Bid.findOne({ uid: req.body.uid, crop: req.body.crop  }); 
    if(!user){
      await Bid.create({
        uid: req.body.uid,
        crop: req.body.crop,
        amt: req.body.amt,
        qty: req.body.quan,
        status : "Open"
      });
    }else{
      await Bid.updateOne(
        { uid: req.body.uid, crop: req.body.crop },
        { $set: { amt: req.body.amt, qty: req.body.qty, status : "Open" }}
      );
    }
  }catch(err){
    console.log(err);
    return res.json({ status: "error", error: err });
  }
})

app.listen(8080, () => {
  console.log("Server started at port 8080");
});
