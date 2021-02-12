const mongoose = require('mongoose')
const DB_URL ='mongodb://localhost:27017/online-shop'
const productSchema = mongoose.Schema({
name: String,
image:String,
price : Number,
description :String,
category : String
})
const product = mongoose.model('products',productSchema)
exports.getALLproducts = () =>{

return new Promise((resolve , reject)=>{
    mongoose.connect(DB_URL).then(()=>{
        
        return product.find({})
       }).then(productss =>{
           mongoose.disconnect()
           resolve(productss)
   }).catch(err => reject(err))
})
}

exports.getproductsbycategory = (category) =>{

    return new Promise((resolve , reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            
            return product.find({category:category})
           }).then(productss =>{
               mongoose.disconnect()
               resolve(productss)
       }).catch(err => reject(err))
  })
}
exports.getproductsbyid = (id) =>{
    

    return new Promise((resolve , reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            
            return product.findById(id)
           }).then(productss =>{
               mongoose.disconnect()
               resolve(productss)
               
       }).catch(err => reject(err))
  })
}
