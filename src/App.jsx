import React from 'react';
import Header from './components/Header';
import BlogList from './components/BlogList';
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

function App() {
  return (
    <div className="App">
      <Header />
      <BlogList />
      <ToastContainer /> 
    </div>
  );
}

export default App;
