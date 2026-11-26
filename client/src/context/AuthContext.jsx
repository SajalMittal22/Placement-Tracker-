import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("placement_user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email, role, company = null) => {
    const userData = {
      email,
      name: email.split("@")[0],
      role,
      company: role === "admin" ? company : null,
    };
    localStorage.setItem("placement_user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("placement_user");
    setUser(null);
  };

  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider value={{ user, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);