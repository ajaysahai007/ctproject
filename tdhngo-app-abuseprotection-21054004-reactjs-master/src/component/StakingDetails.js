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
import { Link, useLocation } from "react-router-dom";
import apiConfig from "src/APIconfig/ApiConfig";
import JoditEditor from "jodit-react";
import PageLoading from "./PageLoading";
const useStyles = makeStyles((theme) => ({
  ctaegoryDescription: {
    border: "1px solid #f38500",
    padding: "10px",
    borderRadius: "5px",
  },
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
  const [_imageurl, setFile] = useState(null);
  console.log("_imageurl111====>", _imageurl);
  const [_imgDef, setImgDef] = useState("");
  const [_imgaeset, setImageSet] = useState("");

  const editor = useRef(null);
  const [_description, setDescription] = useState("");
  console.log("_description11111-->>", _description);
  const [base64Img1, setBase64Img1] = useState("");
  const [imgFile, setImgfile] = useState("");
  const [profile, setprofile] = useState();
  const location = useLocation();

  const partnerData = location.state;
  const idduserdata = partnerData?.id;
  const _searchkey = location.search;
  console.log("asdasdadad", _searchkey);

  const imagesec = partnerData?.logo;

  const functionKey = location.search.split("?")[1];
  console.log("Locations key is >>", functionKey);
  const [_isloading, setLoading] = useState(false);
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
    categoryName: "",
    description: "",
    _imageurl: "",
  };
  const [_prefield, setPreField] = useState(formInitialValue);
  console.log("_prefield--->>", _prefield);

  const token = window.sessionStorage.getItem("token");
  const UserManagementFunction = async (values) => {
    const formdata = new FormData();
    formdata.append("name", values.categoryName);
    formdata.append("description", _description);

    formdata.append("image", _imageurl === null ? _imgDef : _imageurl);

    try {
      setLoading(true);

      const res = await axios({
        url: apiConfig.addCategory,
        method: "POST",
        headers: {
          token: token,
        },
      });
      if (res) {
      }
    } catch (error) {
      setLoading(false);

      console.log(error);
    }
  };

  const formValidationSchema = yep.object().shape({
    categoryName: yep
      .string()
      .required(" Category name is required")
      .min(2, "Please enter at least 2 characters")
      .max(35, "You can enter only 35 characters"),
    description: yep
      .string()
      .required(" Description is required")
      .min(2, "Please enter at least 2 characters")
      .max(35, "You can enter only 35 characters"),
  });
  // VIEW API
  const [_viewctagory, setCategory] = useState();
  console.log("_viewctagory11111-->>", _viewctagory);
  const ViewCategoryFunction = async () => {
    try {
      const res = await axios({
        url: apiConfig.viewCategory,
        method: "GET",
        params: {
          _id: idduserdata,
        },
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
      });
      if (res) {
        setCategory(res?.data?.result);
        console.log("ViewCategoryFunction --->>", res);
        const formInitialValue = {
          categoryName: res?.data?.result?.name,
          description: res?.data?.result?.description,
          _imageurl: res?.data?.result?.image,
        };
        setDescription(res?.data?.result?.description);
        setPreField(formInitialValue);
        setFile(res?.data?.result?.image);
        setImageSet(res?.data?.result?.image);
      }
    } catch (error) {
      console.log("error --->>", error);
    }
  };
  //Edit Category
  const [_editcategory, setEditCtegory] = useState();
  console.log("_editcategory99999", _editcategory);
  const functionkeyCheck = () => {
    if (functionKey === "Add") {
      return apiConfig.addCategory;
    } else {
      return apiConfig.editCategory;
    }
  };
  const EditCategory = async (values) => {
    setLoading(true);
    let apiEndpoint = functionkeyCheck();
    console.log("debugger");
    const formdata = new FormData();
    formdata.append("name", values.categoryName);
    formdata.append("description", values.description);

    formdata.append("image", _imageurl === null ? _imgDef : _imageurl);

    try {
      const res = await axios({
        url: apiEndpoint,
        method: functionKey === "Add" ? "POST" : "PUT",
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
        data: formdata,
        params: {
          _id: idduserdata,
        },
      });
      if (res) {
        setLoading(false);

        history.push("./categoryMgmt");
      }
    } catch (error) {
      setLoading(false);

      console.log("error--->>>", error);
    }
  };
  useEffect(() => {
    ViewCategoryFunction();
  }, []);
  return (
    <Box className={classes.NftBreed}>
      {_isloading ? <PageLoading /> : ""}
      <Box className={classes.devicelistHeading}>
        <Typography variant="h1" className="headingText">
          {`${functionKey} Category`}
        </Typography>
      </Box>
      <Divider className={classes.divider} />
      <Container maxWidth="md">
        <Formik
          initialValues={_prefield}
          enableReinitialize={true}
          initialStatus={{
            success: false,
            successMsg: "",
          }}
          onSubmit={(values) => EditCategory(values)}
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
                            <img
                              src={
                                _viewctagory?.image
                                  ? _viewctagory?.image
                                  : "/images/mentalIll.png"
                              }
                            />
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

                        {/* <figure className={classes.upload}>
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
                        </figure> */}
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
                              Category Image
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
                        <Grid container spacing={2} className="BreedDetails">
                          <FormControl
                            variant="outlined"
                            className={classes.formControl}
                          >
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                              <Box mt={2}>
                                <Typography
                                  variant="h5"
                                  color="primary"
                                  style={{ paddingBottom: "8px" }}
                                >
                                  Category Name :
                                </Typography>

                                {functionKey === "Add" ? (
                                  <>
                                    <Box>
                                      <TextField
                                        variant="outlined"
                                        name="categoryName"
                                        type="text"
                                        value={values.categoryName}
                                        error={Boolean(
                                          touched.categoryName &&
                                            errors.categoryName
                                        )}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
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
                                        {touched.categoryName &&
                                          errors.categoryName}
                                      </FormHelperText>
                                    </Box>
                                  </>
                                ) : functionKey === "View" ? (
                                  <Box>
                                    <TextField
                                      readOnly
                                      variant="outlined"
                                      // value="Mental Health and Well Being"
                                      inputProps={{ readOnly: "true" }}
                                      value={_viewctagory?.name}
                                    />
                                  </Box>
                                ) : (
                                  <Box>
                                    <TextField
                                      variant="outlined"
                                      name="categoryName"
                                      type="text"
                                      onBlur={handleBlur}
                                      onChange={handleChange}
                                      value={values.categoryName}
                                      error={Boolean(
                                        touched.categoryName &&
                                          errors.categoryName
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
                                      {touched.categoryName &&
                                        errors.categoryName}
                                    </FormHelperText>
                                  </Box>
                                )}
                              </Box>
                            </Grid>
                          </FormControl>
                        </Grid>
                      </form>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Box mt={2}>
                      <Typography
                        variant="h5"
                        color="primary"
                        style={{ paddingBottom: "8px" }}
                      >
                        Category Description :
                      </Typography>
                      {functionKey === "Add" ? (
                        <>
                          <Box>
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
                            {/* <JoditEditor
                              ref={editor}
                              value={_description}
                              // config={config}
                              tabIndex={1} // tabIndex of textarea
                              onBlur={(e) => setDescription(e)}
                              onChange={(newContent) => {}}
                            /> */}
                          </Box>
                          <FormHelperText
                            error
                            style={{ margin: "0px", fontSize: "12px" }}
                          >
                            {touched.description && errors.description}
                          </FormHelperText>
                        </>
                      ) : functionKey === "View" ? (
                        <>
                          {/* <TextField
                            variant="outlined"
                            inputProps={{ readOnly: "true" }}
                            fullWidth
                            aria-readonly
                            value={_viewctagory?.description}
                            placeholder="description"
                            className={classes.textField}
                            multiline
                            rows={4}
                          >
                            {" "} */}
                          <Box>
                            <TextField
                              variant="outlined"
                              inputProps={{ readOnly: "true" }}
                              fullWidth
                              aria-readonly
                              value={values?.description}
                              placeholder="description"
                              className={classes.textField}
                            />
                          </Box>

                          {/* </TextField> */}
                        </>
                      ) : (
                        <>
                          <Box>
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
                            {/* <JoditEditor
                              ref={editor}
                              value={_description}
                              tabIndex={1}
                              onBlur={(e) => setDescription(e)}
                              onChange={(newContent) => {}}
                            /> */}
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
                  {functionKey === "View" && (
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => history.push("/categoryMgmt")}
                      className={classes.newbtn}
                    >
                      Back
                    </Button>
                  )}
                  {functionKey === "Edit" && (
                    <>
                      <Button
                        variant="contained"
                        color="primary"
                        type="button"
                        className={classes.newbtn}
                        onClick={() => history.push("/categoryMgmt")}
                      >
                        Back
                      </Button>
                      &nbsp; &nbsp;
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        className={classes.newbtn}
                      >
                        Update
                      </Button>
                    </>
                  )}
                  &nbsp;&nbsp;
                  {functionKey === "Add" && (
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
