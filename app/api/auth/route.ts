import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, email, subject, message } = req.body;

    // Create a reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.OAUTH_USER_EMAIL,
        clientId: process.env.OAUTH_CLIENT_ID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
      },
    });

    // Send mail with defined transport object
    const mailOptions = {
      from: '"Contact Form" <hazelsproutco@gmail.com>',
      to: "aaron.m.ponce@gmail.com, hazelsproutco@gmail.com",
      subject: subject || "New Contact Form Submission",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      res
        .status(200)
        .json({ message: "Email sent successfully", info: info.response });
    } catch (error) {
      console.error("Error sending email:", error);
      if (error instanceof Error) {
        res
          .status(500)
          .json({ message: "Error sending email", error: error.message });
      } else {
        res
          .status(500)
          .json({ message: "Error sending email", error: "Unknown error" });
      }
    }
  }
}
