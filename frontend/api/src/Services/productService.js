import axios from "axios";

export const getProducts = (search, signal) => {
  return axios.get("/api/products", {
    params: { search },
    signal,
  });
};

export const createProduct = (product) => {
  return axios.post("/api/products", product);
};

export const updateProduct=(id,product)=>{
  return axios.put(`/api/products/${id}`,product)
}
export const deleteProduct=(id)=>{
  return axios.delete(`/api/products/${id}`);
}
