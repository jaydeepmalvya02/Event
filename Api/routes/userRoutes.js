const express=require('express')
const { register, allUsers } = require("../controller/user");
const router=express.Router()
// POST /api/register
router.post('/register',register)
router.get('/',allUsers)


module.exports=router