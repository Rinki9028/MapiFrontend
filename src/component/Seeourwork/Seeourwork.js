import React from "react";
import Container from "@mui/material/Container";
import GoogleMap from "../GoogleMap/GoogleMap";
import Seeourworks from "./Seeourworks.css";

const Seeourwork = () => {
  return (
    <>
      <Container fixed>
        <h1 className="eventhedding">
          Create Unforgettable Memories with a Destination Wedding - wedding
          host
        </h1>
        <div className="eventsplanning">
          <p>
            Make your dream wedding a reality with Wedding Host. We specialize
            in creating unforgettable memories with destination weddings. From
            sandy beaches to <br />
            picturesque mountains, we’ll help you plan the perfect celebration
            of love and commitment. Let us take care of all the details while
            you focus on cherishing every
            <br />
            moment. Your special day deserves to be nothing short of
            extraordinary. Start your journey with Wedding Host today and let us
            turn your dreams into reality.
            <br />
          </p>

          <div className="workimage">
            <img
              className="imageofwork"
              src="https://weddinghost.in/wp-content/uploads/2023/08/Wedding-host-table-scaled.webp"
              width="250px"
            />
            <img
              className="imageofwork"
              src="https://weddinghost.in/wp-content/uploads/2023/08/marriage-scaled.webp"
              width="250px"
            />
            <img
              className="imageofwork"
              src="https://weddinghost.in/wp-content/uploads/2023/08/Wedding-host-table-scaled.webp"
              width="250px"
            />
            <img
              className="imageofwork"
              src="https://weddinghost.in/wp-content/uploads/2023/08/marriage-scaled.webp"
              width="250px"
            />
          </div>
        </div>
      </Container>
    </>
  );
};

export default Seeourwork;
