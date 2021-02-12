const router = require('express').Router()
const productcontroller = require('../controllers/product.controller')

router.get('/:id',productcontroller.getproduct)
module.exports = router