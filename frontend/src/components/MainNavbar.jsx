import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const MainNavbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1,
            fontSize: { xl: "34px", sm: "28px", md: "24px", xs:"20px" },
         }}>
          MyFoodTrust
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default MainNavbar;
