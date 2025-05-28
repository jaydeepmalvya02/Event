const Contact = require("../model/contactModel");

const saveContact = async (req, res) => {
  try {
    const { firstName, lastName, company, email, phone, message } = req.body;

    // Check for required fields
    if (!firstName || !email || !message) {
      return res
        .status(400)
        .json({ message: "First name, email, and message are required." });
    }

    // Create and save new contact
    const newContact = await Contact.create({
      firstName,
      lastName,
      company,
      email,
      phone,
      message,
    });

    res
      .status(201)
      .json({ message: "Your contact has been successfully saved." });
  } catch (error) {
    console.error("Contact Save Error:", error.message);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

const showContact=async(req,res)=>{
  try {
    const result =await Contact.find()
    res.status(200).json(result)
  } catch (error) {
    console.error(error);
    res.status(500).json({message:'Server Error'})
    
  }
}

module.exports = { saveContact ,showContact};
