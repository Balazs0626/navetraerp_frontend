import axios from "axios";
import { API_URL } from "../constants/url";
import { AuthProvider } from "@refinedev/core";

export const authProvider : AuthProvider = {
  login: async ({ username, password }) => {
    try {
      const res = await axios.post(`${API_URL}/Auth/login`, { username, password });

      sessionStorage.setItem("token", res.data.token);
      return { success: true, redirectTo: "/" };
    } catch {
      return { success: false, error: { message: "Login failed", name: "Invalid credentials" } };
    }
  },
  logout: async () => {
    const token = sessionStorage.getItem("token");

    if (token) {
        try {
            const meRes = await axios.get(`${API_URL}/Auth/me`, {
                  headers: { Authorization: `Bearer ${token}` }
            });

            const userId = meRes.data.id;

            console.log("User ID to set inactive:", userId);

            const putRes = await axios.put(`${API_URL}/Auth/active/?id=${userId}&active=false`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log("PUT /Auth/active response:", putRes.data);
        } catch (e) {

        }
    }
    sessionStorage.removeItem("token");
    window.location.href = "/login";
    return { success: true };
  },
  check: async () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      return {
        authenticated: true,
      };
    }
    return Promise.reject({
      authenticated: false,
      redirectTo: "/login",
      error: new Error("Not authenticated"),
    });
  },
  /* getPermissions: async () => {
      const token = localStorage.getItem("token");
      if (!token) return null;

      try {
          const res = await axios.get(`${API_URL}/Auth/me`, {
              headers: { Authorization: `Bearer ${token}` },
          });
          return res.data.permissions;
      } catch (e) {
          return null;
      }
  }, */

  getPermissions: async (): Promise<string[] | null> => {
    const token = sessionStorage.getItem("token");
    
    if (!token) return null;

    try {
        const res = await axios.get(`${API_URL}/Auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        return res.data.permissions as string[];
    } catch {
        return null;
    }
  },
  
  getIdentity: async () => {
    const token = sessionStorage.getItem("token");
    if (!token) return null;

    try {
      const res = await axios.get(`${API_URL}/Auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return {
        id: res.data.id,
        name: res.data.username,
      };
    } catch (error) {
      console.error("getIdentity error:", error);
      return null;
    }
  },
  onError: async (error) => {
    console.error("Auth error:", error);
    return { error };
  },
};