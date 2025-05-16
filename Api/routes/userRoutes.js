const express=require('express')
const { register, allUsers, login } = require("../controller/user");
const router=express.Router()
// POST /api/register
router.post('/register',register)
router.post('/login',login)

router.get('/',allUsers)


module.exports=router