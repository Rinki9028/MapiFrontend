import React, { useEffect, useState } from "react";
import ApiHelper from "../../_helperFunctions/ApiHelper";
import { PARTNER } from "../../utils/Constant/ApiEndpoint";
import Table from "../../component/Table/Table";
import { Box, Modal } from "@mui/material";
import ErrorMessages from "../../_helperFunctions/ErrorMessages";
import { useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const VendorPartner = () => {
  const [partnerData, setPartnerData] = useState([]);
  const [partnerDetails, setPartnerDetails] = useState({});
  const [partnerModal, setPartnerModal] = useState(false);

  const defaultValues = {
    PartnerName: "",
    Is_active: true,
  };

  const columns = [
    { field: "VendorPartner_id", headerName: "ID", width: 50 },
    { field: "PartnerName", headerName: "PartnerName", width: 400 },
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
            <span className="edit-icon" onClick={() => showPartnerData(row)}>
              <EditIcon />
            </span>
            <span
              className="delete-icon"
              onClick={() => deletePartnerHandler(row.VendorPartner_id)}
            >
              <DeleteIcon />
            </span>
          </div>
        );
      },
    },
  ];

  const schema = yup.object().shape({
    PartnerName: yup.string().required(),
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
    getPartnerData();
  }, []);

  const getPartnerData = () => {
    ApiHelper.get(PARTNER)
      .then(({ data }) => {
        if (data.status === 200) {
          setPartnerData(data.data);
        }
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };

  const showPartnerData = (data) => {
    setPartnerModal(true);
    setPartnerDetails(data);
    reset({ ...data });
  };

  const handleClose = () => {
    setPartnerModal(false);
    setPartnerDetails({});
    reset(defaultValues);
  };

  const addPartnerHandler = () => {
    setPartnerModal(true);
    setPartnerDetails({});
    reset(defaultValues);
  };

  const submitHandler = (data) => {
    if (partnerDetails?.VendorPartner_id) {
      updatePartnerHandler(data);
    } else {
      savePartnerHandler(data);
    }
  };

  const updatePartnerHandler = (data) => {
    ApiHelper.put(PARTNER, data)
      .then(({ data }) => {
        if (data?.status === 200) {
          handleClose();
          getPartnerData();
        } else if (data?.message) {
          alert(data?.message);
        }
      })
      .catch((err) => console.log("err: ", err));
  };

  const savePartnerHandler = (data) => {
    ApiHelper.post(PARTNER, data)
      .then(({ data }) => {
        if (data?.status === 200) {
          handleClose();
          getPartnerData();
        } else if (data?.message) {
          alert(data?.message);
        }
      })
      .catch((err) => console.log("err: ", err));
  };

  const deletePartnerHandler = (id) => {
    ApiHelper.delete(PARTNER + "?VendorPartner_id=" + id)
      .then(({ data }) => {
        if (data?.status === 200) {
          handleClose();
          getPartnerData();
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
          <h1>VendorPartner Listing</h1>
          <button className="btn btn-primary" onClick={addPartnerHandler}>
            Add VendorPartner
          </button>
        </div>
        <Table
          data={partnerData}
          columns={columns}
          getRowId={(row) => row.VendorPartner_id}
        />
        <Modal
          open={partnerModal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <h4 className="mb-3">
              {partnerDetails?.VendorPartner_id ? "Edit" : "Add"} VendorPartner
            </h4>
            <div className="card-body">
              <div className="row">
                {/* <div className="col-4">
                  <div>
                    <label htmlFor="VendorPartner_id" className="form-label required">
                    VendorPartner_id
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="VendorPartner_id"
                      disabled
                      {...register("VendorPartner_id")}
                      placeholder="Enter VendorPartner_id"
                    />
                  </div>
                  {errors.VendorPartner_id && (
                    <span className="error-field">
                      {ErrorMessages?.inputField}
                    </span>
                  )}
                </div> */}
                <div className="col-8">
                  <div>
                    <label htmlFor="PartnerName" className="form-label required">
                    PartnerName
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="PartnerName"
                      {...register("PartnerName")}
                      placeholder="Enter PartnerName"
                    />
                  </div>
                  {errors.PartnerName && (
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
                  {partnerDetails?.VendorPartner_id ? "Update" : "Save"}
                </button>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
};
export default React.memo(VendorPartner);
