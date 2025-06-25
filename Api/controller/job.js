const Job = require("../model/jobModel");
const Candidate = require("../model/candidateModel");
const createJob = async (req, res) => {
  try {
    const { title, type, location, company, experience, description } =
      req.body;
    if (!title || !description || !type || !location) {
      res.json({ success: false, message: "Fill all fields!" });
    }
    const newJob = Job(req.body);
    const savedJob = await newJob.save();
    res.json({ success: true, message: "New Job Created", savedJob });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Server Error" });
  }
};

const getAllJobs = async (req, res) => {
  try {
    const jobData = await Job.find({});
    res.json({ success: true, jobData });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Server Error" });
  }
};
const applyJobs = async (req, res) => {
  try {
    const { jobId, name, email, phone, resumeUrl, jobData,department } = req.body;
    const applyData = {
      name,
      email,
      phone,
      jobData,
      jobId,
      resumeUrl,
      department,
    };
    const apply = await Candidate.create(applyData);
    const savedApply = await apply.save();
    res.json({ success: true, message: "Successfuly applied", savedApply });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Server Error" });
  }
};
// delete jobs
const deleteJob=async(req,res)=>{
  try {
    const jobId=req.params.id
    if(!jobId){
      res.json({success:false,message:'Job Not Found'})
    }
    await Job.findByIdAndDelete(jobId)
    res.json({success:true,message:" Job Deleted "})
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: error.message });
  }
}

// get all candidates

const getAllCandidates=async(req,res)=>{
  try {
    const candidates=await Candidate.find({})
    res.json({success:true,candidates})
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: error.message });
  }
}

// Delete candidate by id
const deleteCandidate=async(req,res)=>{
  try {
    const candidateId=req.params.id
    await Candidate.findByIdAndDelete(candidateId)
    res.json({success:true,message:"Successfully Deleted"})
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: error.message });
  }
}
module.exports = { createJob, getAllJobs, applyJobs,deleteJob,getAllCandidates,deleteCandidate };
