const cartmodel = require("../models/cart.model");
const validationResult = require("express-validator").validationResult;

exports.getcart = (req,res,next)=>{
cartmodel.getitembyuser(req.session.userId).then(items=>{
   
    res.render('cart',{
        items:items,
        isUser:true,
        isAdmin :req.session.isAdmin,
        validationError : validationResult(req).array()
    })
    

}).catch(err=>console.log(err))

}

exports.postcart = (req, res,next)=>{
    
       if(validationResult(req).isEmpty()){
    cartmodel.addnewitem({
        name: req.body.name,
        price:req.body.price,
        amount :req.body.amount,
        productId:req.body.productId,
        userId:req.session.userId,
        name:req.body.name,
        timestamp: Date.now()
       }).then(()=>{

       res.redirect('/cart')
       
       }).catch(err=>{
           console.log(err);
       });   
    }else{
        req.flash('validationError',validationResult(req).array())
        res.redirect('/');
           
    }
    };

    exports.postsave =(req,res,next)=>{
        
        if(validationResult(req).isEmpty()){
            
            cartmodel
            .editItem(req.body.cartId,
                {amount : req.body.amount ,
                 timestamp:Date.now()
                })
                 .then(()=>res.redirect('/cart'))
                 .catch(err=>console.log(err));

        }else{
            
           req.flash('validationError',validationResult(req).array());
               res.redirect('/cart');
        }
    
        }
        

        exports.postdelete =(req,res,next)=>{
        cartmodel.deleteItem(req.body.cartId)
        .then(()=>res.redirect('/cart'))
        .catch(err=>console.log(err));
        }
        
