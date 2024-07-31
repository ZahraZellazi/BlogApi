import React from 'react';
import BlogPost from './BlogPost';
import './BlogList.css';

const blogData = [
  { title: "Don't miss a single match this season.", author: 'Rayen', time: '1h ago', image: 'url-to-image-1' },
  { title: "Game or international tournament...", author: 'Nour', time: '2h ago', image: 'url-to-image-2' },
  { title: "Download to start streaming...", author: 'Eya', time: '10 min ago', image: 'url-to-image-3' },
];

function BlogList() {
  return (
    <div className="blog-list">
      {blogData.map((post, index) => (
        <BlogPost key={index} {...post} />
      ))}
    </div>
  );
}

export default BlogList;
