import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Button,
  Box,
  Typography,
  FormControl,
  makeStyles,
  IconButton,
  FormHelperText,
  TextField,
} from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import * as yep from "yup";
import { FiUpload } from "react-icons/fi";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { BiCopy } from "react-icons/bi";
import { toast } from "react-toastify";
import Divider from "@material-ui/core/Divider";
import { Form, Formik } from "formik";
import apiConfig from "src/APIconfig/ApiConfig.js";
import axios from "axios";
import PageLoading from "src/component/PageLoading";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    paddingTop: "23px",
    paddingBottom: "30px",
    "& h2 ": {},
  },
  container: {
    marginTop: "3rem",
    backgroundColor: "#FEDDB6",
    border: "1px solid #F38500",
    padding: "35px 40px 40px",
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
  const [base64Img, setBase64Img] = useState("");
  const imagesec = "";
  useEffect(() => {
    if (imagesec) {
      setBase64Img(imagesec);
    }
  }, [imagesec]);
  function imageUpload(event) {
    // let base64img = userData.profilepic;
    let base64img = "";
    let reader = new FileReader();
    reader.onload = function () {
      base64img = reader.result;
      setBase64Img(base64img);
    };
    reader.readAsDataURL(event.target.files[0]);
  }
  const [isLoading, setIsLoading] = useState();

  const formInitialSchema = {
    name: "",
    email: "",
    mobileNumber: "",
    profilePic: "",
  };

  const [userDetails, setUserDetails] = useState("");
  const [userDetailsedit, setUserDetailsEdit] = useState("");
  const [_viewDetails, setViewDetails] = useState(formInitialSchema);
  const [_imgaeset, setImageSet] = useState("");

  const [_imageurl, setFile] = useState(null);
  const [_imgDef, setImgDef] = useState();
  console.log("valueskbdkfj---", _imageurl);
  console.log("valueskbdkfj---123", _imgDef);
  console.log("valueskbdkfj---123456_", _imgaeset);

  const EditUserFunction = async (values) => {
    setIsLoading(true);
    const formdata = new FormData();
    formdata.append("name", values.name);
    formdata.append("email", values.email);
    formdata.append("mobileNumber", values.mobileNumber);

    formdata.append("profilePic", _imageurl === null ? _imgaeset : _imageurl);

    try {
      const res = await axios({
        method: "PUT",
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
        url: apiConfig.updateProfile,
        data: formdata,
      });
      if (res) {
        history.push("/view-profile");
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  const viewUserApiHandler = async () => {
    setIsLoading(true);
    const res = await axios({
      method: "GET",
      url: apiConfig.getProfile,
      headers: {
        token: window.sessionStorage.getItem("token"),
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        setIsLoading(false);
        console.log("resksdkas", res);
        if (res?.status === 200) {
          setIsLoading(false);
          const formInitialSchema = {
            name: res?.data?.result?.userName,
            email: res?.data?.result?.email,

            mobileNumber: res?.data?.result?.mobileNumber,
          };
          setImageSet(res?.data?.result?.profilePic);

          setViewDetails(formInitialSchema);
        }
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    viewUserApiHandler();
  }, []);

  const formValidationSchema = yep.object().shape({
    name: yep
      .string()
      .required(" Name is required")
      .min(2, "Please enter at least 2 characters")
      .max(35, "You can enter only 35 characters")
      .matches(
        /^[a-zA-Z]+$/,
        "Only alphabets and white spaces are allowed for this field number are not. "
      ),
    email: yep
      .string()
      .email("Entered Email is invalid")
      .required("Email address is required"),
    mobileNumber: yep
      .string()
      .required(" Phone is required")
      .min(10, "Please enter at least 10 digits")
      .max(10, "You can enter 10 digits"),
  });
  return (
    <Box className={classes.wrapper}>
      {/* <isLoading ? */}
      {isLoading ? <PageLoading /> : ""}
      <Box className={classes.LineBtn}>
        <Typography variant="h1">Edit Profile</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            history.push({
              pathname: "/changePassword",
              // search:"Add",
            });
          }}
        >
          Change Password
        </Button>
      </Box>
      <Divider className={classes.divider} />

      <Container maxWidth="md">
        <Box className={classes.container}>
          <Formik
            initialValues={_viewDetails}
            enableReinitialize={true}
            initialStatus={{
              success: false,
              successMsg: "",
            }}
            validationSchema={formValidationSchema}
            onSubmit={(values) => EditUserFunction(values)}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              EditUserFunction,
              touched,
              values,
              setFieldValue,
            }) => (
              <Form>
                <Grid container spacing={1}>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <figure className={classes.upload}>
                      <img src={_imgDef ? _imgDef : _imgaeset} />
                      {/* <IconButton>
                        <FiUpload />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            setFile(e.target.files[0]);
                            setImgDef(URL.createObjectURL(e.target.files[0]));
                          }}
                        />
                      </IconButton> */}
                    </figure>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Grid container spacing={1}>
                      <Grid item lg={3} md={4} sm={5} xs={12}>
                        <Typography variant="h5">Image &nbsp;:</Typography>
                      </Grid>
                      <Grid item lg={9} md={6} sm={7} xs={12}>
                        <Box>
                          <TextField
                            id="outlined-basic"
                            // label="Outlined"

                            type="file"
                            variant="outlined"
                            // required
                            onChange={(e) => {
                              setFile(e.target.files[0]);
                              setImgDef(URL.createObjectURL(e.target.files[0]));
                            }}
                          />
                        </Box>
                      </Grid>
                      <Grid item lg={3} md={4} sm={5} xs={12}>
                        <Typography variant="h5">Name &nbsp;:</Typography>
                      </Grid>
                      <Grid item lg={9} md={6} sm={7} xs={12}>
                        <Box>
                          <TextField
                            variant="outlined"
                            name="name"
                            type="text"
                            value={values.name}
                            error={Boolean(touched.name && errors.name)}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            placeholder="User name"
                            className={classes.textField}
                          />
                          <FormHelperText
                            error
                            style={{ margin: "0px", fontSize: "12px" }}
                          >
                            {touched.name && errors.name}
                          </FormHelperText>
                        </Box>
                      </Grid>
                      <Grid item lg={3} md={4} sm={5} xs={12}>
                        <Typography variant="h5">Email&nbsp;:</Typography>
                      </Grid>
                      <Grid item lg={9} md={6} sm={7} xs={12}>
                        <Box>
                          <TextField
                            variant="outlined"
                            name="email"
                            type="email"
                            // value="admin@gmail.com"
                            disabled
                            value={values.email}
                            error={Boolean(touched.email && errors.email)}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            placeholder="admin@gmail.com"
                            className={classes.textField}
                          />
                          <FormHelperText
                            error
                            style={{ margin: "0px", fontSize: "12px" }}
                          >
                            {touched.email && errors.email}
                          </FormHelperText>
                        </Box>
                      </Grid>
                      <Grid item lg={3} md={4} sm={5} xs={12}>
                        <Typography variant="h5">
                          Mobile Number&nbsp;:
                        </Typography>
                      </Grid>
                      <Grid item lg={9} md={6} sm={7} xs={12}>
                        <Box>
                          <TextField
                            variant="outlined"
                            name="mobileNumber"
                            type="number"
                            disabled
                            value={values.mobileNumber}
                            error={Boolean(
                              touched.mobileNumber && errors.mobileNumber
                            )}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            placeholder="98568569"
                            className={classes.textField}
                          />
                          <FormHelperText
                            error
                            style={{ margin: "0px", fontSize: "12px" }}
                          >
                            {touched.mobileNumber && errors.mobileNumber}
                          </FormHelperText>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Box mt={4} align="center">
                  <Button
                    variant="contained"
                    color="secondary"
                    type="button"
                    onClick={() => {
                      history.push("/view-profile");
                    }}
                  >
                    Back
                  </Button>
                  &nbsp;&nbsp;&nbsp;
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    // onClick={() => {
                    //   history.push("/view-profile");
                    // }}
                  >
                    Update
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
    </Box>
  );
}
export default Viewuser;
