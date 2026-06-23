import { createContext, useCallback, useContext, useMemo, useState } from "react";

import { api } from "../services/api";
import * as authService from "../services/auth";
import { parseJwt } from "../utils/token";

const AuthContext = createContext(null);

function getInitialUser() {
  const token = localStorage.getItem("accessToken");
  return token ? parseJwt(token) : null;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getInitialUser);

  const signIn = useCallback(async (username, password) => {
    const tokens = await authService.login(username, password);
    const tokenUser = parseJwt(tokens.access);
    setUser(tokenUser);
    return tokenUser;
  }, []);

  const signUp = useCallback(async (payload) => authService.register(payload), []);

  const signOut = useCallback(() => {
    authService.logout();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      signIn,
      signUp,
      signOut,
      api
    }),
    [signIn, signOut, signUp, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
