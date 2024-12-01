import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const MainNavbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1,
            fontSize: { lg: "34px", sm: "28px", md: "24px", xs:"23px" },
            fontWeight:{lg: "700", sm: "600", xs: "600"}
         }}>
          MyFoodTrust
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default MainNavbar;
