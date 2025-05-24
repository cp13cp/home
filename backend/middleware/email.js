import nodemailer from "nodemailer";

const sendEmail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // or use your SMTP provider
    auth: {
      user: "singhchandrapal13@gmail.com", // your email
      pass: "rvpdkewzzgjucyaf", // App password (not your actual Gmail password)
    },
  });

  const mailOptions = {
    from: "singhchandrapal13@gmail.com",
    to,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
