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
import axios from "axios";
import apiConfig from "src/APIconfig/ApiConfig";
import { toast } from "react-toastify";

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
    name: "",
    twitterUrl: "",
    desc: "",
    telegramUrl:"",
    linkedUrl:"",
    about:"",

  };

  const AddNewTeam = async (values) => {
    try {
      const res = await axios({
        method: "POST",
        url: apiConfig.teamAdd,
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
        data: {
          picture: base64Img,
          teamName: values.name,
          title: "this is title",
          description: values.desc,
          facebookLink: values.linkedUrl,
          twitterLink: values.twitterUrl,
          instagramLink: values.telegramUrl,

        }
      })
      if (res.data.statusCode === 200) {
        toast.success("Team Added Successfully")
        history.push("/team-management")
      }
    }
    catch (error) {
      console.log(error)
    }
  }



  const formValidationSchema = yep.object().shape({
    name: yep
      .string()
      .required(" Name is required")
      .min(2, "Please enter at least 2 characters")
      .max(35, "You can enter only 35 characters")
      .matches(
        /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/,
        "Only alphabets and white spaces are allowed for this field number are not. "
      ),
    linkedUrl: yep
      .string()
      .required(" URL is required")
      .matches(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/,"URL must be like 'WWW.google.com'"),
      twitterUrl: yep
      .string()
      .required(" URL is required")
      .matches(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/,"URL must be like 'WWW.google.com'"),
      telegramUrl: yep
      .string()
      .required(" URL is required")
      .matches(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/,"URL must be like 'WWW.google.com'"),
    desc: yep
      .string()
      .required(" Description is required")
      .min(10, "Please enter at least 10 characters")
      .max(350, "You can enter only 350 characters"),
      about: yep
      .string()
      .required(" About is required")
      .min(10, "Please enter at least 10 characters")
      .max(350, "You can enter only 350 characters"),
  });


  return (
    <Box className={classes.NftBreed}>
      <Box className={classes.devicelistHeading}>
        <img src="images/Vector 83.png" className="icon1" />
        {window.location.pathname === "/add-team" && (
          <Typography variant="h1" className="headingText">
            Add New Team
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
          onSubmit={(values) => AddNewTeam(values)}
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
                         Add Team Details
                        </Typography>
                      </Box>
                      <Box mt={2}>
                        <Typography
                          variant="h5"
                          color="primary"
                          style={{ paddingBottom: "8px" }}
                        >
                          Team Name :
                        </Typography>
                        <TextField
                          readOnly
                          variant="outlined"
                          name="name"
                          placeholder="Please enter name"
                          className={classes.textField}
                          value={values.name}
                          error={Boolean(touched.name && errors.name)}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                        <FormHelperText
                          error
                          style={{ margin: "0px", fontSize: "12px" }}
                        >
                          {touched.name && errors.name}
                        </FormHelperText>
                      </Box>
                      <Box mt={2}>
                        <Typography
                          variant="h5"
                          color="primary"
                          style={{ paddingBottom: "8px" }}
                        >
                          About :
                        </Typography>
                        <TextField
                          variant="outlined"
                          multiline
                          name="about"
                          rows={2}
                          aria-readonly
                          placeholder="Please enter about"
                          className={classes.textField}
                          value={values.about}
                          error={Boolean(touched.about && errors.about)}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                        <FormHelperText
                          error
                          style={{ margin: "0px", fontSize: "12px" }}
                        >
                          {touched.about && errors.about}
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
                          multiline
                          rows={2}
                          name="desc"
                          aria-readonly
                          placeholder="Please enter description"
                          className={classes.textField}
                          value={values.desc}
                          error={Boolean(touched.desc && errors.desc)}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                        <FormHelperText
                          error
                          style={{ margin: "0px", fontSize: "12px" }}
                        >
                          {touched.desc && errors.desc}
                        </FormHelperText> 
                      </Box>
                      <Box mt={2}>
                        <Typography
                          variant="h5"
                          color="primary"
                          style={{ paddingBottom: "8px" }}
                        >
                          Linkedin :
                        </Typography>
                        <TextField
                          variant="outlined"
                          aria-readonly
                          placeholder="Please enter url "
                          className={classes.textField}
                          name="linkedUrl"
                          error={Boolean(touched.linkedUrl && errors.linkedUrl)}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.linkedUrl}
                        />
                        <FormHelperText
                          error
                          style={{ margin: "0px", fontSize: "12px" }}
                        >
                          {touched.linkedUrl && errors.linkedUrl}
                        </FormHelperText>
                      </Box>
                      <Box mt={2}>
                        <Typography
                          variant="h5"
                          color="primary"
                          style={{ paddingBottom: "8px" }}
                        >
                          Twitter :
                        </Typography>
                        <TextField
                          variant="outlined"
                          aria-readonly
                          placeholder="Please enter url "
                          className={classes.textField}
                          name="twitterUrl"
                          error={Boolean(touched.twitterUrl && errors.twitterUrl)}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.twitterUrl}
                        />
                        <FormHelperText
                          error
                          style={{ margin: "0px", fontSize: "12px" }}
                        >
                          {touched.twitterUrl && errors.twitterUrl}
                        </FormHelperText>
                      </Box>
                      <Box mt={2}>
                        <Typography
                          variant="h5"
                          color="primary"
                          style={{ paddingBottom: "8px" }}
                        >
                          Telegram :
                        </Typography>
                        <TextField
                          variant="outlined"
                          placeholder="Please enter url "
                          className={classes.textField}
                          name="telegramUrl"
                          error={Boolean(touched.telegramUrl && errors.telegramUrl)}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.telegramUrl}
                        />
                        <FormHelperText
                          error
                          style={{ margin: "0px", fontSize: "12px" }}
                        >
                          {touched.telegramUrl && errors.telegramUrl}
                        </FormHelperText>
                      </Box>

                      <Box style={{ marginTop: "16px" }}>
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          className={classes.newbtn}
                        >
                          Add
                        </Button>
                        &nbsp;&nbsp;
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => history.push("/team-management")}
                          className={classes.newbtn}
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
