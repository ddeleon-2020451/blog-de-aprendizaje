import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => (
  <div className="post-card">
    <h3>
      <Link to={`/post/${post._id}`}>{post.title}</Link>
    </h3>
    <p>{post.content.slice(0, 100)}...</p>
    <div className="post-info">
      <span>{post.course}</span>
      <span>{new Date(post.date).toLocaleString()}</span>
    </div>
  </div>
);

export default PostCard;
