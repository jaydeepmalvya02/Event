const mongoose=require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  companyName: String,
  division: String,
  designation: String,
  state: String,
  city: String,
  mobile: {
    type: String,
    required: true,

  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, "Please enter a valid email address"],
  },
},{timestamps:true});
module.exports=mongoose.model('Users',userSchema)