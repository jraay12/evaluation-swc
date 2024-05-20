import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const JwtDecoder = () => {
  const [decodedToken, setDecodedToken] = useState(null);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const token = Cookies.get('token');

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setDecodedToken(decoded);
        
        const isTokenExpired = decoded.exp < Date.now() / 1000;
        setIsTokenValid(!isTokenExpired);
      } catch (error) {
        console.error("Error decoding token:", error);
        setIsTokenValid(false);
        setDecodedToken(null); // Reset decoded token if error occurs
      }
    } else {
      setIsTokenValid(false); // No token, so it's invalid
      setDecodedToken(null); // Reset decoded token
    }
  }, [token]);

  return { decodedToken, isTokenValid };
};

export default JwtDecoder;
