import React, { useState } from 'react';
import './Header.css';
import { GiHamburgerMenu } from 'react-icons/gi';

function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <header className="header">
      <div className="logo">BLOG</div>
      <nav className={`nav ${isNavOpen ? 'open' : ''}`}>
        <a href="#features">Features</a>
        <a href="#pricing">Pricing</a>
        <a href="#contact">Contact</a>
        <a href="#signin">SignIn</a>
        <a href="#signup">SignUp</a>
      </nav>
      <button className="hamburger" onClick={toggleNav}>
        <GiHamburgerMenu />
      </button>
    </header>
  );
}

export default Header;
