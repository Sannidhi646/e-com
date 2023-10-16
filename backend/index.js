const express = require("express");
require("./db/config");
const User = require("./db/User");
const Product = require("./db/Product");
const app = express();
const cors = require("cors");
const Jwt=require("jsonwebtoken");
const Jwtkey="/e-com";

app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();

  //when the use hits the signup button the password is seen in console
  //to avoid that the password is deleted
  result = result.toObject();
  delete result.password;
  Jwt.sign({result},Jwtkey,{expiresIn:"2h"},(err,token)=>{
    if(err)
    {
      res.send("Something went wrong");
    }
    else
    res.send({result,auth:token});
  })
});
app.post("/login", async (req, res) => {
  //if both the email and password exits
  if (req.body.password && req.body.email) {
    //while sending to front end the password should not be sent with the other data
    let user = await User.findOne(req.body).select("-password");
    if (user) 
    {
      Jwt.sign({user},Jwtkey,{expiresIn:"2h"},(err,token)=>{
        if(err)
        {
          res.send("Something went wrong");
        }
        else
        res.send({user,auth:token});
      });
     
    }
    else res.send({ result: "Not found" });
  } else res.send({ result: "Not found" });
});

app.post("/add-product",verifyToken, async (req, res) => {
  const product = new Product(req.body);
  const result = await product.save();
  res.send(result);
});

app.get("/products",verifyToken, async (req, res) => {
  const product = await Product.find();

  if (product.length > 0) res.send(product);
  else res.send({ result: "No Data Found" });
});

app.delete("/product/:id", async (req, res) => {
  const result = await Product.deleteOne({ _id: req.params.id });
  res.send(result);
});
app.get("/product/:id",verifyToken, async (req, res) => {
  let result = await Product.findOne({ _id: req.params.id });

  if (result) res.send(result);
  else res.send("no data found");
});
app.put("/product/:id",verifyToken, async (req, res) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.send(result);
});
app.get("/search/:key",verifyToken,async(req,res)=>{
  let result=await Product.find({
    "$or":[
      {name:{$regex:req.params.key}},
      {price:{$regex:req.params.key}},
      {category:{$regex:req.params.key}},
      {company:{$regex:req.params.key}},
    ]
  });
  res.send(result)
})
function verifyToken(req,res,next){
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
   
    Jwt.verify(token, Jwtkey, (err, valid) => {
      if (err) res.status(401).send({ result: "Please send valid token" });
      else next();
    });
  } else res.status(403).send({ result: "Please send  token" });
}
app.listen(5000, () => {
  console.log("App is listening at 5000");
});
