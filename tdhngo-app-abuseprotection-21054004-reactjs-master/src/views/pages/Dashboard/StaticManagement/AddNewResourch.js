// import React, { useContext, useState, useEffect, useRef } from "react";
// import {
//   Grid,
//   Box,
//   Typography,
//   makeStyles,
//   TextField,
//   FormControl,
//   IconButton,
//   FormHelperText,
//   MenuItem,
//   Select,
//   Container,
//   Button,
//   Divider,
//   InputLabel,
// } from "@material-ui/core";
// import * as yep from "yup";
// import { Form, Formik } from "formik";
// import { FiUpload } from "react-icons/fi";
// import { addImageHandler, getBase64 } from "src/utils";
// import { useHistory } from "react-router-dom";
// import { toast } from "react-toastify";
// import { convertDateTime } from "../../../../utils";
// import axios from "axios";
// import { Link, useLocation } from "react-router-dom";
// import apiConfig from "src/APIconfig/ApiConfig";
// import JoditEditor from "jodit-react";
// import { values } from "lodash";
// const useStyles = makeStyles((theme) => ({
//   NftBreed: {
//     padding: "23px 0 ",
//   },
//   formControl: {
//     // minWidth: 120,
//     width: "100%",
//     // margin: "0 10px",
//   },
//   main: {
//     border: "1px solid #F38500",
//     padding: "40px",
//     borderRadius: "15px",
//     backgroundColor: "#FEDDB6",
//   },
//   divider: {
//     marginTop: "10px",
//     background: "#F38500",
//   },
//   textField: {
//     maxWidth: "100%",
//   },

//   image: {
//     cursor: "pointer",
//   },
//   upload: {
//     // width: "150px",
//     height: "250px",
//     margin: "16px 0",
//     cursor: "pointer",
//     borderRadius: "20px",
//     position: "relative",
//     "& img": {
//       width: "100%",
//       height: "100%",
//       border: "1px solid #F38500",
//       // borderRadius: "50%",
//       objectFit: "cover",
//     },

//     "& button": {
//       position: "absolute",
//       border: "3px solid black",
//       bottom: 0,
//       right: 0,
//       backgroundColor: "#fff",
//       color: "#000",
//       fontSize: "15px",
//       "&:hover": {
//         backgroundColor: "#fff",
//         border: "3px solid black",
//       },
//       "& input": {
//         width: "100%",
//         height: "100%",
//         position: "absolute",
//         top: "0",
//         left: "0",
//         opacity: 0,
//       },
//     },
//   },
//   devicelistHeading: {
//     display: "flex",
//     justifyContent: "start",
//     alignItems: "center",
//     "& h3": {
//       padding: "1rem 0",
//       color: theme.palette.text.black,
//     },
//     "& .icon1": {
//       height: "20px",
//       paddingRight: "20px",
//       [theme.breakpoints.only("xs")]: {
//         width: "50px",
//         height: "8px",
//         paddingRight: "7px",
//       },
//     },
//     "& .icon2": {
//       height: "20px",
//       paddingLeft: "20px",
//       [theme.breakpoints.only("xs")]: {
//         width: "50px",
//         height: "8px",
//         paddingLeft: "7px",
//       },
//     },
//   },
//   newbtn: {
//     "@media(max-width:400px)": {
//       marginTop: "10px",
//     },
//   },
//   imgsec: {
//     display: "flex",
//     justifyContent: "center",
//     width: "100%",
//     "@media(max-width:600px)": {
//       justifyContent: "center",
//     },
//   },
// }));

// export default function CreateNFT(userProfileData) {
//   const classes = useStyles();
//   const history = useHistory();
//   const editor = useRef(null);
//   const [base64Img1, setBase64Img1] = useState("");
//   const [imgFile, setImgfile] = useState("");
//   const [profile, setprofile] = useState();
//   const [currentvalue, setCurrentValue] = useState("Select");
//   console.log("currentvalue-->>", currentvalue);
//   const location = useLocation();
//   const [isLoading, setLoading] = useState(false);
//   const partnerData = location.state;
//   const idduserdata = partnerData?.id;
//   console.log("asdasdadad", idduserdata);
//   const [_vieweresource, setViewResource] = useState();
//   console.log("_vieweresource---->>", _vieweresource);
//   const imagesec = partnerData?.logo;
//   const [_imageurl, setFile] = useState(null);
//   const [_imgDef, setImgDef] = useState("");
//   console.log("_imgDef11111--->>", _imageurl);

//   const functionKey = location.search.split("?")[1];
//   console.log("Locations key is >>", functionKey);

//   const [base64Img, setBase64Img] = useState("");
//   useEffect(() => {
//     if (imagesec) {
//       setBase64Img(imagesec);
//     }
//   }, [imagesec]);
//   function imageUpload(event) {
//     let base64img = userData.profilepic;
//     let reader = new FileReader();
//     reader.onload = function () {
//       base64img = reader.result;
//       setBase64Img(base64img);
//     };
//     reader.readAsDataURL(event.target.files[0]);
//   }
//   const [userData, setUserData] = useState({
//     coverPic: "",
//     profilePic: "",
//     profilePic: "",
//     coverPic: "",
//   });
//   const formInitialValue = {
//     category: "",
//     categoryname: "",
//     _description: "",
//     resourcename: "",
//     _description: "",
//   };
//   const [_description, setDescription] = useState("");
//   console.log("_description-->>", _description);
//   const [_prefield, setPreField] = useState(formInitialValue);
//   console.log("_prefield--->>", _prefield);
//   const formValidationSchema = yep.object().shape({
//     category: yep.string().required(" Category is required"),

//     _description: yep
//       .string()
//       .required(" Name is required")
//       .min(2, "Please enter at least 2 characters")
//       .max(35, "You can enter only 35 characters"),
//     resourcename: yep
//       .string()
//       .required(" Date is required")
//       .min(2, "Please enter at least 2 characters")
//       .max(35, "You can enter only 10 characters"),
//   });
//   //Edit Resource
//   const EditResouceFuncction = async (values) => {
//     try {
//       setLoading(true);
//       const res = await axios({
//         url: apiConfig.editResource,
//         method: "PUT",
//         headers: {
//           token: window.sessionStorage.getItem("token"),
//         },
//         data: {
//           resourceId: idduserdata,
//           categoryId: currentvalue,
//           title: values.resourcename,
//           description: _description,
//           // image: _imgDef,
//         },
//       });

//       if (res?.data?.status === 200) {
//         setLoading(false);
//         history.push("/resouceMgmt");
//       }
//     } catch (error) {
//       setLoading(false);
//       console.log("error-->>", error);
//     }
//   };
//   // View Resourch
//   const ViewResourchFunction = async () => {
//     try {
//       console.log("break code", _vieweresource);
//       setLoading(true);
//       const res = await axios({
//         url: apiConfig.viewResource,
//         method: "GET",
//         params: {
//           resourceId: idduserdata,
//         },
//       });
//       if (res) {
//         console.log("res11111---", res);
//         setViewResource(res?.data?.result);
//         const formInitialValue = {
//           category: res?.data?.result?.categoryId?._id,
//           _description: res?.data?.result?.description,
//           resourcename: res?.data?.result?.title,
//         };
//         setDescription(res?.data?.result?.description);
//         setPreField(formInitialValue);
//         currentvalue(res?.data?.result?.name);
//       }
//     } catch (error) {
//       console.log("res11111---", error);
//     }
//   };
//   //Add
//   const [_listcatogory, setListCategory] = useState([]);
//   const [_changecategory, setChangeCataegory] = useState("");

//   const ListCategoryFunction = async () => {
//     try {
//       const res = await axios({
//         url: apiConfig.listCategory,
//         method: "GET",
//         headers: {
//           token: window.sessionStorage.getItem("token"),
//         },
//       });
//       if (res) {
//         console.log("res1111--->", res);
//         setListCategory(res?.data?.result?.docs);
//       }
//     } catch (error) {
//       console.log("res1111--->", error);
//     }
//   };
//   useEffect(() => {
//     ListCategoryFunction();
//     ViewResourchFunction();
//   }, [idduserdata]);
//   return (
//     <Box className={classes.NftBreed}>
//       <Box className={classes.devicelistHeading}>
//         <Typography variant="h1" className="headingText">
//           {`${functionKey} Resource`}
//         </Typography>
//       </Box>
//       <Divider className={classes.divider} />
//       <Container maxWidth="md">
//         <Formik
//           initialValues={_prefield}
//           enableReinitialize={true}
//           initialStatus={{
//             success: false,
//             successMsg: "",
//           }}
//           validationSchema={formValidationSchema}
//           onSubmit={(values) => EditResouceFuncction(values)}
//         >
//           {({
//             errors,
//             handleBlur,
//             handleChange,
//             handleSubmit,
//             touched,
//             values,
//             setFieldValue,
//           }) => (
//             <Form>
//               <Box mt={5} mb={2} className={classes.main}>
//                 <Grid container spacing={2}>
//                   <Grid item md={12} sm={12} lg={12} xs={12}>
//                     <Box className={classes.imgsec}>
//                       <Box>
//                         {functionKey === "Add" ? (
//                           <>
//                             <figure className={classes.upload}>
//                               <img
//                                 src={
//                                   _imgDef ? _imgDef : "/images/mentalIll.png"
//                                 }
//                               />
//                               <IconButton>
//                                 <FiUpload />
//                                 <input
//                                   type="file"
//                                   // accept="image/*"
//                                   accept="image/*, video/*, .mp3,audio/*, docs/*"
//                                   onChange={(e) => {
//                                     setFile(e.target.files[0]);
//                                     setImgDef(
//                                       URL.createObjectURL(e.target.files[0])
//                                     );
//                                   }}
//                                 />
//                               </IconButton>
//                             </figure>
//                           </>
//                         ) : functionKey === "View" ? (
//                           <figure className={classes.upload}>
//                             <img
//                               src={
//                                 _vieweresource?.image
//                                   ? _vieweresource?.image
//                                   : "/images/mentalIll.png"
//                               }
//                             />
//                           </figure>
//                         ) : (
//                           <figure className={classes.upload}>
//                             <img
//                               src={
//                                 base64Img ? base64Img : "/images/mentalIll.png"
//                               }
//                             />
//                             <IconButton>
//                               <FiUpload />
//                               <input
//                                 type="file"
//                                 accept="image/*"
//                                 onChange={(e) => {
//                                   setFile(e.target.files[0]);
//                                   setImgDef(
//                                     URL.createObjectURL(e.target.files[0])
//                                   );
//                                 }}
//                               />
//                             </IconButton>
//                           </figure>
//                         )}

//                         {functionKey === "Add" ? (
//                           <>
//                             <Box className={classes.imgsec}>
//                               <Typography variant="h6" color="primary">
//                                 Please select image
//                               </Typography>
//                             </Box>
//                           </>
//                         ) : functionKey === "View" ? (
//                           <Box className={classes.imgsec}>
//                             <Typography variant="h6" color="primary">
//                               {_vieweresource?.categoryId?.name}
//                             </Typography>
//                           </Box>
//                         ) : (
//                           <Box className={classes.imgsec}>
//                             <Typography variant="h6" color="primary">
//                               Please select image
//                             </Typography>
//                           </Box>
//                         )}
//                       </Box>
//                     </Box>
//                   </Grid>
//                   <Grid
//                     item
//                     md={12}
//                     sm={12}
//                     lg={12}
//                     xs={12}
//                     className={classes.image}
//                   >
//                     <Box mt={1}>
//                       <form className="formBox p-0" autoComplete="off">
//                         <FormControl
//                           variant="outlined"
//                           className={classes.formControl}
//                         >
//                           <Box>
//                             <Typography
//                               variant="h5"
//                               color="primary"
//                               style={{ paddingBottom: "8px" }}
//                             >
//                               Category Name :
//                             </Typography>

//                             {functionKey === "Add" ? (
//                               <>
//                                 <FormControl
//                                   variant="outlined"
//                                   className={classes.formControl}
//                                 >
//                                   <Box>
//                                     <FormControl
//                                       variant="outlined"
//                                       className={classes.formControl}
//                                     >
//                                       {/* <InputLabel id="demo-simple-select-outlined-label">
//                                       Age
//                                     </InputLabel> */}
//                                       <Box>
//                                         <Select
//                                           name="token"
//                                           labelId="demo-simple-select-outlined-label"
//                                           id="demo-simple-select-outlined"
//                                           onChange={(e) =>
//                                             setCurrentValue(e.target.value)
//                                           }
//                                           value={currentvalue}
//                                           style={{ width: "100%" }}
//                                         >
//                                           {" "}
//                                           <MenuItem value="Select">
//                                             Select Category
//                                           </MenuItem>
//                                           {_listcatogory &&
//                                             _listcatogory.map((data, id) => (
//                                               <MenuItem value={data?._id}>
//                                                 {data?.name}
//                                               </MenuItem>
//                                             ))}
//                                         </Select>
//                                       </Box>
//                                     </FormControl>
//                                   </Box>
//                                 </FormControl>
//                               </>
//                             ) : functionKey === "View" ? (
//                               <Box>
//                                 <TextField
//                                   readOnly
//                                   variant="outlined"
//                                   // value="Mental Health and Well Being"
//                                   inputProps={{ readOnly: "true" }}
//                                   value={_vieweresource?.title}
//                                 />
//                               </Box>
//                             ) : (
//                               <FormControl
//                                 variant="outlined"
//                                 className={classes.formControl}
//                               >
//                                 <Box>
//                                   {/* <Select
//                                     name="category"
//                                     // labelId="demo-simple-select-outlined-label"
//                                     // id="demo-simple-select-outlined"
//                                     // onChange={(e) =>
//                                     //   setListCategory(e.target.id)
//                                     // }
//                                     onBlur={handleBlur}
//                                     onChange={handleChange}
//                                     value={values?.category}
//                                     style={{ width: "100%" }}
//                                   >
//                                     <MenuItem value="Select">
//                                       Select Category
//                                     </MenuItem>
//                                     {_listcatogory &&
//                                       _listcatogory.map((data, id) => {
//                                         console.log(
//                                           "_listcatogory---111>>",
//                                           _listcatogory
//                                         );
//                                         return (
//                                           <>
//                                             <MenuItem value={data?._id}>
//                                               {data?.name}
//                                             </MenuItem>
//                                           </>
//                                         );
//                                       })}
//                                   </Select> */}
//                                   <FormControl
//                                     variant="outlined"
//                                     className={classes.formControl}
//                                   >
//                                     {/* <InputLabel id="demo-simple-select-outlined-label">
//                                       Age
//                                     </InputLabel> */}
//                                     <Box>
//                                       <Select
//                                         name="token"
//                                         labelId="demo-simple-select-outlined-label"
//                                         id="demo-simple-select-outlined"
//                                         onChange={(e) =>
//                                           setCurrentValue(e.target.value)
//                                         }
//                                         value={currentvalue}
//                                         style={{ width: "100%" }}
//                                       >
//                                         {" "}
//                                         <MenuItem value="Select">
//                                           Select Category
//                                         </MenuItem>
//                                         {_listcatogory &&
//                                           _listcatogory.map((data, id) => (
//                                             <MenuItem value={data?._id}>
//                                               {data?.name}
//                                             </MenuItem>
//                                           ))}
//                                       </Select>
//                                     </Box>
//                                   </FormControl>
//                                 </Box>
//                               </FormControl>
//                             )}
//                           </Box>
//                           <Box mt={2}>
//                             <Typography
//                               variant="h5"
//                               color="primary"
//                               style={{ paddingBottom: "8px" }}
//                             >
//                               Resource Title :
//                             </Typography>

//                             {functionKey === "Add" ? (
//                               <>
//                                 <Box>
//                                   <TextField
//                                     variant="outlined"
//                                     name="categoryname"
//                                     type="text"
//                                     value={values.categoryname}
//                                     error={Boolean(
//                                       touched.categoryname &&
//                                         errors.categoryname
//                                     )}
//                                     onBlur={handleBlur}
//                                     onChange={handleChange}
//                                     placeholder="Please enter resource title"
//                                     className={classes.textField}
//                                   />
//                                   <FormHelperText
//                                     error
//                                     style={{
//                                       margin: "0px",
//                                       fontSize: "12px",
//                                     }}
//                                   >
//                                     {touched.categoryname &&
//                                       errors.categoryname}
//                                   </FormHelperText>
//                                 </Box>
//                               </>
//                             ) : functionKey === "View" ? (
//                               <Box>
//                                 <TextField
//                                   readOnly
//                                   variant="outlined"
//                                   // value="Mental Illness"
//                                   inputProps={{ readOnly: "true" }}
//                                   value={_vieweresource?.description}
//                                 />
//                               </Box>
//                             ) : (
//                               <Box>
//                                 <TextField
//                                   variant="outlined"
//                                   name="resourcename"
//                                   type="text"
//                                   value={_prefield.resourcename}
//                                   error={Boolean(
//                                     touched.resourcename && errors.resourcename
//                                   )}
//                                   onBlur={handleBlur}
//                                   onChange={handleChange}
//                                   placeholder="Please enter resource title"
//                                   className={classes.textField}
//                                 />
//                                 <FormHelperText
//                                   error
//                                   style={{ margin: "0px", fontSize: "12px" }}
//                                 >
//                                   {touched.resourcename && errors.resourcename}
//                                 </FormHelperText>
//                               </Box>
//                             )}
//                           </Box>
//                         </FormControl>
//                       </form>
//                     </Box>
//                   </Grid>
//                 </Grid>

//                 <Grid item md={12} sm={12} lg={12} xs={12}>
//                   <Box mt={2}>
//                     <Typography
//                       variant="h5"
//                       color="primary"
//                       style={{ paddingBottom: "8px" }}
//                     >
//                       Resource Description :
//                     </Typography>
//                     {functionKey === "Add" ? (
//                       <>
//                         <JoditEditor
//                           ref={editor}
//                           tabIndex={1}
//                           config={apiConfig}
//                           value={_description}
//                           // onChange={(e) => setDescription(e.target.value)}
//                           onBlur={(e) => setDescription(e)}
//                           onChange={(newContent) => {}}
//                         />
//                         <FormHelperText
//                           error
//                           style={{ margin: "0px", fontSize: "12px" }}
//                         >
//                           {touched.desc && errors.desc}
//                         </FormHelperText>
//                       </>
//                     ) : functionKey === "View" ? (
//                       <TextField
//                         variant="outlined"
//                         inputProps={{ readOnly: "true" }}
//                         aria-readonly
//                         value={_vieweresource?.description}
//                         multiline
//                         rows={4}
//                         placeholder="https://www.lipsum.com/"
//                         className={classes.textField}
//                       />
//                     ) : (
//                       <>
//                         <JoditEditor
//                           ref={editor}
//                           tabIndex={1}
//                           value={_description}
//                           onBlur={(e) => setDescription(e)}
//                           onChange={(newContent) => {}}
//                         />
//                         <FormHelperText
//                           error
//                           style={{ margin: "0px", fontSize: "12px" }}
//                         >
//                           {touched.desc && errors.desc}
//                         </FormHelperText>
//                       </>
//                     )}
//                   </Box>
//                 </Grid>
//                 <Box mt={2}>
//                   {functionKey === "Add" ? (
//                     ""
//                   ) : (
//                     <>
//                       <Typography
//                         variant="h5"
//                         color="primary"
//                         style={{ paddingBottom: "8px" }}
//                       >
//                         Created Date and Time :
//                       </Typography>
//                     </>
//                   )}

//                   {functionKey === "Add" ? (
//                     ""
//                   ) : functionKey === "View" ? (
//                     <Box>
//                       <TextField
//                         readOnly
//                         variant="outlined"
//                         value={_vieweresource?.createdAt}
//                         inputProps={{ readOnly: "true" }}
//                       />
//                     </Box>
//                   ) : (
//                     <Box>
//                       <TextField
//                         readOnly
//                         variant="outlined"
//                         value={convertDateTime(_vieweresource?.createdAt)}
//                         inputProps={{ readOnly: "true" }}
//                       />
//                     </Box>
//                   )}
//                 </Box>

//                 <Box
//                   style={{
//                     marginTop: "16px",
//                     display: "flex",
//                     flexWrap: "wrap",
//                     justifyContent: "center",
//                   }}
//                 >
//                   {functionKey === "View" ? (
//                     <Button
//                       variant="contained"
//                       color="secondary"
//                       onClick={() => history.push("/resouceMgmt")}
//                       className={classes.newbtn}
//                     >
//                       Back
//                     </Button>
//                   ) : (
//                     <Button
//                       variant="contained"
//                       color="primary"
//                       onClick={() => history.push("/resouceMgmt")}
//                       className={classes.newbtn}
//                     >
//                       Cancel
//                     </Button>
//                   )}
//                   &nbsp;&nbsp;
//                   {functionKey === "Add" ? (
//                     <>
//                       {/* <Box>
//                         <Button
//                           variant="contained"
//                           type="submit"
//                           color="primary"
//                         >
//                           Submit
//                         </Button>
//                       </Box> */}
//                     </>
//                   ) : functionKey === "View" ? (
//                     <>
//                       <Box>
//                         <Button
//                           variant="contained"
//                           type="submit"
//                           color="primary"
//                           onClick={() =>
//                             history.push({
//                               pathname: "/add-resource",
//                               search: "Edit",
//                             })
//                           }
//                         >
//                           Edit
//                         </Button>
//                       </Box>
//                     </>
//                   ) : (
//                     <Box>
//                       <Button variant="contained" type="submit" color="primary">
//                         Update
//                       </Button>
//                     </Box>
//                   )}
//                 </Box>
//               </Box>
//             </Form>
//           )}
//         </Formik>
//       </Container>
//     </Box>
//   );
// }
