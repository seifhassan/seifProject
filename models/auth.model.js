const mongoose =require('mongoose');
const bcrypt = require('bcrypt')
const DB_URL ='mongodb://localhost:27017/online-shop'
const userSchema = mongoose.Schema({
name: String,
email:String,
password :String,
isAdmin: {
  type: Boolean,
  default: false
}
});
const user = mongoose.model("user",userSchema);
exports.createnewuser =(username,email,password)=>
{
    return new Promise((resolve , reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            
            return user.findOne({email:email})
           }).then(user =>{
            if(user){ 
            mongoose.disconnect()
            reject('email is used');
            } else{
                 return  bcrypt.hash(password,10)
             }
       }).then(hashedpassword =>{
         let userr = new user({
             username:username,
             email :email,     
             password:hashedpassword    
            })
            return userr.save()
       }).then(()=>{
           mongoose.disconnect()
        resolve()
       }).catch(err=>{
        mongoose.disconnect()
        reject(err)
       })
    });
  };
  exports.login=(email, password)=>{
    return new Promise((resolve,reject)=>{
    mongoose.connect(DB_URL)
    .then(()=>user.findOne({email:email})).then(user=>{
      if(!user){
        mongoose.disconnect()
        reject('there is no user has this mail')
        } else{ 
         bcrypt.compare(password,user.password).then (same=>{
            if(!same){
              mongoose.disconnect()
              reject('password is not correct')
            }else{
              mongoose.disconnect()
              resolve({
                id:user._id,
                isAdmin : user.isAdmin
              })
            }
          });
      
      }
    
    }).catch(err=>{
      mongoose.disconnect();
        reject(err)
    })

    })
  }
     
    
    

