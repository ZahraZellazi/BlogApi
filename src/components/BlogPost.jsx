import React from 'react';
import './BlogPost.css';

function BlogPost({ title, author, time, image }) {
  return (
    <div className="blog-post-card">
      <img src={image} alt={title} className="blog-post-image" />
      <div className="blog-post-content">
        <h2 className="blog-post-title">{title}</h2>
        <p className="blog-post-meta">
          <span className="blog-post-author">{author}</span> • <span className="blog-post-time">{time}</span>
        </p>
      </div>
    </div>
  );
}

export default BlogPost;
