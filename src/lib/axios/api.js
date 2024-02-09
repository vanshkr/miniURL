import axios from "axios";

const API = axios.create({ baseURL: import.meta.env.VITE_DOMAIN_URL });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("cloakCode")) {
    req.headers.Authorization = `Bearer ${JSON.parse(
      localStorage.getItem("cloakCode")
    )}`;
  }
  return req;
});
export const fetchUrlList = () => API.get(`/url/list`);
export const fetchUrl = (urlId) => API.get(`/url/${urlId}`);
export const createUrl = (newURLData) => API.post("/url", newURLData);
export const updateUrl = (urlId, updatedURLData) =>
  API.patch(`/url/${urlId}`, updatedURLData);
export const deleteUrl = (urlId) => API.delete(`/url/${urlId}`);
export const deleteAllUrl = () => API.delete(`/url`);

export const signIn = (userData) => API.post(`/user/signin`, userData);
export const signUp = (userData) => API.post(`/user/signup`, userData);
