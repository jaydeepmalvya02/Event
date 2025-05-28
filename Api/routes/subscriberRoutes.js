const express=require('express')
const { newSubscribe } = require('../controller/subscribe')

const router=express.Router()

router.post('/sub',newSubscribe)

module.exports=router