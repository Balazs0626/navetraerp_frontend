import axios from "axios";
import { API_URL } from "../constants/url";
import { AuthProvider } from "@refinedev/core";

export const authProvider : AuthProvider = {
  login: async ({ username, password }) => {
    try {
      const res = await axios.post(`${API_URL}/Auth/login`, { username, password });
      localStorage.setItem("token", res.data.token);
      return { success: true, redirectTo: "/" };
    } catch {
      return { success: false, error: { message: "Login failed", name: "Invalid credentials" } };
    }
  },
  logout: async () => {
    localStorage.removeItem("token");
    return { success: true, redirectTo: "/login" };
  },
  check: async () => {
    return localStorage.getItem("token")
      ? { authenticated: true }
      : { authenticated: false, redirectTo: "/login" };
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
    const token = localStorage.getItem("token");
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
    const token = localStorage.getItem("token");
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