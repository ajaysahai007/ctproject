import React, { useContext, useState, useEffect } from "react";
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
import Button from "@material-ui/core/Button";
import { FiUpload } from "react-icons/fi";
import { addImageHandler, getBase64 } from "src/utils";
import { useHistory } from "react-router-dom";
import * as yep from "yup";
import { toast } from "react-toastify";
import apiConfig from "src/APIconfig/ApiConfig";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { Formik, Form } from "formik";

const useStyles = makeStyles((theme) => ({
  NftBreed: {
    padding: "23px 0 ",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: "100%",
    margin: "0 10px",
  },
  main: {
    border: "1px solid #01FBB4",
    padding: "40px",
    background:
      "linear-gradient(152.97deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)",
    boxShadow: "0px 0px 53px rgb(0 0 0 / 25%)",
    borderRadius: "5px",
    backdropFilter: "blur(5px)",
    "&:hover": {
      boxShadow:
        "0 0 1rem #1eb80873, 0 0 0rem #1eb80873, 0 0 1rem #1eb80880, 0 0 4rem #1eb80866",
    },
  },
  divider: {
    marginTop: "30px",
  },
  textField: {
    maxWidth: "100%",
  },

  image: {
    // display: "flex",
    // justifyContent: "center",
    cursor: "pointer",
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
      border: "1px solid #01FBB4",
      borderRadius: "50%",
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
  const [base64Img, setBase64Img] = useState("");
  const [base64Img1, setBase64Img1] = useState("");
  const [imgFile, setImgfile] = useState("");
  const [profile, setprofile] = useState();
  const location = useLocation();
  const partnerID = location.state;
  console.log("fjksdukfhbgjg", partnerID);
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

  const addNewPartner = async (values) => {
    try {
      const res = await axios({
        method: "POST",
        url: apiConfig.partnerList,
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
        data: {
          logo: base64Img,
          partnerName: values.partnerName,
          url: values.url,
        },
      });
      if (res.data.statusCode === 200) {
        toast.success("Partner Added Successfully");
        console.log("asdasdasdss", res);
        history.push("/contentMgmt");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [viewOnePartner, setviewOnePartner] = useState();
  const viewPartner = async () => {
    try {
      // setIsLoading(true);
      const res = await axios({
        method: "GET",
        url: apiConfig.partnerList + `/${partnerID}`,
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
      });
      if (res.data.statusCode === 200) {
        console.log("afkjhsakdjlfbg", res);
        setviewOnePartner(res.data.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (partnerID) {
      viewPartner();
    }
  }, [partnerID]);

  const editPartner = async (values) => {
    try {
      const res = await axios({
        method: "PUT",
        url: apiConfig.partnerList,
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
        data: {
          picture: base64Img,
          title: values.title,
          description: values.desc,
          url: values.url,
          _id: partnerID,
        },
      });
      if (res.data.statusCode === 200) {
        toast.success("Partner Updated Successfully");
        console.log("asdasdasdss", res);
        history.push("/contentMgmt");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box className={classes.NftBreed}>
      <Box className={classes.devicelistHeading}>
        <img src="images/Vector 83.png" className="icon1" />
        {window.location.pathname === "/AddPartner" && (
          <Typography variant="h1" className="headingText">
            Add New Partner
          </Typography>
        )}
        {window.location.pathname === "/edit-partner" && (
          <Typography variant="h1" className="headingText">
            Edit Partner
          </Typography>
        )}
        {window.location.pathname === "/view-partner" && (
          <Typography variant="h1" className="headingText">
            View Partner
          </Typography>
        )}
        <img src="images/Vector 80.png" className="icon2" />
      </Box>
      <Divider className={classes.divider} />
      <Container maxWidth="md">
        {console.log("aklsdjflkasj", viewOnePartner?.partnerName)}

        <Formik
          // onSubmit={(values) => handleFormSubmit(values)}
          initialValues={{
            partnerName: viewOnePartner?.partnerName,
            url: viewOnePartner?.logo,
          }}
          initialStatus={{
            success: false,
            successMsg: "",
          }}
          validationSchema={yep.object().shape({
            partnerName: yep
              .string()
              .required("Partner name is required.")
              .min(2, "Please enter at least 2 characters.")
              .max(25, "You can enter only 25 characters.")
              .matches(
                /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/,
                "Only alphabets and whitespaces are allowed for this field number are not. "
              ),
            url: yep
              .string()
              .required("Url is required.")
              .matches(
                /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/,
                "URL must be like 'WWW.google.com'"
              ),
          })}
          onSubmit={(values) => addNewPartner(values)}
          // onSubmit={(values) => editPartner(values)}
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
              <Box mt={10} mb={2} className={classes.main}>
                <Grid container spacing={2}>
                  <Grid item md={4} sm={4} lg={4} xs={12}>
                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                      }}
                    >
                      {window.location.pathname === "/view-partner" ? (
                        <>
                          <Box>
                            <figure className={classes.upload}>
                              <img style={{}} src={viewOnePartner?.logo} />
                            </figure>
                            <Box
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                width: "100%",
                              }}
                            >
                              <Typography variant="h6" color="primary">
                                {viewOnePartner?.partnerName}
                              </Typography>
                            </Box>
                          </Box>
                        </>
                      ) : (
                        <>
                          <Box>
                            <figure className={classes.upload}>
                              <img
                                src={base64Img ? base64Img : "/images/t3.jpeg"}
                              />
                              <IconButton>
                                <FiUpload />
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={imageUpload}
                                />
                              </IconButton>
                            </figure>
                            <Box
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                width: "100%",
                              }}
                            >
                              <Typography variant="h6" color="primary">
                                Please select images
                              </Typography>
                            </Box>
                          </Box>
                        </>
                      )}
                    </Box>
                  </Grid>
                  <Grid
                    item
                    md={8}
                    sm={8}
                    lg={8}
                    xs={12}
                    className={classes.image}
                  >
                    <Box mt={2}>
                      <form className="formBox p-0" autoComplete="off">
                        <Grid container spacing={2} className="BreedDetails">
                          <FormControl
                            variant="outlined"
                            className={classes.formControl}
                          >
                            {window.location.pathname === "/view-partner" ? (
                              <>
                                <Box mt={2}>
                                  <Typography
                                    variant="h5"
                                    color="primary"
                                    style={{ paddingBottom: "8px" }}
                                  >
                                    Partner name :
                                  </Typography>
                                  {console.log(
                                    "asdsdfasdasd",
                                    viewOnePartner?.partnerName,
                                    values?.partnerName
                                  )}
                                  <TextField
                                    variant="outlined"
                                    value={viewOnePartner?.partnerName}
                                    className={classes.textField}
                                    inputProps={{ readOnly: "true" }}
                                  />
                                </Box>
                                <Box mt={2}>
                                  <Typography
                                    variant="h5"
                                    color="primary"
                                    style={{ paddingBottom: "8px" }}
                                  >
                                    Source URL :
                                  </Typography>
                                  <TextField
                                    variant="outlined"
                                    value={viewOnePartner?.url}
                                    aria-readonly
                                    placeholder="https://www.lipsum.com/"
                                    className={classes.textField}
                                    inputProps={{ readOnly: "true" }}
                                  />
                                </Box>
                              </>
                            ) : (
                              <>
                                <Box mt={2}>
                                  <Typography
                                    variant="h5"
                                    color="primary"
                                    style={{ paddingBottom: "8px" }}
                                  >
                                    Partner name :
                                  </Typography>
                                  <TextField
                                    variant="outlined"
                                    name="partnerName"
                                    value={values.partnerName}
                                    placeholder="Please enter name"
                                    className={classes.textField}
                                    error={Boolean(
                                      touched.partnerName && errors.partnerName
                                    )}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                  />
                                  <FormHelperText
                                    error
                                    style={{
                                      fontSize: "12px",
                                      paddingBottom: "0px !important",
                                      marginLeft: "2px",
                                    }}
                                  >
                                    {touched.partnerName && errors.partnerName}
                                  </FormHelperText>
                                </Box>
                                <Box mt={2}>
                                  <Typography
                                    variant="h5"
                                    color="primary"
                                    style={{ paddingBottom: "8px" }}
                                  >
                                    Source URL(Optional) :
                                  </Typography>
                                  <TextField
                                    variant="outlined"
                                    name="url"
                                    value={values.url}
                                    placeholder="Please enter url"
                                    className={classes.textField}
                                    // className={classes.textField}
                                    error={Boolean(touched.url && errors.url)}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                  />
                                  <FormHelperText
                                    error
                                    style={{
                                      fontSize: "12px",
                                      paddingBottom: "0px !important",
                                      marginLeft: "2px",
                                    }}
                                  >
                                    {touched.url && errors.url}
                                  </FormHelperText>
                                </Box>
                              </>
                            )}

                            <Box style={{ marginTop: "16px" }}>
                              {window.location.pathname === "" ? (
                                ""
                              ) : (
                                <>
                                  {window.location.pathname ===
                                  "/edit-partner" ? (
                                    <>
                                      <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                      >
                                        Update
                                      </Button>
                                      &nbsp;&nbsp;
                                    </>
                                  ) : (
                                    ""
                                  )}
                                </>
                              )}

                              <Button
                                variant="contained"
                                color="primary"
                                className={classes.newbtn}
                                onClick={() =>
                                  history.push(
                                    `${
                                      window.location.pathname ===
                                      "/view-partner"
                                        ? "/contentMgmt"
                                        : "/contentMgmt"
                                    }`
                                  )
                                }
                              >
                                Back
                              </Button>
                            </Box>
                          </FormControl>
                        </Grid>
                      </form>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Form>
          )}
        </Formik>
      </Container>
    </Box>
  );
}
