import React, { useEffect, useState } from "react";
import ApiHelper from "../../_helperFunctions/ApiHelper";
import { VENUE } from "../../utils/Constant/ApiEndpoint";
import Table from "../../component/Table/Table";
import { Box, Modal } from "@mui/material";
import ErrorMessages from "../../_helperFunctions/ErrorMessages";
import { useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Venue = () => {
  const [venueData, setVenueData] = useState([]);
  const [venueDetails, setVenueDetails] = useState({});
  const [venueModal, setVenueModal] = useState(false);

  const defaultValues = {
    VenueName: "",
    Is_active: true,
  };

  const columns = [
    { field: "Venue_id", headerName: "ID", width: 50 },
    { field: "VenueName", headerName: "VenueName", width: 400 },
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
            <span className="edit-icon" onClick={() => showVenueData(row)}>
              <EditIcon />
            </span>
            <span
              className="delete-icon"
              onClick={() => deleteVenueHandler(row.Venue_id)}
            >
              <DeleteIcon />
            </span>
          </div>
        );
      },
    },
  ];

  const schema = yup.object().shape({
    VenueName: yup.string().required(),
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
    getVenueData();
  }, []);

  const getVenueData = () => {
    ApiHelper.get(VENUE)
      .then(({ data }) => {
        if (data.status === 200) {
          setVenueData(data.data);
        }
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };

  const showVenueData = (data) => {
    setVenueModal(true);
    setVenueDetails(data);
    reset({ ...data });
  };

  const handleClose = () => {
    setVenueModal(false);
    setVenueDetails({});
    reset(defaultValues);
  };

  const addVenueHandler = () => {
    setVenueModal(true);
    setVenueDetails({});
    reset(defaultValues);
  };

  const submitHandler = (data) => {
    if (venueDetails?.Venue_id) {
      updateVenueHandler(data);
    } else {
      saveVenueHandler(data);
    }
  };

  const updateVenueHandler = (data) => {
    ApiHelper.put(VENUE, data)
      .then(({ data }) => {
        if (data?.status === 200) {
          handleClose();
          getVenueData();
        } else if (data?.message) {
          alert(data?.message);
        }
      })
      .catch((err) => console.log("err: ", err));
  };

  const saveVenueHandler = (data) => {
    ApiHelper.post(VENUE, data)
      .then(({ data }) => {
        if (data?.status === 200) {
          handleClose();
          getVenueData();
        } else if (data?.message) {
          alert(data?.message);
        }
      })
      .catch((err) => console.log("err: ", err));
  };

  const deleteVenueHandler = (id) => {
    ApiHelper.delete(VENUE + "?Venue_id=" + id)
      .then(({ data }) => {
        if (data?.status === 200) {
          handleClose();
          getVenueData();
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
          <h1>Venue Listing</h1>
          <button className="btn btn-primary" onClick={addVenueHandler}>
            Add Venue
          </button>
        </div>
        <Table
          data={venueData}
          columns={columns}
          getRowId={(row) => row.Venue_id}
        />
        <Modal
          open={venueModal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <h4 className="mb-3">
              {venueDetails?.Venue_id ? "Edit" : "Add"} Venue
            </h4>
            <div className="card-body">
              <div className="row">
                {/* <div className="col-4">
                  <div>
                    <label htmlFor="Venue_id" className="form-label required">
                      Venue_id
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="Venue_id"
                      disabled
                      {...register("Venue_id")}
                      placeholder="Enter Venue_id"
                    />
                  </div>
                  {errors.Venue_id && (
                    <span className="error-field">
                      {ErrorMessages?.inputField}
                    </span>
                  )}
                </div> */}
                <div className="col-8">
                  <div>
                    <label htmlFor="VenueName" className="form-label required">
                      VenueName
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="VenueName"
                      {...register("VenueName")}
                      placeholder="Enter VenueName"
                    />
                  </div>
                  {errors.VenueName && (
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
                  {venueDetails?.Venue_id ? "Update" : "Save"}
                </button>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
};
export default React.memo(Venue);
