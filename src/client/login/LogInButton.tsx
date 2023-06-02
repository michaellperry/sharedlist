import React from "react"
import AppleLogin from 'react-apple-login'

const CLIENT_ID = "com.qedcode.sharedlist.auth";
const REDIRECT_URI = "https://sharedlist-mlp.azurewebsites.net/auth/apple";

export const LogInButton = ({ }) => {
  const [ authResponse, setAuthResponse ] = React.useState(null);
  const acceptAppleResponse = (response: any) => {
    if (!response.error) {
      fetch("/auth/apple", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(response)
      })
        .then(res => res.json())
        .then(res => setAuthResponse( res ))
        .catch(err => console.log(err));
    }
    else {
      console.log(response.error);
    }
  };

  return (
    <>
    <AppleLogin
      clientId={CLIENT_ID}
      redirectURI={REDIRECT_URI}
      usePopup={true}
      callback={acceptAppleResponse} // Catch the response
      scope="email name"
      responseMode="query"
      render={renderProps => (  //Custom Apple Sign in Button
        <button
          onClick={renderProps.onClick}
          style={{
            backgroundColor: "white",
            padding: 10,
            border: "1px solid black",
            fontFamily: "none",
            lineHeight: "25px",
            fontSize: "25px"
          }}
        >
          <i className="fa-brands fa-apple px-2 "></i>
          Continue with Apple
        </button>
      )}
    />
    {authResponse && <p>{JSON.stringify(authResponse)}</p>}
    </>);
}
