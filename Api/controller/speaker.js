const Speaker = require("../model/speakerModel");

const addSpeaker = async (req, res) => {
  try {
    const newSpeaker = new Speaker(req.body);
    const savedSpeaker = await newSpeaker.save();
    res.status(201).json({ message: "New Speaker Added", data: savedSpeaker });
    console.log(savedSpeaker);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const getAllSpeakers = async (req, res) => {
  try {
    const speakers = await Speaker.find();
    res.status(200).json(speakers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
const getSpeakerById = async (req, res) => {
  try {
    const speaker = await Speaker.findById(req.params.id);
    if (!speaker) return res.staus(404).json({ message: "Speaker not found" });
    res.status(200).json(speaker);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
const updateSpeaker = async (req, res) => {
  try {
    const updatedSpeaker = await Speaker.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true, runValidators: true }
    );
    
    if(!updatedSpeaker) return res.status(404).json({message:"Speaker not found"})
    res.status(200).json(updatedSpeaker)
  } catch (error) {
    console.error(error);
    res.status(500).json({message:error.message})
    
  }
};
const deleteSpeaker=async(req,res)=>{
  try {
    await Speaker.findByIdAndDelete(req.params.id)
    res.status(200).json({message:'Speaker is Deleted Successfuly'})
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}
module.exports = { addSpeaker, getAllSpeakers, getSpeakerById ,updateSpeaker,deleteSpeaker};
