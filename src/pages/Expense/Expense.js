import React, { useEffect, useState } from "react";
import ApiHelper from "../../_helperFunctions/ApiHelper";
import Table from "../../component/Table/Table";
import {
  GETEXPENSE,
  EXPENSE,
  GETMONTHS,
  GETYEARS,
} from "../../utils/Constant/ApiEndpoint";
import {
  Box,
  MenuItem,
  Modal,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import ErrorMessages from "../../_helperFunctions/ErrorMessages";
import { Controller, useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Expense = () => {
  const [expenseData, setExpenseData] = useState([]);
  const [expenseDetails, setExpenseDetails] = useState({});
  const [expenseModal, setExpenseModal] = useState(false);
  const [monthsData, setMonthsData] = useState([]);
  const [yearsData, setYearsData] = useState([]);

  const defaultValues = {
    ExpenseName: "",
    Is_active: true,
  };

  const columns = [
    { field: "Expense_id", headerName: "ID", width: 50 },
    { field: "ExpenseName", headerName: "ExpenseName", width: 300 },
    { field: "Month", headerName: "Month", width: 200 },
    { field: "Year", headerName: "Year", width: 150 },
    { field: "Amount", headerName: "Amount", width: 200 },
    {
      field: "Is_active",
      headerName: "Active",
      width: 250,
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
            <span className="edit-icon" onClick={() => showExpenseData(row)}>
              <EditIcon />
            </span>
            <span
              className="delete-icon"
              onClick={() => deleteExpenseHandler(row.Expense_id)}
            >
              <DeleteIcon />
            </span>
          </div>
        );
      },
    },
  ];

  const schema = yup.object().shape({
    ExpenseName: yup.string().required(),
    Month: yup.string().required(),
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
    getExpenseData();
    getMonthsData();
    getYearsData();
  }, []);
  useEffect(() => {
    console.log("Months Data:", monthsData);
  }, [monthsData]);

  const getExpenseData = () => {
    ApiHelper.get(EXPENSE)
      .then(({ data }) => {
        if (data.status === 200) {
          setExpenseData(data.data);
        }
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };

  const getMonthsData = () => {
    let obj = { valMid: 1, ValCase: "A" };
    ApiHelper.post(GETMONTHS, obj)
      .then(({ data }) => {
        console.log("Months Data:", data); // Log the data
        if (data?.data?.length > 0) {
          setMonthsData(data.data);
        }
      })
      .catch((err) => {
        console.log("Error fetching Months Data:", err);
      });
  };

  const getYearsData = () => {
    let obj = { valMid: 1, ValCase: "A" };
    ApiHelper.post(GETYEARS, obj)
      .then(({ data }) => {
        console.log("Years Data:", data); // Log the data
        if (data?.data?.length > 0) {
          setYearsData(data.data);
        }
      })
      .catch((err) => {
        console.log("Error fetching Months Data:", err);
      });
  };

  const showExpenseData = (data) => {
    setExpenseModal(true);
    setExpenseDetails(data);
    reset({ ...data });
  };

  const handleClose = () => {
    setExpenseModal(false);
    setExpenseDetails({});
    reset(defaultValues);
  };

  const addExpenseHandler = () => {
    setExpenseModal(true);
    setExpenseDetails({});
    reset(defaultValues);
  };

  const submitHandler = (data) => {
    if (expenseDetails?.Expense_id) {
      updateExpenseHandler(data);
    } else {
      saveExpenseHandler(data);
    }
  };

  const updateExpenseHandler = (data) => {
    ApiHelper.put(EXPENSE, data)
      .then(({ data }) => {
        if (data?.status === 200) {
          handleClose();
          getExpenseData();
        } else if (data?.message) {
          alert(data?.message);
        }
      })
      .catch((err) => console.log("err: ", err));
  };

  const saveExpenseHandler = (data) => {
    ApiHelper.post(EXPENSE, data)
      .then(({ data }) => {
        if (data?.status === 200) {
          handleClose();
          getExpenseData();
        } else if (data?.message) {
          alert(data?.message);
        }
      })
      .catch((err) => console.log("err: ", err));
  };

  const deleteExpenseHandler = (id) => {
    ApiHelper.delete(EXPENSE + "?Expense_id=" + id)
      .then(({ data }) => {
        if (data?.status === 200) {
          handleClose();
          getExpenseData();
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
          <h1>ExpenseListing</h1>
          <button className="btn btn-primary" onClick={addExpenseHandler}>
            Add Expense
          </button>
        </div>
        <Table
          data={expenseData}
          columns={columns}
          getRowId={(row) => row.Expense_id}
        />
        <Modal
          open={expenseModal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <h4 className="mb-3">
              {expenseDetails?.Expense_id ? "Edit" : "Add"} Expense
            </h4>
            <div className="card-body">
              <div className="row">
                <div className="col-6">
                  <div>
                    <label
                      htmlFor="ExpenseName"
                      className="form-label required"
                    >
                      ExpenseName
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="ExpenseName"
                      {...register("ExpenseName")}
                      placeholder="Enter ExpenseName"
                    />
                  </div>
                  {errors.ExpenseName && (
                    <span className="error-field">
                      {ErrorMessages?.inputField}
                    </span>
                  )}
                </div>

                <div className="col-6">
                  <FormControl fullWidth className="mt-3">
                    <InputLabel htmlFor="Month" className="form-label required">
                      Month
                    </InputLabel>
                    <Controller
                      control={control}
                      name="Month"
                      render={({ field: { onChange, value } }) => (
                        <Select
                          type="text"
                          label="Month"
                          className="form-control"
                          id="Month"
                          {...register("Month")}
                          value={value}
                          onChange={(e) => {
                            onChange(e);
                          }}
                        >
                          <em>Month</em>
                          {monthsData?.map((item) => (
                            <MenuItem key={item.valMid} value={item.txt}>
                              {item.txt}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                  </FormControl>
                  {errors.Months && (
                    <span className="error-field">
                      {ErrorMessages?.inputField}
                    </span>
                  )}
                </div>
                <div className="col-6">
                  <FormControl fullWidth className="mt-3">
                    <InputLabel htmlFor="Year" className="form-label required">Years</InputLabel>
                    <Controller
                      control={control}
                      name="Year"
                      render={({ field: { onChange, value } }) => (
                        <Select
                        type="text"
                          label="Year"
                          className="form-control"
                          id="Year"
                          {...register("Year")}
                          value={value}
                          onChange={(e) => {
                            onChange(e);
                          }}
                        >
                          <em>Years</em>
                          {yearsData?.map((item) => (
                            <MenuItem key={item.valMid} value={item.txt}>
                              {item.txt}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                  </FormControl>
                  {errors.Years && (
                    <span className="error-field">
                      {ErrorMessages?.inputField}
                    </span>
                  )}
                </div>
                <div className="col-6">
                  <div>
                    <label htmlFor="Amount" className="form-label required">
                      Amount
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="Amount"
                      {...register("Amount")}
                      placeholder="Enter Amount"
                    />
                  </div>
                  {errors.Amount && (
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
                  {expenseDetails?.Expense_id ? "Update" : "Save"}
                </button>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
};
export default React.memo(Expense);
