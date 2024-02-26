import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import axios from "axios";
import {
  Typography,
  Paper,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  FormControlLabel,
  Button,
  Modal,
  TextField,
  Grid,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  Snackbar,
} from "@mui/material";
import { DatePicker } from '@mui/lab';
import Box from "@mui/material/Box";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import {
  LEADG,
  LEADENTRYINSERT,
  CREATED_BY,
  GETSERVERPARTNER,
  GETEVENTS,
  GETLOCATION,
  FOODS,
  VENUSTYPE,
  ESTATUS,
} from "../../utils/Constant/ApiEndpoint";
import LeadUpdate from "../../pages/Lead/LeadUpdate";
import ApiHelper from "../../_helperFunctions/ApiHelper";
import Table from "../Table/Table";

function Leadreport() {
  const [data, setDatabaseData] = useState([]);
  const [selectedData, setSelectedData] = useState({
    valTid: "",
    Name: "",
    Event_type: "",
    E_Status: "",
    Location: "",
    Event_date: "",
    Number_of_guest: "",
    Remarks: "",
    ModifiedBy: "",
    Visit_Date: "",
    Next_Follow_Up_Date: "",
    Type_of_Venue: "",
    Food: "",
    Number_of_rooms: "",
    budgut: "",
    Partner: "",
    PremiumLead: false,
  });
  const [openModal, setOpenModal] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [dbError, setDBError] = useState(false);
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [locations, setLocations] = useState([]);
  const [Partners, setPartnerns] = useState([]);
  const [eventstypes, setEventstypes] = useState([]);
  const [foods, setFoods] = useState([]);
  const [venus, setVenus] = useState([]);
  const [estatus, setEstatus] = useState([]);

  const columns = [
    { field: 'Tracking_id', headerName: 'Tracking ID', width: 50 },
    { field: 'Name', headerName: 'NAME', width: 130 },
    { field: 'Number', headerName: 'NUMBER', width: 120},
    { field: 'Event_type_value', headerName: 'EVENT TYPE', width: 100},
    { field: 'E_Status_value', headerName: 'STATUS', width: 100},
    { field: 'Location_value', headerName: 'LOCATION', width: 100},
    { field: 'Event_date', headerName: 'EVENT DATE', width: 100},
    { field: 'Number_of_guest', headerName: 'NUMBER OF GUEST', width: 100},
    { field: 'CreatedBy', headerName: 'CREATED BY', width: 100},
    { field: 'Created_date', headerName: 'CREATED DATE', width: 100},
    { field: 'Modifiedby', headerName: 'MODIFIED BY', width: 100},
    { field: 'modified_date', headerName: 'MODIFIED DATE', width: 100},
    { field: 'Visit_Date', headerName: 'VISIT DATE', width: 100},
    { field: 'Next_Follow_Up_Date', headerName: 'NEXT FOLLOW DATE', width: 100},
    { field: 'Type_of_Venue_value', headerName: 'TYPE OF VENUE', width: 100},
    { field: 'Food_value', headerName: 'FOOD', width: 100},
    { field: 'Number_of_rooms', headerName: 'NUMBERS OF ROOMS', width: 100},
    { field: 'budgut', headerName: 'BUDGET', width: 100},
    { field: 'Partner_value', headerName: 'PARTNERS', width: 100},
    { field: 'PremiumLead', headerName: 'PREMIUM LEAD', width: 100, renderCell: ({row}) => row.PremiumLead ? 'YES' : 'NO'},
    { field: 'Remarks', headerName: 'REMARKS', width: 150},
]

  useEffect(() => {
    fetchdatas();
  }, []);

  const fetchdatas = async () => {
    try {
      const response = await ApiHelper.post(LEADG, {
        valTid: 1,
        ValCase: "A",
      });
      if (response.data) {
        setDatabaseData(response.data.data);
      } else {
        console.error("Invalid response data:", response);
      }
    } catch (error) {
      console.error("Getting Lead:", error);
    }
  };

  
  const handleRowClick = (item) => {
    setSelectedData(item);
    setOpenModal(true);
  };

  const handleSelectChange = (event, name) => {
    const value = event.target.value;
    setSelectedData({
      ...selectedData,
      [name]: value,
    });
  };

  return (
    <>
      <Container fixed>
        <Typography
          variant="h3"
          style={{ textAlign: "center", color: "#a06b14", marginBottom: "3%" }}
        >
          Lead Report
        </Typography>

        <Table
          data={data}
          columns={columns}
          getRowId={(item) => item.Tracking_id}
          onRowClick={({row}) => {
            console.log('id: ', row);
            handleRowClick(row)
          }}
        />
      </Container>

      
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        style={{ marginTop: "2%" }}
      >
        <LeadUpdate getData={fetchdatas} leadData={selectedData} setOpenModal={setOpenModal}/>
      </Modal>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      />
    </>
  );
}

export default Leadreport;
