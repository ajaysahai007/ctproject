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

export default function CreateNFT() {
  const classes = useStyles();
  const history = useHistory();
  const editor = useRef(null);
  const [base64Img1, setBase64Img1] = useState("");
  const [imgFile, setImgfile] = useState("");
  const [profile, setprofile] = useState();
  const location = useLocation();
  const [_imageurl, setFile] = useState(null);
  console.log("_imageurl-----aaa", _imageurl);

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

  const formInitialSchema = {
    category: "",
    locationName: "",
    contactnumber: "",
    district: "",
    stateName: "",
    image: "",
    // base64Img: "",
    // currentvalue: "",
    // idduserdata: "",
    // partnerName: partnerData?.partnerName,
    // url: partnerData?.url,
  };

  const [_viewDetails, setViewDetails] = useState(formInitialSchema);
  console.log("_viewDetails11111--->>", _viewDetails);
  const formValidationSchema = yep.object().shape({
    category: yep.string().required(" District is required"),

    //   .max(35, "You can enter only 35 characters")
    //   .matches(
    //     /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/,
    //     "Only alphabets and white spaces are allowed for this field number are not. "
    //   ),
    locationName: yep
      .string()
      .required("location name is required")
      .min(2, "Please enter at least 2 characters")
      .max(35, "You can enter only 35 characters"),
    district: yep
      .string()
      .required(" district name is required")
      .min(2, "Please enter at least 2 characters")
      .max(35, "You can enter only 35 characters"),
    stateName: yep
      .string()
      .required(" state name name is required")
      .min(2, "Please enter at least 2 characters")
      .max(35, "You can enter only 35 characters"),
    contactnumber: yep
      .string()
      .required("contact number is required")
      .min(2, "Please enter at least 2 characters")
      .max(10, "You can enter only 10 characters"),
  });
  //token
  const token = window.sessionStorage.getItem("token");

  // View Emergency
  const [_viewemergency, setViewEmergency] = useState("");
  const [isLoading, setLoading] = useState(false);

  //Edit Api

  const AddMerergency = async (values) => {
    console.log("values111-->", values);
    const formdata = new FormData();
    formdata.append("emergencyType", values.category);
    formdata.append("location", values.locationName);
    formdata.append("contactNumber", values.contactnumber);
    formdata.append("district", values.district);
    formdata.append("state", values.stateName);
    formdata.append("image", _imageurl === null ? _imgDef : _imageurl);
    // formdata.append("emergencyId", idduserdata);
    try {
      setLoading(true);
      const res = await axios({
        url: apiConfig.addEmergency,
        method: "POST",
        data: formdata,
        headers: {
          token: token,
        },
      });
      if (res) {
        setLoading(false);
        history.push("/emergencyMgmt");
        console.log("res--qqqq>>", res);
      }
    } catch (error) {
      setLoading(false);
      console.log("error-->>", error);
    }
  };

  return (
    <Box className={classes.NftBreed}>
      {isLoading ? <PageLoading /> : ""}

      <Box className={classes.devicelistHeading}>
        <Typography variant="h1" className="headingText">
          Add Emergency Details
        </Typography>
      </Box>
      <Divider className={classes.divider} />
      <Container maxWidth="md">
        <Formik
          initialValues={formInitialSchema}
          initialStatus={{
            success: false,
            successMsg: "",
          }}
          enableReinitialize={true}
          // onSubmit={handleSubmit}
          validationSchema={formValidationSchema}
          onSubmit={(values) => AddMerergency(values)}
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
                        <figure className={classes.upload}>
                          <img
                            src={_imgDef ? _imgDef : "/images/plusIcon.png"}
                          />
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

                        {/* <IconButton>
                          <FiUpload /> */}
                        {/* <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              setFile(e.target.files[0]);
                              setImgDef(URL.createObjectURL(e.target.files[0]));
                            }}
                          /> */}
                        {/* </IconButton> */}

                        <Box className={classes.imgsec}>
                          <Typography variant="h6" color="primary">
                            Please select image
                          </Typography>
                        </Box>
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

                            <FormControl
                              variant="outlined"
                              className={classes.formControl}
                            >
                              <Box>
                                <Select
                                  name="category"
                                  labelId="demo-simple-select-outlined-label"
                                  id="demo-simple-select-outlined"
                                  //   onChange={(e) =>
                                  //     setCurrentValue(e.target.value)
                                  //   }
                                  error={Boolean(
                                    touched.category && errors.category
                                  )}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  value={values.category}
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
                              <FormHelperText
                                error
                                style={{
                                  margin: "0px",
                                  fontSize: "12px",
                                }}
                              >
                                {touched.category && errors.category}
                              </FormHelperText>
                            </FormControl>
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

                            <>
                              <Box>
                                <TextField
                                  variant="outlined"
                                  name="locationName"
                                  type="text"
                                  // name=""
                                  value={values.locationName}
                                  error={Boolean(
                                    touched.locationName && errors.locationName
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
                                  {touched.locationName && errors.locationName}
                                </FormHelperText>
                              </Box>
                            </>
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
                            <Box>
                              <Typography
                                variant="h5"
                                color="primary"
                                style={{ paddingBottom: "8px" }}
                              >
                                District :
                              </Typography>

                              <TextField
                                readOnly
                                variant="outlined"
                                name="district"
                                error={Boolean(
                                  touched.district && errors.district
                                )}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                placeholder="district"
                                value={_viewemergency?.location}
                              />
                              <FormHelperText
                                error
                                style={{
                                  margin: "0px",
                                  fontSize: "12px",
                                }}
                              >
                                {touched.district && errors.district}
                              </FormHelperText>
                            </Box>
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
                      </Box>
                    </FormControl>
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

                            <Box>
                              <TextField
                                variant="outlined"
                                name="contactnumber"
                                type="number"
                                value={values.contactnumber}
                                error={Boolean(
                                  touched.contactnumber && errors.contactnumber
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
                                {touched.contactnumber && errors.contactnumber}
                              </FormHelperText>
                            </Box>
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
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => history.push("/emergencyMgmt")}
                    className={classes.newbtn}
                  >
                    Back
                  </Button>
                  &nbsp;&nbsp;
                  <Box>
                    <Button variant="contained" type="submit" color="primary">
                      Add Emergency
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </Container>
    </Box>
  );
}
