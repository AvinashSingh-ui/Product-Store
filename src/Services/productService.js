import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "",
});

export const getProducts = (search, signal) => {
  return api.get("/api/products", {
    params: { search },
    signal,
  });
};

export const createProduct = (product) => {
  return api.post("/api/products", product);
};

export const updateProduct = (id, product) => {
  return api.put(`/api/products/${id}`, product);
};

export const deleteProduct = (id) => {
  return api.delete(`/api/products/${id}`);
};