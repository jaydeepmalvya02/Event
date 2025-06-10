const express=require('express')
const {addSpeaker, getAllSpeakers, getSpeakerById, updateSpeaker, deleteSpeaker}=require('../controller/speaker')
const router=express.Router()

router.post('/speaker',addSpeaker)
router.get('/speaker',getAllSpeakers)
router.get("/speaker/:id",getSpeakerById)
router.put("/speaker/:id",updateSpeaker)
router.delete('/speaker/:id',deleteSpeaker)
module.exports=router
