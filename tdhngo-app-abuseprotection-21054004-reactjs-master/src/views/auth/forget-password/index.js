import React, { useState } from "react";
import "src/scss/main.css";
import {
  Box,
  Typography,
  TextField,
  Grid,
  Button,
  Container,
  Link,
  makeStyles,
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import clsx from "clsx";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Visibility from "@material-ui/icons/Visibility";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import LockIcon from "@material-ui/icons/Lock";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import { useHistory, Link as RouterComponent } from "react-router-dom";
import { Formik, Form } from "formik";
import apiConfig from "src/APIconfig/ApiConfig";
import axios from "axios";
import Logo from "src/component/Logo";
import { toast } from "react-toastify";
import PageLoading from "src/component/PageLoading";
import * as yep from "yup";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
const useStyle = makeStyles((theme) => ({
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

    "& input": {
      border: "none",
      outline: "none",
      padding: "8px",
      minWidth: "439px",
      width: "100%",
    },
  },
  subsocial: {
    cursor: "pointer",
    display: "flex",
    border: "1px solid hsl(0deg 0% 94%)",
  },
  iconPart: {
    color: "#23a563",
    background: "#d8ffeb",
    padding: "8px",
    fontSize: "18px",
  },

  placeholder1: {
    "& input": {
      color: theme.palette.text.black,
      "&::placeholder": {
        color: theme.palette.text.black,
      },
    },
  },
  textSection: {
    marginBottom: "30px",
    textAlign: "center",
  },
  inputvalue: {
    "&::placeholder": {
      color: "#fff !important",
    },
  },
  loginBox: {
    "& h2": {
      fontSize: "40px",
      color: "#F38500",

      [theme.breakpoints.down("xs")]: {
        fontSize: "30px !important",
      },
    },
    "& label": {
      color: "#ffffffde",
      fontSize: "14px",
      fontWeight: "400",
    },
  },
  loginForm1: {
    "& label": {
      color: "black",
    },
    "& input": {
      borderRadius: "5px",
    },
  },
}));

function Login(props) {
  const history = useHistory();
  const classes = useStyle();
  const [show, setShow] = useState(false);
  const [isLoading, setLoader] = useState(false);
  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  //forgot password
  const ForgotPassword = async (values) => {
    setLoader(true);
    try {
      const res = await axios({
        url: apiConfig.forgotPassword,
        method: "POST",
        data: {
          email: values.email,
        },
      });
      if (res?.data?.responseCode === 200) {
        setLoader(false);
        toast.success("OTP sent Successfully!");
        history.push({
          pathname: "/Verify-Otp",
          state: values.email,
        });
      }
    } catch (error) {
      setLoader(false);

      console.log("res-->>>>", error);
    }
  };

  return (
    <>
      {isLoading ? <PageLoading /> : ""}
      {isLoading ? <ButtonCircularProgress /> : ""}

      <Grid className="d-flex height100">
        <Box className="loginForm">
          <Grid container direction={"column"}>
            <Box className={classes.loginBox}>
              <Typography
                variant="h2"
                className={classes.textSection}
                style={{}}
              >
                Forgot password
              </Typography>
              <Formik
                initialValues={{
                  email: "",
                }}
                initialStatus={{
                  success: false,
                  successMsg: "",
                }}
                validationSchema={yep.object().shape({
                  email: yep
                    .string()
                    .email(
                      "You have entered an invalid email address. Please try again"
                    )
                    .required("Email address is required"),
                })}
                onSubmit={(values) => ForgotPassword(values)}
              >
                {({
                  errors,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  touched,
                  values,
                  setFieldValue,
                }) => (
                  <Form>
                    <Box
                      style={{ width: "100%" }}
                      className={classes.loginForm1}
                    >
                      <label tyle={{ color: "black" }}>
                        {" "}
                        *Please enter the registered email id
                      </label>
                      <Box mt={1}>
                        <TextField
                          variant="outlined"
                          margin="normal"
                          value={values.email}
                          fullWidth
                          id="email"
                          style={{ margin: "0px" }}
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
                        <FormHelperText error>
                          {touched.email && errors.email}
                        </FormHelperText>
                      </Box>
                    </Box>

                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      mt={5}
                    >
                      <Button
                        variant="contained"
                        size="large"
                        color="primary"
                        type="submit"
                        disabled={isLoading}
                      >
                        Reset Password &nbsp;
                        {isLoading && <ButtonCircularProgress />}
                      </Button>
                      &nbsp;&nbsp;
                    </Box>
                  </Form>
                )}
              </Formik>
            </Box>
          </Grid>
        </Box>
      </Grid>
    </>
  );
}

export default Login;
