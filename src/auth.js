export function saveToken(token) {
  localStorage.setItem("token", token);
}

export function getToken() {
  return localStorage.getItem("token");
}

export function saveProfile(profile) {
  localStorage.setItem("profile", JSON.stringify(profile));
}

export function getProfile() {
  const raw = localStorage.getItem("profile");
  return raw ? JSON.parse(raw) : null;
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("profile");
}
