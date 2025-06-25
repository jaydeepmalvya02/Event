const express=require('express')
const { createJob, getAllJobs, applyJobs, deleteJob, getAllCandidates, deleteCandidate } = require('../controller/job')

const router=express.Router()

router.post('/jobs',createJob)
router.get('/jobs',getAllJobs)
router.post('/jobs/apply',applyJobs)
router.delete('/jobs/:id',deleteJob)
router.get('/jobs/candidate',getAllCandidates)
router.delete('/jobs/candidate/:id',deleteCandidate)

module.exports=router