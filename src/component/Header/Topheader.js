import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useMediaQuery } from "@mui/material";

const Topheader = () => {
  const phoneNumbers = [
    "+91120 - 4544680",
    "+918221002429",
    "+919821002430",
    "admin@weddinghost.in",
  ];

  // Use Material-UI's useMediaQuery hook to check the screen width
  const isLargeScreen = useMediaQuery("(min-width:1025px)");
  const isMediumScreen = useMediaQuery("(min-width:601px)");

  const determineFontSize = () => {
    if (isLargeScreen) {
      return "15px"; // Large screens
    } else if (isMediumScreen) {
      return "12px"; // Medium screens
    } else {
      return "10px"; // Small screens
    }
  };

  const determineMargin = () => {
    if (isLargeScreen) {
      return "0 10px";
    } else if (isMediumScreen) {
      return "0 5px";
    } else {
      return "0 2px";
    }
  };

  const determinePadding = () => {
    if (isLargeScreen) {
      return "10px";
    } else if (isMediumScreen) {
      return "8px";
    } else {
      return "6px";
    }
  };

  return (
    <>
      <Grid item container lg={12} spacing={2}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Box bgcolor="rgb(203, 176, 140)" style={{ display: "flex" }} p={determinePadding()}>
            {phoneNumbers.map((phoneNumber, index) => (
              <Typography
                key={index}
                sx={{
                  margin: determineMargin(),
                  fontSize: determineFontSize(),
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
              >
                {phoneNumber}
              </Typography>
            ))}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Topheader;
