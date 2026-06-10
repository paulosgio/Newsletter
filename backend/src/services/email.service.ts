import nodemailer from "nodemailer";
import "dotenv/config"

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_ADMIN,
    pass: process.env.PASS_KEY,
  }
});

export async function sendEmail(to: string, subject: string, content: string) {

    await transporter.sendMail({
        from: process.env.EMAIL_ADMIN,
        to,
        subject,
        html: content
    })
}

