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
        console.log("Hiba:" + e)
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
    });
  },

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
  forgotPassword: async ({ email }) => {
    try {
      const response = await fetch(`${API_URL}/Auth/forgot-password`, {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        return {
          success: true,
        };
      }
      
      return {
        success: false,
        error: {
          message: "Hiba történt a kérés küldésekor.",
          name: "Forgot Password Error",
        },
      };
    } catch (error) {
      return {
        success: false,
        error: {
          message: "A szerver nem elérhető.",
          name: "Network Error",
        },
      };
    }
  },

  updatePassword: async ({ email, token, password }) => {
    try {
      const response = await fetch(`${API_URL}/Auth/reset-password`, {
          method: "POST",
          body: JSON.stringify({ 
              email, 
              token, 
              newPassword: password
          }),
          headers: {
              "Content-Type": "application/json",
          },
      });

      if (response.ok) {
          return {
              success: true,
              redirectTo: "/login",
          };
      }

      return {
          success: false,
          error: {
              message: "Érvénytelen vagy lejárt token.",
              name: "Reset Error",
          },
      };
    } catch (error) {
      return {
          success: false,
          error: {
              message: "Hiba a jelszó frissítésekor.",
              name: "Network Error",
          },
      };
    }
  },
};