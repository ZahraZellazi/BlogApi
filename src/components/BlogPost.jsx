import React from 'react';
import './BlogPost.css';

function BlogPost({ title, author, time, image, onUpdate, onDelete }) {
  return (
    <div className="blog-post-card">
      <img alt={title} className="blog-post-image" />
      <div className="blog-post-content">
        <h2 className="blog-post-title">{title}</h2>
        <p className="blog-post-meta">
          <span className="blog-post-author">{author}</span> • <span className="blog-post-time">{time}</span>
        </p>
        <div className="blog-post-actions">
          <button className="btn-update" onClick={onUpdate}>Update</button>
          <button className="btn-delete" onClick={onDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default BlogPost;
