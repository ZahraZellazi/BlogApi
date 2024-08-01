import React, { useState, useEffect } from 'react';
import './Header.css';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaSearch } from 'react-icons/fa';

function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 110) { 
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="logo">Horizon</div>
      <nav className={`nav ${isNavOpen ? 'open' : ''}`}>
        <a href="#hotel">Hotel</a>
        <a href="#flight">Flight</a>
        <a href="#train">Train</a>
        <a href="#travel">Travel</a>
        <a href="#car-rental">Car Rental</a>
      </nav>
      <div className="header-right">
        <div className="search-bar">
          <input type="text" placeholder="Search destination..." />
          <button>
            <FaSearch />
          </button>
        </div>
        <div className="auth-buttons">
          <button className="login-btn">Log in</button>
          <button className="signup-btn">Sign Up</button>
        </div>
        <button className="hamburger" onClick={toggleNav}>
          <GiHamburgerMenu />
        </button>
      </div>
    </header>
  );
}

export default Header;
