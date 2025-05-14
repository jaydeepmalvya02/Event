const express=require('express')
const  register  = require('../controller/user')

const router=express.Router()
// POST /api/register
router.post('/',register)


module.exports=router