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
import JoditEditor from "jodit-react";
import Button from "@material-ui/core/Button";
import { Link, useLocation } from "react-router-dom";
import * as yep from "yup";
import { Form, Formik } from "formik";
import { FiUpload } from "react-icons/fi";
import { addImageHandler, getBase64 } from "src/utils";
import { useHistory } from "react-router-dom";
import apiConfig from "src/APIconfig/ApiConfig";

import DeleteIcon from "@material-ui/icons/Delete";
const useStyles = makeStyles((theme) => ({
  NftBreed: {
    padding: "23px 0 ",
  },
  formControl: {
    margin: theme.spacing(1),
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
  const location = useLocation();
  const editor = useRef(null);
  const searchKey = location.search.split("?")[1];
  const [teamUserData, setViewUserData] = useState([]);
  console.log("searchKey--", searchKey);
  const [base64Img, setBase64Img] = useState("");
  const [base64Img1, setBase64Img1] = useState("");
  const [imgFile, setImgfile] = useState("");
  const [profile, setprofile] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [resetToken, setResetToken] = useState("");

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
    partnerName: "",
    url: "",
  };
  const formValidationSchema = yep.object().shape({
    item1: yep
      .string()
      .required(" Item is required")
      .min(2, "Please enter at least 2 characters")
      .max(35, "You can enter only 35 characters")
      .matches(
        /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/,
        "Only alphabets and white spaces are allowed for this field number are not. "
      ),
    item2: yep
      .string()
      .required(" Item is required")
      .min(2, "Please enter at least 2 characters")
      .max(35, "You can enter only 35 characters")
      .matches(
        /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/,
        "Only alphabets and white spaces are allowed for this field number are not. "
      ),
    item3: yep
      .string()
      .required(" Item is required")
      .min(2, "Please enter at least 2 characters")
      .max(35, "You can enter only 35 characters")
      .matches(
        /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/,
        "Only alphabets and white spaces are allowed for this field number are not. "
      ),
    name: yep
      .string()
      .required(" Name is required")
      .min(2, "Please enter at least 2 characters")
      .max(35, "You can enter only 35 characters")
      .matches(
        /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/,
        "Only alphabets and white spaces are allowed for this field number are not. "
      ),
    desc: yep
      .string()
      .required(" Descritpion is required")
      .min(10, "Please enter at least 10 characters")
      .max(350, "You can enter only 350 characters"),
  });

  return (
    <Box className={classes.NftBreed}>
      <Box className={classes.devicelistHeading}>
        <Typography variant="h1" className="headingText">
          {`${searchKey} Tutorial Screen`}
        </Typography>
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
                  <Grid item md={12} sm={12} lg={12} xs={12}>
                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                      }}
                    >
                      <Box>
                        {searchKey === "Add" ? (
                          <>
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
                          </>
                        ) : searchKey === "View" ? (
                          <figure className={classes.upload}>
                            <img src="/images/t3.jpeg" />
                          </figure>
                        ) : (
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
                        )}
                        {searchKey === "Add" ? (
                          <>
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
                          </>
                        ) : searchKey === "View" ? (
                          <Box
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              width: "100%",
                            }}
                          >
                            <Typography variant="h6" color="primary">
                              Tutorial Screen Image
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
                        <Box
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            width: "100%",
                          }}
                        ></Box>
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
                    <Box mt={2}>
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
                              Tutorial Screen Title :
                            </Typography>
                            {searchKey === "Add" ? (
                              <>
                                <TextField
                                  variant="outlined"
                                  name="name"
                                  type="text"
                                  error={Boolean(touched.name && errors.name)}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  placeholder="Please enter Resource Name"
                                  className={classes.textField}
                                />
                                <FormHelperText
                                  error
                                  style={{
                                    margin: "0px",
                                    fontSize: "12px",
                                  }}
                                >
                                  {touched.name && errors.name}
                                </FormHelperText>
                              </>
                            ) : searchKey === "View" ? (
                              <>
                                <TextField
                                  readOnly
                                  variant="outlined"
                                  value="This is Tutorial Screen"
                                  className={classes.textField}
                                  inputProps={{ readOnly: "true" }}
                                />
                              </>
                            ) : (
                              <>
                                <TextField
                                  variant="outlined"
                                  name="name"
                                  type="text"
                                  error={Boolean(touched.name && errors.name)}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  placeholder="Please enter tutorial screen title"
                                  className={classes.textField}
                                />
                                <FormHelperText
                                  error
                                  style={{ margin: "0px", fontSize: "12px" }}
                                >
                                  {touched.name && errors.name}
                                </FormHelperText>
                              </>
                            )}
                          </Box>
                          <Box mt={2}>
                            <Typography
                              variant="h5"
                              color="primary"
                              style={{ paddingBottom: "8px" }}
                            >
                              About :
                            </Typography>
                            {searchKey === "Add" ? (
                              <>
                                {/* <TextField
                                    variant="outlined"
                                    name="desc"
                                    error={Boolean(touched.desc && errors.desc)}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    placeholder="Enter About Description"
                                    multiline
                                    rows={4}
                                    className={classes.textField}
                                  /> */}
                                <Box>
                                  <JoditEditor
                                    ref={editor}
                                    // value={description}
                                    // config={config}
                                    tabIndex={1} // tabIndex of textarea
                                    // onBlur={(e) => setDescription(e)}
                                    onChange={(newContent) => {}}
                                  />
                                </Box>
                                <FormHelperText
                                  error
                                  style={{ margin: "0px", fontSize: "12px" }}
                                >
                                  {touched.desc && errors.desc}
                                </FormHelperText>
                              </>
                            ) : searchKey === "View" ? (
                              <TextField
                                variant="outlined"
                                inputProps={{ readOnly: "true" }}
                                aria-readonly
                                value="This is the Tutorial Description"
                                multiline
                                rows={4}
                                placeholder="https://www.lipsum.com/"
                                className={classes.textField}
                              />
                            ) : (
                              <>
                                {/* <TextField
                                    variant="outlined"
                                    name="desc"
                                    error={Boolean(touched.desc && errors.desc)}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    
                                    placeholder="Enter Tutorial screen Description"
                                    className={classes.textField}
                                    multiline
                                    rows={4}
                                  /> */}
                                <Box>
                                  <JoditEditor
                                    ref={editor}
                                    // value={description}
                                    // config={config}
                                    tabIndex={1} // tabIndex of textarea
                                    // onBlur={(e) => setDescription(e)}
                                    onChange={(newContent) => {}}
                                  />
                                </Box>
                                <FormHelperText
                                  error
                                  style={{ margin: "0px", fontSize: "12px" }}
                                >
                                  {touched.desc && errors.desc}
                                </FormHelperText>
                              </>
                            )}
                          </Box>
                          {/* <Box mt={2}>
                            <Typography
                              variant="h5"
                              color="primary"
                              style={{ paddingBottom: "8px" }}
                            >
                              List Items:
                            </Typography>
                            {searchKey === "Add" ? (
                              <>
                                <Box
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <Box style={{ width: "100%" }}>
                                    <TextField
                                      variant="outlined"
                                      name="item1"
                                      type="text"
                                      error={Boolean(
                                        touched.item1 && errors.item1
                                      )}
                                      onBlur={handleBlur}
                                      onChange={handleChange}
                                      placeholder="Please enter item"
                                      className={classes.textField}
                                    />
                                    <FormHelperText
                                      error
                                      style={{
                                        margin: "0px",
                                        fontSize: "12px",
                                      }}
                                    >
                                      {touched.item1 && errors.item1}
                                    </FormHelperText>
                                  </Box>
                                  <Box
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    &nbsp;&nbsp;
                                    <DeleteIcon
                                      style={{
                                        color: "#fff",
                                        fontSize: "22px",
                                        cursor: "pointer",
                                        background: "#F38500",
                                        padding: "8px 8px",
                                        borderRadius: "7px",
                                      }}
                                      // onClick={handleClickOpen}
                                    />
                                  </Box>
                                </Box>
                              </>
                            ) : searchKey === "View" ? (
                              <>
                                <Box>
                                  <Box>
                                    <TextField
                                      readOnly
                                      variant="outlined"
                                      value="Items"
                                      className={classes.textField}
                                      inputProps={{ readOnly: "true" }}
                                    />
                                  </Box>
                                </Box>
                              </>
                            ) : (
                              <>
                                <Box
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <Box style={{ width: "100%" }}>
                                    <TextField
                                      variant="outlined"
                                      name="item1"
                                      type="text"
                                      error={Boolean(
                                        touched.item1 && errors.item1
                                      )}
                                      onBlur={handleBlur}
                                      onChange={handleChange}
                                      placeholder="Please enter item"
                                      className={classes.textField}
                                    />
                                    <FormHelperText
                                      error
                                      style={{
                                        margin: "0px",
                                        fontSize: "12px",
                                      }}
                                    >
                                      {touched.item1 && errors.item1}
                                    </FormHelperText>
                                  </Box>
                                  <Box
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    &nbsp;&nbsp;
                                    <DeleteIcon
                                      style={{
                                        color: "#fff",
                                        fontSize: "22px",
                                        cursor: "pointer",
                                        background: "#F38500",
                                        padding: "8px 8px",
                                        borderRadius: "7px",
                                      }}
                                      // onClick={handleClickOpen}
                                    />
                                  </Box>
                                </Box>
                              </>
                            )}
                          </Box>
                          <Box mt={2}>
                            {searchKey === "Add" ? (
                              <>
                                <Box
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <Box style={{ width: "100%" }}>
                                    <TextField
                                      variant="outlined"
                                      name="item2"
                                      type="text"
                                      error={Boolean(
                                        touched.item2 && errors.item2
                                      )}
                                      onBlur={handleBlur}
                                      onChange={handleChange}
                                      placeholder="Please enter item"
                                      className={classes.textField}
                                    />
                                    <FormHelperText
                                      error
                                      style={{
                                        margin: "0px",
                                        fontSize: "12px",
                                      }}
                                    >
                                      {touched.item2 && errors.item2}
                                    </FormHelperText>
                                  </Box>
                                  <Box
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    &nbsp;&nbsp;
                                    <DeleteIcon
                                      style={{
                                        color: "#fff",
                                        fontSize: "22px",
                                        cursor: "pointer",
                                        background: "#F38500",
                                        padding: "8px 8px",
                                        borderRadius: "7px",
                                      }}
                                      // onClick={handleClickOpen}
                                    />
                                  </Box>
                                </Box>
                              </>
                            ) : searchKey === "View" ? (
                              <>
                                <Box>
                                  <Box>
                                    <TextField
                                      readOnly
                                      variant="outlined"
                                      value="Items"
                                      className={classes.textField}
                                      inputProps={{ readOnly: "true" }}
                                    />
                                  </Box>
                                </Box>
                              </>
                            ) : (
                              <>
                                <Box
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <Box style={{ width: "100%" }}>
                                    <TextField
                                      variant="outlined"
                                      name="item2"
                                      type="text"
                                      error={Boolean(
                                        touched.item2 && errors.item2
                                      )}
                                      onBlur={handleBlur}
                                      onChange={handleChange}
                                      placeholder="Please enter item"
                                      className={classes.textField}
                                    />
                                    <FormHelperText
                                      error
                                      style={{
                                        margin: "0px",
                                        fontSize: "12px",
                                      }}
                                    >
                                      {touched.item2 && errors.item2}
                                    </FormHelperText>
                                  </Box>
                                  <Box
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    &nbsp;&nbsp;
                                    <DeleteIcon
                                      style={{
                                        color: "#fff",
                                        fontSize: "22px",
                                        cursor: "pointer",
                                        background: "#F38500",
                                        padding: "8px 8px",
                                        borderRadius: "7px",
                                      }}
                                      // onClick={handleClickOpen}
                                    />
                                  </Box>
                                </Box>
                              </>
                            )}
                          </Box>
                          <Box mt={2}>
                            {searchKey === "Add" ? (
                              <>
                                <Box
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <Box style={{ width: "100%" }}>
                                    <TextField
                                      variant="outlined"
                                      name="item3"
                                      type="text"
                                      error={Boolean(
                                        touched.item3 && errors.item3
                                      )}
                                      onBlur={handleBlur}
                                      onChange={handleChange}
                                      placeholder="Please enter item"
                                      className={classes.textField}
                                    />
                                    <FormHelperText
                                      error
                                      style={{
                                        margin: "0px",
                                        fontSize: "12px",
                                      }}
                                    >
                                      {touched.item3 && errors.item3}
                                    </FormHelperText>
                                  </Box>
                                  <Box
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    &nbsp;&nbsp;
                                    <DeleteIcon
                                      style={{
                                        color: "#fff",
                                        fontSize: "22px",
                                        cursor: "pointer",
                                        background: "#F38500",
                                        padding: "8px 8px",
                                        borderRadius: "7px",
                                      }}
                                      // onClick={handleClickOpen}
                                    />
                                  </Box>
                                </Box>
                              </>
                            ) : searchKey === "View" ? (
                              <>
                                <Box>
                                  <Box>
                                    <TextField
                                      readOnly
                                      variant="outlined"
                                      value="Items"
                                      className={classes.textField}
                                      inputProps={{ readOnly: "true" }}
                                    />
                                  </Box>
                                </Box>
                              </>
                            ) : (
                              <>
                                <Box
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <Box style={{ width: "100%" }}>
                                    <TextField
                                      variant="outlined"
                                      name="item3"
                                      type="text"
                                      error={Boolean(
                                        touched.item3 && errors.item3
                                      )}
                                      onBlur={handleBlur}
                                      onChange={handleChange}
                                      placeholder="Please enter item"
                                      className={classes.textField}
                                    />
                                    <FormHelperText
                                      error
                                      style={{
                                        margin: "0px",
                                        fontSize: "12px",
                                      }}
                                    >
                                      {touched.item3 && errors.item3}
                                    </FormHelperText>
                                  </Box>
                                  <Box
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    &nbsp;&nbsp;
                                    <DeleteIcon
                                      style={{
                                        color: "#fff",
                                        fontSize: "22px",
                                        cursor: "pointer",
                                        background: "#F38500",
                                        padding: "8px 8px",
                                        borderRadius: "7px",
                                      }}
                                      // onClick={handleClickOpen}
                                    />
                                  </Box>
                                </Box>
                              </>
                            )}
                          </Box> */}

                          <Box
                            style={{
                              marginTop: "16px",
                              display: "flex",
                              flexWrap: "wrap",
                              justifyContent: "center",
                            }}
                          >
                            <Button
                              variant="contained"
                              color="primary"
                              style={{ marginBottom: "10px" }}
                              onClick={() => history.push("/team-management")}
                              className={classes.newbtn}
                            >
                              Back
                            </Button>{" "}
                            &nbsp;&nbsp;
                            {searchKey === "Add" ? (
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
                            ) : searchKey === "View" ? (
                              <>
                                <Box>
                                  <Button
                                    variant="contained"
                                    type="submit"
                                    onClick={() => {
                                      history.push({
                                        pathname: "/view-team",
                                        search: "Edit",
                                      });
                                    }}
                                    color="primary"
                                  >
                                    Edit
                                  </Button>
                                </Box>
                              </>
                            ) : (
                              <Box>
                                <Button
                                  variant="contained"
                                  type="submit"
                                  color="primary"
                                >
                                  Update
                                </Button>
                              </Box>
                            )}
                          </Box>
                        </FormControl>
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
