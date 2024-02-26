import React, { useState } from "react";
import {
  Button,
  TextField,
  Box,
  Modal,
  InputAdornment,
  Grid,
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PhoneIcon from "@mui/icons-material/Phone";
import "./Checkablitys.css"; // Assuming you have a CSS file for styling

const CheckAvailability = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const modalStyle = {
    position: "absolute",
    width: "90%", // Use a percentage for responsiveness
    maxWidth: 400, // Add a maximum width to prevent the modal from becoming too wide
    backgroundColor: "white",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  const fields = [
    { label: "Name", icon: <PersonOutlineIcon /> },
    { label: "Mobile", icon: <PhoneIcon /> },
    { label: "Date", icon: <CalendarTodayIcon />, type: "date" },
    { label: "Guest", icon: <GroupIcon /> },
  ];

  return (
    <div className="sidebar-contact">
      <button className="toggle" type="button" onClick={handleOpen}>
        <h4>Check Availability</h4>
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={modalStyle}>
          <h4>Check Availability</h4>
          <Grid container spacing={2}>
            {fields.map((field) => (
              <Grid item xs={12} key={field.label}>
                <TextField
                  label={field.label}
                  variant="outlined"
                  fullWidth
                  type={field.type || "text"}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {field.icon}
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            ))}
          </Grid>
          <br />
          <Button
            onClick={handleClose}
            size="large"
            variant="outlined"
            color="success"
            fullWidth
            sx={{ backgroundColor: "#a06b14 !important", color: "white" }}
          >
            Send
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default CheckAvailability;
