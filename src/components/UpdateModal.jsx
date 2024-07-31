import React, { useState, useEffect } from 'react';
import './UpdateModal.css';

function UpdateModal({ blog, mode, onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    if (blog) {
      setTitle(blog.title || '');
      setBody(blog.body || '');
    }
  }, [blog]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedBlog = { ...blog, title, body };
    onSave(updatedBlog);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{mode === 'add' ? 'Add New Blog' : 'Update Blog'}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
          <label>
            Content:
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            ></textarea>
          </label>
          <button type="submit">{mode === 'add' ? 'Add Blog' : 'Update Blog'}</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateModal;
