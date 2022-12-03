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
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import apiConfig from "src/APIconfig/ApiConfig";

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

  const [base64Img1, setBase64Img1] = useState("");
  const [imgFile, setImgfile] = useState("");
  const [profile, setprofile] = useState();
  const location = useLocation();

  const partnerData = location.state;
  const idduserdata = partnerData?._id;
  console.log("asdasdadad", partnerData);

  const imagesec = partnerData?.picture;

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
    partnerName: partnerData?.teamName,
    url: partnerData?.instagramLink,

    twitterUrl: partnerData?.twitterLink,
    description: partnerData?.description,

    facebookUrl: partnerData?.facebookLink,
  };

  const formValidationSchema = yep.object().shape({
    partnerName: yep
      .string()
      .required(" PartnerName is required")
      .min(2, "Please enter at least 2 characters")
      .max(35, "You can enter only 35 characters")
      .matches(
        /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/,
        "Only alphabets and white spaces are allowed for this field number are not. "
      ),
    url: yep
      .string()
      .required(" URL is required")
      .matches(
        /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/,
        "URL must be like 'WWW.google.com'"
      ),
    twitterUrl: yep
      .string()
      .required(" URL is required")
      .matches(
        /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/,
        "URL must be like 'WWW.google.com'"
      ),
    facebookUrl: yep
      .string()
      .required(" URL is required")
      .matches(
        /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/,
        "URL must be like 'WWW.google.com'"
      ),
    description: yep
      .string()
      .required(" Description is required")
      .min(10, "Please enter at least 10 characters")
      .max(350, "You can enter only 350 characters"),
  });

  const editPartner = async (values) => {
    console.log("values----->>>", values);
    try {
      const res = await axios({
        method: "PUT",
        url: apiConfig.team,
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
        data: {
          picture: base64Img,
          teamName: values.values.partnerName,
          instagramLink: values.values.url,
          _id: idduserdata,
          twitterLink: values.values.twitterUrl,
          facebookLink: values.values.facebookUrl,
          description: values.values.description,
        },
      });
      if (res.data.statusCode === 200) {
        toast.success("Partner updated successfully.");
        history.push("/team-management");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box className={classes.NftBreed}>
      <Box className={classes.devicelistHeading}>
        <img src="images/Vector 83.png" className="icon1" />
        <Typography variant="h1" className="headingText">
          Edit Team
        </Typography>
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
          onSubmit={(values) => editPartner({ values })}
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
                            Please select image
                          </Typography>
                        </Box>
                      </Box>
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
                            {/* <Box>
                              <Typography variant="h4" color="primary">
                                Upload Partner photo :
                              </Typography>
                            </Box> */}
                            <Box mt={2}>
                              <Typography
                                variant="h5"
                                color="primary"
                                style={{ paddingBottom: "8px" }}
                              >
                                Team Name :
                              </Typography>
                              <TextField
                                variant="outlined"
                                name="partnerName"
                                type="text"
                                value={values.partnerName}
                                error={Boolean(
                                  touched.partnerName && errors.partnerName
                                )}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                placeholder="Please enter media title"
                                className={classes.textField}
                              />
                              <FormHelperText
                                error
                                style={{ margin: "0px", fontSize: "12px" }}
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
                                Instagram:
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
                                Facebook:
                              </Typography>
                              <TextField
                                variant="outlined"
                                // aria-readonly
                                placeholder="https://www.lipsum.com/ "
                                className={classes.textField}
                                name="facebookUrl"
                                error={Boolean(
                                  touched.facebookUrl && errors.facebookUrl
                                )}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.facebookUrl}
                              />
                              <FormHelperText
                                error
                                style={{ margin: "0px", fontSize: "12px" }}
                              >
                                {touched.facebookUrl && errors.facebookUrl}
                              </FormHelperText>
                            </Box>
                            <Box mt={2}>
                              <Typography
                                variant="h5"
                                color="primary"
                                style={{ paddingBottom: "8px" }}
                              >
                                Twitter:
                              </Typography>
                              <TextField
                                variant="outlined"
                                // aria-readonly
                                placeholder="https://www.lipsum.com/ "
                                className={classes.textField}
                                name="twitterUrl"
                                error={Boolean(
                                  touched.twitterUrl && errors.twitterUrl
                                )}
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
                                About :
                              </Typography>
                              <TextField
                                variant="outlined"
                                multiline
                                rows={2}
                                name="description"
                                // aria-readonly
                                placeholder="Lorem Ipsum is simply dummy text of Lorem Ipsum is simply dummy text of
                          Lorem Ipsum is simply dummy text of
                          Lorem Ipsum is simply dummy text of"
                                className={classes.textField}
                                value={values.description}
                                error={Boolean(
                                  touched.description && errors.description
                                )}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              />
                              <FormHelperText
                                error
                                style={{ margin: "0px", fontSize: "12px" }}
                              >
                                {touched.description && errors.description}
                              </FormHelperText>
                            </Box>
                            <Box style={{ marginTop: "16px" }}>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() => history.push("/contentMgmt")}
                                className={classes.newbtn}
                              >
                                Cancel
                              </Button>
                              &nbsp;&nbsp;
                              <Button
                                variant="contained"
                                type="submit"
                                color="primary"
                              >
                                Update
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
