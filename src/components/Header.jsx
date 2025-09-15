import React from 'react';
import logo from '../public/esic_header_logo.jpg';
import indiaGovSymbol from '../public/India_gov_symbol_header.png';
import Nari_sakthi_logo from '../public/Nari_sakthi.png';


const Header = () => {
  return (
    <div
      id="header"
      style={{
        background: '#fff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '5px 15px',
        borderBottom: '1px solid black'
      }}
    >
      {/* Left Logo */}
      <a href="https://esic.gov.in/">
        <img
          src={logo}
          alt="MainLogo"
          style={{ height: '80px', objectFit: 'contain', paddingLeft: '20px' }}
          title="Home"
        />
      </a>
      {/* Center Logo */}
      <img
        src={Nari_sakthi_logo}
        alt="Nari Sakthi Logo"
        style={{ height: '120px', objectFit: 'contain' }}
        title="Nari Sakthi Logo"
      />
      {/* Right Logo */}
      <a
        href="https://labour.gov.in/"
        id="a1"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={indiaGovSymbol}
          alt="India Government Symbol"
          style={{ height: '80px', objectFit: 'contain', paddingRight: '40px' }}
          title="Minister of Labour & Employment"
        />
      </a>
    </div>
  );
};


export default Header;
