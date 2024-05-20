import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import UnProtectedRoutes from "./navigations/UnProtectedRoutes";
import ProtectedRoutes from "./navigations/ProtectedRoutes";
import JwtDecoder from "./utils/JwtDecoder";

export default function App() {
  const token = JwtDecoder().isTokenValid;
  const userData = JwtDecoder().decodedToken;
  const role = userData ? userData?.role : null;
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    if (token) {
      setIsloading(false);
    } else {
      setIsloading(false);
    }
  }, [token]);
  return (
    <>
      {isLoading ? undefined : (
        <BrowserRouter>
          {token ? <ProtectedRoutes roles={role}/> : <UnProtectedRoutes />}
        </BrowserRouter>
      )}
    </>
  );
}
