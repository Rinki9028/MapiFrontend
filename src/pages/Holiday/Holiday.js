import React, { useEffect, useState } from "react";
import ApiHelper from "../../_helperFunctions/ApiHelper";
import {
  HOLIDAY,
  HOLIDAYGET,
  HOLIDAYINSERT,
  HOLIDAYUPDATE,
  HOLIDAYDELETE,
} from "../../utils/Constant/ApiEndpoint";
import { FOOD } from "../../utils/Constant/ApiEndpoint";
import Table from "../../component/Table/Table";
import ErrorMessages from "../../_helperFunctions/ErrorMessages";
import {
  Box,
  MenuItem,
  Modal,
  Select,
  InputLabel,
  FormControl,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Holiday = () => {
  const [holidayData, setHolidayData] = useState([]);
  const [holidayDetails, setHolidayDetails] = useState({});
  const [holidayModal, setHolidayModal] = useState(false);
  const [selectedHolidayType, setSelectedHolidayType] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedHoliday, setSelectedHoliday] = useState("");
  const handleDropdownChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
  };

  const holidayTypes = [
    { id: 1, name: "International Holiday" },
    { id: 2, name: "National Holiday" },
    { id: 3, name: "Dipawali" },
    { id: 4, name: "Durga Puja" },
  ];

  const defaultValues = {
    FoodName: "",
    Is_active: true,
  };

  const columns = [
    { field: "holiday_id", headerName: "ID", width: 50 },
    { field: "holidayName", headerName: "HolidayName", width: 350 },
    { field: "holidaytype", headerName: "HolidayType", width: 250 },
    { field: "holidaydate", headerName: "Holiday Date", width: 200 },
    {
      field: "Is_active",
      headerName: "Active",
      width: 200,
      renderCell: ({ row }) => (row.Is_active ? "Active" : "Inactive"),
    },
    {
      field: "Edit",
      headerName: "",
      sortable: false,
      width: 250,
      renderCell: ({ row }) => {
        return (
          <div>
            <span className="edit-icon" onClick={() => showHolidayData(row)}>
              <EditIcon />
            </span>
            <span
              className="delete-icon"
              onClick={() => deleteHolidayHandler(row.holiday_id)}
            >
              <DeleteIcon />
            </span>
          </div>
        );
      },
    },
  ];

  const schema = yup.object().shape({
    holidayName: yup.string().required(),
    holidaytype: yup.string().required(),
    holidaydate: yup.string().required(),
    Is_active: yup.boolean().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: defaultValues,
  });

  const { control } = useForm({ defaultValues: defaultValues });

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50vw",
    bgcolor: "background.paper",
    border: "1px solid #ccc",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    getHolidayData();
  }, []);

  const getHolidayData = () => {
    let obj = { valTid: 1, ValCase: "A" };
    ApiHelper.post(HOLIDAYGET, obj)
      .then(({ data }) => {
        if (data?.data?.length > 0) {
          setHolidayData(data.data);
        }
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };

  const showHolidayData = (data) => {
    setHolidayModal(true);
    setHolidayDetails(data);
    reset({ ...data });
  };

  const handleClose = () => {
    setHolidayModal(false);
    setHolidayDetails({});
    reset(defaultValues);
  };

  const addHolidayHandler = () => {
    setHolidayModal(true);
    setHolidayDetails({});
    reset(defaultValues);
  };

  const updateHolidayHandler = (obj) => {
    ApiHelper.post(HOLIDAYUPDATE, obj)
      .then(({ data }) => {
        if (data?.status == 200) {
          alert(data?.message);
          reset(defaultValues);
          getHolidayData();
          handleClose();
        } else if (data?.message) {
          alert(data?.message);
        }
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };

    const submitHandler = (data) => {
      if (holidayDetails?.holiday_id) {
        updateHolidayHandler(data);
      } else {
        saveHolidayHandler(data);
      }
    };



  const saveHolidayHandler = (obj) => {
    ApiHelper.post(HOLIDAYINSERT, obj)
      .then(({ data }) => {
        console.log("HOLIDAYINSERT : ", data);
        if (data?.status == 200) {
          alert(data?.message);
          reset(defaultValues);
          handleClose();
          getHolidayData();
        } else if (data?.message) {
          alert(data?.message);
        }
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };

  const deleteHolidayHandler = (id) => {
    ApiHelper.delete(HOLIDAYDELETE + "?holiday_id=" + id)
      .then(({ data }) => {
        if (data?.status === 200) {
          handleClose();
          getHolidayData();
        } else if (data?.message) {
          alert(data?.message);
        }
      })
      .catch((err) => console.log("err: ", err));
  };

  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-between mb-3">
          <h1>HoliDayListing</h1>
          <button className="btn btn-primary" onClick={addHolidayHandler}>
            Add HoliDay
          </button>
        </div>
        <Table
          data={holidayData}
          columns={columns}
          getRowId={(row) => row.holiday_id}
        />
        <Modal
          open={holidayModal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <h4 className="mb-3">
              {holidayDetails?.holiday_id ? "Edit" : "Add"} HoliDay
            </h4>
            <div className="card-body">
              <div className="row">
                <div className="col-6">
                  <div>
                    <label
                      htmlFor="holidayName"
                      className="form-label required"
                    >
                      HolidayName
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="holidayName"
                      {...register("holidayName")}
                      placeholder="Enter HolidayName"
                    />
                  </div>
                  {errors.holidayName && (
                    <span className="error-field">
                      {ErrorMessages?.inputField}
                    </span>
                  )}
                </div>
                <div className="col-6">
                  <FormControl fullWidth className="mt-3">
                    <InputLabel
                      htmlFor="holidaytype"
                      className="form-label required"
                    >
                      HoliDay Type
                    </InputLabel>
                    <Controller
                      control={control}
                      name="holidaytype"
                      render={({ field: { onChange, value } }) => (
                        <Select
                          type="text"
                          label="holidaytype"
                          className="form-control"
                          id="holidaytype"
                          {...register("holidaytype")}
                          value={selectedValue}
                          onChange={handleDropdownChange}
                        >
                          <em>Select Holiday Type</em>
                          {holidayTypes.map((type) => (
                            <MenuItem key={type.id} value={type.id}>
                              {type.name}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                  </FormControl>
                  {errors.holidaytype && (
                    <span className="error-field">
                      {ErrorMessages?.inputField}
                    </span>
                  )}
                </div>
                <div className="col-6">
                  <TextField
                    label="Holiday Date"
                    type="date"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    {...register("holidaydate")}
                  />
                  {errors.holidaydate && (
                    <span className="error-field">
                      {ErrorMessages?.inputField}
                    </span>
                  )}
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-4">
                  <label htmlFor="Is_active" className="form-label required">
                    Active
                  </label>
                  <div className="form-check form-switch mt-1">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckChecked"
                      {...register("Is_active")}
                      //defaultChecked={defaultValues.Is_active}
                    />
                  </div>
                </div>
              </div>
              <div className="text-center">
                <button
                  className="btn btn-primary"
                  onClick={(e) => handleSubmit(submitHandler)(e)}
                >
                  {holidayDetails?.holiday_id ? "Update" : "Save"}
                </button>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
};
export default React.memo(Holiday);
