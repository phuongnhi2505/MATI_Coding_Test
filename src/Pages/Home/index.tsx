import { Link } from "react-router-dom";
import "./home.scss";
import { Box, Button, Typography } from "@mui/material";

const HomeComponent = () => {
  return (
    <Box component="div" textAlign={'center'} >
      <Typography variant="h1">MATI Coding Test</Typography>
      <Link to={`training-sessions`}>
        <Button variant="contained">Start</Button>
      </Link>
    </Box>
  );
};

export default HomeComponent;
