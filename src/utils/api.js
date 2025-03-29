import axios from "axios";

const API_BASE_URL = "https://reqres.in/api";

export const loginUser = (email, password) =>
  axios.post(`${API_BASE_URL}/login`, { email, password });

export const getUsers = (page = 1) =>
  axios.get(`${API_BASE_URL}/users?page=${page}`);

export const updateUser = (id, data) =>
  axios.put(`${API_BASE_URL}/users/${id}`, data);

export const deleteUser = (id) =>
  axios.delete(`${API_BASE_URL}/users/${id}`);
