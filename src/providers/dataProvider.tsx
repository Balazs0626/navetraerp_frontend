import axios from "axios";
import { DataProvider } from "@refinedev/core";
import { API_URL } from "../constants/url";

export const dataProvider: DataProvider = {
  getList: async ({ resource, filters, meta }) => {

    const queryObj: Record<string, string> = {};

    filters?.forEach(filter => {
        if ('field' in filter && 'value' in filter) {
            queryObj[filter.field] = String(filter.value);
        }
    });

    console.log(filters);

    const query = new URLSearchParams(queryObj).toString();

    const url = meta?.customUrl ? `${API_URL}/${meta.customUrl}${query ? '?' + query : ''}` : `${API_URL}/${resource}${query ? '?' + query : ''}`
    const res = await axios.get(url, {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
    });
    return { data: res.data, total: res.data.length };
  },

  getOne: async ({ resource, id }) => {
    const res = await axios.get(`${API_URL}/${resource}/${id}`, {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
    });
    return { data: res.data };
  },

  create: async ({ resource, variables }) => {
    const res = await axios.post(`${API_URL}/${resource}`, variables, {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
    });
    return { data: res.data };
  },

  update: async ({ resource, id, variables }) => {
    const res = await axios.put(`${API_URL}/${resource}/${id}`, variables, {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
    });
    return { data: res.data };
  },

  deleteOne: async ({ resource, id }) => {
    const res = await axios.delete(`${API_URL}/${resource}/${id}`, {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
    });
    return { data: res.data };
  },
  getApiUrl: () => {
    return API_URL;
  },
};
