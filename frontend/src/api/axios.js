import axios from "axios";

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL + "/api" });

// attach token
api.interceptors.request.use((config) => {
  const raw = localStorage.getItem("auth");
  if (raw) {
    const { token } = JSON.parse(raw);
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// auto-logout on 401
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      localStorage.removeItem("auth");
      if (window.location.pathname !== "/login")
        window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default api;
