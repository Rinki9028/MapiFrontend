import React from "react";
import "./Eventplanners.css";
import Container from "@mui/material/Container"; // Assuming this is your CSS file
import { Link } from "react-router-dom";
import { Box, Grid } from "@mui/material";

const Eventplanner = () => {
  const Eventplannerdata = {
    eventdetilsheader:
      "SO MUCH TO THINK ABOUT. SO LITTLE TIME.THAT’S WHERE I COME IN!",
    eventsdetails:
      "Creating Magical Moments. Your dream wedding awaits with our expert event planners. From exquisite decor to seamless coordination, we make your special day unforgettable.",
    mainheader: "ALL WE GOT COVERED",
    greetheader: "Hi! We are Wedding Host",
    eventparagraph:
      "Are you ready to turn your dream event into a reality? Look no further – we’re here to make your vision come to life. At Wedding Host, we specialize in creating unforgettable experiences that leave a lasting impression.",
    eventlists: {
      column1: {
        wedding: "Wedding – Pre – Wedding",
        corporate: "Corporate",
        birthdayparty: "Birthday party",
        conference: "Conference",
        photography: "Photography & Videography",
        venue: "Venue Decor",
      },
      column2: {
        engagement: "Engagement",
        reception: "Reception",
        anniversary: "Anniversary",
        kittyParty: "Kitty Party",
        social: "Social Get-together",
        pool: "Pool Party",
      },
    },
  };

  const {
    eventdetilsheader,
    eventsdetails,
    mainheader,
    greetheader,
    eventparagraph,
    eventlists,
  } = Eventplannerdata;

  return (
    <>
      <Grid item container lg={12} spacing={1}>
        <Grid item lg={6} sm={12} md={6} xs={12}>
          <Box>
            <div className="eventdetails">
              <div className="mainheader">
                <h2>{eventdetilsheader}</h2>
                <p>{eventsdetails}</p>
              </div>
            </div>
          </Box>
        </Grid>
        <Grid item lg={6} sm={12} md={6} xs={12}>
          <Box>
            <img
              src="https://weddinghost.in/wp-content/uploads/2023/09/wedding-host-scaled.jpg"
              width="100%"
              alt="Event"
            />
          </Box>
        </Grid>
      </Grid>

      <Grid item container lg={12} spacing={1}>
        <Grid item lg={6} sm={12} md={6} xs={12}>
          <Box>
            <div className="eventdetails">
              <div className="mainheader">
                <img
                  src="https://weddinghost.in/wp-content/uploads/2023/09/wedding-host-1-scaled.jpg"
                  width="100%"
                  alt="Event"
                />
              </div>
            </div>
          </Box>
        </Grid>
        <Grid item lg={6} sm={12} md={6} xs={12}>
          <Box>
            <div className="getcovereddetails">
              <div className="gotcovered">
                <h2>{mainheader}</h2>
                <div className="eventlist">
                  <div className="event-list-section">
                    <div className="column">
                      <ul className="event-list">
                        {Object.entries(eventlists.column1).map(
                          ([event, description], index) => (
                            <li key={index} className="event-item">
                              <Link
                                to={`/${event}`}
                                target="_blank"
                                className="event-link"
                              >
                                {description}
                              </Link>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                    <div className="column">
                      <ul className="event-list">
                        {Object.entries(eventlists.column2).map(
                          ([event, description], index) => (
                            <li key={index} className="event-item">
                              <Link
                                to={`/${event}`}
                                target="_blank"
                                className="event-link"
                              >
                                {description}
                              </Link>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
                <h2 className="eventpara">{greetheader}</h2>
                <p className="eventparagraph">{eventparagraph}</p>
              </div>
            </div>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Eventplanner;
