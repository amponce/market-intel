import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

interface TokenData {
  access_token: string;
  refresh_token: string;
  // Add other properties from your token response if needed
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const code = req.query.code as string;
  if (!code) {
    return res.status(400).json({ error: "No code provided" });
  }

  try {
    // Exchange the authorization code for tokens

    const params = new URLSearchParams();
    params.append("code", code);
    params.append("client_id", process.env.OAUTH_CLIENT_ID || "");
    params.append("client_secret", process.env.OAUTH_CLIENT_SECRET || "");
    params.append("redirect_uri", process.env.OAUTH_REDIRECT_URI || "");
    params.append("grant_type", "authorization_code");

    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    if (!tokenResponse.ok) {
      const errorData = (await tokenResponse.json()) as {
        error_description?: string;
      };
      console.error("Error fetching tokens:", errorData);
      return res.status(500).json({
        error: "Error fetching tokens",
        details: errorData.error_description || "Unknown error",
      });
    }

    const tokenData = (await tokenResponse.json()) as TokenData;

    // Redirect to a user-friendly page after a successful token exchange
    res.redirect("/details/thank-you");
  } catch (error) {
    // Handle any network errors
    console.error("Network error:", error);
    res.status(500).json({
      error: "Internal server error",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
