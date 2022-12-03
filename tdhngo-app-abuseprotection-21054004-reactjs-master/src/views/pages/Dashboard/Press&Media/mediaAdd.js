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
import * as yep from "yup";
import Button from "@material-ui/core/Button";
import { Form, Formik } from "formik";
import { FiUpload } from "react-icons/fi";
import { addImageHandler, getBase64 } from "src/utils";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import apiConfig from "src/APIconfig/ApiConfig";
import axios from "axios";
import { CompareArrowsOutlined } from "@material-ui/icons";

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
  const [title, setTitle] = useState()
  const [desc, setDesc] = useState()
  const [url, setUrl] = useState()
  const formInitialValue = {
    title: "",
    url: "",
    desc: "",
  };
  const addNewMedia = async (values) => {
    try {
      const res = await axios({
        method: "POST",
        url: apiConfig.mediaList,
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
        data: {
          picture: base64Img,
          title: values.title,
          description: values.desc,
          url: values.url,

        }
      })
      if (res.data.statusCode === 200) {
        toast.success("Media Added Successfully")
        console.log("asdasdasdss", res)
        history.push("/pressMedia")
      }
    }
    catch (error) {
      console.log(error)
    }
  }

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

  const formValidationSchema = yep.object().shape({
    title: yep
      .string()
      .required(" Title is required")
      .min(2, "Please enter at least 2 characters")
      .max(35, "You can enter only 35 characters")
      .matches(
        /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/,
        "Only alphabets and white spaces are allowed for this field number are not. "
      ),
    url: yep
      .string()
      .required(" URL is required")
      .matches(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/,"URL must be like 'WWW.google.com'"),
    desc: yep
      .string()
      .required(" Description is required")
      .min(10, "Please enter at least 10 characters")
      .max(350, "You can enter only 350 characters"),
  });

  return (
    <Box className={classes.NftBreed}>
      <Box className={classes.devicelistHeading}>
        <img src="images/Vector 83.png" className="icon1" />
        {window.location.pathname === "/add-media" && (
          <Typography variant="h1" className="headingText">
            Add New Media
          </Typography>
        )}


        <img src="images/Vector 80.png" className="icon2" />
      </Box>
      <Divider className={classes.divider} />
      <Container maxWidth="md">
        <Formik
          initialValues={formInitialValue}
          initialStatus={{
            success: false,
            successMsg: "",
          }}
          validationSchema={formValidationSchema}
          onSubmit={(values) => addNewMedia(values)}
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
                      <Box>
                        <figure className={classes.upload}>
                          <img src={base64Img ? base64Img : "/images/t3.jpeg"} />
                          <IconButton>
                            <FiUpload />
                            <input
                              type="file"
                              accept="image/*"
                              // required
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
                            Please select image
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item md={8} sm={8} lg={8} xs={12} className={classes.image}>
                    <Box mt={2}>
                      <form className="formBox p-0" autoComplete="off">
                        <Grid container spacing={2} className="BreedDetails">
                          <FormControl
                            variant="outlined"
                            className={classes.formControl}
                          >
                            <Box>
                              <Typography variant="h4" color="primary">
                                Upload media photo :
                              </Typography>
                            </Box>
                            <Box mt={2}>
                              <Typography
                                variant="h5"
                                color="primary"
                                style={{ paddingBottom: "8px" }}
                              >
                                Title :
                              </Typography>
                              <TextField
                                variant="outlined"
                                name="title"
                                type="text"
                                value={values.title}
                                error={Boolean(touched.title && errors.title)}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                placeholder="Please enter media title"
                                className={classes.textField}
                              />
                              <FormHelperText
                                error
                                style={{ margin: "0px", fontSize: "12px" }}
                              >
                                {touched.title && errors.title}
                              </FormHelperText>
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
                                name="url"
                                error={Boolean(touched.url && errors.url)}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.url}
                                placeholder="Enter media url"
                                className={classes.textField}
                              />
                              <FormHelperText
                                error
                                style={{ margin: "0px", fontSize: "12px" }}
                              >
                                {touched.url && errors.url}
                              </FormHelperText>
                            </Box>
                            <Box mt={2}>
                              <Typography
                                variant="h5"
                                color="primary"
                                style={{ paddingBottom: "8px" }}
                              >
                                Description :
                              </Typography>
                              <TextField
                                variant="outlined"
                                fullWidth
                                name="desc"
                                error={Boolean(touched.desc && errors.desc)}
                                onBlur={handleBlur}
                                value={values.desc}
                                onChange={handleChange}
                                placeholder="Please enter description"
                                className={classes.textField}
                                multiline
                                rows={4}
                              />
                              <FormHelperText
                                error
                                style={{ margin: "0px", fontSize: "12px" }}
                              >
                                {touched.desc && errors.desc}
                              </FormHelperText>
                            </Box>
                            <Box style={{ marginTop: "16px" }}>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() => history.push("/pressMedia")}
                                className={classes.newbtn}
                              >
                                Cancel
                              </Button>
                              &nbsp;&nbsp;  
                              <Button
                                variant="contained"
                                type="submit"
                                // onClick={addNewMedia}
                                color="primary"
                              >
                                Submit
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
