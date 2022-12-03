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
import { useLocation } from "react-router-dom";
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
import PageLoading from "src/component/PageLoading";

import { toast } from "react-toastify";
import * as yep from "yup";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { values } from "lodash";
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
    "& input": {
      borderRadius: "5px",
    },
  },
}));

function Login(props) {
  const location = useLocation();
  const [_saveEmail, setSaveEmail] = useState(location?.state);
  console.log("location--->>>", _saveEmail);

  const history = useHistory();
  const classes = useStyle();
  const [isLoading, setLoader] = useState(false);
  const VarifyOTPFunction = async (values) => {
    setLoader(true);

    try {
      const res = await axios({
        url: apiConfig.verifyOTP,
        method: "POST",
        data: {
          otp: values.otp,
          email: _saveEmail,
        },
      });
      if (res?.data?.responseCode === 200) {
        setLoader(false);
        toast.success("OTP verified successfully");

        history.push("/reset-password");
      }
    } catch (error) {
      setLoader(false);

      console.log(error);
    }
  };

  return (
    <Grid className="d-flex height100">
      {isLoading ? <PageLoading /> : ""}

      <Box className="loginForm">
        <Grid container direction={"column"}>
          <Box className={classes.loginBox}>
            <Typography variant="h2" className={classes.textSection} style={{}}>
              OTP Verification
            </Typography>
            <Formik
              initialValues={{
                otp: "",
              }}
              initialStatus={{
                success: false,
                successMsg: "",
              }}
              validationSchema={yep.object().shape({
                otp: yep
                  .string()
                  .required("Otp is required")
                  // .matches(/^[0-9]*$/, "Must be a valid otp")
                  .max(6, "Should not exceeds 6 digits")
                  .min(4, "Must be only 4 digits"),
              })}
              onSubmit={(values) => VarifyOTPFunction(values)}
            >
              {({
                errors,
                handleBlur,
                handleChange,

                touched,
                values,
                setFieldValue,
              }) => (
                <Form>
                  <Box style={{ width: "100%" }} className={classes.loginForm1}>
                    <label>OTP</label>
                    <Box mt={1}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="otp"
                        value={values.otp}
                        style={{ margin: "0px" }}
                        placeholder="*Please enter your OTP."
                        name="otp"
                        error={Boolean(touched.otp && errors.otp)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      <FormHelperText error>
                        {touched.otp && errors.otp}
                      </FormHelperText>
                    </Box>
                  </Box>

                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    mt={5}
                  >
                    &nbsp;&nbsp;
                    <Button
                      variant="contained"
                      size="large"
                      // onClick={() => history.push("reset-password")}
                      color="primary"
                      type="submit"
                      // disabled={isLoading}
                    >
                      Verify Otp &nbsp;
                      {isLoading && <ButtonCircularProgress />}
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>

            {/*</Grid>*/}
          </Box>
        </Grid>
      </Box>
    </Grid>
  );
}

export default Login;
