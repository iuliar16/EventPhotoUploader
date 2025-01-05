import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const clientId = "YOUR_GOOGLE_CLIENT_ID";
const clientSecret = "YOUR_GOOGLE_CLIENT_SECRET";
const redirectUri = "http://localhost:3000/oauth2/callback";

function OAuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      axios
        .post("https://oauth2.googleapis.com/token", {
          code: code,
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: redirectUri,
          grant_type: "authorization_code",
        })
        .then((response) => {
          const accessToken = response.data.access_token;
          console.log("Access Token:", accessToken);

          localStorage.setItem("accessToken", accessToken);

          const idToken = response.data.id_token;
          console.log(idToken);
          if (idToken) {
            const base64Payload = idToken.split(".")[1];
            const payload = atob(base64Payload);
            const userInfo = JSON.parse(payload);

            const userData = {
              email: userInfo.email,
              name: userInfo.name,
            };

            localStorage.setItem("userInfo", JSON.stringify(userInfo));
            localStorage.setItem("user", JSON.stringify(userData));
            localStorage.setItem("idToken", idToken);

            axios.post("http://localhost:8080/api/auth", {
              token: accessToken,
              name: userData.name,
              email: userData.email,
            });

            console.log("User data successfully saved to the backend.");
          }

          navigate("/");
        })
        .catch((error) => {
          console.error("Error exchanging authorization code:", error);
        });
    } else {
      console.error("Authorization code not found in URL");
    }
  }, [navigate]);

  return <div>Processing login...</div>;
}

export default OAuthCallback;
