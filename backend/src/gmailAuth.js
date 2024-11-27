import { google } from 'googleapis';
import dotenv from "dotenv";

dotenv.config();

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

export function getGoogleAuthURL() {
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/gmail.readonly',
      'https://www.googleapis.com/auth/gmail.send',
      'https://www.googleapis.com/auth/gmail.modify',
      'https://www.googleapis.com/auth/gmail.labels'
    ],
  });
}

export async function getGoogleTokens(code) {
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  return tokens;
}

export async function revokeGoogleTokens() {
  try {
    await oauth2Client.revokeCredentials();
    console.log("Tokens revoked successfully.");
  } catch (error) {
    console.error("Error revoking tokens:", error);
  }
}

export const gmail = google.gmail({ version: 'v1', auth: oauth2Client });