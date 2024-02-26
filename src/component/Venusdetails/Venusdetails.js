import React from "react";
import Container from "@mui/material/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";

const Venusdetails = () => {
  return (
    <>
      <Container
        maxWidth="xl"
        style={{
          backgroundColor: "#f5f5f5",
          padding: "40px",
          textAlign: "center",
        }}
      >
        <Grid
          container
          spacing={2}
          lg={12}
          sm={12}
        >
          <Grid item xs={12} sm={12} md={12} xl={12}>
            <Box>
              <Grid item lg={12} sm={12} md={12} xs={12}>
                <Typography variant="h6">Get Venue Details & Offers</Typography>
              </Grid>

              <form>
                <Grid item lg={12} sm={12} md={12} xs={12}>
                  <TextField
                    label="Enter Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item lg={12} sm={12} md={12} xs={12}>
                  <TextField
                    label="Enter Mobile"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item lg={12} sm={12} md={12} xs={12}>
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item lg={12} sm={12} md={12} xs={12}>
                  <Checkbox />
                  <span>Send me banquet details on Whatsapp</span>
                </Grid>
                
                <Grid
          container
          spacing={2}
          lg={12}
          sm={12}
        >
                <Grid item lg={9} sm={12} md={12} xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    size="large"
                    fullWidth
                    style={{ backgroundColor: "#a06b14" }}
                  >
                    Get Free Quotes
                  </Button>
                </Grid>
                <Grid item lg={3} sm={12} md={12} xs={12}>
                  <Button
                    variant="contained"
                    color="default"
                    type="reset"
                    size="large"
                    fullWidth
                  >
                    Reset
                  </Button>
                </Grid>
                </Grid>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Venusdetails;
