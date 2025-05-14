const express=require('express')
const User=require('../model/userModel.js')
 const register=async(req,res)=>{
  try {
    const {
      name,
      companyName,
      division,
      designation,
      state,
      city,
      mobile,
      email,
    } = req.body;

    if (!name || !companyName || !mobile || !email) {
      return res.status(400).json({ error: "Required fields missing" });
    }

const registration = await User.create({
  name,
  companyName,
  division,
  designation,
  state,
  city,
  mobile,
  email,
});
res
.status(201)
.json({ message: "Registration successful", data: registration });
}catch (error) {
console.error("Registration error:", error.message);
res.status(500).json({ error: "Server error" });
}

}
module.exports=register