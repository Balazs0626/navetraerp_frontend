import axios from "axios";
import { DataProvider } from "@refinedev/core";
import { API_URL } from "../constants/url";

export const dataProvider: DataProvider = {
  getList: async ({ resource }) => {
    const res = await axios.get(`${API_URL}/${resource}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    return { data: res.data, total: res.data.length };
  },

  getOne: async ({ resource, id }) => {
    const res = await axios.get(`${API_URL}/${resource}/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    return { data: res.data };
  },

  create: async ({ resource, variables }) => {
    const res = await axios.post(`${API_URL}/${resource}`, variables, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    return { data: res.data };
  },

  update: async ({ resource, id, variables }) => {
    const res = await axios.put(`${API_URL}/${resource}/${id}`, variables, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    return { data: res.data };
  },

  deleteOne: async ({ resource, id }) => {
    const res = await axios.delete(`${API_URL}/${resource}/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    return { data: res.data };
  },

  getApiUrl: () => {
    return API_URL;
  },
};
