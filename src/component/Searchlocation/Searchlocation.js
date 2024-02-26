import React, { useState, useEffect } from "react";
import Searchlocations from "../Searchlocation/Searchlocations.css";
import ErrorMessages from "../../_helperFunctions/ErrorMessages";
import {
  Grid,
  TextField,
  InputLabel,
  FormControl,
  Button,
  Container,
  Paper,
  List,
  ListItem,
  ListItemText,
  Select,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { GETLOCATION } from "../../utils/Constant/ApiEndpoint";
import ApiHelper from "../../_helperFunctions/ApiHelper";
import { Controller, useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import * as moment from "moment";
const PageNotFound = React.lazy(() => import("../../pages/PageNotFound/PageNotFound"));

const Searchlocation = ({ absolutePosition }) => {
  const [city, setCity] = useState("");
  const navigate = useNavigate();
  const [locationData, setLocationData] = useState([]);
  const [filteredLocationData, setFilteredLocationData] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [hasRender, setRender] = useState(false);
  const onShow = React.useCallback(() => setRender(navigate("/pagenotfound")), []);

  const schema = yup.object().shape({
    Location: yup.string().required(),
  });
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange", resolver: yupResolver(schema) });

  useEffect(() => {
    getLocationData();
  }, []);

  const getLocationData = () => {
    let obj = { valLid: 1, ValCase: "A" };
    ApiHelper.post(GETLOCATION, obj)
      .then(({ data }) => {
        if (data?.data?.length > 0) {
          setLocationData(data.data);
        }
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };

  const handleCityChange = (event) => {
    const cityInput = event.target.value;
    setCity(cityInput);

    if (cityInput.length >= 3) {
      fetchLocationData(cityInput);
    } else {
      setFilteredLocationData([]);
    }
  };

  const fetchLocationData = (cityInput) => {
    let obj = { valLid: 1, ValCase: "A", city: cityInput };
    ApiHelper.post(GETLOCATION, obj)
      .then(({ data }) => {
        if (data?.data?.length > 0) {
          setFilteredLocationData(data.data);
          
        }
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };

  const handleLocationSelect = (selectedValue) => {
    setSelectedLocation(selectedValue);
    setIsSearching(false); // Close the suggestion list
  };

  return (
    <Container fixed>
      <Grid
        container
        spacing={2}
        style={{
          position: absolutePosition ? "absolute" : "relative",
          margin: absolutePosition ? "-15% 5% 0% 0%" : "0% ",
        }}
        lg={8}
        sm={12}
        md={6}
        xs={12}
      >
        <Grid item lg={4} sm={12} md={3} xs={12}>
          <TextField
            fullWidth
            variant="outlined"
            label="City"
            placeholder="City"
            className="search-text"
            value={selectedLocation ? selectedLocation : city}
            onClick={() => setIsSearching(!isSearching)}
            onChange={handleCityChange}
            reset
            style={{
              margin: "5px", // Customize the margin for different screen sizes
            }}
          />
          <Paper>
            {isSearching &&
              filteredLocationData &&
              filteredLocationData.map((item) => (
                <ListItem
                  key={item.valLid}
                  value={item.val}
                  onClick={() => handleLocationSelect(item.txt)}
                  style={{
                    fontSize: "14px", // Customize the font size for different screen sizes
                  }}
                >
                  {item.txt}
                </ListItem>
              ))}
          </Paper>
        </Grid>
        <Grid item lg={4} sm={12} md={3} xs={12}>
          <TextField
            fullWidth
            variant="outlined"
            label="Location"
            placeholder="Location"
            className="search-text"
            value={selectedLocation} // Display the selected location
            style={{
              margin: "5px", // Customize the margin for different screen sizes
            }}
          />
        </Grid>
        <Grid item lg={2} sm={12} md={3} xs={12}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className="sm_button search-text"
            onClick={onShow}
            style={{
              fontSize: "16px", // Customize the font size for different screen sizes
              margin: "5px", // Customize the margin for different screen sizes
              padding: "10px", // Customize the padding for different screen sizes
            }}
          >
            Search
          </Button>

          {hasRender && <PageNotFound />}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Searchlocation;