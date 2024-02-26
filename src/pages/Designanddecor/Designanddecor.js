import React from "react";
import Container from "@mui/material/Container";
import Designanddecoredata from "./Designanddecoredata";
//const Designanddecoredata = React.lazy(() => import("../Designanddecor/Designanddecoredata"));

const Designanddecor = () => {
  return (
    <>
      <Container fixed>
        <h1 className="eventhedding">{Designanddecoredata.mainheader}</h1>
        <div className="eventsplanning">
          <p>{Designanddecoredata.eventparagraph}</p>

          <div className="important">
            <h2>{Designanddecoredata.reservations.heading}</h2>
            <p>{Designanddecoredata.reservations.phone}</p>
            <p
              dangerouslySetInnerHTML={{
                __html: Designanddecoredata.reservations.email,
              }}
            ></p>
            <p>{Designanddecoredata.reservations.address}</p>
            <p
              dangerouslySetInnerHTML={{
                __html: Designanddecoredata.reservations.website,
              }}
            ></p>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Designanddecor;
