import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "../_helperFunctions/PrivateRoute";
import Venue from "../pages/Venue/Venue";
const Subheader = React.lazy(() => import("../component/Header/Subheader"));
const Homepage = React.lazy(() => import("../component/Home/Homepage"));
const EventPlanning = React.lazy(() =>
  import("../pages/Eventplanning/EventPlanning")
);
const Designanddecor = React.lazy(() =>
  import("../pages/Designanddecor/Designanddecor")
);
const Vendorcoordination = React.lazy(() =>
  import("../pages/Vendorcoordination/Vendorcoordination")
);
const Logistics = React.lazy(() => import("../pages/Logistics/Logistics"));
const Seeourwork = React.lazy(() =>
  import("../component/Seeourwork/Seeourwork")
);
const Leadentryform = React.lazy(() =>
  import("../component/Lead/Leadentryform")
);
const Leadreport = React.lazy(() =>
  import("../component/Leadreport/Leadreport")
);
const Login = React.lazy(() => import("../pages/Login/Login"));
const Eventplanner = React.lazy(() =>
  import("../pages/Weddingdetails/Eventplanner")
);
const EventPage = React.lazy(() => import("../EventPage"));
const CheckAblity = React.lazy(() =>
  import("../component/ChekAblity/CheckAblity")
);
const PageNotFound = React.lazy(() =>
  import("../pages/PageNotFound/PageNotFound")
);
const EventType = React.lazy(() =>
  import("../pages/EventType/EventType")
);
const Dashboard = React.lazy(() => import("../pages/Dashboard/Dashboard"));
const Account = React.lazy(() => import("../pages/Account/Account"));
const Employee = React.lazy(() => import("../pages/Employee/Employee"));
const LeadAdd = React.lazy(() => import("../pages/Lead/LeadAdd"));
const Status = React.lazy(() => import("../pages/Status/Status"));
const Food = React.lazy(() => import("../pages/Food/Food"));
const Location = React.lazy(() => import("../pages/Location/Location"));
const VendorPartner = React.lazy(() => import("../pages/VendorPartner/VendorPartner"));
const Expense = React.lazy(() => import("../pages/Expense/Expense"));
const Holiday = React.lazy(() => import("../pages/Holiday/Holiday"));
const CustomReporting = React.lazy(() => import("../pages/CustomReporting/CustomReporting"));
const MappingPage = React.lazy(() => import("../pages/MappingPage/MappingPage"))

const RoutingComponent = () => {
  return (
    <BrowserRouter basename="/">
      <React.Suspense fallback={<>Loading...</>}>
        <Subheader />
        <br />
        <br />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Homepage />
                <CheckAblity />
              </>
            }
          />
          <Route
            path="/eventplanning"
            element={
              <>
                <EventPlanning />
                <CheckAblity />
              </>
            }
          />
          <Route
            path="/designanddecor"
            element={
              <>
                <Designanddecor />
                <CheckAblity />
              </>
            }
          />
          <Route
            path="/vendorcoordination"
            element={
              <>
                <Vendorcoordination />
                <CheckAblity />
              </>
            }
          />
          <Route
            path="/logistics"
            element={
              <>
                <Logistics />
                <CheckAblity />
              </>
            }
          />
          <Route
            path="/seeourwork"
            element={
              <>
                <Seeourwork />
                <CheckAblity />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Login />
                <CheckAblity />
              </>
            }
          />
          <Route path="/leadentry" element={<Leadentryform />} />
          <Route
            path="/lead/add"
            element={
              <PrivateRoute>
                <LeadAdd />
              </PrivateRoute>
            }
          />
          <Route
            path="/lead/report"
            element={
              <PrivateRoute>
                <Leadreport />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
                <CheckAblity />
              </PrivateRoute>
            }
          />
          <Route
            path="/account"
            element={
              <PrivateRoute>
                <Account />
                <CheckAblity />
              </PrivateRoute>
            }
          />
          <Route
            path="/employee"
            element={
              <PrivateRoute>
                <Employee />
                <CheckAblity />
              </PrivateRoute>
            }
          />
          <Route
            path="/status/master"
            element={
              <PrivateRoute>
                <Status />
                <CheckAblity />
              </PrivateRoute>
            }
          />
          <Route path="/food" element={<PrivateRoute><Food /><CheckAblity /></PrivateRoute>} />
          <Route path="/venue" element={<PrivateRoute><Venue/><CheckAblity /></PrivateRoute>} />
          <Route path="/event" element={<PrivateRoute><EventType/><CheckAblity /></PrivateRoute>} />
          <Route path="/location" element={<PrivateRoute><Location/><CheckAblity /></PrivateRoute>} />
          <Route path="/partner" element={<PrivateRoute><VendorPartner/><CheckAblity /></PrivateRoute>} />
          <Route path="expense/add" element={<PrivateRoute><Expense/><CheckAblity /></PrivateRoute>} />
          <Route path="/holiday/add" element={<PrivateRoute><Holiday/><CheckAblity /></PrivateRoute>} />
          <Route path="/custom/reporting" element={<PrivateRoute><CustomReporting/><CheckAblity /></PrivateRoute>} />
          <Route path="/blogs" element={<PrivateRoute><MappingPage/><CheckAblity /></PrivateRoute>} />
          
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
};

export const Routing = React.memo(RoutingComponent);
