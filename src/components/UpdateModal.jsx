import React, { useState, useEffect } from 'react';
import './UpdateModal.css';

function UpdateModal({ blog, mode, onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState({ title: '', body: '' });

  useEffect(() => {
    if (blog) {
      setTitle(blog.title || '');
      setBody(blog.body || '');
    }
  }, [blog]);

  const validate = () => {
    let isValid = true;
    const newErrors = { title: '', body: '' };

    if (!title.trim()) {
      newErrors.title = 'Title is required.';
      isValid = false;
    } else if (title.length < 5) {
      newErrors.title = 'Title must be at least 5 characters long.';
      isValid = false;
    }

    if (!body.trim()) {
      newErrors.body = 'Content is required.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };
  const handleInputChange = (e, field) => {
    const { value } = e.target;
    if (field === 'title') {
      setTitle(value);
    } else if (field === 'body') {
      setBody(value);
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: ''
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const updatedBlog = { ...blog, title, body };
      onSave(updatedBlog);
    }
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
              style={{ borderColor: errors.title ? 'red' : 'initial' }}
            />
            {errors.title && <div className="error-message">{errors.title}</div>}
          </label>
          <label>
            Content:
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              style={{ borderColor: errors.body ? 'red' : 'initial' }}
            ></textarea>
            {errors.body && <div className="error-message">{errors.body}</div>}
          </label>
          <button type="submit">{mode === 'add' ? 'Add Blog' : 'Update Blog'}</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateModal;
