import { NextRequest, NextResponse } from "next/server";
import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY as string);

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { name, email, subject, message, honeypot } = await req.json();

    // Basic validation
    if (honeypot) {
      return NextResponse.json({ message: "Bot detected" }, { status: 400 });
    }
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Create the email content
    const msg = {
      to: "support@rfpes.com",
      from: "support@rfpes.com",
      bcc: "amponce@rfpes.com, sdookie@rfpes.com, rwashington@rfpes.com, rponce@rfpes.com",
      subject: subject,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    // Send the email
    await sendgrid.send(msg);

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error handling POST request:", err);
    return NextResponse.json(
      { message: "Error sending email" },
      { status: 500 }
    );
  }
}
