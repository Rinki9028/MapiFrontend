// import React, { useEffect, useState } from "react";
// import ApiHelper from "../../_helperFunctions/ApiHelper";
// import Table from "../../component/Table/Table";
// import {
//   HOLYDAYINSERT,
//   HOLYDAYGET,
//   HOLYDAYUPDATE,
//   HOLYDAYDELETE,
// } from "../../utils/Constant/ApiEndpoint";
// import {
//   Box,
//   MenuItem,
//   Button,
//   Modal,
//   Select,
//   InputLabel,
//   FormControl,
// } from "@mui/material";
// import axios from "axios";
// import ErrorMessages from "../../_helperFunctions/ErrorMessages";
// import { Controller, useForm } from "react-hook-form";

// import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";

// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";

// const Holyday = () => {
//   const [holydayData, setHolydayData] = useState([]);
//   const [holydayDetails, setHolydayDetails] = useState({});
//   const [holydayModal, setHolydayModal] = useState(false);
//   const [selectedHoliday, setSelectedHoliday] = useState("");

//   const handleHolidayChange = (event) => {
//     setSelectedHoliday(event.target.value);
//   };

//   const handleSave = async () => {
//     try {
//       // Make an API request to save the selected holiday in the database
//       await axios.post("/api/holidayEntry", { holidayName: selectedHoliday });
//       // You can add further logic or feedback here if needed
//       console.log("Holiday saved successfully!");
//     } catch (error) {
//       console.error("Error saving holiday:", error);
//     }
//   };

//   const defaultValues = {
//     holidayName: "",
//     Is_active: true,
//   };

//   const columns = [
//     { field: "holiday_id", headerName: "ID", width: 50 },
//     { field: "holidayName", headerName: "HolidayName", width: 350 },
//     { field: "holidaytype", headerName: "HolydayType", width: 250 },
//     { field: "holidaydate", headerName: "Holyday Date", width: 200 },
//     {
//       field: "Is_active",
//       headerName: "Active",
//       width: 250,
//       renderCell: ({ row }) => (row.Is_active ? "Active" : "Inactive"),
//     },
//     {
//       field: "Edit",
//       headerName: "",
//       sortable: false,
//       width: 250,
//       renderCell: ({ row }) => {
//         return (
//           <div>
//             <span className="edit-icon" onClick={() => showHolydayData(row)}>
//               <EditIcon />
//             </span>
//             <span
//               className="delete-icon"
//               onClick={() => deleteHolydayHandler(row.holiday_id)}
//             >
//               <DeleteIcon />
//             </span>
//           </div>
//         );
//       },
//     },
//   ];

//   const schema = yup.object().shape({
//     holidayName: yup.string().required(),
//     holidaytype: yup.string().required(),
//     Is_active: yup.boolean().required(),
//   });

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm({
//     mode: "onChange",
//     resolver: yupResolver(schema),
//     defaultValues: defaultValues,
//   });

//   const { control } = useForm({ defaultValues: defaultValues });

//   const modalStyle = {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     width: "50vw",
//     bgcolor: "background.paper",
//     border: "1px solid #ccc",
//     boxShadow: 24,
//     p: 4,
//   };

//   useEffect(() => {
//     getHolydayData();
//     updateHolydayHandler();
//     saveHolydayHandler();
//   }, []);
//   // useEffect(() => {
//   //   console.log("holidaytype Data:", holydaytypeData);
//   // }, [holydaytypeData]);

//   const getHolydayData = () => {
//     let obj = { valTid: 1, ValCase: "A" };
//     ApiHelper.post(HOLYDAYGET, obj)
//       .then(({ data }) => {
//         if (data?.data?.length > 0) {
//           setHolydayData(data.data);
//         }
//       })
//       .catch((err) => {
//         console.log("err: ", err);
//       });
//   };

//   const showHolydayData = (data) => {
//     setHolydayModal(true);
//     setHolydayDetails(data);
//     reset({ ...data });
//   };

//   const handleClose = () => {
//     setHolydayModal(false);
//     setHolydayDetails({});
//     reset(defaultValues);
//   };

//   const addHolydayHandler = () => {
//     setHolydayModal(true);
//     setHolydayDetails({});
//     reset(defaultValues);
//   };

//   const submitHandler = (data) => {
//     if (holydayDetails?.holiday_id) {
//       updateHolydayHandler(data);
//     } else {
//       saveHolydayHandler(data);
//     }
//   };

//   const updateHolydayHandler = (data) => {
//     let obj = { valTid: 1, ValCase: "A" };
//     ApiHelper.post(HOLYDAYUPDATE, obj)
//       .then(({ data }) => {
//         if (data?.data?.length > 0) {
//           handleClose();
//           getHolydayData();
//         } else if (data?.message) {
//           alert(data?.message);
//         }
//       })
//       .catch((err) => console.log("err: ", err));
//   };

//   const saveHolydayHandler = (data) => {
//     let obj = { valTid: 1, ValCase: "A" };
//     ApiHelper.post(HOLYDAYINSERT, obj)
//       .then(({ data }) => {
//         if (data?.data?.length > 0) {
//           handleClose();
//           getHolydayData();
//         } else if (data?.message) {
//           alert(data?.message);
//         }
//       })
//       .catch((err) => console.log("err: ", err));
//   };

//   const deleteHolydayHandler = (id) => {
//     ApiHelper.delete(HOLYDAYDELETE + "?holiday_id=" + id)
//       .then(({ data }) => {
//         if (data?.status === 200) {
//           handleClose();
//           getHolydayData();
//         } else if (data?.message) {
//           alert(data?.message);
//         }
//       })
//       .catch((err) => console.log("err: ", err));
//   };

//   return (
//     <>
//       <div className="container">
//         <div className="d-flex justify-content-between mb-3">
//           <h1>HolyDayListing</h1>
//           <button className="btn btn-primary" onClick={addHolydayHandler}>
//             Add HolyDay
//           </button>
//         </div>
//         <Table
//           data={holydayData}
//           columns={columns}
//           getRowId={(row) => row.holiday_id}
//         />
//         <Modal
//           open={holydayModal}
//           onClose={handleClose}
//           aria-labelledby="modal-modal-title"
//           aria-describedby="modal-modal-description"
//         >
//           <Box sx={modalStyle}>
//             <h4 className="mb-3">
//               {holydayDetails?.holiday_id ? "Edit" : "Add"} HolyDay
//             </h4>
//             <div className="card-body">
//               <div className="row">
//                 <div className="col-6">
//                   <div>
//                     <label
//                       htmlFor="holidayName"
//                       className="form-label required"
//                     >
//                       HolydayName
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       id="holidayName"
//                       {...register("holidayName")}
//                       placeholder="Enter HolydayName"
//                     />
//                   </div>
//                   {errors.holidayName && (
//                     <span className="error-field">
//                       {ErrorMessages?.inputField}
//                     </span>
//                   )}
//                 </div>

//                 <div className="col-6">
//                   <FormControl fullWidth className="mt-3">
//                     <InputLabel htmlFor="holydaytype">
//                       Select Holiday
//                     </InputLabel>

//                     <Select
//                       id="holydaytype"
//                       value={selectedHoliday}
//                       label="holydaytype"
//                     >
//                       <em>Holiday Type</em>
//                       <MenuItem value="Christmas">Christmas</MenuItem>
//                       <MenuItem value="Thanksgiving">Thanksgiving</MenuItem>
//                       <MenuItem value="NewYear">New Year</MenuItem>
//                       <MenuItem value="Easter">Easter</MenuItem>
//                     </Select>
//                   </FormControl>
//                   {errors.holidaytype && (
//                     <span className="error-field">
//                       {ErrorMessages?.inputField}
//                     </span>
//                   )}

//                   {errors.holidaytype && (
//                     <span className="error-field">
//                       {ErrorMessages?.inputField}
//                     </span>
//                   )}
//                 </div>
//                 <div className="col-6">
//                   <div>
//                     <label
//                       htmlFor="holidaydate"
//                       className="form-label required"
//                     >
//                       HolyDay Date
//                     </label>
//                     <input
//                       type="date"
//                       className="form-control"
//                       id="holidaydate"
//                       {...register("holidaydate")}
//                       placeholder="Enter holidaydate"
//                     />
//                   </div>
//                   {errors.holidaydate && (
//                     <span className="error-field">
//                       {ErrorMessages?.inputField}
//                     </span>
//                   )}
//                 </div>
//               </div>
//               <div className="row mt-3">
//                 <div className="col-4">
//                   <label htmlFor="Is_active" className="form-label required">
//                     Active
//                   </label>
//                   <div className="form-check form-switch mt-1">
//                     <input
//                       className="form-check-input"
//                       type="checkbox"
//                       id="flexSwitchCheckChecked"
//                       {...register("Is_active")}
//                     />
//                   </div>
//                 </div>
//               </div>
//               <div className="text-center">
//                 <button
//                   className="btn btn-primary"
//                   onClick={(e) => handleSubmit(submitHandler)(e)}
//                 >
//                   {holydayDetails?.holiday_id ? "Update" : "Save"}
//                 </button>
//               </div>
//             </div>
//           </Box>
//         </Modal>
//       </div>
//     </>
//   );
// };
// export default React.memo(Holyday);