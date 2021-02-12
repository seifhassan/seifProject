const productModel = require('../models/products.module')

exports.getHome =(req,res,next)=> {

  

    let category= req.query.category
    
    if(category && category!== 'all'){
        productModel.getproductsbycategory(category).then(products =>{
          
            res.render('index', {
              products: products,
              isUser : req.session.userId,
              isAdmin : req.session.isAdmin,
              validationError:req.flash('validationError')[0]
        });
    });
    } else{
    
        productModel.getALLproducts().then(products =>{
          
            res.render('index', {
              products: products ,
              isUser : req.session.userId,
              validationError:req.flash('validationError')[0],
              isAdmin : req.session.isAdmin
              
          })
          
    })
  }
}


