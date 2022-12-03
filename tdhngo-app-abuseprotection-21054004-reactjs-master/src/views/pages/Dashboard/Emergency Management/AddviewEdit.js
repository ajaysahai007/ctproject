import React, { useContext, useState, useEffect, useRef } from "react";
import {
  Grid,
  Box,
  Typography,
  makeStyles,
  TextField,
  FormControl,
  IconButton,
  FormHelperText,
  MenuItem,
  Select,
  Container,
  Divider,
} from "@material-ui/core";
import * as yep from "yup";
import PageLoading from "src/component/PageLoading";

import Button from "@material-ui/core/Button";
import { Form, Formik } from "formik";
import { FiUpload } from "react-icons/fi";
import { addImageHandler, getBase64 } from "src/utils";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import apiConfig from "src/APIconfig/ApiConfig";
import JoditEditor from "jodit-react";
import { Key } from "react-feather";
const useStyles = makeStyles((theme) => ({
  NftBreed: {
    padding: "23px 0 ",
  },
  formControl: {
    // margin: theme.spacing(1),
    minWidth: 120,
    width: "100%",
    // margin: "0 10px",
  },
  main: {
    border: "1px solid #F38500",
    padding: "40px",
    borderRadius: "15px",
    backgroundColor: "#FEDDB6",
  },
  divider: {
    marginTop: "10px",
    background: "#F38500",
  },
  textField: {
    maxWidth: "100%",
  },

  image: {
    cursor: "pointer",
  },
  upload: {
    // width: "150px",
    // height: "150px",
    height: "250px",
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
  devicelistHeading: {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    "& h3": {
      padding: "1rem 0",
      color: theme.palette.text.black,
    },
    "& .icon1": {
      height: "20px",
      paddingRight: "20px",
      [theme.breakpoints.only("xs")]: {
        width: "50px",
        height: "8px",
        paddingRight: "7px",
      },
    },
    "& .icon2": {
      height: "20px",
      paddingLeft: "20px",
      [theme.breakpoints.only("xs")]: {
        width: "50px",
        height: "8px",
        paddingLeft: "7px",
      },
    },
  },
  newbtn: {
    "@media(max-width:400px)": {
      marginTop: "10px",
    },
  },
}));

export default function CreateNFT(userProfileData) {
  const classes = useStyles();
  const history = useHistory();
  const editor = useRef(null);
  const [base64Img1, setBase64Img1] = useState("");
  const [imgFile, setImgfile] = useState("");
  const [profile, setprofile] = useState();
  const location = useLocation();
  const [_imageurl, setFile] = useState(null);
  console.log("_imageurl-----aaa", _imageurl);
  const [_imgaeset, setImageSet] = useState("");

  const [currentvalue, setCurrentValue] = useState("Select");
  console.log("location--->>12", currentvalue);
  const partnerData = location.state;
  const idduserdata = partnerData?.id;
  console.log("asdasdadad", idduserdata);

  // const [isLoading, setLoader] = useState(false);
  const imagesec = partnerData?.logo;

  const functionKey = location.search.split("?")[1];
  console.log("Locations key is >>", functionKey);
  const [_imgDef, setImgDef] = useState("");
  console.log("_imageurl--->>", _imgDef);
  const [base64Img, setBase64Img] = useState("");
  console.log("base64Img---->>>11", base64Img);
  useEffect(() => {
    if (imagesec) {
      setBase64Img(imagesec);
    }
  }, [imagesec]);
  function imageUpload(event) {
    let base64img = userData.profilepic;
    let reader = new FileReader();
    reader.onload = function () {
      base64img = reader.result;
      setBase64Img(base64img);
    };
    reader.readAsDataURL(event.target.files[0]);
  }
  const [userData, setUserData] = useState({
    coverPic: "",
    profilePic: "",
    profilePic: "",
    coverPic: "",
  });
  const formInitialSchema = {
    districtname: "",
    locationName: "",
    contactnumber: "",
    districtname: "",
    stateName: "",
    base64Img: "",
    currentvalue: "",
    idduserdata: "",
    partnerName: partnerData?.partnerName,
    url: partnerData?.url,
  };

  const [_viewDetails, setViewDetails] = useState(formInitialSchema);
  console.log("_viewDetails11111--->>", _viewDetails);
  const formValidationSchema = yep.object().shape({
    districtname: yep
      .string()
      .required(" District is required")
      .min(2, "Please enter at least 2 characters")
      .max(35, "You can enter only 35 characters")
      .matches(
        /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/,
        "Only alphabets and white spaces are allowed for this field number are not. "
      ),
    stateName: yep
      .string()
      .required("State is required")
      .min(2, "Please enter at least 2 characters")
      .max(35, "You can enter only 35 characters")
      .matches(
        /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/,
        "Only alphabets and white spaces are allowed for this field number are not. "
      ),
    locationName: yep
      .string()
      .required(" Location is required")
      .min(2, "Please enter at least 2 characters")
      .max(35, "You can enter only 35 characters")
      .matches(
        /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/,
        "Only alphabets and white spaces are allowed for this field number are not. "
      ),
  });
  //token
  const token = window.sessionStorage.getItem("token");

  // View Emergency
  const [_viewemergency, setViewEmergency] = useState("");
  const [isLoading, setLoading] = useState("false");
  const ViewEmergencyFunction = async () => {
    try {
      setLoading(true);
      const res = await axios({
        url: apiConfig.viewEmergency,
        method: "GET",
        params: {
          emergencyId: idduserdata,
        },
      });
      if (res?.data?.responseCode === 200) {
        setLoading(false);
        console.log("res11111-->>", res);
        setViewEmergency(res?.data?.result);
        let formInitialSchema = {
          districtname: res?.data?.result?.district,
          locationName: res?.data?.result?.location,
          contactnumber: res?.data?.result?.contactNumber,
          stateName: res?.data?.result?.state,
          // base64Img: res?.data?.result?.contactNumber,
        };
        setCurrentValue(res?.data?.result?.emergencyType);
        setImgDef(res?.data?.result?.image);
        setViewDetails(formInitialSchema);
        setImageSet(res?.data?.result?.image);

        setFile(res?.data?.result?.image);
      } else if (Key) {
        setLoading(false);
      } else {
        console.log("");
      }
    } catch (error) {
      console.log("error-->>", error);
    }
  };
  //Edit Api

  const EditApiFuncction = async (values) => {
    console.log("values111-->", values);
    const formdata = new FormData();
    console.log("location--->>12", currentvalue);
    formdata.append("emergencyType", currentvalue);
    formdata.append("location", values.locationName);
    formdata.append("contactNumber", values.contactnumber);
    formdata.append("district", values.districtname);
    formdata.append("state", values.stateName);

    formdata.append("image", _imageurl === null ? _imgDef : _imageurl);

    formdata.append("emergencyId", idduserdata);

    try {
      setLoading(true);
      const res = await axios({
        url: apiConfig.editEmergency,
        method: "PUT",
        data: formdata,
        headers: {
          token: token,
        },
      });
      if (res) {
        history.push("/emergencyMgmt");
        setLoading(false);

        console.log("res--qqqq>>", res);
      }
    } catch (error) {
      setLoading(false);

      console.log("error-->>", error);
    }
  };
  useEffect(() => {
    ViewEmergencyFunction();
  }, []);
  return (
    <Box className={classes.NftBreed}>
      {isLoading ? <PageLoading /> : ""}

      <Box className={classes.devicelistHeading}>
        <Typography variant="h1" className="headingText">
          {`${functionKey} Emergency Details`}
        </Typography>
      </Box>
      <Divider className={classes.divider} />
      <Container maxWidth="md">
        <Formik
          initialValues={_viewDetails}
          initialStatus={{
            success: false,
            successMsg: "",
          }}
          enableReinitialize={true}
          // onSubmit={handleSubmit}
          validationSchema={formValidationSchema}
          onSubmit={(values) => EditApiFuncction(values)}
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
            <Form onSubmit={handleSubmit}>
              {console.log("Sadqeqacc", values)}
              <Box mt={5} mb={2} className={classes.main}>
                <Grid container spacing={2}>
                  <Grid item md={12} sm={12} lg={12} xs={12}>
                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                      }}
                    >
                      <Box>
                        {functionKey === "Edit" ? (
                          <>
                            <figure className={classes.upload}>
                              <img src={_imgDef ? _imgDef : _imgaeset} />
                              <IconButton>
                                <FiUpload />
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => {
                                    setFile(e.target.files[0]);
                                    setImgDef(
                                      URL.createObjectURL(e.target.files[0])
                                    );
                                  }}
                                />
                              </IconButton>
                            </figure>
                          </>
                        ) : functionKey === "View" ? (
                          <figure className={classes.upload}>
                            <img src={_viewemergency?.image} />
                          </figure>
                        ) : (
                          <figure className={classes.upload}>
                            <img src={_imgDef ? _imgDef : _imgaeset} />
                            <IconButton>
                              <FiUpload />
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  setFile(e.target.files[0]);
                                  setImgDef(
                                    URL.createObjectURL(e.target.files[0])
                                  );
                                }}
                              />
                            </IconButton>
                          </figure>
                        )}

                        {functionKey === "Add" ? (
                          <>
                            <Box className={classes.imgsec}>
                              <Typography variant="h6" color="primary">
                                Please select image
                              </Typography>
                            </Box>
                          </>
                        ) : functionKey === "View" ? (
                          <Box
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              width: "100%",
                            }}
                          >
                            <Typography variant="h6" color="primary">
                              Image
                            </Typography>
                          </Box>
                        ) : (
                          <Box
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              width: "100%",
                            }}
                          >
                            <Typography variant="h6" color="primary">
                              Please select image
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    </Box>
                  </Grid>

                  <Grid
                    item
                    md={12}
                    sm={12}
                    lg={12}
                    xs={12}
                    className={classes.image}
                  >
                    <Box>
                      <form className="formBox p-0" autoComplete="off">
                        {/* <Grid item lg={9} md={6} sm={7} xs={12}>
                          <Box>
                            <TextField
                              id="outlined-basic"
                              // label="Outlined"

                              type="file"
                              variant="outlined"
                              // required
                            />
                          </Box>
                        </Grid> */}
                        <FormControl
                          variant="outlined"
                          className={classes.formControl}
                        >
                          <Box mt={2}>
                            <Typography
                              variant="h5"
                              color="primary"
                              style={{ paddingBottom: "8px" }}
                            >
                              Emergency Type :
                            </Typography>

                            {functionKey === "Add" ? (
                              <>
                                <FormControl
                                  variant="outlined"
                                  className={classes.formControl}
                                >
                                  <Box>
                                    <Select
                                      name="token"
                                      labelId="demo-simple-select-outlined-label"
                                      id="demo-simple-select-outlined"
                                      onChange={(e) =>
                                        setCurrentValue(e.target.value)
                                      }
                                      value={currentvalue}
                                      style={{ width: "100%" }}
                                    >
                                      <MenuItem value="Select">
                                        Select Category
                                      </MenuItem>
                                      <MenuItem value="FIRE">FIRE</MenuItem>
                                      <MenuItem value="POLICE_STATION">
                                        {" "}
                                        POLICE_STATION
                                      </MenuItem>
                                      <MenuItem value="AMBULANCE">
                                        AMBULANCE
                                      </MenuItem>
                                      <MenuItem value="WOMEN_HELPLINE">
                                        WOMEN_HELPLINE
                                      </MenuItem>
                                    </Select>
                                  </Box>
                                </FormControl>
                              </>
                            ) : functionKey === "View" ? (
                              <Box>
                                <TextField
                                  readOnly
                                  variant="outlined"
                                  // value="Fire"
                                  inputProps={{ readOnly: "true" }}
                                  value={_viewemergency?.emergencyType}
                                />
                              </Box>
                            ) : (
                              <Box>
                                <FormControl
                                  variant="outlined"
                                  className={classes.formControl}
                                >
                                  <Box>
                                    <Select
                                      name="token"
                                      labelId="demo-simple-select-outlined-label"
                                      id="demo-simple-select-outlined"
                                      onChange={(e) =>
                                        setCurrentValue(e.target.value)
                                      }
                                      value={currentvalue}
                                      style={{ width: "100%" }}
                                    >
                                      <MenuItem value="Select">
                                        Select Category
                                      </MenuItem>
                                      <MenuItem value="FIRE">FIRE</MenuItem>
                                      <MenuItem value="POLICE_STATION">
                                        {" "}
                                        POLICE_STATION
                                      </MenuItem>
                                      <MenuItem value="AMBULANCE">
                                        AMBULANCE
                                      </MenuItem>
                                      <MenuItem value="WOMEN_HELPLINE">
                                        WOMEN_HELPLINE
                                      </MenuItem>
                                    </Select>
                                  </Box>
                                </FormControl>
                              </Box>
                            )}
                          </Box>
                        </FormControl>
                      </form>
                    </Box>
                  </Grid>
                  <Grid
                    item
                    md={12}
                    sm={12}
                    lg={12}
                    xs={12}
                    className={classes.image}
                  >
                    <Box>
                      <form className="formBox p-0" autoComplete="off">
                        <FormControl
                          variant="outlined"
                          className={classes.formControl}
                        >
                          <Box mt={2}>
                            <Typography
                              variant="h5"
                              color="primary"
                              style={{ paddingBottom: "8px" }}
                            >
                              Location Name :
                            </Typography>

                            {functionKey === "add" && (
                              <>
                                <Box>
                                  <TextField
                                    variant="outlined"
                                    name="locationName"
                                    type="text"
                                    // name=""
                                    value={values.locationName}
                                    error={Boolean(
                                      touched.locationName &&
                                        errors.locationName
                                    )}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    placeholder="Please enter location"
                                    className={classes.textField}
                                  />
                                  <FormHelperText
                                    error
                                    style={{
                                      margin: "0px",
                                      fontSize: "12px",
                                    }}
                                  >
                                    {touched.locationName &&
                                      errors.locationName}
                                  </FormHelperText>
                                </Box>
                              </>
                            )}
                            {functionKey === "Edit" && (
                              <>
                                <Box>
                                  <TextField
                                    variant="outlined"
                                    name="locationName"
                                    type="text"
                                    // name=""
                                    value={values.locationName}
                                    error={Boolean(
                                      touched.locationName &&
                                        errors.locationName
                                    )}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    placeholder="Please enter location"
                                    className={classes.textField}
                                  />
                                  <FormHelperText
                                    error
                                    style={{
                                      margin: "0px",
                                      fontSize: "12px",
                                    }}
                                  >
                                    {touched.locationName &&
                                      errors.locationName}
                                  </FormHelperText>
                                </Box>
                              </>
                            )}
                            {functionKey === "View" && (
                              <Box>
                                <TextField
                                  readOnly
                                  variant="outlined"
                                  // value="Kankarbagh Fire Station"
                                  inputProps={{ readOnly: "true" }}
                                  value={_viewemergency?.location}
                                />
                              </Box>
                            )}
                            {/* {functionKey === "Edit" && (
                              <>
                                <Box>
                                  <TextField
                                    variant="outlined"
                                    name="locationName"
                                    type="text"
                                    // value={values.locationName}
                                    error={Boolean(
                                      touched.locationName &&
                                        errors.locationName
                                    )}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    placeholder="Please enter location"
                                    className={classes.textField}
                                  />
                                  <FormHelperText
                                    error
                                    style={{
                                      margin: "0px",
                                      fontSize: "12px",
                                    }}
                                  >
                                    {touched.locationName &&
                                      errors.locationName}
                                  </FormHelperText>
                                </Box>
                              </>
                            )} */}
                          </Box>
                        </FormControl>
                      </form>
                    </Box>
                  </Grid>
                  <Grid
                    item
                    md={12}
                    sm={12}
                    lg={12}
                    xs={12}
                    className={classes.image}
                  >
                    <Box>
                      <form className="formBox p-0" autoComplete="off">
                        <FormControl
                          variant="outlined"
                          className={classes.formControl}
                        >
                          <Box mt={1}>
                            <Typography
                              variant="h5"
                              color="primary"
                              style={{ paddingBottom: "8px" }}
                            >
                              District :
                            </Typography>

                            {functionKey === "Edit" ? (
                              <>
                                <Box>
                                  <TextField
                                    variant="outlined"
                                    name="districtname"
                                    type="text"
                                    value={values.districtname}
                                    error={Boolean(
                                      touched.districtname &&
                                        errors.districtname
                                    )}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    placeholder="Please enter district"
                                    className={classes.textField}
                                  />
                                  <FormHelperText
                                    error
                                    style={{
                                      margin: "0px",
                                      fontSize: "12px",
                                    }}
                                  >
                                    {touched.districtname &&
                                      errors.districtname}
                                  </FormHelperText>
                                </Box>
                              </>
                            ) : functionKey === "View" ? (
                              <Box>
                                <TextField
                                  readOnly
                                  variant="outlined"
                                  // value="Patna"
                                  inputProps={{ readOnly: "true" }}
                                  value={_viewemergency?.district}
                                />
                              </Box>
                            ) : (
                              <Box>
                                <TextField
                                  variant="outlined"
                                  name="districtName"
                                  type="text"
                                  // value={values.districtName}
                                  error={Boolean(
                                    touched.districtName && errors.districtName
                                  )}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  placeholder="Please enter district"
                                  className={classes.textField}
                                />
                                <FormHelperText
                                  error
                                  style={{
                                    margin: "0px",
                                    fontSize: "12px",
                                  }}
                                >
                                  {touched.districtName && errors.districtName}
                                </FormHelperText>
                              </Box>
                            )}
                          </Box>
                        </FormControl>
                      </form>
                    </Box>
                  </Grid>
                  <Grid
                    item
                    md={12}
                    sm={12}
                    lg={12}
                    xs={12}
                    className={classes.image}
                  >
                    <Box>
                      <form className="formBox p-0" autoComplete="off">
                        <FormControl
                          variant="outlined"
                          className={classes.formControl}
                        >
                          <Box mt={1}>
                            <Typography
                              variant="h5"
                              color="primary"
                              style={{ paddingBottom: "8px" }}
                            >
                              State :
                            </Typography>

                            {functionKey === "Edit" ? (
                              <>
                                <Box>
                                  <TextField
                                    variant="outlined"
                                    name="stateName"
                                    type="text"
                                    value={values.stateName}
                                    error={Boolean(
                                      touched.stateName && errors.stateName
                                    )}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    placeholder="Please enter state"
                                    className={classes.textField}
                                  />
                                  <FormHelperText
                                    error
                                    style={{
                                      margin: "0px",
                                      fontSize: "12px",
                                    }}
                                  >
                                    {touched.stateName && errors.stateName}
                                  </FormHelperText>
                                </Box>
                              </>
                            ) : functionKey === "View" ? (
                              <Box>
                                <TextField
                                  readOnly
                                  variant="outlined"
                                  // value="Bihar"
                                  inputProps={{ readOnly: "true" }}
                                  value={_viewemergency?.state}
                                />
                              </Box>
                            ) : (
                              <Box>
                                <TextField
                                  variant="outlined"
                                  name="stateName"
                                  type="text"
                                  // value={values.stateName}
                                  error={Boolean(
                                    touched.stateName && errors.stateName
                                  )}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  placeholder="Please enter state"
                                  className={classes.textField}
                                />
                                <FormHelperText
                                  error
                                  style={{
                                    margin: "0px",
                                    fontSize: "12px",
                                  }}
                                >
                                  {touched.stateName && errors.stateName}
                                </FormHelperText>
                              </Box>
                            )}
                          </Box>
                        </FormControl>
                      </form>
                    </Box>
                  </Grid>
                  <Grid
                    item
                    md={12}
                    sm={12}
                    lg={12}
                    xs={12}
                    className={classes.image}
                  >
                    <Box>
                      <form className="formBox p-0" autoComplete="off">
                        <FormControl
                          variant="outlined"
                          className={classes.formControl}
                        >
                          <Box mt={1}>
                            <Typography
                              variant="h5"
                              color="primary"
                              style={{ paddingBottom: "8px" }}
                            >
                              Contact Number :
                            </Typography>

                            {functionKey === "Edit" ? (
                              <>
                                <Box>
                                  <TextField
                                    variant="outlined"
                                    name="contactnumber"
                                    type="number"
                                    value={values.contactnumber}
                                    error={Boolean(
                                      touched.contactnumber &&
                                        errors.contactnumber
                                    )}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    placeholder="Please enter contact number"
                                    className={classes.textField}
                                  />
                                  <FormHelperText
                                    error
                                    style={{
                                      margin: "0px",
                                      fontSize: "12px",
                                    }}
                                  >
                                    {touched.contactnumber &&
                                      errors.contactnumber}
                                  </FormHelperText>
                                </Box>
                              </>
                            ) : functionKey === "View" ? (
                              <Box>
                                <TextField
                                  readOnly
                                  variant="outlined"
                                  // value="100"
                                  inputProps={{ readOnly: "true" }}
                                  value={_viewemergency?.contactNumber}
                                />
                              </Box>
                            ) : (
                              <Box>
                                <TextField
                                  variant="outlined"
                                  name="contactNumber"
                                  type="number"
                                  // value={values.contactNumber}
                                  error={Boolean(
                                    touched.contactNumber &&
                                      errors.contactNumber
                                  )}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  placeholder="Please enter contact number"
                                  className={classes.textField}
                                />
                                <FormHelperText
                                  error
                                  style={{
                                    margin: "0px",
                                    fontSize: "12px",
                                  }}
                                >
                                  {touched.contactNumber &&
                                    errors.contactNumber}
                                </FormHelperText>
                              </Box>
                            )}
                          </Box>
                        </FormControl>
                      </form>
                    </Box>
                  </Grid>
                </Grid>
                <Box
                  style={{
                    marginTop: "25px",
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    justifyContent: " center",
                  }}
                >
                  {functionKey === "View" ? (
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => history.push("/emergencyMgmt")}
                      className={classes.newbtn}
                    >
                      Back
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => history.push("/emergencyMgmt")}
                      className={classes.newbtn}
                    >
                      Cancel
                    </Button>
                  )}
                  &nbsp;&nbsp;
                  {functionKey === "Edit" ? (
                    <>
                      <Box>
                        <Button
                          variant="contained"
                          type="submit"
                          color="primary"
                        >
                          Submit
                        </Button>
                      </Box>
                    </>
                  ) : functionKey === "View" ? (
                    <>
                      <Box>
                        {/* <Button
                          variant="contained"
                          type="submit"
                          color="primary"
                          // onClick={() =>
                          //   history.push({
                          //     pathname: "/emergencyView",
                          //     search: "Edit",
                          //   })
                          // }
                        >
                          Edit
                        </Button> */}
                      </Box>
                    </>
                  ) : (
                    <Box>
                      <Button variant="contained" type="submit" color="primary">
                        Update
                      </Button>
                    </Box>
                  )}
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </Container>
    </Box>
  );
}
