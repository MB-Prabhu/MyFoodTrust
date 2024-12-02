
import React, { useState } from "react";
import { Box, Typography, TextField, Button, Paper } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./TrustLogin.css"; // Import the CSS file
import TrustLoginNavbar from "./TrustLoginNavbar";

const TrustLogin = () => {
  let navigate = useNavigate()
  const [formTrust, setFormTrust] = useState({
    trustEmail: "",
    password: ""
  })

  const [errorMessage, setErrorMessage] = useState("")
  const [loading, setLoading] = useState(false)

  let handleChange = ({target: {name, value}}) => {
    setFormTrust({...formTrust, [name]: value})
  }

  let handleSubmit = async (e) => {
    try {
      e.preventDefault()
      setLoading(true)
      if (!(formTrust.trustEmail)) {
        setErrorMessage("Please enter the email") 
        return;
      }

      if (formTrust.password.length < 8) {
        setErrorMessage("Password must be at least 8 characters") 
        return;
      }

      let response = await axios.post(`${process.env.REACT_APP_API_URL}/api/trust/logintrust`,
        formTrust, 
        {withCredentials: true}
      )
        
      if (response?.data?.success) {
        document.cookie = `authToken=${response.data.token}; path=/;`
        navigate('/Trusthome')
      } else {
        setErrorMessage(response.data.message)
      }
    } catch (err) {
      if (err.response) {
        console.log("Backend error:", err.response.data);
        if(err.response.data.message === "Operation `trusts.findOne()` buffering timed out after 10000ms"){
          setErrorMessage("please refresh the page and try again")
        }
        else{
          setErrorMessage(err.response.data.message);
        }
      } else {
        console.log("Network error:", err.message);
        setErrorMessage("A network error occurred. Please try again.");
      }
    }
    finally{
      setLoading(false)
    }
  }

  return (
    <div>

<TrustLoginNavbar />

    <Box className="trust-login-container">
      <Paper elevation={3} className="trust-login-paper">
        <Typography variant="h4" className="trust-login-title">
          Trust Login
        </Typography>
        {loading && <div style={{fontSize: "22px", textAlign: "center", color: "blue"}}>Loading...</div>}
        {!loading && errorMessage && 
          <Typography variant='h5' className="error-message" >
            {errorMessage}

          </Typography>
        }

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            name='trustEmail'
            required
            margin="normal"
            variant="outlined"
            onChange={handleChange}
            value={formTrust.email}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            name='password'
            required
            margin="normal"
            variant="outlined"
            onChange={handleChange}
            value={formTrust.password}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            className="trust-login-button"
          >
            Login
          </Button>
        </form>
      </Paper>
    </Box>

    </div>
  );
};

export default TrustLogin;

    


