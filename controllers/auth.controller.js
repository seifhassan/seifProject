const authmodel = require ("../models/auth.model");
const validationResult = require("express-validator").validationResult;
//**********/
exports.getsignup = (req,res,next)=>{
    res.render("signup",{
        authError: req.flash('authError')[0],
       validationError: req.flash('validationErrors'),
       isUser : false,
       isAdmin : false
    });
};
 // **********/
exports.postsignup = (req, res,next)=>{
 
    if(validationResult(req).isEmpty()){
authmodel
.createnewuser( req.body.username , req.body.email , req.body.password)
.then(() => res.redirect('/'))

.catch(err =>{
    req.flash('authError',err);
    res.redirect('/signup');

});
    }else{
        req.flash('validationErrors',validationResult(req).array())
        res.redirect('/signup')

   }
};
/********** */
exports.getlogin = (req, res,next)=>{
    res.render('login',{
     authError :req.flash("authError"),
        isUser : false,
        isAdmin : false
    });
}
/************* */
exports.postlogin = (req,res ,next)=>{
   if(validationResult(req).isEmpty()){
    authmodel
    .login(req.body.email , req.body.password)
    .then(result=>{
       // if(result.isAdmin){
            //req.session.userId=false;
          //  req.session.isAdmin=true; 
        //}
        req.session.userId=result.id;
        req.session.isAdmin=result.isAdmin;

        res.redirect("/")
    })

    .catch(err=>{
        req.flash("authError",err);
        res.redirect("/login");
    });
}else{
    req.flash('validationErrors',validationResult(req).array())
    res.redirect('/login')

}
}
/*********** */
exports.logout=(req , res , next)=>{
    req.session.destroy(()=>{
res.redirect("/");

    })
}