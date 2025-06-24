const mongoose=require('mongoose')
const jobSchema=new mongoose.Schema({
  title:{
    type:String,
    required:true,
  },
  company:{
    type:String,
    required:true,
  },
  type:{
    type:String,
    required:true,
  },
  location:{
    type:String,
    required:true,
  },
  experience:{
    type:Number,
    default:0,
    
  },
 description:{
    type:String,
    maxLength:500,
    required:true,
  },
},{timestamps:true})

module.exports=mongoose.model('Jobs',jobSchema)