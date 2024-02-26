import React, { useEffect, useState } from "react";
import {
  EMPSEARCHNAME,
  GETTRACKREPORTBYID,
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

const CustomReporting = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [employee, setEmployee] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [filterEmployeeData, setFilteredEmployeeData] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [trackreprotbyid, setTrackReportById] = useState([]);

   const buttonStyle = {
    backgroundColor: "#a06b14",
    fontSize: "14px",
    color: "white",
    margin: "3% 1% 1%",
    padding: "13px",
    width:"132px"
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
    getEmployeeData();
    getTrackReportByIdData();
  }, []);

  const getTrackReportByIdData = () => {
    let obj = { LoginId: 1 };
    ApiHelper.post(GETTRACKREPORTBYID, obj)
      .then(({ data }) => {
        if (data?.isValid) {
           setTrackReportById((prevData) => [
            ...prevData.filter((item) => item.Name !== data.data[0].Name),
            ...data.data,
          ]);
          
        }
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };
  
  const getEmployeeData = () => {
    let obj = { Name: "" };
    ApiHelper.post(EMPSEARCHNAME, obj)
      .then(({ data }) => {
        if (data?.data?.length > 0) {
          setEmployeeData(data.data);
        }
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };

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
    setIsSearching(false);
  };

  const handleTrackReport = () => {
    alert(`Selected Employee ID: ${selectedEmployeeId}`);
  };

  const extractHeadersFromData = (data) => {
    const firstObject = data[0];
    if (firstObject) {
      return Object.keys(firstObject).map((key) => ({
        field: key,
        headerName: key,
        width: 130,
      }));
    }
    return [];
  };

  const columns = extractHeadersFromData(trackreprotbyid);

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <h1>Reporting</h1>
      </Box>

      <Container fixed style={{marginTop:"2%"}}>
        <Grid container spacing={2} lg={12} sm={12} md={6} xs={12}>
          <Grid item lg={6} sm={12} md={12} xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              value={selectedEmployee || employee}
              onClick={() => setIsSearching(!isSearching)}
              onChange={handleEmployeenameChange}
              placeholder="Search EmpName"
              type="text"
              name="text"
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
          <Grid lg={6} sm={12} md={12} xs={12}>
            <Button
              type="submit"
              onClick={handleTrackReport}
              style={buttonStyle}
            >
              Track Report
            </Button>
            <Button
              type="submit"
              onClick={handleTrackReport}
              style={buttonStyle}
            >
              Button
            </Button>
            <Button
              type="submit"
              onClick={handleTrackReport}
              style={buttonStyle}
            >
              Submit
            </Button>
            <Button
              type="submit"
              onClick={handleTrackReport}
              style={buttonStyle}
            >
              Change
            </Button>
          </Grid>
        </Grid>
        <Grid lg={5} sm={12} md={12} xs={12} style={{marginTop:"5%"}}>
          <Table
            data={trackreprotbyid}
            columns={columns}
            getRowId={(row) => row.PCTID}
          />
        </Grid>
      </Container>
    </>
  );
};

export default CustomReporting;
