import React, { useState, useEffect } from 'react';
import './Header.css';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaSearch } from 'react-icons/fa';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false); // State for nav visibility

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector(".header");
      const sticky = header.offsetTop;

      if (window.pageYOffset > sticky) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleNav = () => {
    setIsNavOpen(prevState => !prevState); // Toggle nav visibility
  };

  return (
    <header className={`header ${isScrolled ? 'sticky' : ''}`}>
      <div className="logo">Horizon</div>
      <nav className={`nav ${isNavOpen ? 'show' : ''}`}> {/* Change 'open' to 'show' */}
      <a href="#Hotel">Hotel</a>
      <a href="#Flight">Flight</a>
      <a href="#Train">Train</a>
      <a href="#Travel">Travel</a>
      <a href="#Rental">Rental</a>
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
