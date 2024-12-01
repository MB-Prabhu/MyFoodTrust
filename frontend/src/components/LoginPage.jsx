import React from "react";
import { Grid, Card, Typography, Button, Box } from "@mui/material";
import MainNavbar from "./MainNavbar";

const cardData = [
  {
    title: "Trust Login",
    image: "https://nwpafoodbank.org/wp-content/uploads/2018/04/grocery-delivery.jpg",
    link: "/trustlogin",
    description: "Access your trust account and help to prevent the wastage of food...",
  },
  {
    title: "User Login",
    image: "https://www.happiness.com/community/uploads/monthly_2018_11/best-happiness-apps.jpg.4898f916f7f12eb863d400dcc07d0a9e.jpg",
    link: "/userlogin",
    description: "Log in to your user account to explore features and services we provide...",
  },
  {
    title: "Admin Login",
    image: "https://i.pinimg.com/736x/94/09/7e/94097e458fbb22184941be57aaab2c8f.jpg",
    link: "/admin",
    description: "Admin access for managing content, trusts, and user accounts.",
  },
];

const HomePage = () => {
  return (
    <>
      <MainNavbar />
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#f5f5f5",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "30px",
        }}
      >
        <Typography
          variant="h4"
          style={{
            marginBottom: "20px",
            fontWeight: "bold",
            color: "#1976d2",
          }}
        >
          Login Pages
        </Typography>
        <Grid container spacing={4} justifyContent="center" alignItems="center" style={{ maxWidth: "90vw" }}>
          {cardData.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: {lg:"75vh",  md:"60vh", xs:"40vh"},
                  width: "100%",
                  position: "relative",
                  borderRadius: "15px",
                  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                  overflow: "hidden",
                  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 12px 24px rgba(0, 0, 0, 0.3)",
                  },
                  "&:hover .hover-overlay": {
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                  },
                  "&:hover .hiddentext": {
                    display: "block",
                    opacity: 1,
                    visibility: "visible",
                  },
                }}
              >
                {/* Background Image */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundImage: `url(${card.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    zIndex: 1,
                  }}
                />
                {/* Dark Overlay */}
                <Box
                  className="hover-overlay"
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.2)",
                    transition: "background-color 0.3s ease-in-out",
                    zIndex: 2,
                  }}
                />
                {/* Title */}
                <Typography
                  variant="h4"
                  sx={{
                    position: "absolute",
                    top: "20px",
                    left: "30px",
                    color: "white",
                    fontWeight: "bold",
                    zIndex: 3,
                  }}
                >
                  {card.title}
                </Typography>
                {/* Description */}
                <Typography
                  variant="body2"
                  sx={{
                    position: "absolute",
                    bottom: "30%",
                    left: "10%",
                    width: "80%",
                    fontSize: { lg: "24px", sm: "20px", md: "18px" , xs: "18px"},
                    color: "white",
                    backgroundColor: "rgba(0, 0, 0, 0.0)",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    display: "none",
                    zIndex: 10,
                    opacity: 0,
                    transition: "opacity 0.5s ease-in-out",
                  }}
                  className="hiddentext"
                >
                  {card.description}
                </Typography>
                {/* Button */}
                <Button
                  variant="contained"
                  color="primary"
                  href={card.link}
                  sx={{
                    position: "absolute",
                    bottom: "20px",
                    right: "5%",
                    width: { xs: "50%", sm: "70%", md: "90%" }, // Adjust width
                    zIndex: 3,
                    fontSize: { lg: "24px", sm: "18px", md: "18px" , xs: "16px" }, // Adjust font size
                  }}
                >
                  Login
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};

export default HomePage;
