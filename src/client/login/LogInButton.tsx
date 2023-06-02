import React from "react"
import AppleLogin from "react-apple-login"

const CLIENT_ID = "com.qedcode.sharedlist.auth";
const REDIRECT_URI = "https://sharedlist-mlp.azurewebsites.net/auth/apple";

export const LogInButton = ({ }) => {

  return (
    <AppleLogin
      clientId={CLIENT_ID}
      redirectURI={REDIRECT_URI}
      scope="email name"
      responseMode="form_post"
      render={({ onClick }) => (
        <button
          onClick={onClick}
        >
          Sign-in with Apple
        </button>
      )}
    />);
}
