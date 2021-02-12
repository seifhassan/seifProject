
const session = require('express-session')
const productModel =require('../models/products.module')
exports.getproduct =(req,res,next)=>{
let id = req.params.id
productModel.getproductsbyid(id).then((product)=>{
    res.render('product',{
        product:product,
        isUser : true,
        isAdmin:session.isAdmin,

        validationError:req.flash('validationError')[0]
    })

})

}