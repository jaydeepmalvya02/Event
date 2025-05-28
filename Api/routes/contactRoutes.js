const express=require('express')
const { saveContact, showContact } = require('../controller/contact')

const router=express.Router()

router.post('/contact',saveContact)
router.get('/show',showContact)

module.exports=router