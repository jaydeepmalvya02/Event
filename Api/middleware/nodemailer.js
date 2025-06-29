const nodemailer = require("nodemailer");

const sendMail = async (req, res) => {
  const { name, subject, message, emails } = req.body; // 'emails' is an array like ["a@gmail.com", "b@gmail.com"]

  try {
    const formattedMessage = message.replace(/\n/g, "<br/>");
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "", // Optional: leave empty if only using bcc
      bcc: emails.join(","), // ✅ Convert array to comma-separated string
      subject: `📩 New Message: ${subject}`,
 
  

html: `
  <h3>You've got a new message from ExpertOnBoard</h3>

  <p>${formattedMessage}</p>
`,


      html: `
        <h3>You've got a new message from ExpertOnBoard</h3>
        <p> ${subject}</p>
        <p><br>${message}</p>
      `,

    };
    

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Mail error:", error);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
};

module.exports = sendMail;
