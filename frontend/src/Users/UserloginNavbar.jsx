import React from 'react'
import {
    AppBar,
    Toolbar,
    Typography,
    Button
  } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const UserloginNavbar = () => {

    let navigate = useNavigate()

  return (
    <div>
             <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 , fontSize: {xs:"20px", sm: "22px", lg: "28px"}, fontWeight:{lg:"600", sm: "600", xs: "500"}}}>
            User Login
          </Typography>
          <Button color="inherit" onClick={() => navigate('/')}
            sx={{fontSize: {xs:"16px", sm: "18px", lg: "21px"}, textTransform: 'lowercase'}}
            >
            Home
          </Button>
          {/* <Button color="inherit" onClick={() => navigate('/contact')}
            sx={{fontSize: {xs:"16px", sm: "18px", lg: "21px"}, textTransform: 'lowercase'}}
            >
            Contact Us
          </Button> */}
          <Button color="inherit" onClick={() => navigate('/user')}
            sx={{fontSize: {xs:"16px", sm: "18px", lg: "21px"}, textTransform: 'lowercase'}}
            >
            Registration
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default UserloginNavbar