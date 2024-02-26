import * as React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Dashboards from "./Dashboards.css";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const iconsData = [
  {
    iconClass: "fa fa-user icons",
    title: "Lead Entry",
    content: "Understand Growth and health of your social profile",
    link: "/lead/add",
  },
  {
    iconClass: "fa fa-twitter icons",
    title: "Lead Report",
    content:
      "Track profile Performance to determine the impact of Twitter content",
    link: "/lead/report",
  },
  {
    iconClass: "fa fa-compass icons",
    title: "Status Master",
    content: "Compare your profile to competitors to see how you stack up",
    link: "/status/master",
  },
  {
    iconClass: "fa fa-volume-up icons",
    title: "Food",
    content:
      "Analyze brand or campaign keyword usage over time to examine trends",
    link: "/food",
  },
  {
    iconClass: "fa fa-facebook icons",
    title: "Venue",
    content:
      "Analyze Facebook page data at a granular level for deeper insights",
    link: "/venue",
  },
  {
    iconClass: "fa fa-heart icons",
    title: "EVENT TYPE",
    content: "Analyze response rates and times to benchmark goals",
    link: "/event",
  },
  {
    iconClass: "fa fa-users icons",
    title: "TEAM",
    content:
      "Track your team's social performance with publishing and task metrics",
    link: "/employee",
  },
  {
    iconClass: "fa fa-folder-o icons",
    title: "LOCATION",
    content:
      "Gain insight into what is being said about your brand and who is saying it.",
    link: "/location",
  },
  {
    iconClass: "fa fa-upload icons",
    title: "VENDOR PARTNER",
    content: "Understand how fans and followers interacted with your messages",
    link: "/partner",
  },
  {
    iconClass: "fa fa-google icons",
    title: "EXPENSE",
    content:
      "View website traffic from a social lens and social message driving acquisition",
    link: "/expense/add",
  },
  {
    iconClass: "fa fa-instagram icons",
    title: "  HOLY DAY",
    content:
      "Determine the impact of Instagram content by analyzing your activity.",
    link: "/holiday/add",
  },
  {
    iconClass: "fa fa-cog icons",
    title: "CUSTOM REPORTING",
    content: "Interested in Custom Reporting solutions? Contact Us",
    link: "/custom/reporting",
  },
];

const Dashboard = () => {
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Grid item container spacing={2} lg={8} className="leadentry">
          {iconsData.map((icon, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Item className="itembox">
                <br />
                <Link to={icon.link} rel="noopener noreferrer">
                  <i className={icon.iconClass}></i>
                  <br />
                  <br />
                  <b>{icon.title}</b>
                </Link>
                <br />
                {icon.content}
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Dashboard;


// import React, { useState, useEffect } from "react";
// import { Box, Grid, Paper } from "@mui/material";
// import { experimentalStyled as styled } from "@mui/material/styles";
// import ApiHelper from "../../_helperFunctions/ApiHelper";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// // import { EMPLOYEEAUTH } from "../../utils/Constant/ApiEndpoint";
// // import Dashboards from "./Dashboards.css";
// // import CustomReporting from "../CustomReporting/CustomReporting";
// // import EmpAuthorize from "../EmpAuthorize/EmpAuthorize";

// // const Item = styled(Paper)(({ theme }) => ({
// //   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
// //   ...theme.typography.body2,
// //   padding: theme.spacing(1),
// //   textAlign: "center",
// //   color: theme.palette.text.secondary,
// // }));
// // const iconsData = [
// //   {
// //     iconClass: "fa fa-user icons",
// //     title: "Lead Entry",
// //     content: "Understand Growth and health of your social profile",
// //     link: "/lead/add",
// //   },
// //   {
// //     iconClass: "fa fa-twitter icons",
// //     title: "Lead Report",
// //     content:
// //       "Track profile Performance to determine the impact of Twitter content",
// //     link: "/lead/report",
// //   },
// //   {
// //     iconClass: "fa fa-compass icons",
// //     title: "Status Master",
// //     content: "Compare your profile to competitors to see how you stack up",
// //     link: "/status/master",
// //   },
// //   {
// //     iconClass: "fa fa-volume-up icons",
// //     title: "Food",
// //     content:
// //       "Analyze brand or campaign keyword usage over time to examine trends",
// //     link: "/food",
// //   },
// //   {
// //     iconClass: "fa fa-facebook icons",
// //     title: "Venue",
// //     content:
// //       "Analyze Facebook page data at a granular level for deeper insights",
// //     link: "/venue",
// //   },
// //   {
// //     iconClass: "fa fa-heart icons",
// //     title: "EVENT TYPE",
// //     content: "Analyze response rates and times to benchmark goals",
// //     link: "/event",
// //   },
// //   {
// //     iconClass: "fa fa-users icons",
// //     title: "TEAM",
// //     content:
// //       "Track your team's social performance with publishing and task metrics",
// //     link: "/employee",
// //   },
// //   {
// //     iconClass: "fa fa-folder-o icons",
// //     title: "LOCATION",
// //     content:
// //       "Gain insight into what is being said about your brand and who is saying it.",
// //     link: "/location",
// //   },
// //   {
// //     iconClass: "fa fa-upload icons",
// //     title: "VENDOR PARTNER",
// //     content: "Understand how fans and followers interacted with your messages",
// //     link: "/partner",
// //   },
// //   {
// //     iconClass: "fa fa-google icons",
// //     title: "EXPENSE",
// //     content:
// //       "View website traffic from a social lens and social message driving acquisition",
// //     link: "/expense/add",
// //   },
// //   {
// //     iconClass: "fa fa-instagram icons",
// //     title: "  HOLY DAY",
// //     content:
// //       "Determine the impact of Instagram content by analyzing your activity.",
// //     link: "/holyday/add",
// //   },
// //   {
// //     iconClass: "fa fa-cog icons",
// //     title: "CUSTOM REPORTING",
// //     content: "Interested in Custom Reporting solutions? Contact Us",
// //     link: "/custom/reporting",
// //   },
// // ];

// // const Dashboard = () => {
// //   const [isAuthorized, setIsAuthorized] = useState(null);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const response = await ApiHelper.post(EMPLOYEEAUTH, { LoginId: 5, CurrPage: "A" });
        
// //         if (response.data?.data?.length > 0) {
// //           setIsAuthorized(true);
// //         } else {
// //           setIsAuthorized(false);
// //         }
// //       } catch (error) {
// //         console.error("Error fetching data:", error);
// //         setIsAuthorized(false);
// //       }
// //     };

// //     fetchData();
// //   }, []);
// //   return (
// //     <>
// //           <>
// //       <Box sx={{ display: "flex", justifyContent: "center" }}>
// //         <Grid item container spacing={2} lg={8} className="leadentry">
// //           {iconsData.map((icon, index) => (
// //             <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
// //               <Item className="itembox">
// //                 <br />
// //                 <Link to={icon.link} rel="noopener noreferrer">
// //                   <i className={icon.iconClass}></i>
// //                   <br />
// //                   <br />
// //                   <b>{icon.title}</b>
// //                 </Link>
// //                 <br />
// //                 {icon.content}
// //               </Item>
// //             </Grid>
// //           ))}
// //         </Grid>
// //       </Box>

// //       {/* Render the appropriate component based on authorization */}
// //       {isAuthorized === true && <CustomReporting />}
// //       {isAuthorized === false && <EmpAuthorize />}
// //     </>

// //     </>
// //   );
// // };

// // export default Dashboard;


// import React, { useState, useEffect } from "react";
// import { Box, Grid, Paper } from "@mui/material";
// import { Link, Redirect } from "react-router-dom";
// import ApiHelper from "../../_helperFunctions/ApiHelper";
// import { EMPLOYEEAUTH } from "../../utils/Constant/ApiEndpoint";
// import CustomReporting from "../CustomReporting/CustomReporting";
// import EmpAuthorize from "../EmpAuthorize/EmpAuthorize";
// import { Dashboards } from "../Dashboards.css";
// import { experimentalStyled as styled } from "@mui/material/styles";



// import React, { useState, useEffect } from "react";
// import { Box, Grid, Paper } from "@mui/material";
// import {Navigate} from 'react-router-dom';
// import { experimentalStyled as styled } from "@mui/material/styles";
// import ApiHelper from "../../_helperFunctions/ApiHelper";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import { EMPLOYEEAUTH } from "../../utils/Constant/ApiEndpoint";
// import Dashboards from "./Dashboards.css";
// import CustomReporting from "../CustomReporting/CustomReporting";
// import EmpAuthorize from "../EmpAuthorize/EmpAuthorize";



// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: "center",
//   color: theme.palette.text.secondary,
// }));
// const iconsData = [
//   {
//     iconClass: "fa fa-user icons",
//     title: "Lead Entry",
//     content: "Understand Growth and health of your social profile",
//     link: "/lead/add",
//   },
//   {
//     iconClass: "fa fa-twitter icons",
//     title: "Lead Report",
//     content:
//       "Track profile Performance to determine the impact of Twitter content",
//     link: "/lead/report",
//   },
//   {
//     iconClass: "fa fa-compass icons",
//     title: "Status Master",
//     content: "Compare your profile to competitors to see how you stack up",
//     link: "/status/master",
//   },
//   {
//     iconClass: "fa fa-volume-up icons",
//     title: "Food",
//     content:
//       "Analyze brand or campaign keyword usage over time to examine trends",
//     link: "/food",
//   },
//   {
//     iconClass: "fa fa-facebook icons",
//     title: "Venue",
//     content:
//       "Analyze Facebook page data at a granular level for deeper insights",
//     link: "/venue",
//   },
//   {
//     iconClass: "fa fa-heart icons",
//     title: "EVENT TYPE",
//     content: "Analyze response rates and times to benchmark goals",
//     link: "/event",
//   },
//   {
//     iconClass: "fa fa-users icons",
//     title: "TEAM",
//     content:
//       "Track your team's social performance with publishing and task metrics",
//     link: "/employee",
//   },
//   {
//     iconClass: "fa fa-folder-o icons",
//     title: "LOCATION",
//     content:
//       "Gain insight into what is being said about your brand and who is saying it.",
//     link: "/location",
//   },
//   {
//     iconClass: "fa fa-upload icons",
//     title: "VENDOR PARTNER",
//     content: "Understand how fans and followers interacted with your messages",
//     link: "/partner",
//   },
//   {
//     iconClass: "fa fa-google icons",
//     title: "EXPENSE",
//     content:
//       "View website traffic from a social lens and social message driving acquisition",
//     link: "/expense/add",
//   },
//   {
//     iconClass: "fa fa-instagram icons",
//     title: "  HOLY DAY",
//     content:
//       "Determine the impact of Instagram content by analyzing your activity.",
//     link: "/holyday/add",
//   },
//   {
//     iconClass: "fa fa-cog icons",
//     title: "CUSTOM REPORTING",
//     content: "Interested in Custom Reporting solutions? Contact Us",
//     link: "/custom/reporting",
//   },
// ];

// const Dashboard = () => {
//   const [isAuthorized, setIsAuthorized] = useState(null);
//   const [redirect, setRedirect] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await ApiHelper.post(EMPLOYEEAUTH, {
//           LoginId: 1,
//           CurrPage: "A",
//         });

//         if (response.data?.data?.length > 0) {
//           setIsAuthorized(true);
//         } else {
//           setIsAuthorized(false);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setIsAuthorized(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleReportingButtonClick = () => {
//     // Trigger API call when the button is clicked
//     ApiHelper.post(EMPLOYEEAUTH, { LoginId: 1, CurrPage: "A" })
//       .then(({ data }) => {
//         if (data.data?.length > 0) {
//           // If authorized, set redirect to true
//           setRedirect(true);
//         }
//       })
//       .catch((err) => {
//         console.log("Error checking authorization:", err);
//       });
//   };

//   return (
//     <>
//       <Box sx={{ display: "flex", justifyContent: "center" }}>
//         <Grid item container spacing={2} lg={8} className="leadentry">
//           {iconsData.map((icon, index) => (
//             <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
//               <Item className="itembox">
//                 <br />
//                 <Link
//                   to={icon.link}
//                   rel="noopener noreferrer"
//                   onClick={() => {
//                     // Call the function to handle the button click
//                     handleReportingButtonClick();
//                   }}
//                 >
//                   <i className={icon.iconClass}></i>
//                   <br />
//                   <br />
//                   <b>{icon.title}</b>
//                 </Link>
//                 <br />
//                 {icon.content}
//               </Item>
//             </Grid>
//           ))}
//         </Grid>
//       </Box>

//       {/* Redirect to the appropriate page based on authorization */}
//       {redirect
      // && <Navigate to="/custom/reporting" replace={true}  eleme/>
//       }
      

//       {/* Render the appropriate component based on authorization */}
//       {isAuthorized === true && <CustomReporting />}
//       {isAuthorized === false && <EmpAuthorize />}
//     </>
//   );
// };

// export default Dashboard;
