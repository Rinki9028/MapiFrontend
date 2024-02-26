import React from "react";
import Container from "@mui/material/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Eventplanings from "../Eventplanning/Eventplanings.css";
//const Eventdata = React.lazy(() => import("./Eventdata"));
import Eventdata from "./Eventdata";

const EventPlanning = () => {


const Eventdata = {
  mainheader: `Wedding Host – Plan The Day One Of Forever`,

  eventparagraph: `Welcome to Wedding Host, your gold standard companion for superb and unforgettable occasions in Delhi. 
      As a major wedding host enterprise agency, we focus on creating remarkable experiences that reflect your goals and aspirations. 
      Our team of dedicated professionals excels in every aspect of event planning, ensuring flawless execution and exceeding expectations. 
      From intimate gatherings to grand celebrations, our expertise spans across various domains, including corporate events, social gatherings, and luxury weddings. 
      As the top event management company in Delhi, we take pride in our attention to detail and personalized approach. 
      Our expert event planners craft meticulously tailored events, curating every detail to perfection. 
      From coordinating seamless logistics to handpicking exquisite venues, our services encompass every aspect of event coordination.
      <br />
      With a penchant for creativity, our luxury event planners add a touch of opulence to every occasion. 
      We specialize in theme-based activities that evoke emotions and create lasting memories. 
      Our event decorators transform spaces into enchanting environments, while our destination wedding planners weave magic into your special day.
      <br />
      Choose Wedding Host for a journey that transcends expectations. 
      Discover the epitome of event planning in Delhi with us. 
      Experience the art of event management that captures hearts and leaves an indelible mark.`,
  reservations: {
    heading: "For Reservations please get in touch with us:",
    phone: "Phone: +911120-4544680 |+919821002429 | +919821002430",
    email: 'Email – <a href="/">admin@weddinghost</a>',
    address:
      "in Address: 09/166 – 16th Floor Palm, Olympia GH 2 Sector 16 C, Greater Noida West – 201308",
    website:
      'For more related information – <a href="/">https://weddinghost.in/</a>',
  },
};


  return (
    <>
      <Container fixed>
        <Grid container>
          <Grid item xs={12} sm={12} md={12} xl={12}>
            <Box>
              {/* Access properties from Eventdata */}
              <h1>{Eventdata.mainheader}</h1>
              <p className="eventsplanning">{Eventdata.eventparagraph}</p>
              <div className="important">
                <h2>{Eventdata.reservations.heading}</h2>
                <p>{Eventdata.reservations.phone}</p>
                <p
                  dangerouslySetInnerHTML={{
                    __html: Eventdata.reservations.email,
                  }}
                ></p>
                <p>{Eventdata.reservations.address}</p>
                <p
                  dangerouslySetInnerHTML={{
                    __html: Eventdata.reservations.website,
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

export default EventPlanning;
