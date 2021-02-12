const router = require('express').Router()
const authguard= require('./guards/auth.guard')
const homecontroller = require('../controllers/home.controller')
router.get('/',homecontroller.getHome)
module.exports= router