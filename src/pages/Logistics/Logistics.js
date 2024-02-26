import React from "react";
import Container from "@mui/material/Container";
import Logisticsdata from "./Logisticsdata";
//const Logisticsdata = React.lazy(() => import("./Logisticsdata"));

const Logistics = () => {
  return (
    <>
      <Container fixed>
        <h1 className="eventhedding">{Logisticsdata.mainheader}</h1>
        <p className="eventsplanning">{Logisticsdata.eventparagraph}</p>
        <div className="important">
          <h2>{Logisticsdata.reservations.heading}</h2>
          <p>{Logisticsdata.reservations.phone}</p>
          <p
            dangerouslySetInnerHTML={{
              __html: Logisticsdata.reservations.email,
            }}
          ></p>
          <p>{Logisticsdata.reservations.address}</p>
          <p
            dangerouslySetInnerHTML={{
              __html: Logisticsdata.reservations.website,
            }}
          ></p>
        </div>
      </Container>
    </>
  );
};

export default Logistics;
