import React, { useEffect, useState } from "react";
import { getPosts } from "../services/api";
import PostCard from "./PostCard";

const PostList = ({ course }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getPosts(course === "Todos" ? "" : course)
      .then(setPosts)
      .finally(() => setLoading(false));
  }, [course]);

  if (loading) return <p>Cargando publicaciones...</p>;
  if (posts.length === 0) return <p>No hay publicaciones disponibles.</p>;

  return (
    <div className="post-list">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
