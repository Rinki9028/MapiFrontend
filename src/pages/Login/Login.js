import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import Dashboard from "../Dashboard/Dashboard";
import { USERS2 } from "../../utils/Constant/ApiEndpoint";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import action from "../../Redux/Action";
import constants from "../../Redux/Constants";
import { useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorMessages from "../../_helperFunctions/ErrorMessages";

const Login = ({ handleClose }) => {
  const [showCityList, setShowCityList] = useState(false);
  const [showEmployeePage, setShowEmployeePage] = useState(true);
  const [loginid, setLoginid] = useState("");
  const [password, setPassword] = useState("");
  const [loginidError, setLoginidError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginErrorModal, setLoginErrorModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false); // New state for success message
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);

  const defaultValues = {
    LoginId: "",
    LoginPass: "",
  };

  const schema = yup.object().shape({
    LoginId: yup.string().required(),
    LoginPass: yup.string().required(),
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

  const handleLogin2 = async (data) => {
    // event.preventDefault();

    try {
      // if (validateForm()) {
      const response = await axios.post(USERS2, data);
      console.log(response.data);
      console.log(response.data.isValid);
      if (response.data.status == 200) {
        console.log("response.data:v;", response.data);
        setIsLoggedIn(true);
        setLoginSuccess(true);
        setShowEmployeePage(false);
        localStorage.setItem("token", response.data.token);
        let obj = {
          Username: response.data.Username,
          token: response.data.token,
        };
        dispatch(action(constants.USER_INFO, obj));
        navigate("/dashboard");
      } else if (response.data.message) {
        alert(response.data.message);
      }

    } catch (error) {
      console.error("An error occurred while logging in:", error);
    }
  };
  const validateForm = () => {
    if (!loginid) {
      setLoginidError("Login ID is required.");
      return false;
    }
    if (!password) {
      setPasswordError("Password is required.");
      return false;
    }
    return true;
  };

  // Event handler for going back to the employee page
  const handleBackToEmployeePage = () => {
    setShowCityList(false);
    setShowEmployeePage(true);
  };

  return (
    <div className="container">
      {showEmployeePage && (
        <div className="wrapper">
          <div className="title">
            <span>Login Form</span>
          </div>
          <form className="loginForm" action="#">
            <div className="row">
              <i className="fa fa-user"></i>
              <input
                className="inputbox"
                type="text"
                placeholder="Login ID"
                {...register("LoginId")}
                // value={loginid}
                // onChange={(e) => {
                //   setLoginid(e.target.value);
                //   setLoginidError("");
                // }}
              />
              {errors.LoginId && (
                <span className="error-field">{ErrorMessages?.inputField}</span>
              )}
              {/* {loginidError && <div className="error">{loginidError}</div>} */}
            </div>
            <div className="row">
              <i className="fa fa-lock"></i>
              <input
                className="inputbox"
                type="password"
                placeholder="Password"
                {...register("LoginPass")}
                // value={password}
                // onChange={(e) => {
                //   setPassword(e.target.value);
                //   setPasswordError("");
                // }}
              />
              {errors.LoginPass && (
                <span className="error-field">{ErrorMessages?.inputField}</span>
              )}
              {/* {passwordError && <div className="error">{passwordError}</div>} */}
            </div>
            <div className="pass">
              <a href="#">Forgot Password?</a>
            </div>
            <div className="row button">
              <input
                className="inputbox"
                type="button"
                value="Login"
                onClick={(e) => handleSubmit(handleLogin2)(e)}
              />
            </div>
            {loginSuccess && (
              <div className="success-message">Login successful. Welcome!</div>
            )}
            <div className="signup-link">
              Not a member? <a href="#">Sign up Now</a>
            </div>
          </form>
        </div>
      )}
      {/* {showCityList && isLoggedIn && <Dashboard />} */}
      {loginErrorModal && (
        <div className="error-modal">
          Invalid Login ID or Password. Please try again.
        </div>
      )}
    </div>
  );
};

export default Login;
