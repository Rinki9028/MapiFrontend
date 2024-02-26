import React, { useEffect, useState } from "react";
import ApiHelper from "../../_helperFunctions/ApiHelper";
import { LOCATION } from "../../utils/Constant/ApiEndpoint";
import Table from "../../component/Table/Table";
import { Box, Modal } from "@mui/material";
import ErrorMessages from "../../_helperFunctions/ErrorMessages";
import { useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Location = () => {
  const [locationData, setLocationData] = useState([]);
  const [locationDetails, setLocationDetails] = useState({});
  const [locationModal, setLocationModal] = useState(false);

  const defaultValues = {
    LocationName: "",
    Is_active: true,
  };

  const columns = [
    { field: "Location_id", headerName: "ID", width: 50 },
    { field: "LocationName", headerName: "LocationName", width: 400 },
    {
      field: "Is_active",
      headerName: "Active",
      width: 400,
      renderCell: ({ row }) => (row.Is_active ? "Active" : "Inactive"),
    },
    {
      field: "Edit",
      headerName: "",
      sortable: false,
      width: 400,
      renderCell: ({ row }) => {
        return (
          <div>
            <span className="edit-icon" onClick={() => showLocationData(row)}>
              <EditIcon />
            </span>
            <span
              className="delete-icon"
              onClick={() => deleteLocationHandler(row.Location_id)}
            >
              <DeleteIcon />
            </span>
          </div>
        );
      },
    },
  ];

  const schema = yup.object().shape({
    LocationName: yup.string().required(),
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
    getLocationData();
  }, []);

  const getLocationData = () => {
    ApiHelper.get(LOCATION)
      .then(({ data }) => {
        if (data.status === 200) {
            setLocationData(data.data);
        }
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };

  const showLocationData = (data) => {
    setLocationModal(true);
    setLocationDetails(data);
    reset({ ...data });
  };

  const handleClose = () => {
    setLocationModal(false);
    setLocationDetails({});
    reset(defaultValues);
  };

  const addLocationHandler = () => {
    setLocationModal(true);
    setLocationDetails({});
    reset(defaultValues);
  };

  const submitHandler = (data) => {
    if (locationDetails?.Location_id) {
      updateLocationHandler(data);
    } else {
      saveLocationHandler(data);
    }
  };

  const updateLocationHandler = (data) => {
    ApiHelper.put(LOCATION, data)
      .then(({ data }) => {
        if (data?.status === 200) {
          handleClose();
          getLocationData();
        } else if (data?.message) {
          alert(data?.message);
        }
      })
      .catch((err) => console.log("err: ", err));
  };

  const saveLocationHandler = (data) => {
    ApiHelper.post(LOCATION, data)
      .then(({ data }) => {
        if (data?.status === 200) {
          handleClose();
          getLocationData();
        } else if (data?.message) {
          alert(data?.message);
        }
      })
      .catch((err) => console.log("err: ", err));
  };

  const deleteLocationHandler = (id) => {
    ApiHelper.delete(LOCATION + "?Location_id=" + id)
      .then(({ data }) => {
        if (data?.status === 200) {
          handleClose();
          getLocationData();
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
          <h1>Locations Listing</h1>
          <button className="btn btn-primary" onClick={addLocationHandler}>
            Add Locations
          </button>
        </div>
        <Table
          data={locationData}
          columns={columns}
          getRowId={(row) => row.Location_id}
        />
        <Modal
          open={locationModal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <h4 className="mb-3">
              {locationDetails?.Location_id ? "Edit" : "Add"} Locations
            </h4>
            <div className="card-body">
              <div className="row">
                {/* <div className="col-4">
                  <div>
                    <label htmlFor="Location_id" className="form-label required">
                    Location_id
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="Location_id"
                      disabled
                      {...register("Location_id")}
                      placeholder="Enter Location_id"
                    />
                  </div>
                  {errors.Location_id && (
                    <span className="error-field">
                      {ErrorMessages?.inputField}
                    </span>
                  )}
                </div> */}
                <div className="col-8">
                  <div>
                    <label htmlFor="LocationName" className="form-label required">
                    LocationName
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="LocationName"
                      {...register("LocationName")}
                      placeholder="Enter LocationName"
                    />
                  </div>
                  {errors.LocationName && (
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
                    />
                  </div>
                </div>
              </div>
              <div className="text-center">
                <button
                  className="btn btn-primary"
                  onClick={(e) => handleSubmit(submitHandler)(e)}
                >
                  {locationDetails?.Location_id ? "Update" : "Save"}
                </button>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
};
export default React.memo(Location);
