const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserModel = require("./models/Users");
const path=require("path");

const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname,"./client/build")));
app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,"./client/build/index.html"));
})
mongoose.connect(
  "mongodb+srv://shreyasjoshi:7flNOmQNcO1NMV0K@cluster0.kx4i22b.mongodb.net/mernProject?retryWrites=true&w=majority"
);

app.get("/getUsers", async(req, res) => {
  try {
    const articles = await UserModel.find({});
    res.send(articles);
    console.log(articles);
  } catch (err) {
    console.log(err);
  }
   
    
});

app.post("/createUser", async (req, res) => {
  const user = req.body;
  const newUser = new UserModel(user);
  await newUser.save();

  res.json(user);
});

app.listen(3001, () => {
  console.log("SERVER  RUNS PERFECTLY!");
});
