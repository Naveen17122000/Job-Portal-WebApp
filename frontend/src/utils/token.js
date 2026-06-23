export function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(window.atob(base64));
    return {
      id: payload.user_id,
      username: payload.username || payload.sub || "User",
      role: payload.role || localStorage.getItem("lastRole") || "seeker"
    };
  } catch {
    return null;
  }
}
