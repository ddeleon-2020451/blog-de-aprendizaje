import React, { useState } from "react";
import { addComment } from "../services/api";

const AddComment = ({ postId, onAdd }) => {
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!author.trim() || !content.trim()) {
      setMsg("Completa todos los campos.");
      return;
    }
    setLoading(true);
    try {
      await addComment(postId, { author, content });
      setAuthor("");
      setContent("");
      setMsg("¡Comentario enviado!");
      onAdd();
    } catch (err) {
      setMsg("Error al enviar comentario.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="add-comment" onSubmit={handleSubmit}>
      <h4>Agregar Comentario</h4>
      <input
        type="text"
        placeholder="Tu nombre"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        maxLength={30}
        required
      />
      <textarea
        placeholder="Tu comentario"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        maxLength={300}
        required
      ></textarea>
      <button type="submit" disabled={loading}>
        {loading ? "Enviando..." : "Comentar"}
      </button>
      {msg && <p>{msg}</p>}
    </form>
  );
};

export default AddComment;
