import { api } from "./api";

export async function login(username, password) {
  const { data } = await api.post("/auth/token/", { username, password });
  localStorage.setItem("accessToken", data.access);
  localStorage.setItem("refreshToken", data.refresh);
  return data;
}

export async function register(payload) {
  const { data } = await api.post("/auth/register/", payload);
  return data.data;
}

export function logout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
}
