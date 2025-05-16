const express=require('express')

const  { askQuestion, getQueries }=require('../controller/query')

const router=express.Router()

router.post('/',askQuestion)

router.get('/get',getQueries)

module.exports=router