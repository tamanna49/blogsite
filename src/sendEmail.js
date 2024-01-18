import "dotenv/config";
import { createTransport } from "nodemailer";

const transporter = createTransport({
  service: "gmail",
  auth: {
    user: "canow.inn@gmail.com",
    pass: process.env.EMAILCODE,
  },
});

export default function contactMail(userName, userEmailAddress, userMessage) {
  const mailOptions = {
    from: "canow.inn@gmail.com",
    to: "tamanna2252.be21@chitkara.edu.in",
    subject: "Blazing Blog Contact Form",
    text:
      "Name: " +
      userName +
      "\n" +
      "Email: " +
      userEmailAddress +
      "\n" +
      "Messege: " +
      "\n" +
      userMessage,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}
