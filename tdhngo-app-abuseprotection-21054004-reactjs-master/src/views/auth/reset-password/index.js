import React, { useState, useEffect } from "react";
import "src/scss/main.css";
import {
  Box,
  Typography,
  TextField,
  Grid,
  Button,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Link,
  makeStyles,
} from "@material-ui/core";
import axios from "axios";
import * as yep from "yup";
import { Formik, Form, ErrorMessage } from "formik";
import AccountCircle from "@material-ui/icons/AccountCircle";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import clsx from "clsx";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
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
import { useLocation } from "react-router-dom";
import Logo from "src/component/Logo";
import apiConfig from "src/APIconfig/ApiConfig";
import { toast } from "react-toastify";
import { values } from "lodash";
import PageLoading from "src/component/PageLoading";

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
    "@media(max-width:375px)": {
      marginRight: "20px",
      marginTop: "10px",
    },
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
  loginForm1: {
    "& input": {
      borderRadius: "5px",
      color: theme.palette.text.black,
      "&::placeholder": {
        color: theme.palette.text.black,
      },
    },
  },
  mainSocail: {
    display: "flex",
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
  headText: {
    "& h2": {
      fontSize: "40px",
      color: "#F38500",
      [theme.breakpoints.down("xs")]: {
        fontSize: "30px",
      },
    },
  },
  loginBox: {
    padding: "25px",
    zIndex: "999",
    borderRadius: "5px",
    backdropFilter: "blur(42px)",
    WebkitBackdropFilter: "blur(42px)",
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
  inputvalue: {
    "& placeholder": {
      color: "#262626",
    },
  },
  textSection: {
    marginBottom: "30px",
    textAlign: "center",
  },
  passsec: {
    backgroundColor: "#7c7676",
    paddingTop: "3px",
    paddingBottom: "3px",
    paddingLeft: "3px",
    paddingRight: "3px",
  },
}));

function Login(props) {
  const [open, setOpen] = React.useState(false);
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const handleClickOpen = () => {
    handlefalse();
    setOpen(true);
  };
  const handlefalse = () => {
    setTimeout(() => {
      setOpen(false);
      history.push("/login");
    }, 2000);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const history = useHistory();
  const classes = useStyle();
  const [isLoading, setLoader] = useState(false);
  const [resetToken, setResetToken] = useState("");
  console.log("resetToken", resetToken);

  const formInitialSchema = {
    password: "",
    confirmPassword: "",
  };

  const formValidationSchema = yep.object().shape({
    password: yep
      .string()
      .required("Password is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
      ),
    confirmPassword: yep
      .string()
      .required("Confirmation of your password is required")
      .oneOf([yep.ref("password"), null], "Passwords must match"),
  });
  const resetPasswordFunction = async (values) => {
    setLoader(true);
    try {
      const res = await axios({
        url: apiConfig.resetPassword,
        method: "PUT",
        data: {
          password: values.password,
          confirmPassword: values.confirmPassword,
        },
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
      });
      if (res?.data?.responseCode === 200) {
        setLoader(false);
        toast.success("Password Reset Successfully!");

        history.push("/login");

        console.log(res?.data?.responseCode === 200);
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
          <Box className={classes.headText}>
            <Typography variant="h2" className={classes.textSection}>
              Create New Password
            </Typography>

            <Formik
              initialValues={formInitialSchema}
              validationSchema={formValidationSchema}
              onSubmit={(values) => resetPasswordFunction(values)}
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
                  <Box mt={1} className={classes.loginForm1}>
                    <FormControl fullWidth>
                      <label>New Password</label>
                      <OutlinedInput
                        type={showPassword ? "text" : "password"}
                        variant="outlined"
                        size="small"
                        placeholder="Enter Your Password"
                        name="password"
                        value={values.password}
                        error={Boolean(touched.password && errors.password)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        style={{ height: "45px", marginTop: "8px" }}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => setShowPassword(!showPassword)}
                              // onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <Visibility
                                  style={{
                                    color: "#F38500",
                                    fontSize: "18px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                />
                              ) : (
                                <VisibilityOff
                                  style={{
                                    color: "#F38500",
                                    fontSize: "18px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      <FormHelperText error>
                        {touched.password && errors.password && (
                          <ul
                            style={{
                              padding: "0px 0px 0px 19px",
                              marginLeft: "-15px",
                              listStyleType: "none",
                              marginTop: "3px",
                            }}
                          >
                            <li>*Must be at least 8 Characters long</li>
                            <li>*Must be atleast One Uppercase letter</li>
                            <li> *Must be atleast One Lowercase letter</li>
                            <li> *Must be at least One digit</li>
                            <li>
                              *Must be at least one special case Character
                            </li>
                          </ul>
                        )}
                      </FormHelperText>
                    </FormControl>
                  </Box>
                  <Box style={{ paddingTop: "8px" }}>
                    <Box mt={1} className={classes.loginForm1}>
                      <FormControl fullWidth>
                        <label>Confirm New Password</label>
                        <OutlinedInput
                          type={showPasswordConfirm ? "text" : "password"}
                          variant="outlined"
                          size="small"
                          placeholder="Confirm Password"
                          name="confirmPassword"
                          value={values.confirmPassword}
                          error={Boolean(
                            touched.confirmPassword && errors.confirmPassword
                          )}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          style={{ height: "45px", marginTop: "8px" }}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={() =>
                                  setShowPasswordConfirm(!showPasswordConfirm)
                                }
                                // onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {showPasswordConfirm ? (
                                  <Visibility
                                    style={{
                                      color: "#F38500",
                                      fontSize: "18px",
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                  />
                                ) : (
                                  <VisibilityOff
                                    style={{
                                      color: "#F38500",
                                      fontSize: "18px",
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                  />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                        <FormHelperText error>
                          {touched.confirmPassword && errors.confirmPassword}
                        </FormHelperText>
                      </FormControl>
                    </Box>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Button
                      variant="contained"
                      size="large"
                      color="primary"
                      // onClick={handleClickOpen}
                      type="submit"
                      style={{
                        marginTop: "20px",
                        backgroundColor: "#3a9bd5",
                        color: "#fff",
                      }}
                      disabled={isLoading}
                    >
                      Submit
                      {isLoading && <ButtonCircularProgress />}
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>

            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                <Typography align="center" variant="h2">
                  Congrats
                </Typography>
              </DialogTitle>
              <DialogContent>
                <DialogContentText
                  style={{ color: "#000" }}
                  id="alert-dialog-description"
                >
                  You have successfully updated your password. Please login now
                  to access your account.
                </DialogContentText>
              </DialogContent>
            </Dialog>
          </Box>
        </Grid>
      </Box>
    </Grid>
  );
}

export default Login;
