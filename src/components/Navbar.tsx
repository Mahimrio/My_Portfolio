import React from 'react';

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="nav-logo">Moncy.Dev</div>
      <nav className="nav-links">
        <a href="#about">About</a>
        <a href="#skills">Skills</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
};

export default Navbar;
