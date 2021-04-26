
const express = require ("express");
const bodyParser=require("body-parser")
const mongoose=require("mongoose");
const app = express();
require('dotenv').config()



app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect("mongodb+srv://manju_r:manju_r@15@cluster0.cg9le.mongodb.net/users?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true} );

const userSchema=({

  email:String,
  password:String,


});
const User=mongoose.model( "User",userSchema);


app.get("/",function(req,res){

  res.render('ulogin');
});

app.get("/login",function(req,res){

  res.render('login');
});
app.get("/register",function(req,res){

  res.render('register');
});
app.get("/error",function(req,res){
  res.render('error');
});

app.post("/register",function(req,res){

User.create({email:req.body.email,password:req.body.password},function(err)
{
  if(err)
  {
  console.log(err);
}else {
  res.render('succesfully')
}
 })
});
app.post("/login",function (req,res){
  User.findOne({ 'email':req.body.email}, function (err,foundUser){
  if (err)
  {

  res.redirect('/register');
} else {
    if(foundUser){
      res.render('succesfully')
    }
  }





});
})




app.listen(3000,function(){
  console.log("server is running on port 3000");
});
