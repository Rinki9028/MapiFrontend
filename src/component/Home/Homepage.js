import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import { Box, Grid, useMediaQuery } from "@mui/material";
const Eventplanner = React.lazy(() => import("../../pages/Weddingdetails/Eventplanner"));
const Venusdetails = React.lazy(() => import("../Venusdetails/Venusdetails"));
const Searchlocation = React.lazy(() =>
  import("../Searchlocation/Searchlocation")
);

const Homepage = () => {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <>
      <Container maxWidth="xl">
        <Grid item container lg={12} spacing={1}>
          <Grid item lg={8} sm={12} md={6} xs={12}>
            <Box>
              <img src="images/01.jpg" alt="logo" width="100%" />
              <Grid item lg={8} sm={12} md={6} xs={12}>
                <Box>
                  <Searchlocation absolutePosition={!isSmallScreen} />
                </Box>
              </Grid>
            </Box>
          </Grid>
          <Grid item lg={4} sm={6} md={6} xs={12}>
            <Box>
              <Venusdetails />
            </Box>
          </Grid>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <Box>
              <Eventplanner />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Homepage;
