import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { useContext, createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function loadUserFromCookies() {
      const token = Cookies.get("token");
      console.log(token);
      if (token) {
        console.log("Got a token in the cookies, let's see if it is valid");

        const { username: user } = jwt.decode(token);
        if (user) setUser(user);
      }
      setLoading(false);
    }

    loadUserFromCookies();
  }, []);

  // const login = async (email, password) => {
  //     const { data: token } = await api.post('auth/login', { email, password })
  //     if (token) {
  //         console.log("Got token")
  //         Cookies.set('token', token, { expires: 60 })
  //         api.defaults.headers.Authorization = `Bearer ${token.token}`
  //         const { data: user } = await api.get('users/me')
  //         setUser(user)
  //         console.log("Got user", user)
  //     }
  // }

  // const logout = (email, password) => {
  //     Cookies.remove('token')
  //     setUser(null)
  //     window.location.pathname = '/login'
  // }

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  //   const context = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function loadUserFromCookies() {
      const token = Cookies.get("token");
      console.log(token);
      if (token) {
        console.log("Got a token in the cookies, let's see if it is valid");

        const { username: user } = jwt.decode(token);
        if (user) setUser(user);
      }
      setLoading(false);
    }

    loadUserFromCookies();
  }, []);

  return { isAuthenticated: !!user, user, loading };
}
