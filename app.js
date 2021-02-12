const express = require('express')
const path = require('path')
const session = require('express-session')
const sessionStore = require('connect-mongodb-session')(session)

const flash = require('connect-flash')
const app = express()
const homerouter = require('./routes/home.routes')
const productrouter = require('./routes/product.route')
const cartrouter = require('./routes/cart.route')
const authrouter = require("./routes/auth.route")
const orderrouter = require('./routes/order.route')
const adminRouter = require("./routes/admin.route");
app.use(express.static(path.join(__dirname,'assets')))
app.use(express.static(path.join(__dirname,'image')))
app.use(flash())

const STORE = new sessionStore({
uri: 'mongodb://localhost:27017/online-shop',
collection: 'sessions'

})
app.use(session({
   secret : 'this secret secret to hash express sissions ....',
   saveUninitialized:false,
   store: STORE  
}))

app.set('view engine','ejs');
app.set('views','views')


app.use('/',homerouter)
app.use('/',authrouter)
app.use ('/product',productrouter)
app.use ('/cart',cartrouter)
app.use('/',orderrouter)
app.use("/admin", adminRouter);

app.listen(3000, (err)=>{
    console.log(err)
    console.log('server listen onport 3000')
})