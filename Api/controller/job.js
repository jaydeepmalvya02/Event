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

const getAllJobs=async(req,res)=>{
  try {
    const jobData=await Job.find({})
    res.json({success:true,jobData})
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Server Error" });
  }
}
const applyJobs=async(req,res)=>{
try {
  const {jobId,name,email,phone,resumeUrl,jobData}=req.body
  if(!name || !email ||!phone){
    return res.json({success:false,message:'Fill all the required fields'})
  }
 
  const applyData={
name,email,phone,jobData,jobId,resumeUrl
  }
  const apply=await Candidate.create(applyData)
  const savedApply=await apply.save()
  res.json({success:true,message:'Successfuly applied',savedApply})
} catch (error) {
  console.error(error);
  res.json({ success: false, message: "Server Error" });
}
}

module.exports = { createJob,getAllJobs,applyJobs };
