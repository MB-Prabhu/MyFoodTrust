import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Card, CardContent, CardActions, Button, Typography, Grid } from '@mui/material';
import './LoginPage.css'; // Import the CSS file
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import PeopleIcon from '@mui/icons-material/People';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = (path) => {
    navigate(path);
  };

  return (
    <Box className="login-page-container">
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          marginBottom: 4,
          fontWeight: 'bold',
          color: '#333',
        }}
      >
        Login Page
      </Typography>
      <Grid container spacing={3}  alignItems="center" sx={{ width: '100%',display:"flex",justifyContent:"center"}}>
        {/* Trust Card */}
       <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",width:"85%"}}>
       <Grid item xs={12} sm={6} md={4}  padding="10px">
          <Card className="login-card">
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                Trust <VolunteerActivismIcon/>
              </Typography>
              <Typography variant="body2" sx={{ color: '#555' }}>
                Login as Trust to manage trust-related activities.
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleLogin('/trustlogin')}
                className="card-button"
              >
                Login
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* User Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card className="login-card">
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                User <PeopleIcon/>
              </Typography>
              <Typography variant="body2" sx={{ color: '#555' }}>
                Login as User to access your account.
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleLogin('/userlogin')}
                className="card-button"
              >
                Login
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Admin Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card className="login-card">
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                Admin <AdminPanelSettingsIcon/>
              </Typography>
              <Typography variant="body2" sx={{ color: '#555' }}>
                Login as Admin to manage the platform.
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleLogin('/admin')}
                className="card-button"
              >
                Login
              </Button>
            </CardActions>
          </Card>
        </Grid>
       </div>
      </Grid>
    </Box>
  );
}

export default LoginPage;
