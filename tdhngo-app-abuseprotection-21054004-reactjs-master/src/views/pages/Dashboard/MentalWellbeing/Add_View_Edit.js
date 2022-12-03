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
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
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
import PageLoading from "src/component/PageLoading";
import ReactPlayer from "react-player";
const useStyles = makeStyles((theme) => ({
  select_image: {
    marginTop: "-20px",
    textAlign: "center",
  },
  subitBtn: {
    "@media (max-width:514px)": {
      marginTop: "10px",
      marginLeft: "-5px",
    },
  },
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
    height: "200px",
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
  const [currentvalue, setCurrentValue] = useState("Select");
  const partnerData = location.state;
  const idduserdata = partnerData?._id ? partnerData?._id : partnerData?.id;
  const [_isloading, setLoading] = useState(true);
  const [_imageurl, setFile] = useState(null);
  const [_imgaeset, setImageSet] = useState("");
  const [_viewperiod, setViewPeriod] = useState();
  const imagesec = partnerData?.logo;
  const [_uploadfiletype, setUploadFileType] = useState();
  const functionKey = location.search.split("?")[1];
  const [_imgDef, setImgDef] = useState("");
  const { type, Add_send_id } = location.state;
  console.log("_imgDeffunctionKey--->>", Add_send_id);
  const [docType, setDocType] = useState("image");
  // const [_isloading, setLoading] = useState();
  const [_storeId, setStoreId] = useState("");
  const formValidationSchema = yep.object().shape({
    title: yep
      .string()
      .required("Title name is required")
      .min(2, "Please enter at least 2 characters")
      .max(35, "You can enter only 35 characters"),
    content: yep
      .string()
      .required("Content is required")
      .min(2, "Please enter at least 2 characters")
      .max(35, "You can enter only 35 characters"),
  });

  const [base64Img, setBase64Img] = useState("");
  useEffect(() => {
    if (imagesec) {
      setBase64Img(imagesec);
    }
  }, [imagesec]);
  const formInitialValue = {
    _imageurl: "",
    title: "",
    content: "",
  };
  const [_initalstate, setInialState] = useState(formInitialValue);
  console.log("_initalstate-->>", _initalstate);

  const URLFunction = () => {
    if (functionKey === "Add") {
      return apiConfig.addMentalAndWellBeingData;
    } else {
      return apiConfig.editMentalAndWellBeingData;
    }
  };
  //ADD PERIOD_TRACKER MANAGEMENT
  const AddPeriodSubActivity = async (values) => {
    setLoading(true);
    let URLKey = URLFunction();
    const formdata = new FormData();
    formdata.append("article_name", values.title);
    formdata.append("type", type);

    formdata.append("content", values.content);
    formdata.append("video", _imageurl !== null ? _imageurl : _imgDef);
    try {
      const res = await axios({
        url: URLKey,
        method: functionKey === "Add" ? "POST" : "PUT",
        headers: {
          token: window.sessionStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        data: formdata,
        params: {
          _id: Add_send_id,
        },
      });
      if (res) {
        setLoading(false);

        console.log(res);

        history.push({
          pathname: "/mental-well-being",
          state: {
            Add_send_id: Add_send_id,
            type: type,
          },
        });
        // });
      }
    } catch (error) {
      setLoading(false);

      console.log("error", error);
    }
  };
  //VIEW PERIOD_TRACKER MANAGEMENT
  const ViewPeriodFuntion = async () => {
    try {
      setLoading(true);

      const res = await axios({
        url: apiConfig.viewMentalAndWellBeingData,

        method: "GET",
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
        params: {
          _id: idduserdata,
        },
      });
      if (res) {
        setLoading(false);

        console.log("res123--->>>", res);
        setViewPeriod(res?.data?.result);
        const formInitialValue = {
          title: res?.data?.result?.article_name,
          content: res?.data?.result?.content,
          _imgDef: res?.data?.result?.url,
          _imageurl: res?.data?.result?.url,
        };
        setFile(res?.data?.result?.url);
        setInialState(formInitialValue);
      }
    } catch (error) {
      setLoading(false);

      console.log("error", error);
    }
  };

  useEffect(() => {
    ViewPeriodFuntion();
  }, [idduserdata]);
  return (
    <Box className={classes.NftBreed}>
      {_isloading ? <PageLoading /> : ""}
      <Box className={classes.devicelistHeading}>
        <Typography variant="h1" className="headingText">
          {`${functionKey} Activity`}
        </Typography>
      </Box>
      <Divider className={classes.divider} />
      <Container maxWidth="md">
        <Formik
          initialValues={_initalstate}
          enableReinitialize={true}
          initialStatus={{
            success: false,
            successMsg: "",
          }}
          onSubmit={(values) => AddPeriodSubActivity(values)}
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
                        {functionKey === "Add" ? (
                          <>
                            <figure className={classes.upload}>
                              {/* <img
                                src={
                                  _imgDef ? _imgDef : "/images/mentalIll.png"
                                }
                              /> */}
                              <ReactPlayer
                                url={
                                  _imgDef ? _imgDef : "/images/mentalIll.png"
                                }
                                width="100%"
                                height="20vh"
                                controls={true}
                              />
                              <IconButton>
                                <FiUpload />
                                <input
                                  type="file"
                                  // accept="image/*"
                                  accept="image/*, video/*, .mp3,audio/*, docs/*"
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
                          <>
                            {/* <iframe
                              style={{
                                width: "150px",
                                height: "70px",
                                objectFit: "cover",
                              }}
                              src={_viewperiod?.data?.result?.url}
                            ></iframe> */}
                            <ReactPlayer
                              url={
                                _viewperiod?.url
                                  ? _viewperiod?.url
                                  : _viewperiod?.video
                              }
                              width="100%"
                              height="20vh"
                              controls={true}
                            />
                          </>
                        ) : (
                          <>
                            <figure className={classes.upload}>
                              <ReactPlayer
                                url={_imgDef === "" ? _imageurl : _imgDef}
                                width="100%"
                                height="20vh"
                                controls={true}
                              />

                              <IconButton>
                                <FiUpload />
                                <input
                                  type="file"
                                  accept="image/*, video/*, .mp3,audio/*, docs/*"
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
                        )}

                        {functionKey === "Add" ? (
                          <>
                            <Box className={classes.imgsec}>
                              <Typography
                                variant="h6"
                                color="primary"
                                className={classes.select_image}
                              >
                                Please select Video
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
                              Activity video
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
                              Please select Video
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
                        <FormControl
                          variant="outlined"
                          className={classes.formControl}
                        >
                          <Box mt={2}>
                            {functionKey === "Add" ? (
                              <>
                                <Box mt={2}>
                                  <Typography variant="h6" color="primary">
                                    Artical Name :
                                  </Typography>
                                  <TextField
                                    variant="outlined"
                                    name="title"
                                    type="text"
                                    value={values.title}
                                    error={Boolean(
                                      touched.title && errors.title
                                    )}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    placeholder="Please enter Title"
                                    className={classes.textField}
                                  />
                                  <FormHelperText
                                    error
                                    style={{
                                      margin: "0px",
                                      fontSize: "12px",
                                    }}
                                  >
                                    {touched.title && errors.title}
                                  </FormHelperText>
                                </Box>
                                <Box mt={2}>
                                  <Typography variant="h6" color="primary">
                                    Content :
                                  </Typography>
                                  <TextField
                                    variant="outlined"
                                    name="content"
                                    type="text"
                                    value={values.content}
                                    error={Boolean(
                                      touched.content && errors.content
                                    )}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    placeholder="Please enter Content"
                                    className={classes.textField}
                                  />
                                  <FormHelperText
                                    error
                                    style={{
                                      margin: "0px",
                                      fontSize: "12px",
                                    }}
                                  >
                                    {touched.content && errors.content}
                                  </FormHelperText>
                                </Box>
                              </>
                            ) : functionKey === "View" ? (
                              <>
                                <Typography
                                  variant="h5"
                                  color="primary"
                                  style={{ paddingBottom: "8px" }}
                                >
                                  Article Name
                                </Typography>
                                <Box>
                                  <TextField
                                    disabled
                                    readOnly
                                    variant="outlined"
                                    value={_viewperiod?.article_name}
                                    inputProps={{ readOnly: "true" }}
                                  />
                                </Box>
                                <Box mt={3}>
                                  <Typography
                                    variant="h5"
                                    color="primary"
                                    style={{ paddingBottom: "8px" }}
                                  >
                                    Content
                                  </Typography>
                                  <Box>
                                    <TextField
                                      disabled
                                      readOnly
                                      variant="outlined"
                                      value={_viewperiod?.content}
                                      inputProps={{ readOnly: "true" }}
                                    />
                                  </Box>
                                </Box>

                                <Box mt={3}>
                                  <Typography
                                    variant="h5"
                                    color="primary"
                                    style={{ paddingBottom: "8px" }}
                                  >
                                    Video URL :
                                  </Typography>
                                  <TextField
                                    readOnly
                                    variant="outlined"
                                    value={
                                      _viewperiod?.url
                                        ? _viewperiod?.url
                                        : _viewperiod?.video
                                    }
                                    inputProps={{ readOnly: "true" }}
                                  />
                                </Box>
                              </>
                            ) : (
                              <Box>
                                <Typography variant="h6" color="primary">
                                  Article Name :
                                </Typography>
                                <TextField
                                  name="title"
                                  error={Boolean(touched.title && errors.title)}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  variant="outlined"
                                  value={values?.title}
                                />
                                <FormHelperText
                                  error
                                  style={{
                                    margin: "0px",
                                    fontSize: "12px",
                                  }}
                                >
                                  {touched.title && errors.title}
                                </FormHelperText>
                                <Box mt={2}>
                                  <Typography variant="h6" color="primary">
                                    Content :
                                  </Typography>
                                  <TextField
                                    variant="outlined"
                                    name="content"
                                    type="text"
                                    value={values.content}
                                    error={Boolean(
                                      touched.content && errors.content
                                    )}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    placeholder="Please enter Content"
                                    className={classes.textField}
                                  />
                                  <FormHelperText
                                    error
                                    style={{
                                      margin: "0px",
                                      fontSize: "12px",
                                    }}
                                  >
                                    {touched.content && errors.content}
                                  </FormHelperText>
                                </Box>
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
                      // onClick={() => history.push("/activityorder")}
                      onClick={() =>
                        history.push({
                          pathname: "/mental-well-being",
                          //   search: "View",
                          state: {
                            Add_send_id: "22",
                            type: type,
                          },
                        })
                      }
                      className={classes.newbtn}
                    >
                      Back
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      // onClick={() => history.push("/activityorder")}
                      onClick={() =>
                        history.push({
                          pathname: "/mental-well-being",

                          state: {
                            Add_send_id: "22",
                            type: type,
                          },
                        })
                      }
                      className={classes.newbtn}
                    >
                      Cancel
                    </Button>
                  )}
                  &nbsp;&nbsp;
                  {functionKey === "Add" ? (
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
                    <></>
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
