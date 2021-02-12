const router = require("express").Router();
const bodyParser =require('body-parser');
const check = require('express-validator').check
const authGaurd = require('./guards/auth.guard')
const cartcontroller =require("../controllers/cart.controller");
 

router.get('/',authGaurd.isauth , cartcontroller.getcart)

router.post(

    "/",
    authGaurd.isauth,
    bodyParser.urlencoded({extended :true}),
    check("amount")
    .not()
    .isEmpty()
    .withMessage("amount is required")
    .isInt({min : 1})
    .withMessage("amount must be grater then 0"),
    cartcontroller.postcart

);
router.post(

    "/save",
    authGaurd.isauth,
    bodyParser.urlencoded({extended :true}),
    check("amount")
    .not()
    .isEmpty()
    .withMessage("amount is required")
    .isInt({min : 1})
    .withMessage("amount must be grater then 0"),
    cartcontroller.postsave

);
router.post(

    "/delete",
    authGaurd.isauth,
    bodyParser.urlencoded({extended :true}),
    cartcontroller.postdelete

);


module.exports = router;