import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Button,
  Box,
  Typography,
  OutlinedInput,
  makeStyles,
  IconButton,
  InputAdornment,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import { Formik, Form, ErrorMessage } from "formik";
import * as yep from "yup";
import { useHistory, useLocation } from "react-router-dom";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    paddingTop: "23px",
    paddingBottom: "30px",
    "& h5 ": {
      marginTop:"10px"
    },
  },
  container: {
    marginTop: "3rem",
    backgroundColor: "#FEDDB6",
    border: "1px solid #F38500",
    padding: "25px 40px",
    borderRadius: "15px",
  },
  upload: {
    width: "150px",
    height: "150px",
    margin: "16px 0",
    cursor: "pointer",
    borderRadius: "20px",
    position: "relative",
    "& img": {
      width: "100%",
      height: "100%",
      border: "1px solid #F38500",
      // borderRadius: "50%",
      objectFit: "cover",
    },
    "& button": {
      position: "absolute",
      border: "3px solid black",
      bottom: 0,
      right: 0,
      backgroundColor: "#fff",
      color: "#000",
      fontSize: "15px",
      "&:hover": {
        backgroundColor: "#fff",
        border: "3px solid black",
      },
      "& input": {
        width: "100%",
        height: "100%",
        position: "absolute",
        top: "0",
        left: "0",
        opacity: 0,
      },
    },
  },
  typo: {
    marginLeft: "3rem",
  },
  btn: {
    textAlign: "center",
    paddingTop: "20px",
  },
  typo: {
    marginBottom: "5px",
  },
  divider: {
    marginTop: "10px",
    backgroundColor: "#F38500",
  },
  walletcopy: {
    "& h6": {
      wordBreak: "break-word",
    },
  },
  LineBtn: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
}));

function Viewuser() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const formValidationSchema = yep.object().shape({
    password: yep
      .string()
      .required("Password is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,"Password must be valid"
      ),
      newPassword: yep
      .string()
      .required("New password is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
      ),
    confirmPassword: yep
      .string()
      .required("Confirmation of your password is required")
      .oneOf([yep.ref("newPassword"), null], "Passwords must match"),
  });
  const formInitialSchema = {
    password: "",
    newPassword: "",
    confirmPassword: "",
  };
  return (
    <Box className={classes.wrapper}>
      <Box className={classes.LineBtn}>
        <Typography variant="h1">Change Password</Typography>
      </Box>
      <Divider className={classes.divider} />

      <Container maxWidth="md">
        <Box className={classes.container}>
          <Grid container spacing={1}  >
            <Grid item xs={12} sm={12} md={12} lg={12}>
            <Formik
              initialValues={formInitialSchema}
              // initialStatus={{
              //   success: false,
              //   successMsg: "",
              // }}
              validationSchema={formValidationSchema}
              
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
              <Grid container spacing={1} display="flex" >
                <Grid item lg={5} md={4} sm={5} xs={12}>
                  <Typography variant="h5">Current Password &nbsp;:</Typography>
                </Grid>
                <Grid item lg={7} md={6} sm={7} xs={12}>
                  <Box>
                    <OutlinedInput
                      type={showPassword ? "text" : "password"}
                      variant="outlined"
                      fullWidth
                      placeholder="Current Password"
                      name="password"
                        value={values.password}
                        error={Boolean(
                          touched.password && errors.password
                        )}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      style={{ height: "45px", marginTop: "8px" }}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() =>
                              setShowPassword(!showPassword)
                            }
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
                        {touched.password && errors.password}
                      </FormHelperText>
                  </Box>
                </Grid>
                <Grid item lg={5} md={4} sm={5} xs={12}>
                  <Typography variant="h5">New Password&nbsp;:</Typography>
                </Grid>
                <Grid item lg={7} md={6} sm={7} xs={12}>
                  <Box>
                    <OutlinedInput
                      type={newPassword ? "text" : "password"}
                      variant="outlined"
                      fullWidth
                      placeholder="New Password"
                      name="newPassword"
                        value={values.newPassword}
                        error={Boolean(
                          touched.newPassword && errors.newPassword
                        )}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      style={{ height: "45px", marginTop: "8px" }}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() =>
                              setNewPassword(!newPassword)
                            }
                            // onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {newPassword ? (
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
                        {touched.newPassword && errors.newPassword && (
                          <ul
                            style={{
                              padding: "0px 0px 0px 19px",
                              marginLeft: "-15px",
                              listStyleType: "none",
                              marginTop: "3px",
                            }}
                          >
                            <li>Must be at least 8 Characters long</li>
                            <li>Must be atleast One Uppercase letter</li>
                            <li> Must be atleast One Lowercase letter</li>
                            <li> Must be at least One digit</li>
                            <li>Must be at least one special case Character</li>
                          </ul>
                        )}
                      </FormHelperText>
                  </Box>
                </Grid>
                <Grid item lg={5} md={4} sm={5} xs={12}>
                  <Typography variant="h5">Confirm Password&nbsp;:</Typography>
                </Grid>
                <Grid item lg={7} md={6} sm={7} xs={12}>
                  <Box>
                    <OutlinedInput
                      type={showPasswordConfirm ? "text" : "password"}
                      variant="outlined"
                      fullWidth
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
                  </Box>
                </Grid>
              </Grid>
          </Form>
              )}
            </Formik>
            </Grid>
          </Grid>
          <Box mt={4} align="center">
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                history.push("/dashboard");
              }}
            >
              Back
            </Button>
            &nbsp;&nbsp;&nbsp;
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                history.push("/view-profile");
              }}
            >
              Update
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
export default Viewuser;
