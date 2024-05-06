import { NextRequest, NextResponse } from 'next/server';

import nodemailer from 'nodemailer';

export async function POST(req: NextRequest): Promise<NextResponse> {
  if (req.method !== 'POST') {
    return new NextResponse(JSON.stringify({ message: 'Method not allowed' }), {
      status: 405,

      headers: { 'Content-Type': 'application/json' },
    });
  } // Properly handling and parsing the request body from a ReadableStream

  const body = await req.text(); // This method reads the stream to completion and returns a string

  let formData;

  try {
    formData = JSON.parse(body);
  } catch (error) {
    console.error('Error parsing JSON:', error);

    return new NextResponse(
      JSON.stringify({
        message: 'Error parsing request body',

        error: error instanceof Error ? error.message : 'Unknown error',
      }),

      {
        status: 400,

        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  const { name, email, subject, message } = formData; // Create a reusable transporter object using the default SMTP transport

  const transporter = nodemailer.createTransport({
    service: 'gmail',

    auth: {
      type: 'OAuth2',

      user: process.env.OAUTH_USER_EMAIL,

      clientId: process.env.OAUTH_CLIENT_ID,

      clientSecret: process.env.OAUTH_CLIENT_SECRET,

      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
  }); // Send mail with defined transport object

  const mailOptions = {
    from: '"Contact Form" <hazelsproutco@gmail.com>',

    to: 'aaron.m.ponce@gmail.com, hazelsproutco@gmail.com',

    subject: subject || 'New Contact Form Submission',

    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);

    return new NextResponse(
      JSON.stringify({
        message: 'Email sent successfully',

        info: info.response,
      }),

      {
        status: 200,

        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error sending email:', error);

    return new NextResponse(
      JSON.stringify({
        message: 'Error sending email',

        error: error instanceof Error ? error.message : 'Unknown error',
      }),

      {
        status: 500,

        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
