import React, { useEffect, useState } from 'react';
import BlogPost from './BlogPost';
import UpdateModal from './UpdateModal';
import './BlogList.css';
import { listAllBlogs, deleteBlogApi, updateBlogApi } from '../api services/api';
import { toast } from 'react-toastify';

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = () => {
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
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      deleteBlogApi(id)
        .then(() => {
          setBlogs(blogs.filter(blog => blog.id !== id));
          toast.success('Blog deleted successfully!');
        })
        .catch(error => {
          console.error('Error deleting blog:', error);
          setError('Failed to delete blog');
          toast.error('Failed to delete blog');
        });
    }
  };

  const handleUpdate = (updatedBlog) => {
    updateBlogApi(updatedBlog.id, updatedBlog)
      .then(updated => {
        setBlogs(blogs.map(blog => (blog.id === updated.id ? updated : blog)));
        closeModal(); // Close modal after update
        toast.success('Blog updated successfully!');
      })
      .catch(error => {
        console.error('Error updating blog:', error);
        setError('Failed to update blog');
        toast.error('Failed to update blog');
      });
  };

  const openModal = (blog) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedBlog(null);
    setIsModalOpen(false);
  };

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
          onUpdate={() => openModal(post)}
          onDelete={() => handleDelete(post.id)}
        />
      ))}
      {isModalOpen && selectedBlog && (
        <UpdateModal
          blog={selectedBlog}
          onClose={closeModal}
          onSave={handleUpdate}
        />
      )}
    </div>
  );
}

export default BlogList;
