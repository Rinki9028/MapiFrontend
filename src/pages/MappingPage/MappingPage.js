import React, { useEffect, useState } from "react";
import {
  GETTRACKREPORTBYID,
  GETLOCATION,
  INSERTEMPLOCMAPPING,
  GETEMPLOCMAPPING,
  EMPSEARCHNAME,
} from "../../utils/Constant/ApiEndpoint";
import ApiHelper from "../../_helperFunctions/ApiHelper";
import Table from "../../component/Table/Table";
import {
  Box,
  Paper,
  TextField,
  ListItem,
  Button,
  Container,
  Grid,
} from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const MappingPage = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [employee, setEmployee] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [filterEmployeeData, setFilteredEmployeeData] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [trackreprotbyid, setTrackReportById] = useState([]);
  const [locationData, setLocationData] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [location, setLocation] = useState("");
  const [isSearchingL, setIsSearchingL] = useState(false);
  const [filterLocationData, setFilteredLocationData] = useState([]);
  const [selectedLocationId, setSelectedLocationId] = useState("");
  const [trackreprotbyLid, setTrackReportByLId] = useState([]);
  const [emploCMappingData, setEmploCMappingData] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertColor, setAlertColor] = useState("");
  const [isTableVisible, setIsTableVisible] = useState(false);

  const buttonStyle = {
    backgroundColor: "#a06b14",
    fontSize: "14px",
    color: "white",
    padding: "13px",
    marginTop: "5%",
  };

  const schema = yup.object().shape({
    Employee: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: yupResolver(schema) });

  useEffect(() => {
    //getTrackReportByIdData();
  }, []);

  // const getTrackReportByIdData = () => {
  //   let obj = { LoginId: 1 };
  //   ApiHelper.post(GETTRACKREPORTBYID, obj)
  //     .then(({ data }) => {
  //       if (data?.isValid) {
  //         setTrackReportById((prevData) => [
  //           ...prevData.filter((item) => item.Name !== data.data[0].Name),
  //           ...data.data,
  //         ]);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log("err: ", err);
  //     });
  // };

  const handleEmployeenameChange = (event) => {
    const employeeInput = event.target.value;
    setEmployee(employeeInput);

    if (employeeInput.length >= 3) {
      fetchEmployeeData(employeeInput);
    } else {
      setFilteredEmployeeData([]);
    }

    setSelectedEmployee("");
    setSelectedEmployeeId("");
  };

  const fetchEmployeeData = (employeeInput) => {
    let obj = { Name: employeeInput, employee: employeeInput };
    ApiHelper.post(EMPSEARCHNAME, obj)
      .then(({ data }) => {
        if (data?.data?.length > 0) {
          setFilteredEmployeeData(data.data);
        }
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };

  const handleEmployeeSelect = (selectedValue, selectedId) => {
    setSelectedEmployee(selectedValue);
    setSelectedEmployeeId(selectedId);
    setIsSearchingL(false);
    if (selectedEmployeeId) {
      getEmploCMappingData(selectedEmployeeId);
      setIsTableVisible(true);
    }
  };

  const handleLocationnameChange = (event) => {
    const locationInput = event.target.value;
    setLocation(locationInput);
    if (locationInput.length >= 3) {
      fetchLocationData(locationInput);
    } else {
      setFilteredLocationData([]);
    }
    setSelectedLocation("");
    setSelectedLocationId("");
  };

  const fetchLocationData = (locationInput) => {
    let obj = { valLid: locationInput, ValCase: "A", location: locationInput };
    ApiHelper.post(GETLOCATION, obj)
      .then(({ data }) => {
        if (data?.data?.length > 0) {
          const filteredData = data.data.filter((item) =>
            item.txt.toLowerCase().includes(locationInput.toLowerCase())
          );
          setFilteredLocationData(filteredData);
        }
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };
  const handleLocationSelect = (selectedValue, selectedId) => {
    setSelectedLocation(selectedValue);
    setSelectedLocationId(selectedId);
    setIsSearchingL(false);
    if (selectedLocationId) {
      getEmploCMappingData(selectedLocationId);
      setIsTableVisible(true);
    }
  };
  const handleCombinedSubmit = () => {
    if (!selectedEmployeeId && !selectedLocationId) {
      setShowAlert(true);
      setAlertMessage("Please select your employee & location");
      setAlertColor("red");
    } else if (!selectedEmployeeId) {
      setShowAlert(true);
      setAlertMessage("Please select your employee");
      setAlertColor("red");
    } else if (!selectedLocationId) {
      setShowAlert(true);
      setAlertMessage("Please select your location");
      setAlertColor("red");
    } else {
      let obj = {
        LoginId: selectedEmployeeId,
        LocId: selectedLocationId,
      };

      ApiHelper.post(INSERTEMPLOCMAPPING, obj)
        .then(({ data }) => {
          setShowAlert(true);
          if (data?.status === 200) {
            setAlertColor("green");
            setAlertMessage("Data updated successfully");
            getEmploCMappingData(selectedEmployeeId);
            setIsTableVisible(true);
          } else {
            setAlertColor("red");
            setAlertMessage(
              "Something went wrong. Your data is not submitted."
            );
          }
        })
        .catch((err) => {
          console.log("err: ", err);
          setShowAlert(true);
          setAlertColor("red");
          setAlertMessage("Something went wrong. Your data is not submitted.");
        });
    }
  };

  const getEmploCMappingData = (selectedId) => {
    let obj = {
      LoginId: selectedId,
    };

    ApiHelper.post(GETEMPLOCMAPPING, obj)
      .then(({ data }) => {
        if (data?.data?.length > 0) {
          setEmploCMappingData(data.data);
        } else {
          setEmploCMappingData([]);
        }
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };

  const extractHeadersFromData = (data) => {
    if (data && data.length > 0) {
      const firstObject = data[0];
      return Object.keys(firstObject).map((key) => ({
        field: key,
        headerName: key,
        width: 400,
      }));
    }
    return [];
  };

  const columns = extractHeadersFromData(emploCMappingData);

  console.log("emploCMappingData:", emploCMappingData);
  console.log("columns:", columns);

  return (
    <div>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <h1>Location MappingPage</h1>
      </Box>

      <Container fixed style={{ marginTop: "1%" }}>
        <Grid container spacing={2} lg={12} sm={12} md={6} xs={12}>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <level>Please Select Your Employee</level>
            <TextField
              fullWidth
              variant="outlined"
              value={selectedEmployee || employee}
              onClick={() => setIsSearching(!isSearching)}
              onChange={handleEmployeenameChange}
              placeholder="Search EmpName"
              type="text"
              name="EmpName"
            />
            <Paper>
              {isSearching &&
                filterEmployeeData &&
                filterEmployeeData.map((item) => (
                  <ListItem
                    key={item.Name}
                    value={item.Name}
                    onClick={() => handleEmployeeSelect(item.txt, item.val)}
                    style={{
                      fontSize: "13px",
                    }}
                  >
                    {item.txt}
                  </ListItem>
                ))}
            </Paper>
          </Grid>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <level>Please Select Your Location</level>
            <TextField
              fullWidth
              variant="outlined"
              value={selectedLocation || location}
              onClick={() => setIsSearchingL(!isSearchingL)}
              onChange={handleLocationnameChange}
              placeholder="Search Location"
              type="text"
              name="Location"
            />
            <Paper>
              {isSearchingL &&
                filterLocationData &&
                filterLocationData.map((item) => (
                  <ListItem
                    key={item.valLid}
                    value={item.valLid}
                    onClick={() => handleLocationSelect(item.txt, item.val)}
                    style={{
                      fontSize: "13px",
                    }}
                  >
                    {item.txt}
                  </ListItem>
                ))}
            </Paper>
          </Grid>
          <Grid
            container
            item
            lg={6}
            sm={12}
            md={12}
            xs={12}
            sx={{ display: "flex", justifyContent: "center", margin: "auto" }}
          >
            {showAlert && (
              <div
                style={{
                  color: alertColor,
                }}
              >
                {alertMessage}
                <button
                  onClick={() => setShowAlert(false)}
                  style={{ marginLeft: "10px" }}
                >
                  X
                </button>
              </div>
            )}
            <Button
              fullWidth
              type="submit"
              onClick={handleCombinedSubmit}
              style={buttonStyle}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
        <Grid lg={5} sm={12} md={12} xs={12} style={{ marginTop: "5%" }}>
          {isTableVisible && selectedEmployee && (
            <Table
              data={emploCMappingData}
              columns={columns}
              getRowId={(row) => row.MappingID}
            />
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default MappingPage;
