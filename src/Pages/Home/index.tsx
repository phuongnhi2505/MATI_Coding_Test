import { Link } from "react-router-dom";
import { Box, Button, Container, Typography } from "@mui/material";

const HomeComponent = () => {
  return (
    <Container sx={{ height: "100vh", position: "relative" }}>
      <Box sx={{ position: "absolute", top: '50%', left: '50%' ,transform: 'translate(-50%, -50%)', width: '100%'}}>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h1">MATI Coding Test</Typography>
          <Link to={`training-sessions`}>
            <Button variant="contained">Start</Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default HomeComponent;
