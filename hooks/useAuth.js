import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { useState, useEffect } from "react";

function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function loadUserFromCookies() {
      const token = Cookies.get("token");
      if (token) {
        const { username: user } = jwt.decode(token);
        if (user) setUser(user);
      }
      setLoading(false);
    }

    loadUserFromCookies();
  }, []);

  return {
    isAuthenticated: !!user,
    isLoading: loading,
  };
}

export default useAuth;
