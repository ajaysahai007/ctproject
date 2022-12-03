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
  Button,
  Divider,
  InputLabel,
} from "@material-ui/core";
import * as yep from "yup";
import PageLoading from "src/component/PageLoading";
import { Form, Formik } from "formik";
import { FiUpload } from "react-icons/fi";
import { addImageHandler, getBase64 } from "src/utils";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { convertDateTime } from "../../../../utils";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import apiConfig from "src/APIconfig/ApiConfig";
import JoditEditor from "jodit-react";
import { values } from "lodash";
import AddResource from "./ViewResource";
const useStyles = makeStyles((theme) => ({
  dengerous: {
    border: "1px solid #f38500",
    borderRadius: "5px",
    padding: "0px 10px",
  },
  dengerous_typo: {
    border: "1px solid #f38500",
    borderRadius: "5px",
    padding: "15px 10px",
  },
  NftBreed: {
    padding: "23px 0 ",
  },
  formControl: {
    // minWidth: 120,
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
  imgsec: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    "@media(max-width:600px)": {
      justifyContent: "center",
    },
  },
}));

export default function CreateNFT(userProfileData) {
  console.log("location--->>?????");
  const classes = useStyles();
  const history = useHistory();
  const editor = useRef(null);
  const [base64Img1, setBase64Img1] = useState("");
  const [imgFile, setImgfile] = useState("");
  const [profile, setprofile] = useState();
  const [currentvalue, setCurrentValue] = useState("Select");
  const location = useLocation();
  const [isLoading, setLoading] = useState(false);
  const partnerData = location.state;

  const idduserdata = partnerData?.id;
  const [_vieweresource, setViewResource] = useState();
  const imagesec = partnerData?.logo;
  const [_imageurl, setFile] = useState(null);
  const [_imgDef, setImgDef] = useState("");
  const [_imgaeset, setImageSet] = useState("");
  console.log("_imgaeset-->>", idduserdata);
  console.log("_imgaeset_imgDef", _imgDef);

  const functionKey = location.search.split("?")[1];

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
  // const [_imgaeset, setImageSet] = useState("");

  const [_description, setDescription] = useState("");
  const formInitialValue = {
    title: "",
    category: "",
    description: "",
    _imgDef: "",
  };
  const [_prefield, setPreField] = useState(formInitialValue);
  console.log("_prefield-_prefield-->>", _prefield);
  const formValidationSchema = yep.object().shape({
    category: yep.string().required("Category name is required."),
    title: yep
      .string()
      .required("Resource name is required.")
      .min(2, "Please enter at least 2 characters.")
      .max(35, "You can enter only 35 characters."),
    description: yep
      .string()
      .required("Title name is required.")
      .min(2, "Please enter at least 2 characters.")
      .max(500, "You can enter only 500 characters."),
  });
  const [_resourceid, setResourchId] = useState("");
  // View Resourch
  const ViewResourchFunction = async () => {
    try {
      setLoading(true);
      const res = await axios({
        url: apiConfig.viewResource,
        method: "GET",
        params: {
          resourceId: idduserdata,
        },
      });
      if (res) {
        console.log("res11111---", res);
        setLoading(false);

        setViewResource(res?.data?.result);
        const formInitialValue = {
          category: res?.data?.result?.categoryId?._id,
          title: res?.data?.result?.title,
          description: res?.data?.result?.description,
          _imgDef: res?.data?.result?.image,
        };
        setImageSet(res?.data?.result?.image);
        setDescription(res?.data?.result?.description);

        setPreField(formInitialValue);
      }
    } catch (error) {
      setLoading(false);

      console.log("res11111---", error);
    }
  };
  const URLFunction = () => {
    if (functionKey === "Add") {
      return apiConfig.addResource;
    } else {
      return apiConfig.editResource;
    }
  };
  //Edit Resource
  console.log("idduserdata---123>>", idduserdata);

  const AddResourceFuction_EditResouceFuncction = async (values) => {
    let URLKey = URLFunction();

    const formdata = new FormData();
    if (idduserdata !== "") {
      formdata.append("resourceId", idduserdata);
    } else {
    }
    formdata.append("categoryId", values.category);

    formdata.append("title", values.title);
    formdata.append("description", values.description);
    formdata.append("image", _imageurl === null ? _imgDef : _imageurl);

    // formdata.append("profilePic", _imageurl === null ? _imgDef : _imageurl);
    try {
      setLoading(true);
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
        history.push("/resouceMgmt");
      }
    } catch (error) {
      setLoading(false);
      console.log("error-->>", error);
    }
  };
  //Add Resource
  const [_resourcetitle, setResourceTitle] = useState("");

  const [_listcatogory, setListCategory] = useState([]);
  const [change_id_category, setChangeCataegory] = useState("");
  console.log("res111yuui--->", _listcatogory);

  const ListCategoryFunction = async () => {
    try {
      const res = await axios({
        url: apiConfig.listCategory,
        method: "GET",
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
      });
      if (res) {
        console.log("res1111--->", res?.data?.result?.docs);
        if (res?.data?.result?.total > 0) {
          setListCategory(res?.data?.result?.docs);
        }
      }
    } catch (error) {
      console.log("res1111--->", error);
    }
  };
  useEffect(() => {
    ListCategoryFunction();
    ViewResourchFunction();
  }, [idduserdata]);
  return (
    <Box className={classes.NftBreed}>
      {isLoading ? <PageLoading /> : ""}
      <Box className={classes.devicelistHeading}>
        <Typography variant="h1" className="headingText">
          {`${functionKey} Resource`}
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
          validationSchema={formValidationSchema}
          onSubmit={(values) => AddResourceFuction_EditResouceFuncction(values)}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            AddResourceFuction_EditResouceFuncction,
            touched,
            values,
            setFieldValue,
          }) => (
            <Form>
              {console.log("Sadqeqacc", values)}
              <Box mt={5} mb={2} className={classes.main}>
                <Grid container spacing={2}>
                  <Grid item md={12} sm={12} lg={12} xs={12}>
                    <Box className={classes.imgsec}>
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
                          <figure className={classes.upload}>
                            <img
                              src={
                                _vieweresource?.image
                                  ? _vieweresource?.image
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

                        {functionKey === "Add" ? (
                          <>
                            <Box className={classes.imgsec}>
                              <Typography variant="h6" color="primary">
                                Please select image
                              </Typography>
                            </Box>
                          </>
                        ) : functionKey === "View" ? (
                          <Box className={classes.imgsec}>
                            <Typography variant="h6" color="primary">
                              {_vieweresource?.categoryId?.name}
                              {console.log(
                                "_vieweresource--->>>>",
                                _vieweresource?.categoryId?.name
                              )}
                            </Typography>
                          </Box>
                        ) : (
                          <Box className={classes.imgsec}>
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
                    <Box mt={1}>
                      <form className="formBox p-0" autoComplete="off">
                        <FormControl
                          variant="outlined"
                          className={classes.formControl}
                        >
                          <Box>
                            <Typography
                              variant="h5"
                              color="primary"
                              style={{ paddingBottom: "8px" }}
                            >
                              Category Name :
                            </Typography>

                            {functionKey === "Add" ? (
                              <>
                                <FormControl
                                  variant="outlined"
                                  className={classes.formControl}
                                >
                                  <Box>
                                    <FormControl
                                      variant="outlined"
                                      className={classes.formControl}
                                    >
                                      {/* <InputLabel id="demo-simple-select-outlined-label">
                                      Age
                                    </InputLabel> */}
                                      <Box>
                                        <Select
                                          name="category"
                                          labelId="demo-simple-select-outlined-label"
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={values.category}
                                          style={{ width: "100%" }}
                                          error={Boolean(
                                            touched.category && errors.category
                                          )}
                                        >
                                          {" "}
                                          <MenuItem value="Select">
                                            Select Category
                                          </MenuItem>
                                          {_listcatogory &&
                                            _listcatogory.map((data, index) => (
                                              <MenuItem
                                                key={index}
                                                value={data?._id}
                                              >
                                                {data?.name}
                                              </MenuItem>
                                            ))}
                                        </Select>
                                        <FormHelperText
                                          error
                                          style={{
                                            margin: "0px",
                                            fontSize: "12px",
                                          }}
                                        >
                                          {touched.category && errors.category}
                                        </FormHelperText>
                                      </Box>
                                    </FormControl>
                                  </Box>
                                </FormControl>
                              </>
                            ) : functionKey === "View" ? (
                              <Box className="dengerous_class">
                                <TextField
                                  readOnly
                                  variant="outlined"
                                  inputProps={{ readOnly: "true" }}
                                  value={values?.title}
                                />

                                {/* <Typography className="typo_class">
                                  <div
                                    className={classes.dengerous_typo}
                                    dangerouslySetInnerHTML={{
                                      __html: _vieweresource?.categoryId?.name,
                                    }}
                                  ></div>
                                </Typography> */}
                              </Box>
                            ) : (
                              <Box>
                                <FormControl
                                  variant="outlined"
                                  className={classes.formControl}
                                >
                                  <Box>
                                    <Select
                                      name="category"
                                      labelId="demo-simple-select-outlined-label"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values?.category}
                                      style={{ width: "100%" }}
                                    >
                                      error=
                                      {Boolean(
                                        touched.category && errors.category
                                      )}
                                      <MenuItem value="Select">
                                        Select Category
                                      </MenuItem>
                                      {_listcatogory &&
                                        _listcatogory.map((data, index) => (
                                          <MenuItem
                                            key={index}
                                            value={data?._id}
                                          >
                                            {data?.name}
                                          </MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText
                                      error
                                      style={{
                                        margin: "0px",
                                        fontSize: "12px",
                                      }}
                                    >
                                      {touched.category && errors.category}
                                    </FormHelperText>
                                  </Box>
                                </FormControl>
                              </Box>
                            )}
                          </Box>
                          <Box mt={2}>
                            <Typography
                              variant="h5"
                              color="primary"
                              style={{ paddingBottom: "8px" }}
                            >
                              Resource Title :
                            </Typography>

                            {functionKey === "Add" ? (
                              <>
                                <Box>
                                  <TextField
                                    variant="outlined"
                                    name="title"
                                    type="text"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.title}
                                    // onChange={(e) =>
                                    //   setResourceTitle(e.target.value)
                                    // }
                                    error={Boolean(
                                      touched.title && errors.title
                                    )}
                                    placeholder="Please enter resource title"
                                    className={classes.textField}
                                  />
                                </Box>
                                <FormHelperText
                                  error
                                  style={{ margin: "0px", fontSize: "12px" }}
                                >
                                  {touched.title && errors.title}
                                </FormHelperText>
                              </>
                            ) : functionKey === "View" ? (
                              <Box>
                                <TextField
                                  readOnly
                                  variant="outlined"
                                  // value="Mental Illness"
                                  inputProps={{ readOnly: "true" }}
                                  value={values?.description}
                                />
                                {/* <Typography className="typo_class">
                                  <div
                                    className={classes.dengerous}
                                    dangerouslySetInnerHTML={{
                                      __html: _vieweresource?.title,
                                    }}
                                  ></div>
                                </Typography> */}
                              </Box>
                            ) : (
                              <Box>
                                <TextField
                                  variant="outlined"
                                  name="title"
                                  type="text"
                                  value={values.title}
                                  error={Boolean(touched.title && errors.title)}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  placeholder="Please enter resource title"
                                  className={classes.textField}
                                ></TextField>
                                <FormHelperText
                                  error
                                  style={{ margin: "0px", fontSize: "12px" }}
                                >
                                  {touched.title && errors.title}
                                </FormHelperText>
                              </Box>
                            )}
                          </Box>
                        </FormControl>
                      </form>
                    </Box>
                  </Grid>
                </Grid>

                <Grid item md={12} sm={12} lg={12} xs={12}>
                  <Box mt={2}>
                    <Typography
                      variant="h5"
                      color="primary"
                      style={{ paddingBottom: "8px" }}
                    >
                      Resource Description :
                    </Typography>
                    {functionKey === "Add" ? (
                      <>
                        {/* <JoditEditor
                          ref={editor}
                          tabIndex={1}
                          config={apiConfig}
                          value={_description}
                          // onChange={(e) => setDescription(e.target.value)}
                          onBlur={(e) => setDescription(e)}
                          onChange={(newContent) => {}}
                        /> */}
                        <TextField
                          variant="outlined"
                          name="description"
                          type="text"
                          value={values.description}
                          error={Boolean(
                            touched.description && errors.description
                          )}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Please enter resource title"
                          className={classes.textField}
                        ></TextField>
                        <FormHelperText
                          error
                          style={{ margin: "0px", fontSize: "12px" }}
                        >
                          {touched.description && errors.description}
                        </FormHelperText>
                      </>
                    ) : functionKey === "View" ? (
                      <>
                        <TextField
                          readOnly
                          variant="outlined"
                          // value="Mental Illness"
                          inputProps={{ readOnly: "true" }}
                          value={values?.description}
                        />
                        {/* <Typography className="typo_class">
                        <div
                          className={classes.dengerous}
                          dangerouslySetInnerHTML={{
                            __html: _vieweresource?.description,
                          }}
                        ></div>
                      </Typography> */}
                      </>
                    ) : (
                      <>
                        <TextField
                          variant="outlined"
                          name="description"
                          type="text"
                          value={values.description}
                          error={Boolean(
                            touched.description && errors.description
                          )}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Please enter resource title"
                          className={classes.textField}
                        ></TextField>
                        <FormHelperText
                          error
                          style={{ margin: "0px", fontSize: "12px" }}
                        >
                          {touched.description && errors.description}
                        </FormHelperText>
                      </>
                    )}
                  </Box>
                </Grid>
                <Box mt={2}>
                  {functionKey === "Add" ? (
                    ""
                  ) : (
                    <>
                      <Typography
                        variant="h5"
                        color="primary"
                        style={{ paddingBottom: "8px" }}
                      >
                        Created Date and Time :
                      </Typography>
                    </>
                  )}

                  {functionKey === "Add" ? (
                    ""
                  ) : functionKey === "View" ? (
                    <Box>
                      <TextField
                        readOnly
                        variant="outlined"
                        value={_vieweresource?.createdAt}
                        inputProps={{ readOnly: "true" }}
                      />
                    </Box>
                  ) : (
                    <Box>
                      <TextField
                        readOnly
                        variant="outlined"
                        value={convertDateTime(_vieweresource?.createdAt)}
                        inputProps={{ readOnly: "true" }}
                      />
                    </Box>
                  )}
                </Box>

                <Box
                  style={{
                    marginTop: "16px",
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  {functionKey === "View" ? (
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => history.push("/resouceMgmt")}
                      className={classes.newbtn}
                    >
                      Back
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => history.push("/resouceMgmt")}
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
                          color="primary"
                          type="submit"
                          // onClick={AddResourceFuction}
                        >
                          Submit
                        </Button>
                      </Box>
                    </>
                  ) : functionKey === "View" ? (
                    <>
                      <Box>
                        <Button
                          variant="contained"
                          type="submit"
                          color="primary"
                          onClick={() =>
                            history.push({
                              pathname: "/add-resource",
                              search: "Edit",
                              state: {
                                id: _resourceid,
                              },
                            })
                          }
                        >
                          Edit
                        </Button>
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
