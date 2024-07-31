import React, { useState } from 'react';
import './UpdateModal.css';

function UpdateModal({ blog, onClose, onSave }) {
  const [title, setTitle] = useState(blog.title);
  const [body, setBody] = useState(blog.body);

  const handleSave = () => {
    const updatedBlog = { ...blog, title, body };
    onSave(updatedBlog); // Pass updated blog to the parent component
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h1>Update Blog Post</h1>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          Body:
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </label>
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default UpdateModal;
