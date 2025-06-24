const express=require('express')
const { createJob, getAllJobs, applyJobs } = require('../controller/job')

const router=express.Router()

router.post('/jobs',createJob)
router.get('/jobs',getAllJobs)
router.post('/jobs/apply',applyJobs)

module.exports=router