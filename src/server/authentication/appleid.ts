import { Request, Response } from "express";
import AppleAuth, { AppleAuthConfig } from "apple-auth";
import { decode } from "jsonwebtoken";
import { traceError, traceInfo } from "../tracing";

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

interface User {
  id: string;
  email?: string;
  name?: string;
}

export async function authenticate(req: Request, res: Response) {
  /**
   * Example request body:
   * {
   *   "authorization":{
   *     "code":"c870.0.szyt.Nhd_MQ",
   *     "id_token":"eyJra.eyJp.Ua"
   *   },
   *   "user":{
   *     "name":{
   *       "firstName":"Michael",
   *       "lastName":"Perry"
   *     },
   *     "email":"c4f5@privaterelay.appleid.com"
   *   }
   * }
   * 
   * Example JWT payload:
   * {
   *   "iss": "https://appleid.apple.com",
   *   "aud": "com.qedcode.sharedlist.auth",
   *   "exp": 1685763767,
   *   "iat": 1685677367,
   *   "sub": "000.362.03",
   *   "c_hash": "rPpi",
   *   "email": "c4f5@privaterelay.appleid.com",
   *   "email_verified": "true",
   *   "is_private_email": "true",
   *   "auth_time": 1685677367,
   *   "nonce_supported": true
   * }
   */
  try {
    traceInfo("Authenticating with Apple");
    traceInfo(`Authorization body: ${JSON.stringify(req.body)}`);
    const auth = new AppleAuth(
      loadAppleAuthConfig(),
      getPrivateKeyInPEMFormat(),
      "text"
    );

    //authenticate our code we recieved from apple login with our key file
    const response = await auth.accessToken(req.body.authorization.code);
    // decode our token
    const idToken = decode(response.id_token);
    if (!idToken)
      throw new Error("Cannot decode id_token");
    if (typeof idToken === "string")
      throw new Error("Cannot decode id_token: got a string instead of an object");

    const name = req.body.user?.name?.firstName && req.body.user?.name?.lastName
      ? `${req.body.user.name.firstName} ${req.body.user.name.lastName}`
      : undefined;
    const user: User = {
      id: idToken.sub ?? "",
      email: idToken.email || undefined,
      name: name,
    };

    traceInfo(`Authenticated ${user.id}`);
    res.json(user); // Respond with the user
  } catch (error) {
    traceError(error);
  }
}
