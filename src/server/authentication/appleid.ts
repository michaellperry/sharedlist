import AppleAuth, { AppleAuthConfig } from "apple-auth";
import {} from "jsonwebtoken";

function loadAppleAuthConfig(): AppleAuthConfig {
  if (!process.env.AUTH_CLIENT_ID)
    throw new Error("Please set the AUTH_CLIENT_ID environment variable to your Apple client ID.");

  if (!process.env.AUTH_TEAM_ID)
    throw new Error("Please set the AUTH_TEAM_ID environment variable to your Apple team ID.");

  if (!process.env.AUTH_REDIRECT_URI)
    throw new Error("Please set the AUTH_REDIRECT_URI environment variable to your Apple redirect URI.");

  if (!process.env.AUTH_KEY_ID)
    throw new Error("Please set the AUTH_KEY_ID environment variable to your Apple key ID.");

  return {
    client_id: process.env.AUTH_CLIENT_ID,
    key_id: process.env.AUTH_KEY_ID,
    redirect_uri: process.env.AUTH_REDIRECT_URI,
    scope: "name email",
    team_id: process.env.AUTH_TEAM_ID,
  };
}


function getPrivateKeyInPEMFormat() {
  // Get the AUTH_KEY environment variable.
  // Split it into 64 character lines.
  // Join them back with newlines.
  // Prefix the text with "-----BEGIN PRIVATE KEY-----\n"
  // and append "-----END PRIVATE KEY-----".

  if (!process.env.AUTH_KEY)
    throw new Error("Please set the AUTH_KEY environment variable to the base-64 encoded contents of your p8 key file.");

  const privateKey = process.env.AUTH_KEY.replace(/(.{64})/g, "$1\n");
  return "-----BEGIN PRIVATE KEY-----\n" + privateKey + "\n-----END PRIVATE KEY-----";
}

let auth = new AppleAuth(
  loadAppleAuthConfig(),
  getPrivateKeyInPEMFormat(),
  "text"
);