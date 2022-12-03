import React, { useState, useContext } from "react";
import "src/scss/main.css";
import {
  Box,
  Typography,
  TextField,
  Grid,
  Button,
  makeStyles,
  Link,
  FormHelperText,
  FormControl,
  InputAdornment,
  IconButton,
} from "@material-ui/core";

import { FaFacebook, FaGoogle } from "react-icons/fa";
import { useHistory, Link as RouterComponent } from "react-router-dom";
import { Form, Formik } from "formik";
import * as yep from "yup";
import PageLoading from "src/component/PageLoading";

// import ButtonCircularProgress from 'src/component/ButtonCircularProgress'
import AccountCircle from "@material-ui/icons/AccountCircle";
import { toast } from "react-toastify";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { VisibilityOff, Visibility } from "@material-ui/icons";
import { AuthContext } from "src/context/Auth";
import apiConfig from "src/APIconfig/ApiConfig";
import axios from "axios";
const useStyles = makeStyles((theme) => ({
  buttonbox: {
    padding: "10px 18px",
    [theme.breakpoints.only("sm")]: {
      maxWidth: "112px",
      fontSize: "9px",
    },
    [theme.breakpoints.only("xs")]: {
      maxWidth: "112px",
      fontSize: "9px",
    },
  },
  logosec: {
    "@media(min-width:1280px)": {
      display: "none",
    },
  },
  newbox: {
    "&:hover": { textDecoration: "underline" },
  },
  boxbutton: {
    display: "flex",
    alignItems: "center",
    marginTop: "10px",
    justifyContent: "center",
    "@media(max-width:960px)": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    "@media(max-width:375px)": {
      // display: 'grid',
      alignItems: "center",
      justifyContent: "center",
    },
  },
  btnmain: {
    textAlign: "center",
    // '@media(max-width:375px)': {
    //   marginRight: '20px',
    //   marginTop: '10px',
    // },
  },
  mainbox: {
    backgroundColor: "#afdbaf",
    padding: "13px",
  },
  emailerr: {
    backgroundColor: "#fd3333",
    paddingTop: "3px",
    paddingBottom: "3px",
    paddingLeft: "3px",
    paddingRight: "3px",
  },

  pass: {
    backgroundColor: "#7c7676",
    paddingTop: "3px",
    paddingBottom: "3px",
    paddingLeft: "3px",
    paddingRight: "3px",
  },
  upper: {
    marginTop: "205px",
  },
  mainSocail: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "25px",
    width: "100%",
    "& input": {
      border: "none",
      outline: "none",
      padding: "8px",
      width: "100%",
    },
  },
  subsocial: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    border: "1px solid hsl(0deg 0% 94%)",
    "& p": {
      margin: 0,
      fontSize: "14px",
      color: "#6c6c6c",
      paddingLeft: "10px",
    },
  },
  iconPart: {
    color: "#23a563",
    background: "#d8ffeb",
    padding: "8px",
    fontSize: "18px",
  },
  inputvalue: {
    "& placeholder": {
      color: "#262626",
    },
  },
  loginBox: {
    // border: "1px solid #bef71e59",
    // background:
    //   "linear-gradient(158.52deg,hsla(0,0%,100%,.2) 16.41%,hsla(0,0%,100%,0))",
    WebkitBackdropFilter: "blur(42px)",
    backdropFilter: "blur(42px)",
    borderRadius: "5px",
    position: "relative",
    zIndex: "999",
    padding: "25px",
    "& h2": {
      fontSize: "40px",
      color: "#01fbb4",
      webkitFilter: "drop-shadow(0 0 10px #1eb808)",
      filter: "drop-shadow(0 0 10px #1EB808)",
    },
    "& label": {
      color: "#ffffffde",
      fontSize: "14px",
      fontWeight: "400",
    },
  },
  headText: {
    "& h2": {
      fontSize: "40px",
      color: "#F38500",
      [theme.breakpoints.down("xs")]: {
        fontSize: "30px",
      },
    },
  },
  passsec: {
    paddingTop: "3px",
    paddingBottom: "3px",
    paddingLeft: "3px",
    paddingRight: "3px",
  },

  loginForm1: {
    "& input": {
      borderRadius: "5px",
    },
  },
}));

function Login(props) {
  const auth = useContext(AuthContext);
  const classes = useStyles();
  const [isloading, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();
  const [btnDis, setBtnDis] = useState(false);
  //LOGING API

  const [_loading, setLoading] = useState(false);
  const handlSubmit = (values) => {
    // event.preventDefault();
    //console.log(values);

    setLoader(true);
    const res = axios({
      method: "POST",
      url: apiConfig.login,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        email: values?.email,
        password: values?.password,
      },
    })
      .then((res) => {
        setLoader(false);
        window.sessionStorage.setItem("token", res?.data?.result?.token);
        auth.getProfileHandler(res?.data?.result?.token);
        toast.success("Login Successfully!!");
        history.push("/dashboard");
      })
      .catch((error) => {
        toast.error(error?.response?.data?.responseMessage);
        setLoader(false);
      });
  };

  return (
    <Grid className="d-flex height100">
      {isloading ? <PageLoading /> : ""}

      <Box className="loginForm">
        <Box className="signupbox">
          <Grid container direction={"column"}>
            <Box
              textAlign="center"
              className={classes.headText}
              style={{ width: "100%", marginBottom: "30px" }}
            >
              <Typography variant="h2">Login</Typography>
            </Box>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              initialStatus={{
                success: false,
                successMsg: "",
              }}
              validationSchema={yep.object().shape({
                email: yep
                  .string()
                  .email("Entered Email is invalid")
                  .max(45, "Must be in limit")

                  .required("Email address is required"),

                password: yep
                  .string()
                  .matches(
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                    "Password must be valid"
                  )
                  .max(45, "Must be in limit")
                  .required("Please enter your password"),
              })}
              onSubmit={(values) => handlSubmit(values)}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                LoginFunction,
                touched,
                values,
                setFieldValue,
              }) => (
                <Form>
                  <Box style={{ width: "100%" }} className={classes.loginForm1}>
                    <label>Email Address</label>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      className={classes.inputFeild}
                      id="email"
                      value={values.email}
                      placeholder="Enter email address"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <AccountCircle style={{ color: "#F38500" }} />
                          </InputAdornment>
                        ),
                      }}
                      name="email"
                      error={Boolean(touched.email && errors.email)}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <FormHelperText style={{ marginTop: "-3px" }} error>
                      {touched.email && errors.email}
                    </FormHelperText>
                  </Box>
                  <Box mt={1}>
                    <FormControl fullWidth style={{}}>
                      <Box
                        style={{ width: "100%" }}
                        className={classes.loginForm1}
                      >
                        <label>Password</label>
                        <TextField
                          variant="outlined"
                          margin="normal"
                          fullWidth
                          value={values.password}
                          className={classes.inputFeild}
                          name="password"
                          placeholder="Enter your password"
                          type={showPassword ? "text" : "password"}
                          error={Boolean(touched.password && errors.password)}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() => setShowPassword(!showPassword)}
                                  edge="end"
                                  style={{ marginRight: "-14px" }}
                                >
                                  <Box className={classes.passsec}>
                                    {showPassword ? (
                                      <Visibility
                                        style={{
                                          color: "#F38500",
                                          fontSize: "20px",
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                        }}
                                      />
                                    ) : (
                                      <VisibilityOff
                                        style={{
                                          color: "#F38500",
                                          fontSize: "20px",
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                        }}
                                      />
                                    )}
                                  </Box>
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                        <FormHelperText style={{ marginTop: "-3px" }} error>
                          {touched.password && errors.password}
                        </FormHelperText>
                      </Box>
                    </FormControl>
                  </Box>

                  <Box
                    display="flex"
                    justifyContent="space-between"
                    style={{ marginTop: "5px" }}
                  >
                    <Box>
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          onChange={() => {
                            setBtnDis(true);
                          }}
                          // required
                          id="rememberCheckLogin"
                          checked={btnDis}
                          type="checkbox"
                          className="form-checkbox border-0 rounded text-blueGray-700 ml-5 w-7 h-7 ease-linear transition-all duration-150"
                        />
                        <span
                          style={{ fontSize: "15px", color: "#F38500" }}
                          className="ml-5 text-sm font-semibold text-blueGray-600"
                        >
                          Remember me
                        </span>
                      </label>
                    </Box>
                    <Typography color="primary.main" variant="body1">
                      <Link
                        component={RouterComponent}
                        to="/forget-password"
                        style={{
                          color: "#F38500",
                          fontSize: "14px",
                          fontWeight: "500",
                          textDecoration: "underline",
                        }}
                      >
                        Forgot Password?
                      </Link>
                    </Typography>
                  </Box>
                  <Box align="center" mb={3} mt={4} style={{ width: "100%" }}>
                    <Button variant="contained" color="primary" type="submit">
                      LOGIN
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </Grid>
        </Box>
      </Box>
    </Grid>
  );
}

export default Login;
