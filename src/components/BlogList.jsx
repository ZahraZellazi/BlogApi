import React, { useEffect, useState } from 'react';
import BlogPost from './BlogPost';
import './BlogList.css';
import { listAllBlogs } from '../services/api';


function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listAllBlogs()
      .then(data => {
        setBlogs(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching all blogs:', error);
        setError('Failed to load blogs');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loading-message">Loading blogs...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="blog-list">
      {blogs.map((post, index) => (
        <BlogPost
          key={post.id}
          title={post.title}
          author={`User ${post.userId}`}
          time={`Posted ${index + 1}h ago`}
          image={`https://via.placeholder.com/300?text=Post+${post.id}`}
        />
      ))}
    </div>
  );
}
export default BlogList