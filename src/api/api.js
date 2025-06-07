import { getToken, logout } from "../auth";

const BASE_URL = "http://localhost:7071";

async function request(url, options = {}) {
  const token = getToken();

  const headers = {
    ...options.headers,
    Authorization: token ? `Bearer ${token}` : undefined,
    "Content-Type": "application/json",
  };

  const response = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    logout();
    window.location.href = "/";
    return;
  }

  if (!response.ok) {
    throw response;
  }

  return response.json();
}

export function login(login, password) {
  return request("/auth", {
    method: "POST",
    body: JSON.stringify({ login, password }),
  });
}

export function fetchProfile() {
  return request("/private/me");
}

export function fetchNews() {
  return request("/private/news");
}

export function fetchNewsById(id) {
  return request(`/private/news/${id}`).catch(err => {
    if (err.status === 404) {
      const error = new Error('News not found');
      error.status = 404;
      throw error;
    }
    throw err;
  });
}
