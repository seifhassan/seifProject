
const router = require("express").Router();
const bodyParser = require("body-parser");
const check = require("express-validator").check;

const orderController = require("../controllers/order.controller");
const authGuard = require("./guards/auth.guard");

router.get("/verify-order", authGuard.isauth, orderController.getOrderVerify);

router.get("/orders", authGuard.isauth, orderController.getOrder);

router.post(
    "/orders",
    authGuard.isauth,
    bodyParser.urlencoded({ extended: true }),
    check("address")
        .not()
        .isEmpty()
        .withMessage("address is required"),
    orderController.postOrder
);

router.post(
    "/orders/cancel",
    authGuard.isauth,
    bodyParser.urlencoded({ extended: true }),
    orderController.postCancel
);

module.exports = router;
