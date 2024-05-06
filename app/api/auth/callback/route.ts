import { NextRequest, NextResponse } from 'next/server';

import fetch from 'node-fetch';

interface TokenData {
  access_token: string;

  refresh_token: string;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const code = req.nextUrl.searchParams.get('code');

  console.log('Received OAuth callback request', 'Code:', code);

  if (!code) {
    // Correctly return a 400 status with JSON response

    return new NextResponse(JSON.stringify({ error: 'No code provided' }), {
      status: 400,

      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const params = new URLSearchParams();

    params.append('code', code);

    params.append('client_id', process.env.OAUTH_CLIENT_ID || '');

    params.append('client_secret', process.env.OAUTH_CLIENT_SECRET || '');

    params.append('redirect_uri', process.env.OAUTH_REDIRECT_URI || '');

    params.append('grant_type', 'authorization_code');

    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',

      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },

      body: params.toString(),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json();

      console.error('Error fetching tokens:', errorData);

      return new NextResponse(
        JSON.stringify({
          error: 'Error fetching tokens',

          details: errorData.error_description || 'Unknown error',
        }),

        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const tokenData: TokenData = await tokenResponse.json();

    return NextResponse.redirect(new URL('/details/thank-you', req.url));
  } catch (error) {
    console.error('Network error:', error);

    return new NextResponse(
      JSON.stringify({
        error: 'Internal server error',

        details: error instanceof Error ? error.message : 'Unknown error',
      }),

      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
