import React, { useEffect, useState } from "react";
import ApiHelper from "../../_helperFunctions/ApiHelper";
import { EVENTS } from "../../utils/Constant/ApiEndpoint";
import Table from "../../component/Table/Table";
import { Box, Modal } from "@mui/material";
import ErrorMessages from "../../_helperFunctions/ErrorMessages";
import { useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const EventType = () => {
  const [eventData, setEventData] = useState([]);
  const [eventDetails, setEventsDetails] = useState({});
  const [eventModal, setEventModal] = useState(false);

  const defaultValues = {
    EventName: "",
    Is_active: true,
  };

  const columns = [
    { field: "Event_id", headerName: "ID", width: 50 },
    { field: "EventName", headerName: "EventName", width: 400 },
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
            <span className="edit-icon" onClick={() => showEventData(row)}>
              <EditIcon />
            </span>
            <span
              className="delete-icon"
              onClick={() => deleteEventHandler(row.Event_id)}
            >
              <DeleteIcon />
            </span>
          </div>
        );
      },
    },
  ];

  const schema = yup.object().shape({
    EventName: yup.string().required(),
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
    getEventData();
  }, []);

  const getEventData = () => {
    ApiHelper.get(EVENTS)
      .then(({ data }) => {
        if (data.status === 200) {
            setEventData(data.data);
        }
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };

  const showEventData = (data) => {
    setEventModal(true);
    setEventsDetails(data);
    reset({ ...data });
  };

  const handleClose = () => {
    setEventModal(false);
    setEventsDetails({});
    reset(defaultValues);
  };

  const addEventHandler = () => {
    setEventModal(true);
    setEventsDetails({});
    reset(defaultValues);
  };

  const submitHandler = (data) => {
    if (eventDetails?.Event_id) {
      updateEventHandler(data);
    } else {
      saveEventHandler(data);
    }
  };

  const updateEventHandler = (data) => {
    ApiHelper.put(EVENTS, data)
      .then(({ data }) => {
        if (data?.status === 200) {
          handleClose();
          getEventData();
        } else if (data?.message) {
          alert(data?.message);
        }
      })
      .catch((err) => console.log("err: ", err));
  };

  const saveEventHandler = (data) => {
    ApiHelper.post(EVENTS, data)
      .then(({ data }) => {
        if (data?.status === 200) {
          handleClose();
          getEventData();
        } else if (data?.message) {
          alert(data?.message);
        }
      })
      .catch((err) => console.log("err: ", err));
  };

  const deleteEventHandler = (id) => {
    ApiHelper.delete(EVENTS + "?Event_id=" + id)
      .then(({ data }) => {
        if (data?.status === 200) {
          handleClose();
          getEventData();
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
          <h1>Events Listing</h1>
          <button className="btn btn-primary" onClick={addEventHandler}>
            Add Events
          </button>
        </div>
        <Table
          data={eventData}
          columns={columns}
          getRowId={(row) => row.Event_id}
        />
        <Modal
          open={eventModal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <h4 className="mb-3">
              {eventDetails?.Event_id ? "Edit" : "Add"} Events
            </h4>
            <div className="card-body">
              <div className="row">
                <div className="col-8">
                  <div>
                    <label htmlFor="EventName" className="form-label required">
                    EventName
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="EventName"
                      {...register("EventName")}
                      placeholder="Enter EventName"
                    />
                  </div>
                  {errors.EventName && (
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
                  {eventDetails?.Event_id ? "Update" : "Save"}
                </button>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
};
export default React.memo(EventType);
