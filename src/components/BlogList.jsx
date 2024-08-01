import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa'; 
import './BlogList.css'; // Ensure the new styles are in this CSS file
import { listAllBlogs, deleteBlogApi, updateBlogApi, addBlogApi } from '../api services/api';
import { toast } from 'react-toastify';
import UpdateModal from './UpdateModal';
function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('');
  const [selectedBlog, setSelectedBlog] = useState(null);

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

  const openModal = (blog = null, mode = 'update') => {
    setSelectedBlog(blog);
    setModalMode(mode);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedBlog(null);
    setModalMode('');
    setIsModalOpen(false);
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
        closeModal();
        toast.success('Blog updated successfully!');
      })
      .catch(error => {
        console.error('Error updating blog:', error);
        setError('Failed to update blog');
        toast.error('Failed to update blog');
      });
  };

  const handleAdd = (newBlog) => {
    addBlogApi(newBlog)
      .then(added => {
        setBlogs([added, ...blogs]);
        closeModal();
        toast.success('Blog added successfully!');
      })
      .catch(error => {
        console.error('Error adding blog:', error);
        setError('Failed to add blog');
        toast.error('Failed to add blog');
      });
  };

  if (loading) {
    return <div className="loading-message">Loading blogs...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div>
      <div className="blog-grid">
        {blogs.map((post) => (
          <div className="blog-card" key={post.id}>
            <img src={`https://via.placeholder.com/300?text=Post+${post.id}`} alt={`Post ${post.id}`} />
            <div className="blog-content">
              <h3>{post.title}</h3>
              <p>{post.body}</p>
              <div className="blog-meta">
                <span className="blog-author">User {post.userId}</span>
                <span className="blog-time">Posted 1h ago</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <UpdateModal
          blog={selectedBlog}
          mode={modalMode}
          onClose={closeModal}
          onSave={modalMode === 'update' ? handleUpdate : handleAdd}
        />
      )}
      <button className="add-blog-button" onClick={() => openModal(null, 'add')}>
        <FaPlus size={20} />
      </button>
    </div>
  );
}

export default BlogList;
