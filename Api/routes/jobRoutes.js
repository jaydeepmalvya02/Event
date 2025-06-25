const express=require('express')
const { createJob, getAllJobs, applyJobs, deleteJob } = require('../controller/job')

const router=express.Router()

router.post('/jobs',createJob)
router.get('/jobs',getAllJobs)
router.post('/jobs/apply',applyJobs)
router.delete('/jobs/:id',deleteJob)

module.exports=router