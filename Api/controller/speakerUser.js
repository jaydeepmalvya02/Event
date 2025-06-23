const SpeakerUser = require("../model/speakerAdminModel");
const registerSpeaker = async (req, res) => {
  try {
    const {
      name,
      designation,
      company,
      department,
      experience,
      linkedin,
      email,
      phone,
      state,
      city,
      division,
    } = req.body;
    console.log(req.body);
    if (!name || !email || !phone) {
      res.json({ success: false, message: "Enter all required details" });
    }
    const newSpeaker = new SpeakerUser(req.body);
    const savedSpeaker = await newSpeaker.save();
    res.json({ success: true, savedSpeaker });
  } catch (error) {
    console.error(error);

    res.json({ success: false, message: "Server Error!" });
  }
};
const getAllspeakers = async (req, res) => {
  try {
    const speakerList = await SpeakerUser.find({});
    res.json({ success: true, speakerList });
  } catch (error) {
    console.error(error);

    res.json({ success: false, message: "Server Error!" });
  }
};
const deleteSpeaker=async(req,res)=>{
  const speakerId=req.params.id
  try {
    if(!speakerId)
    {
      return res.json({ success: false, message: "Not available" });
    }
    await SpeakerUser.findByIdAndDelete(speakerId)
    res.json({ success: true, message:'Deleted' });
   
  } catch (error) {
    
  }

}

module.exports = { registerSpeaker,getAllspeakers,deleteSpeaker };

