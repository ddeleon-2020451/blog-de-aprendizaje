import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPostById } from "../services/api";
import CommentList from "../components/CommentList";
import AddComment from "../components/AddComment";

const PostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  const fetchPost = () => {
    getPostById(id).then((data) => setPost(data));
  };

  useEffect(() => {
    fetchPost();
    // eslint-disable-next-line
  }, [id]);

  if (!post) return <p>Cargando publicación...</p>;

  return (
    <div>
      {/* Botón para volver al inicio */}
      <button className="btn-back" onClick={() => navigate("/")}>
        ← Volver al inicio
      </button>

      <h2>{post.title}</h2>
      <p>
        <strong>Curso:</strong> {post.course} <br />
        <strong>Fecha:</strong> {new Date(post.date).toLocaleString()}
      </p>
      <p>{post.content}</p>
      <CommentList comments={post.comments || []} />
      <AddComment postId={id} onAdd={fetchPost} />
    </div>
  );
};

export default PostPage;
