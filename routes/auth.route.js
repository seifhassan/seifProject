const router = require("express").Router();
const route = require("express").Router();
const bodyParser =require('body-parser');
const check = require('express-validator').check
const authcontroller =require("../controllers/auth.controller");


route.get("/signup",authcontroller.getsignup);

route.post("/signup",
bodyParser.urlencoded({extended:true}),
check("username").not().isEmpty(),
check("email").not().isEmpty().isEmail(),
check("password").isLength({min:6}),

check('confirmpassword').custom((value,{req})=>{
if (value===req.body.password)  return true
else  throw ' password isnt equal'
}),
authcontroller.postsignup
);

route.get("/login",authcontroller.getlogin);
route.post("/login",
bodyParser.urlencoded({extended:true}),
authcontroller.postlogin
);
route.all('/logout',authcontroller.logout)
module.exports= route ;
