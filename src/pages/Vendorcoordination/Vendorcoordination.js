import React from "react";
import Container from "@mui/material/Container";
import Vendorcodata from "./Vendorcodata";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
//const Vendorcodata = React.lazy(() => import("./Vendorcodata"));

const Vendorcoordination = () => {
  return (
    <>
      <Container fixed>
        <Grid container>
          <Grid item xs={12} sm={12} md={12} xl={12}>
            <Box>
              <h1>{Vendorcodata.mainheader}</h1>
              <p className="eventsplanning">{Vendorcodata.eventparagraph}</p>
              <div className="important">
                <h2>{Vendorcodata.reservations.heading}</h2>
                <p>{Vendorcodata.reservations.phone}</p>
                <p
                  dangerouslySetInnerHTML={{
                    __html: Vendorcodata.reservations.email,
                  }}
                ></p>
                <p>{Vendorcodata.reservations.address}</p>
                <p
                  dangerouslySetInnerHTML={{
                    __html: Vendorcodata.reservations.website,
                  }}
                ></p>
              </div>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Vendorcoordination;
