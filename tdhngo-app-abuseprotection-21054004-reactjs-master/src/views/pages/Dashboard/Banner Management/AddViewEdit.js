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
import Button from "@material-ui/core/Button";
import { Form, Formik } from "formik";
import { FiUpload } from "react-icons/fi";
import { addImageHandler, getBase64 } from "src/utils";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { convertDateTime } from "src/utils/index";
import { Link, useLocation } from "react-router-dom";
import apiConfig from "src/APIconfig/ApiConfig";
import JoditEditor from "jodit-react";
import PageLoading from "src/component/PageLoading";
const useStyles = makeStyles((theme) => ({
  NftBreed: {
    padding: "23px 0 ",
  },
  dengerousClass: {
    border: "1px solid #f38500",
    padding: "0px 10px",
    color: "black",
    borderRadius: "5px",
    height: "50px",
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
  const [_isloading, setLoading] = useState(false);
  const location = useLocation();
  const [_imgDef, setImgDef] = useState("");
  const [_description, setDescription] = useState("");
  const partnerData = location.state;
  const idduserdata = partnerData?.id;
  const [_imageurl, setFile] = useState(null);
  const [_imgaeset, setImageSet] = useState("");

  console.log("_imageurl--->>", _imgaeset);
  const [_viewbannerdata, setViewBannerData] = useState();
  const imagesec = partnerData?.logo;
  const functionKey = location.search.split("?")[1];
  // const [_imgDef, setImgDef] = useState("");

  const [base64Img, setBase64Img] = useState("");
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
  const formInitialValue = {
    title: "",
    _imageurl: "",
    // description: "",
  };
  const [_initalstate, setInialState] = useState(formInitialValue);

  const formValidationSchema = yep.object().shape({
    title: yep
      .string()
      .required("title name is required")
      .min(2, "Please enter at least 2 characters")
      .max(35, "You can enter only 35 characters"),
    // description: yep
    //   .string()
    //   .required("Description name is required")
    //   .min(2, "Please enter at least 2 characters")
    //   .max(35, "You can enter only 35 characters"),
  });
  const [_useraddress, setUrlAddress] = useState();
  const [_method, setMethod] = useState("");
  console.log(
    "_useraddress-->",
    _useraddress,
    "_useraddress-->>",
    _useraddress
  );
  const URLFunction = () => {
    if (functionKey === "Add") {
      return apiConfig.addBanner;
    } else {
      return apiConfig.editBanner;
    }
  };
  // ADD AND EDIT BANNER MANAGEMENT
  const AddBannerSubmit = async (values) => {
    setLoading(true);
    let URLKey = URLFunction();
    try {
      const formdata = new FormData();
      formdata.append("title", values.title);
      formdata.append("description", values.description);

      formdata.append("image", _imageurl === null ? _imgaeset : _imageurl);
      formdata.append("bannerId", idduserdata);

      const res = await axios({
        url: URLKey,
        method: functionKey === "Add" ? "POST" : "PUT",
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
        data: formdata,
      });
      if (res) {
        setLoading(false);

        console.log(res);
        history.push("/bannerMgmt");
      }
    } catch (error) {
      setLoading(false);

      console.log("error", error);
    }
  };
  //VIEW BANEER MANAGEMENT
  const token = window.sessionStorage.getItem("token");
  const ViewBannerFunction = async () => {
    try {
      setLoading(true);
      const res = await axios({
        url: apiConfig.viewBanner,
        headers: {
          token: token,
        },
        params: {
          bannerId: idduserdata,
        },
      });
      if (res) {
        setLoading(false);

        console.log("res=====>>", res);
        setViewBannerData(res?.data?.result);
        const formInitialValue = {
          title: res?.data?.result?.title,
          _imageurl: res?.data?.result?.image,
          // description: res?.data?.result?.description,
        };
        setImageSet(res?.data?.result?.image);
        // setImgDef(res?.data?.result?.image);

        setInialState(formInitialValue);
        // setDescription(res?.data?.result?.description);
      }
    } catch (error) {
      setLoading(false);

      console.log("error=====>>", error);
    }
  };

  useEffect(() => {
    ViewBannerFunction();
  }, [idduserdata]);
  return (
    <Box className={classes.NftBreed}>
      {_isloading ? <PageLoading /> : ""}
      <Box className={classes.devicelistHeading}>
        <Typography variant="h1" className="headingText">
          {`${functionKey} Banner`}
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
          onSubmit={(values) => AddBannerSubmit(values)}
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
                        {functionKey === "Add" ? (
                          <>
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
                          </>
                        ) : functionKey === "View" ? (
                          <figure className={classes.upload}>
                            <img src={_viewbannerdata?.image} />
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
                              Title
                            </Typography>

                            {functionKey === "Add" ? (
                              <>
                                <Box>
                                  <TextField
                                    variant="outlined"
                                    name="title"
                                    type="text"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.title}
                                    placeholder="Please enter title"
                                    error={Boolean(
                                      touched.title && errors.title
                                    )}
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
                                {/* <Box>
                                  <Box mt={2}>
                                    <Typography
                                      variant="h5"
                                      color="primary"
                                      style={{ paddingBottom: "8px" }}
                                    >
                                      Description
                                    </Typography>
                                  </Box>
                                  <TextField
                                    variant="outlined"
                                    name="description"
                                    type="text"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.description}
                                    error={Boolean(
                                      touched.description && errors.description
                                    )}
                                    placeholder="Please enter category name"
                                    className={classes.textField}
                                  />

                                  <FormHelperText
                                    error
                                    style={{
                                      margin: "0px",
                                      fontSize: "12px",
                                    }}
                                  >
                                    {touched.description && errors.description}
                                  </FormHelperText>
                                </Box> */}
                                {/* <Box>
                                  <TextField
                                    variant="outlined"
                                    name="position"
                                    type="number"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.position}
                                    placeholder="Please enter position value"
                                    error={Boolean(
                                      touched.position && errors.position
                                    )}
                                    className={classes.textField}
                                  />
                                  <FormHelperText
                                    error
                                    style={{
                                      margin: "0px",
                                      fontSize: "12px",
                                    }}
                                  >
                                    {touched.position && errors.position}
                                  </FormHelperText>
                                </Box>
                                <Box>
                                  <TextField
                                    variant="outlined"
                                    name="position"
                                    type="number"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.position}
                                    placeholder="Please enter position value"
                                    error={Boolean(
                                      touched.position && errors.position
                                    )}
                                    className={classes.textField}
                                  />
                                  <FormHelperText
                                    error
                                    style={{
                                      margin: "0px",
                                      fontSize: "12px",
                                    }}
                                  >
                                    {touched.position && errors.position}
                                  </FormHelperText>
                                </Box> */}
                              </>
                            ) : functionKey === "View" ? (
                              <Box>
                                <TextField
                                  readOnly
                                  variant="outlined"
                                  value={_viewbannerdata?.title}
                                  inputProps={{ readOnly: "true" }}
                                />
                              </Box>
                            ) : (
                              <>
                                <Box>
                                  {console.log(
                                    "_initalstate111...>>>",
                                    _initalstate
                                  )}
                                  <TextField
                                    variant="outlined"
                                    name="title"
                                    type="text"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.title}
                                    error={Boolean(
                                      touched.title && errors.title
                                    )}
                                    // onBlur={handleBlur}
                                    // onChange={handleChange}
                                    placeholder="Please enter title"
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
                                {/* <Box mt={2}>
                                  <Typography
                                    variant="h5"
                                    color="primary"
                                    style={{ paddingBottom: "8px" }}
                                  >
                                    Description
                                  </Typography>
                                </Box>
                                <TextField
                                  variant="outlined"
                                  name="description"
                                  type="text"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  value={values.description}
                                  error={Boolean(
                                    touched.description && errors.description
                                  )}
                                  multiline
                                  maxRows={4}
                                  placeholder="Please enter description"
                                  className={classes.textField}
                                />
                                <FormHelperText
                                  error
                                  style={{
                                    margin: "0px",
                                    fontSize: "12px",
                                  }}
                                >
                                  {touched.description && errors.description}
                                </FormHelperText> */}
                              </>
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
                        <Grid container spacing={2} className="BreedDetails">
                          <FormControl
                            variant="outlined"
                            className={classes.formControl}
                          >
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                              <Box mt={1}>
                                {/* {functionKey === "View" ? (
                                  <Typography
                                    variant="h5"
                                    color="primary"
                                    style={{ paddingBottom: "8px" }}
                                  >
                                    Description
                                  </Typography>
                                ) : (
                                  ""
                                )} */}

                                {functionKey === "View" ? (
                                  <>
                                    {/* <Box>
                                      <Typography
                                        className={classes.dengerousClass}
                                      >
                                        <div
                                          className={classes.dengerous_typo}
                                          dangerouslySetInnerHTML={{
                                            __html:
                                              _viewbannerdata?.description,
                                          }}
                                        ></div>
                                      </Typography>
                                    </Box> */}

                                    <Box mt={2}>
                                      <Typography
                                        variant="h5"
                                        color="primary"
                                        style={{ paddingBottom: "8px" }}
                                      >
                                        Created Date and Time :
                                      </Typography>
                                      <TextField
                                        readOnly
                                        variant="outlined"
                                        value={convertDateTime(
                                          _viewbannerdata?.createdAt
                                        )}
                                        inputProps={{ readOnly: "true" }}
                                      />
                                    </Box>
                                  </>
                                ) : (
                                  ""
                                )}
                              </Box>
                            </Grid>
                          </FormControl>
                        </Grid>
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
                      onClick={() => history.push("/bannerMgmt")}
                      className={classes.newbtn}
                    >
                      Back
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => history.push("/bannerMgmt")}
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
                    <>
                      {/* <Box>
                        <Button
                          variant="contained"
                          type="submit"
                          color="primary"
                          onClick={() =>
                            history.push({
                              pathname: "/bannerView",
                              search: "Edit",
                            })
                          }
                        >
                          Edit
                        </Button>
                      </Box> */}
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
