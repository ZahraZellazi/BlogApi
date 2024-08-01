import React, { useEffect, useState } from 'react';
import BlogPost from './BlogPost';
import UpdateModal from './UpdateModal';
import { FaPlus } from 'react-icons/fa'; 
import './BlogList.css';
import { listAllBlogs, deleteBlogApi, updateBlogApi, addBlogApi } from '../api services/api';
import { toast } from 'react-toastify';

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('');
  const [isVisible, setIsVisible] = useState(true); // State for visibility

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const threshold = 500; // Adjust this threshold as needed

      if (scrollTop > threshold) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
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

  if (loading) {
    return <div className="loading-message">Loading blogs...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="blog-list">
      <button className="add-blog-button" onClick={() => openModal(null, 'add')}>
        <FaPlus size={24} />
        Add Blog
      </button>
      <div className={`blog-list-content ${isVisible ? 'visible' : 'hidden'}`}>
        {blogs.map((post, index) => (
          <BlogPost
            key={post.id}
            title={post.title}
            author={`User ${post.userId}`}
            time={`Posted ${index + 1}h ago`}
            image={`https://via.placeholder.com/300?text=Post+${post.id}`}
            onUpdate={() => openModal(post, 'update')}
            onDelete={() => handleDelete(post.id)}
          />
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
    </div>
  );
}

export default BlogList;
