import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3616/v1";

// Obtener todas las publicaciones (opcionalmente filtradas)
export const getPosts = async (curso = "") => {
  const res = await axios.get(`${API_URL}/post`, {
    params: curso ? { course: curso } : {},
  });
  return res.data.posts;
};

// Obtener publicación por id
export const getPostById = async (id) => {
  const res = await axios.get(`${API_URL}/post/${id}`);
  return res.data.post;
};

// Agregar comentario a publicación
export const addComment = async (postId, { author, content }) => {
  const res = await axios.post(`${API_URL}/comment/${postId}`, {
    author,
    content,
  });
  return res.data;
};
