import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate(); 

  const navbarStyle = {
    backgroundColor: '#007bff',
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'white',
    marginBottom: '20px',
  };

  const logoStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
  };

  const navLinksStyle = {
    display: 'flex',
    alignItems: 'center',
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    marginRight: '15px',
  };

  const buttonStyle = {
    backgroundColor: 'transparent',
    border: '1px solid white',
    color: 'white',
    padding: '5px 10px',
    cursor: 'pointer',
  };

  const handleLogout = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/trust/logouttrust`,
        {},
        { withCredentials: true }
      );
      if (data) {
        navigate('/'); //navigate to home
      } else {
        alert('Trust is not logged in');
      }
    } catch (err) {
      if (err.response) {
        console.log(err.response.data.message);
      }
    }
  };

  return (
    <nav style={navbarStyle}>
      <div style={logoStyle}>Trust App</div>
      <div style={navLinksStyle}>
        <a href="/trusthome" style={linkStyle}>
          Trust
        </a>
        <a href="/Trustprofile" style={linkStyle}>
          Profile
        </a>
        <button style={buttonStyle} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
