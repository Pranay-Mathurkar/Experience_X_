import nodemailer from "nodemailer";

export const sendNewExperienceEmail = async (email, companyName) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },

      // ✅ VERY IMPORTANT FOR RENDER (prevents infinite hang)
     connectionTimeout: 3000,
greetingTimeout: 3000,
socketTimeout: 3000,

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

    console.log("✅ Email sent to:", email);
  } catch (error) {
    // ✅ This prevents API from crashing
    console.error("❌ Email send failed:", error.message);
  }
};
