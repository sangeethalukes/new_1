const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Email route
app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Configure the email transport
    const transporter = nodemailer.createTransport({
      service: "gmail", // Use your email provider (e.g., Gmail, SendGrid, Outlook)
      auth: {
        user: "sangeethaluke@gmail.com", // Replace with your email
        pass: "Slm250803", // Replace with your email password or app password
      },
    });

    // Email options
    const mailOptions = {
      from: email,
      to: "recipient-email@gmail.com", // Replace with the email where you want to receive messages
      subject: `Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send email." });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});