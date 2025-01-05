import React from "react";
import "./Login.css";

const clientId =
  "823025003565-3qae5vsg1fua6jnut3bucnacbrlps44d.apps.googleusercontent.com";
const redirectUri = "http://localhost:3000/oauth2/callback";

function Login() {
  const handleLogin = () => {
    const scopes =
      "https://www.googleapis.com/auth/drive.file openid email profile";
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scopes}`;
    window.location.href = authUrl;
  };

  return (
    <div className="login">
      <h1>Login with Google</h1>
      <button
        onClick={handleLogin}
        style={{
          backgroundColor: "#4285F4",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "bold",
          marginTop: "20px",
        }}
      >
        Log in with Google
      </button>
    </div>
  );
}

export default Login;
