import React, { useState } from 'react'
import { Box, Typography, TextField, Button, Paper } from "@mui/material";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserloginNavbar from './UserloginNavbar';

const UserLogin = () => {
  let navigate = useNavigate()
  // sending the cookie name as "userlogintoken" 
  // so when working with login for user use the below line to check the token
  // document.cookie = `userlogintoken=${response.data.token}; path=/;`;
  const [formUser, setFormUser] = useState({
    email: "",
    password: ""
  })

  const [errorMessage, setErrorMessage] = useState("")
  const [loading, setLoading] = useState(false)

  let handleChange = ({target: {name, value}}) => {
    setFormUser({...formUser, [name]: value})
  }

  let handleSubmit = async (e) => {
    try {
      e.preventDefault()
      setLoading(true)
      if (!(formUser.email)) {
        setErrorMessage("Please enter the email") 
        return;
      }

      if (formUser.password.length < 8) {
        setErrorMessage("Password must be at least 8 characters") 
        return;
      }

      let response = await axios.post(`${process.env.REACT_APP_API_URL}/api/user/loginuser`,
        formUser, 
        {withCredentials: true}
      )
        
      if (response.data.success) {
        document.cookie = `userlogintoken=${response.data.token}; path=/;`
        navigate('/userhome')
      } else {
        setErrorMessage(response.data.message)
      }
    } catch (err) {
      if (err.response) {
        console.error("Backend error:", err.response?.data);
        let errorMsg = err.response?.data?.message
        setErrorMessage(errorMsg === "Operation `usermodels.findOne()` buffering timed out after 10000ms" ? "please try again sometime" : errorMsg);
      } else {
        console.log(err)
        console.error("Network error:", err.message);
        setErrorMessage("A network error occurred. Please try again.");
      }
    }
    finally{
      setLoading(false)
    }
  }

  return (
    <div>
      <UserloginNavbar />

    <Box className="trust-login-container">
      
    <Paper elevation={3} className="trust-login-paper">
      <Typography variant="h4" className="trust-login-title">
        User Login
      </Typography>
      {loading && <div style={{fontSize: "22px", textAlign: "center", color: "blue"}}>Loading...</div>}
      {!loading && errorMessage && <div style={{fontSize: "22px", textAlign: "center", color: "red"}}>{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          required
          name='email'
          margin="normal"
          variant="outlined"
          onChange={handleChange}
          value={formUser.email}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          required
          margin="normal"
          variant="outlined"
          name='password'
          onChange={handleChange}
          value={formUser.password}
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
  
}

export default UserLogin
