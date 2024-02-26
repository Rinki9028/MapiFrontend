import React, { useEffect, useState } from "react";
import ApiHelper from "../../_helperFunctions/ApiHelper";
import { EMPLOYEE } from "../../utils/Constant/ApiEndpoint";
import Table from "../../component/Table/Table";
import { Box, Modal } from "@mui/material";
import ErrorMessages from "../../_helperFunctions/ErrorMessages";
import { useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Employee = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [employeeDetails, setEmployeeDetails] = useState({});
  const [employeeModal, setEmployeeModal] = useState(false);

  const defaultValues = {
    Username: "",
    CPassword: "",
    Is_active: 1,
  };

  const columns = [
    { field: "Login_id", headerName: "ID", width: 50 },
    { field: "Username", headerName: "Username", width: 400 },
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
            <span className="edit-icon" onClick={() => showEmployeeData(row)}>
              <EditIcon />
            </span>
            <span
              className="delete-icon"
              onClick={() => deleteEmployeeHandler(row.Login_id)}
            >
              <DeleteIcon />
            </span>
          </div>
        );
      },
    },
  ];

  const schema = yup.object().shape({
    categoryId: yup.string(),
    Username: yup.string().required(),
    CPassword: yup.string().required(),
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
    getEmployeeData();
  }, []);

  const getEmployeeData = () => {
    ApiHelper.get(EMPLOYEE)
      .then(({ data }) => {
        if (data.status == 200) {
          setEmployeeData(data.data);
        }
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };

  const showEmployeeData = (data) => {
    setEmployeeModal(true);
    setEmployeeDetails(data);
    reset({ ...data, CPassword: "****" });
  };

  const handleClose = () => {
    setEmployeeModal(false);
    setEmployeeDetails({});
    reset(defaultValues);
  };
  const addEmployeeHandler = () => {
    setEmployeeModal(true);
    setEmployeeDetails({});
    reset(defaultValues);
  };

  const submitHandler = (data) => {
    if (data?.Login_id) {
      updateEmployeeHandler(data);
    } else {
      saveEmployeeHandler(data);
    }
  };

  const updateEmployeeHandler = (data) => {
    ApiHelper.put(EMPLOYEE, data)
      .then(({ data }) => {
        if (data?.status == 200) {
          handleClose();
          getEmployeeData();
        } else if (data?.message) {
          alert(data?.message);
        }
      })
      .catch((err) => console.log("err: ", err));
  };

  const saveEmployeeHandler = (data) => {
    ApiHelper.post(EMPLOYEE, data)
      .then(({ data }) => {
        if (data?.status == 200) {
          handleClose();
          getEmployeeData();
        } else if (data?.message) {
          alert(data?.message);
        }
      })
      .catch((err) => console.log("err: ", err));
  };

  const deleteEmployeeHandler = (id) => {
    ApiHelper.delete(EMPLOYEE + "?Login_id=" + id)
      .then(({ data }) => {
        if (data?.status == 200) {
          handleClose();
          getEmployeeData();
        } else if (data?.message) {
          alert(data?.message);
        }
      })
      .catch((err) => console.log("err: ", err));
  };
  return (
    <div className="container">
      <div className="d-flex justify-content-between mb-3">
        <h1>Employee Listing</h1>
        <button className="btn btn-primary" onClick={addEmployeeHandler}>
          Add Employee
        </button>
      </div>
      <Table
        data={employeeData}
        columns={columns}
        getRowId={(row) => row.Login_id}
      />

      <Modal
        open={employeeModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <h4 className="mb-3">
            {employeeDetails?.Login_id ? "Edit" : "Add"} Employee
          </h4>
          <div className="card-body">
            <div className="row">
              <div className="col-4">
                <div>
                  <label htmlFor="Username" className="form-label required">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="Username"
                    {...register("Username")}
                    placeholder="Enter Username"
                  />
                </div>
                {errors.Username && (
                  <span className="error-field">
                    {ErrorMessages?.inputField}
                  </span>
                )}
              </div>
              <div className="col-8">
                <div>
                  <label htmlFor="CPassword" className="form-label required">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="CPassword"
                    {...register("CPassword")}
                    placeholder="Enter Password"
                  />
                </div>
                {errors.CPassword && (
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
                {employeeDetails?.Login_id ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default React.memo(Employee);
