import React from "react";

const CommentList = ({ comments }) => (
  <div className="comment-list">
    <h4>Comentarios</h4>
    {comments.length === 0 && <p>No hay comentarios.</p>}
    {comments
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .map((comment) => (
        <div className="comment" key={comment._id || Math.random()}>
          <strong>{comment.author}:</strong> {comment.content}
          <span className="comment-date">
            {new Date(comment.date).toLocaleString()}
          </span>
        </div>
      ))}
  </div>
);

export default CommentList;
