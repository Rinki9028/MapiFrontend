import React, { useEffect, useState } from "react";
import ApiHelper from "../../_helperFunctions/ApiHelper";
import {
  FOODS,
  GETEVENTS,
  GETLOCATION,
  GETSERVERPARTNER,
  LEADENTRYINSERT,
  LEADUPDATE,
  STATUS_INFO,
  VENUSTYPE,
} from "../../utils/Constant/ApiEndpoint";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import ErrorMessages from "../../_helperFunctions/ErrorMessages";
import { Controller, useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import * as moment from "moment";

const LeadUpdate = ({ leadData, getData, setOpenModal }) => {
  const [partnerData, setPartnerData] = useState([]);
  const [eventData, setEventData] = useState([]);
  const [locationData, setLocationData] = useState([]);
  const [venueData, setVenueData] = useState([]);
  const [foodData, setFoodData] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const defaultValues = {
    ...leadData,
    Event_date: moment(leadData?.Event_date, "DD/MM/YYYY").format("YYYY-MM-DD"),
    Visit_Date: leadData?.Visit_Date
      ? moment(leadData?.Visit_Date, "DD/MM/YYYY").format("YYYY-MM-DD")
      : null,
    Next_Follow_Up_Date: leadData?.Next_Follow_Up_Date
      ? moment(leadData?.Next_Follow_Up_Date, "DD/MM/YYYY").format("YYYY-MM-DD")
      : null,
  };

  const schema = yup.object().shape({
    Tracking_id: yup.string(),
    Name: yup.string().required(),
    Number: yup
      .string()
      .matches(/^[0-9]{10}$/)
      .required(),
    Event_type: yup.string().required(),
    E_Status: yup.string().required(),
    Location: yup.string().required(),
    Event_date: yup.string().required(),
    Remarks: yup.string().notRequired(),
    CreatedBy: yup.string().notRequired(),
    Created_date: yup.string().notRequired(),
    Modifiedby: yup.string().notRequired(),
    modified_date: yup.string().notRequired(),
    Visit_Date: yup.string().notRequired(),
    Next_Follow_Up_Date: yup.string().notRequired(),
    Type_of_Venue: yup.string().notRequired(),
    Food: yup.string().notRequired(),
    Number_of_rooms: yup.string().notRequired(),
    budgut: yup.string().notRequired(),
    Partner: yup.string().required(),
    Number_of_guest: yup.string().notRequired(),
    PremiumLead: yup.boolean(),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: defaultValues,
  });

  useEffect(() => {
    getLocationData();
    getEventData();
    getPartnerData();
    getVenueData();
    getFoodData();
    getStatusData();
  }, []);

  const getEventData = () => {
    let obj = { valEid: 1, ValCase: "A" };
    ApiHelper.post(GETEVENTS, obj)
      .then(({ data }) => {
        if (data?.data?.length > 0) {
          setEventData(data.data);
        }
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };

  const getPartnerData = () => {
    let obj = { valPid: 1, ValCase: "A" };
    ApiHelper.post(GETSERVERPARTNER, obj)
      .then(({ data }) => {
        if (data?.data?.length > 0) {
          setPartnerData(data.data);
        }
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };

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

  const getVenueData = () => {
    let obj = { valPid: 1, ValCase: "A" };
    ApiHelper.post(VENUSTYPE, obj)
      .then(({ data }) => {
        if (data?.data?.length > 0) {
          setVenueData(data.data);
        }
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };
  const getFoodData = () => {
    let obj = { valEid: 1, ValCase: "A" };
    ApiHelper.post(FOODS, obj)
      .then(({ data }) => {
        if (data?.data?.length > 0) {
          setFoodData(data.data);
        }
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };
  const getStatusData = () => {
    let obj = { valEid: 1, ValCase: "A" };
    ApiHelper.post(STATUS_INFO, obj)
      .then(({ data }) => {
        if (data?.data?.length > 0) {
          setStatusData(data.data);
        }
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };

  const submitHandler = (obj) => {
    ApiHelper.post(LEADUPDATE, obj)
      .then(({ data }) => {
        if (data?.status == 200) {
          alert(data?.message);
          reset(defaultValues);
          getData();
          setOpenModal(false);
        } else if (data?.message) {
          alert(data?.message);
        }
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <div className="card shadow border-0 py-4">
            <h1 className="heading-text">Lead Update</h1>

            <div className="row lead-form-container">
              <div className="col-6 col-lg-3">
                <TextField
                  label="Guest Name"
                  name="Name"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  {...register("Name")}
                />
                {errors.Name && (
                  <span className="error-field">
                    {ErrorMessages?.inputField}
                  </span>
                )}
              </div>

              <div className="col-6 col-lg-3">
                <TextField
                  label="Guest Number"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  {...register("Number")}
                />
                {errors.Number && (
                  <span className="error-field">
                    {ErrorMessages?.numberField}
                  </span>
                )}
              </div>

              <div className="col-6 col-lg-3">
                <FormControl fullWidth className="mt-3">
                  <InputLabel htmlFor="Event Type">Event Type</InputLabel>
                  <Controller
                    control={control}
                    name="Event_type"
                    render={({ field: { onChange, value } }) => (
                      <Select
                        label="Server Event Type"
                        id="Event Type"
                        value={value}
                        onChange={(e) => {
                          onChange(e);
                        }}
                      >
                        <em>Server Event Type</em>
                        {eventData?.map((item) => (
                          <MenuItem key={item.valEid} value={item.val}>
                            {item.txt}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
                {errors.Event_type && (
                  <span className="error-field">
                    {ErrorMessages?.inputField}
                  </span>
                )}
              </div>

              <div className="col-6 col-lg-3">
                <FormControl fullWidth className="mt-3">
                  <InputLabel htmlFor="Location">Location</InputLabel>
                  <Controller
                    control={control}
                    name="Location"
                    render={({ field: { onChange, value } }) => (
                      <Select
                        label="Server Location"
                        id="Location"
                        value={value}
                        onChange={(e) => {
                          onChange(e);
                        }}
                      >
                        <em>Server Location</em>
                        {locationData?.map((item) => (
                          <MenuItem key={item.valLid} value={item.val}>
                            {item.txt}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
                {errors.Location && (
                  <span className="error-field">
                    {ErrorMessages?.inputField}
                  </span>
                )}
              </div>
              <div className="col-6 col-lg-3">
                <TextField
                  label="Event Date"
                  type="date"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  {...register("Event_date")}
                />
                {errors.Event_date && (
                  <span className="error-field">
                    {ErrorMessages?.inputField}
                  </span>
                )}
              </div>
              <div className="col-6 col-lg-3">
                <FormControl fullWidth className="mt-3">
                  <InputLabel htmlFor="Partner">Server Partner</InputLabel>
                  <Controller
                    control={control}
                    name="Partner"
                    render={({ field: { onChange, value } }) => (
                      <Select
                        label="Server Partner"
                        id="Partner"
                        value={value}
                        onChange={(e) => {
                          onChange(e);
                        }}
                      >
                        <em>Server Partner</em>
                        {partnerData?.map((item) => (
                          <MenuItem key={item.valPid} value={item.val}>
                            {item.txt}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
                {errors.Partner && (
                  <span className="error-field">
                    {ErrorMessages?.inputField}
                  </span>
                )}
              </div>
              <div className="col-6 col-lg-3">
                <TextField
                  label="Number of Guest"
                  name="Name"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  {...register("Number_of_guest")}
                />
                {errors.Number_of_guest && (
                  <span className="error-field">
                    {ErrorMessages?.inputField}
                  </span>
                )}
              </div>

              <div className="col-6 col-lg-3">
                <FormControl fullWidth className="mt-3">
                  <InputLabel htmlFor="Venue">Type of Venue</InputLabel>
                  <Controller
                    control={control}
                    name="Type_of_Venue"
                    render={({ field: { onChange, value } }) => (
                      <Select
                        label="Server Venue"
                        id="Venue"
                        value={value}
                        onChange={(e) => {
                          onChange(e);
                        }}
                      >
                        <em>Server Venue</em>
                        {venueData?.map((item) => (
                          <MenuItem key={item.val} value={item.val}>
                            {item.txt}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
                {errors.Type_of_Venue && (
                  <span className="error-field">
                    {ErrorMessages?.inputField}
                  </span>
                )}
              </div>
              <div className="col-6 col-lg-3">
                <FormControl fullWidth className="mt-3">
                  <InputLabel htmlFor="Food">Type of Food</InputLabel>
                  <Controller
                    control={control}
                    name="Food"
                    render={({ field: { onChange, value } }) => (
                      <Select
                        label="Server Food"
                        id="Food"
                        value={value}
                        onChange={(e) => {
                          onChange(e);
                        }}
                      >
                        <em>Server Food</em>
                        {foodData?.map((item) => (
                          <MenuItem key={item.val} value={item.val}>
                            {item.txt}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
                {errors.Food && (
                  <span className="error-field">
                    {ErrorMessages?.inputField}
                  </span>
                )}
              </div>

              <div className="col-6 col-lg-3">
                <TextField
                  label="Number of Rooms"
                  name="Name"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  {...register("Number_of_rooms")}
                />
                {errors.Number_of_rooms && (
                  <span className="error-field">
                    {ErrorMessages?.inputField}
                  </span>
                )}
              </div>

              <div className="col-12 col-lg-6">
                <TextField
                  label="Budget"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  {...register("budgut")}
                />
                {errors.budgut && (
                  <span className="error-field">
                    {ErrorMessages?.inputField}
                  </span>
                )}
              </div>

              <div className="col-6 col-lg-3">
                <TextField
                  label="Created By"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  disabled
                  {...register("CreatedBy")}
                />
              </div>
              <div className="col-6 col-lg-3">
                <TextField
                  label="Created Date"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  disabled
                  {...register("Created_date")}
                />
              </div>

              <div className="col-6 col-lg-3">
                <TextField
                  label="Modified By"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  disabled
                  {...register("Modifiedby")}
                />
              </div>
              <div className="col-6 col-lg-3">
                <TextField
                  label="Modified Date"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  disabled
                  {...register("modified_date")}
                />
              </div>

              <div className="col-6 col-lg-3">
                <TextField
                  label="Visit Date"
                  type="date"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  {...register("Visit_Date")}
                />
                {errors.Visit_Date && (
                  <span className="error-field">
                    {ErrorMessages?.inputField}
                  </span>
                )}
              </div>

              <div className="col-6 col-lg-3">
                <TextField
                  label="Next Follow Up Date"
                  type="date"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  {...register("Next_Follow_Up_Date")}
                />
                {errors.Next_Follow_Up_Date && (
                  <span className="error-field">
                    {ErrorMessages?.inputField}
                  </span>
                )}
              </div>

              <div className="col-6 col-lg-3">
                <FormControl fullWidth className="mt-3">
                  <InputLabel htmlFor="Status">Status</InputLabel>
                  <Controller
                    control={control}
                    name="E_Status"
                    render={({ field: { onChange, value } }) => (
                      <Select
                        label="Status"
                        id="Status"
                        value={value}
                        onChange={(e) => {
                          onChange(e);
                        }}
                      >
                        <em>Status</em>
                        {statusData?.map((item) => (
                          <MenuItem key={item.valEid} value={item.val}>
                            {item.txt}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
                {errors.Event_type && (
                  <span className="error-field">
                    {ErrorMessages?.inputField}
                  </span>
                )}
              </div>

              <div className="col-12">
                <TextField
                  label="Remarks"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  {...register("Remarks")}
                />
                {errors.Remarks && (
                  <span className="error-field">
                    {ErrorMessages?.inputField}
                  </span>
                )}
              </div>

              <div className="row my-3">
                <div className="d-grid gap-2 col-8 mx-auto">
                  <button
                    className="btn btn-primary btn-full"
                    onClick={(e) => handleSubmit(submitHandler)(e)}
                  >
                    UPDATE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(LeadUpdate);
