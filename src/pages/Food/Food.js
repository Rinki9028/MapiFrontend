import React, { useEffect, useState } from "react";
import ApiHelper from "../../_helperFunctions/ApiHelper";
import { FOOD } from "../../utils/Constant/ApiEndpoint";
import Table from "../../component/Table/Table";
import { Box, Modal } from "@mui/material";
import ErrorMessages from "../../_helperFunctions/ErrorMessages";
import { useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Food = () => {
  const [foodsData, setFoodData] = useState([]);
  const [foodDetails, setFoodDetails] = useState({});
  const [foodModal, setFoodModal] = useState(false);

  const defaultValues = {
    FoodName: "",
    Is_active: true,
  };

  const columns = [
    { field: "Food_id", headerName: "ID", width: 50 },
    { field: "FoodName", headerName: "FoodName", width: 400 },
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
            <span className="edit-icon" onClick={() => showFoodData(row)}>
              <EditIcon />
            </span>
            <span
              className="delete-icon"
              onClick={() => deleteFoodHandler(row.Food_id)}
            >
              <DeleteIcon />
            </span>
          </div>
        );
      },
    },
  ];

  const schema = yup.object().shape({
    FoodName: yup.string().required(),
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
    getFoodData();
  }, []);

  const getFoodData = () => {
    ApiHelper.get(FOOD)
      .then(({ data }) => {
        if (data.status === 200) {
          setFoodData(data.data);
        }
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };

  const showFoodData = (data) => {
    setFoodModal(true);
    setFoodDetails(data);
    reset({ ...data });
  };

  const handleClose = () => {
    setFoodModal(false);
    setFoodDetails({});
    reset(defaultValues);
  };

  const addFoodHandler = () => {
    setFoodModal(true);
    setFoodDetails({});
    reset(defaultValues);
  };

  const submitHandler = (data) => {
    if (foodDetails?.Food_id) {
      updateFoodHandler(data);
    } else {
      saveFoodHandler(data);
    }
  };

  const updateFoodHandler = (data) => {
    ApiHelper.put(FOOD, data)
      .then(({ data }) => {
        if (data?.status === 200) {
          handleClose();
          getFoodData();
        } else if (data?.message) {
          alert(data?.message);
        }
      })
      .catch((err) => console.log("err: ", err));
  };

  const saveFoodHandler = (data) => {
    ApiHelper.post(FOOD, data)
      .then(({ data }) => {
        if (data?.status === 200) {
          handleClose();
          getFoodData();
        } else if (data?.message) {
          alert(data?.message);
        }
      })
      .catch((err) => console.log("err: ", err));
  };

  const deleteFoodHandler = (id) => {
    ApiHelper.delete(FOOD + "?Food_id=" + id)
      .then(({ data }) => {
        if (data?.status === 200) {
          handleClose();
          getFoodData();
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
          <h1>Food Listing</h1>
          <button className="btn btn-primary" onClick={addFoodHandler}>
            Add Food
          </button>
        </div>
        <Table
          data={foodsData}
          columns={columns}
          getRowId={(row) => row.Food_id}
        />
        <Modal
          open={foodModal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <h4 className="mb-3">
              {foodDetails?.Food_id ? "Edit" : "Add"} Food
            </h4>
            <div className="card-body">
              <div className="row">
                <div className="col-8">
                  <div>
                    <label htmlFor="FoodName" className="form-label required">
                      FoodName
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="FoodName"
                      {...register("FoodName")}
                      placeholder="Enter FoodName"
                    />
                  </div>
                  {errors.FoodName && (
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
                  {foodDetails?.Food_id ? "Update" : "Save"}
                </button>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
};
export default React.memo(Food);
