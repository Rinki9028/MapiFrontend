import React, { useEffect, useState } from "react";
import ApiHelper from "../../_helperFunctions/ApiHelper";
import { ESTATUS } from "../../utils/Constant/ApiEndpoint";
import Table from "../../component/Table/Table";
import { Box, Modal } from "@mui/material";
import ErrorMessages from "../../_helperFunctions/ErrorMessages";
import { useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Status = () => {
  const [statusData, setStatusData] = useState([]);
  const [statusDetails, setStatusDetails] = useState({});
  const [statusModal, setStatusModal] = useState(false);

  const defaultValues = {
    StatusName: "",
    Is_active: true,
  };

  const columns = [
    { field: "LeadStatus_id", headerName: "ID", width: 50 },
    { field: "StatusName", headerName: "StatusName", width: 400 },
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
            <span className="edit-icon" onClick={() => showStatusData(row)}>
              <EditIcon />
            </span>
            <span
              className="delete-icon"
              onClick={() => deleteStatusHandler(row.LeadStatus_id)}
            >
              <DeleteIcon />
            </span>
          </div>
        );
      },
    },
  ];

  const schema = yup.object().shape({
    StatusName: yup.string().required(),
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
    getStatusData();
  }, []);

  const getStatusData = () => {
    ApiHelper.get(ESTATUS)
      .then(({ data }) => {
        if (data.status === 200) {
          setStatusData(data.data);
        }
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };

  const showStatusData = (data) => {
    setStatusModal(true);
    setStatusDetails(data);
    reset({...data})
  };

  const handleClose = () => {
    setStatusModal(false);
    setStatusDetails({});
    reset(defaultValues);
  };

  const addStatusHandler = () => {
    setStatusModal(true);
    setStatusDetails({});
    reset(defaultValues);
  };

  const submitHandler = (data) => {
    if (statusDetails?.LeadStatus_id) {
      updateStatusHandler(data);
    } else {
      saveStatusHandler(data);
    }
  };

  const updateStatusHandler = (data) => {
    ApiHelper.put(ESTATUS, data)
      .then(({ data }) => {
        if (data?.status === 200) {
          handleClose();
          getStatusData();
        } else if (data?.message) {
          alert(data?.message);
        }
      })
      .catch((err) => console.log("err: ", err));
  };

  const saveStatusHandler = (data) => {
    ApiHelper.post(ESTATUS, data)
      .then(({ data }) => {
        if (data?.status === 200) {
          handleClose();
          getStatusData();
        } else if (data?.message) {
          alert(data?.message);
        }
      })
      .catch((err) => console.log("err: ", err));
  };

  const deleteStatusHandler = (id) => {
    ApiHelper.delete(ESTATUS + "?LeadStatus_id=" + id)
      .then(({ data }) => {
        if (data?.status === 200) {
          handleClose();
          getStatusData();
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
          <h1>Status Listing</h1>
          <button className="btn btn-primary" onClick={addStatusHandler}>
            Add Status
          </button>
        </div>
        <Table
          data={statusData}
          columns={columns}
          getRowId={(row) => row.LeadStatus_id}
        />
        <Modal
          open={statusModal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <h4 className="mb-3">
              {statusDetails?.LeadStatus_id ? "Edit" : "Add"} Status
            </h4>
            <div className="card-body">
              <div className="row">
              {/* <div className="col-4">
                  <div>
                    <label htmlFor="LeadStatus_id" className="form-label required">
                    LeadStatus_id
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="LeadStatus_id"
                      disabled
                      {...register("LeadStatus_id")}
                      placeholder="Enter LeadStatus_id"
                    />
                  </div>
                  {errors.LeadStatus_id && (
                    <span className="error-field">
                      {ErrorMessages?.inputField}
                    </span>
                  )}
                </div> */}
                <div className="col-8">
                  <div>
                    <label htmlFor="StatusName" className="form-label required">
                      StatusName
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="StatusName"
                      {...register("StatusName")}
                      placeholder="Enter StatusName"
                    />
                  </div>
                  {errors.StatusName && (
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
                  {statusDetails?.LeadStatus_id ? "Update" : "Save"}
                </button>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
};
export default React.memo(Status);
