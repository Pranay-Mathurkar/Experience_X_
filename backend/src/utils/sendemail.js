import nodemailer from "nodemailer";

export const sendNewExperienceEmail = async (email, companyName) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: `"Experience-X" <${process.env.EMAIL}>`,
    to: email,
    subject: `New Interview Experience Added for ${companyName}`,
    html: `
      <h2>New Experience Alert!</h2>
      <p>A new interview experience has been added for <b>${companyName}</b>.</p>
      <p>Check it out now on Experience-X.</p>
    `,
  });
};
