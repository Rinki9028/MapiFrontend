import React, { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Grid,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Container,
} from "@mui/material";
import axios from "axios";
import {
  LEADENTRYINSERT,
  GETEVENTS,
  GETLOCATION,
  CREATED_BY,
  GETSERVERPARTNER,
} from "../../utils/Constant/ApiEndpoint";

const Leadentryform = () => {
  const [formData, setFormData] = useState({
    Name: "",
    Number: "",
    Location: "", 
    Event_type: "",
    Event_date: "",
    IsPremiumLead: false,
    Created_by: CREATED_BY,
    Partner: "",
  });
  // State for mobile number validation
  const [mobileNumber, setMobileNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [dbError, setDBError] = useState(false);
  const [locations, setLocations] = useState([]);
  const [Partners, setPartnerns] = useState([]);
  const [eventstypes, setEventstypes] = useState([]);
  const [selectedLocationValue, setSelectedLocationValue] = useState("");
  const [selectedEventTypeValue, setSelectedEventTypeValue] = useState("");
  const [selectedPartnersValue, setselectedPartnersValue] = useState("");

  // Handle checkbox change
  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setFormData({ ...formData, IsPremiumLead: isChecked });
    const consoleMessage = isChecked
      ? "Checkbox is checked (true)"
      : "Checkbox is unchecked (false)";
    console.log(consoleMessage);
  };

  // Handle Select Chnage
  const handleSelectChange = (event, name) => {
   // alert("hi");
    const { value, txt } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle Input chnage
  const handleInputChange = (event) => {
    //alert("by");
    const { name, value } = event.target;
    if (name === "Location" || name === "Event_type" || name === "Partner") {
      setFormData({
        ...formData,
        [name]: value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  //For Location Dropdown

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.post(GETLOCATION, {
          valLid: 1,
          ValCase: "A",
        });
        console.log(response.data);
        // Step 3: Update the locations state with the fetched data
        setLocations(response.data.data);
      } catch (error) {
        console.error("Getting Locations:", error);
      }
    };

    fetchLocations();
  }, []);

  //for Event_type Dropdown
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.post(GETEVENTS, {
          valEid: 1,
          ValCase: "A",
        });
        console.log(response.data);

        // Step 3: Update the events state with the fetched data
        setEventstypes(response.data.data);
      } catch (error) {
        console.error("Getting Events:", error);
      }
    };

    fetchEvents();
  }, []);

  //for server partnears
  useEffect(() => {
    const fetchPartnears = async () => {
      try {
        const response = await axios.post(GETSERVERPARTNER, {
          valPid:1,
          ValCase:"A",
      });
        console.log(response.data);
        // Step 3: Update the events state with the fetched data
        setPartnerns(response.data.data)

      } catch (error) {
        console.error("Getting Events:", error);
      }
    };

    fetchPartnears();
  }, []);

  // Resrt form
  const resetForm = () => {
    setFormData({
      Name: "",
      Number: "",
      Location: "",
      Event_type: "",
      Event_date: "",
      IsPremiumLead: false,
      Created_by: "",
      Partner: "",
    });
    setSelectedLocationValue("");
    setSelectedEventTypeValue("");
    setselectedPartnersValue("");
  };

  // Handle Mobile Validation
  const handleMobileNumberValidation = (e) => {
    const value = e.target.value;
    if (!/^\d+$/.test(value)) {
      setMobileNumber("");
      setErrorMessage("Mobile number should be 0-9");
    } else if (value.length > 10) {
      setMobileNumber("");
      setErrorMessage("Mobile number should be 10 digits");
    } else {
      if (value.length > mobileNumber.length) {
        setMobileNumber(value);
      }
      setErrorMessage("");
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {

      const response = await axios.post(LEADENTRYINSERT, {
        Name: formData.Name,
        PhoneNumber: formData.Number,
        Event_type: formData.Event_type,
        E_Location: formData.Location,
        Event_date: formData.Event_date,
        CreatedBy: formData.Created_by,
        valPartner: formData.Partner,
        IsPremiumLead: formData.IsPremiumLead,

         // Ensure that the key matches the backend expectations
      });

      if (response.status === 200) {
        console.log("Data saved successfully.");
        setSnackbarOpen(true);
        setDBError(false);
        resetForm();
      }
    } catch (error) {
      console.error("An error occurred while saving data:", error);
      setDBError(true);
      setSnackbarOpen(true);
      resetForm();
    }
  };
  // Handle Snackbar close
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} style={{ padding: "20px", textAlign: "center" }}>
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              bgcolor: "#fff",
              padding: "40px",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <Grid
              item
              justifyContent="center"
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 12, sm: 8, md: 8 }}
            >
              <Typography
                variant="h3"
                component="h1"
                style={{ color: "#a06b14" }}
              >
                Lead Entry
              </Typography>
              <Grid item xs={12} sm={12} md={8}>
                <TextField
                  label="Guest Name"
                  name="Name"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  required
                  value={formData.Name}
                  onChange={handleInputChange}
                  error={Boolean(errors.Name)}
                  helperText={errors.Name}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Guest Number"
                  name="Number"
                  margin="normal"
                  variant="outlined"
                  required
                  fullWidth
                  value={formData.Number}
                  onChange={handleInputChange}
                  error={errorMessage !== ""}
                  helperText={errorMessage}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Event Date"
                  name="Event_date"
                  value={formData.Event_date}
                  onChange={handleInputChange}
                  type="date"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="Location">Location</InputLabel>
                  <Select
                    label="Location"
                    id="Location"
                    name="Location"
                    value={formData.Location}
                    onChange={(e) => handleSelectChange(e, "Location")}
                  >
                    <em>Select a Location</em>
                    {locations?.map((location) => (
                      <MenuItem key={location.valLid} value={location.val}>
                        {location.txt}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="Event_type">Event Type</InputLabel>
                  <Select
                    label="Event Type"
                    id="Event_type"
                    name="Event_type"
                    value={formData.Event_type}
                    onChange={(e) => handleSelectChange(e, "Event_type")}
                  >
                    <em>Select Event Type</em>
                    {eventstypes?.map((eventstype) => (
                      <MenuItem key={eventstype.valEid} value={eventstype.val}>
                        {eventstype.txt}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth>
                  <InputLabel htmlFor="Partner">Server Partner</InputLabel>
                  <Select
                    label="Server Partner"
                    id="Partner"
                    name="Partner"
                    value={formData.valPartner} // Update value from state
                    onChange={(e) => handleSelectChange(e, "Partner")}
                  >
                    <em>Server Partner</em>
                    {Partners?.map((partners) => (
                      <MenuItem key={partners.valPid} value={partners.val}>
                        {partners.txt}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <FormControlLabel
                  name="IsPremiumLead"
                  control={
                    <Checkbox
                      checked={formData.IsPremiumLead}
                      onChange={handleCheckboxChange}
                    />
                  }
                  label="Premium Lead"
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <Button
                  name="submit"
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{
                    width: "450px",
                    marginTop: "20px",
                    background: "#a06b14",
                  }}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Box>
        </form>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={dbError ? 10000 : 3000}
          onClose={() => setSnackbarOpen(false)}
          message={
            dbError
              ? "Something went wrong with the database."
              : "Data submitted successfully in the database."
          }
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          ContentProps={{
            style: {
              backgroundColor: dbError ? "red" : "green",
            },
          }}
        />
      </Paper>
    </Container>
  );
};

export default Leadentryform;
