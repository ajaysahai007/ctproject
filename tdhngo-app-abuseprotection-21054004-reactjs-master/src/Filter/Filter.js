import React, { useState } from "react";
import {
  Box,
  TableCell,
  TableContainer,
  TableHead,
  Table,
  Typography,
  TableBody,
  TableRow,
  IconButton,
  InputAdornment,
  Button,
  FormControl,
  Divider,
  DialogTitle,
  Slide,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Select,
  makeStyles,
  TextField,
  withStyles,
  Grid,
  MenuItem,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";

import { BsSearch } from "react-icons/bs";
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import moment from "moment";
import * as XLSX from "xlsx";

const useStyles = makeStyles((theme) => ({
  deviceSection: {
    display: "flex",
    alignItems: "center",
  },
  textdecoration: {
    textDecoration: "none",
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
  activeparent: {
    display: "flex",
    alignItems: "center",
  },
  activeDevice: {
    width: "10px",
    height: "10px",
    background: "green",
    borderRadius: "100px",
  },
  tableRow1: {
    "& td": {
      color: theme.palette.text.black,
    },
    "& th": {
      color: theme.palette.text.black,
    },
  },
  formControl: {
    minWidth: "15vh",
    width: "100%",
  },
  iconcolor: {
    color: "#fff",
  },
  mainbox: {
    // padding: "16px 0 40px",
    paddingTop: "23px",
    "& .tableHead": {
      backgroundColor: "#FEDDB6",
      "& th": {
        color: "#fff",
        padding: "11px",
      },
    },
  },
  mainbox1: {
    "& .tableHead": {
      backgroundColor: "#FEDDB6",
      "& th": {
        color: "#fff",
        padding: "11px",
      },
    },
  },

  divider: {
    marginTop: "10px",
    backgroundColor: "#F38500",
  },
  deviceSection: {
    display: "flex",
    alignItems: "center",
  },

  devicelistHeading: {
    display: "flex",
    justifyContent: "space-between",
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
  activeparent: {
    display: "flex",
    alignItems: "center",
  },
  activeDevice: {
    width: "10px",
    height: "10px",
    background: "green",
    borderRadius: "100px",
  },
  tableRow1: {
    "& td": {
      color: theme.palette.text.black,
    },
    "& th": {
      color: "#fff",
    },
  },
  formControl: {
    minWidth: "15vh",
    width: "100%",
  },
  iconcolor: {
    color: "#fff",
  },
  mainbox: {
    // padding: "16px 0 40px",
    paddingTop: "23px",
    "& .tableHead": {
      backgroundColor: "#FEDDB6",
      "& th": {
        color: "black",
        padding: "11px",
      },
    },
  },
  mainbox1: {
    "& .tableHead": {
      backgroundColor: "#FEDDB6",
      "& th": {
        color: "black",
        padding: "11px",
      },
    },
  },
  filterBox: {
    color: "#fff",
    position: "relative",
    "& h6": {
      position: "absolute",
      top: "-20px",
      background: theme.palette.background.dark1,

      padding: "5px 10px",
      left: "0px",
      fontSize: "19px",
      color: "#5a86ff",
      fontWeight: 600,
    },
    "& input": {
      color: theme.palette.text.black,
    },
    "& label": {
      color: "black",
      fontSize: "14px",
      fontWeight: "400",
      // fontFamily: "'Roboto',sans-serif",
    },
    "& .iconbtn": {
      color: theme.palette.text.black,
    },
  },
  filterLine: {
    marginRight: "10px",
    width: "180px",
    [theme.breakpoints.only("xs")]: {
      width: "145px",
    },
  },
  inputFeild: {
    border: "1px solid #F38500 !important",
    padding: "6px 0px",
    color: "#fff",
    borderRadius: "5px",

    "& svg": {
      color: "#F38500",
      fontSize: "16px",
    },
  },
  AddEmergency: {
    width: "100%",
  },
}));
const Filter = ({
  type,
  UserManagementFunction,
  _usermanagement,
  search,
  setSearch,
  states,
  setStates,
  destrict,
  setDistrict,
  openUserBlockUnblock,
  setOpenUserBlockUnblick,
  toDate,
  settoDate,
  fromDate,
  setfromDate,
  setusertype,
  usertype,
  CategoryFunction,
  _category,
  ListResourchFunction,
  _resourchlist,
  currentvalue,
  setCurrentValue,
  currentvalue1,
  setCurrentValue1,
  ListEmergency,
  _listemergency,
  _bannerlist,
  BannerListFuunction,
  _subactivity,
  setSubActivity,
  _feedback,
  FeedBackList,
  ReportManagementFunction,
}) => {
  const classes = useStyles();
  const history = useHistory();
  console.log("search--->>>123", search);
  const SelectActivity = [
    {
      activity: "Select Activity",
    },
    {
      activity: "Mental Health",
      activity_key: "mental_health",
    },
    {
      activity: "Menstrual Health",
      activity_key: "menstrual_health",
    },
  ];
  if (currentvalue === "all") {
    console.log("call the activity");
  } else {
    // }
    console.log("123------>>>", currentvalue);
    if (currentvalue === "mental_health") {
      var MentalHealth = [
        {
          Sub_Activity: "SLEEP TRACKING",
          Activity: "SLEEP_TRACKING",
        },

        {
          Sub_Activity: "Mood Tracking",
          Activity: "MOOD",
        },
      ];
    } else if (currentvalue === "menstrual_health") {
      var MentalHealth = [
        {
          Sub_Activity: "PERIOD TRACKERr",
          Activity: "PERIOD_TRACKER",
        },
      ];
    } else {
      console.log("sandasbjda");
    }
  }
  // const [_select_sub_activity, setSelectActivity] = useState(MentalHealth);
  console.log("_select_sub_activity------>>", MentalHealth);

  const downloadExcel = () => {
    const workSheet = XLSX.utils.json_to_sheet(
      (type === "userManagement" && _usermanagement) ||
        (type === "categoryManagement" && _category) ||
        (type === "resourceManagement" && _resourchlist) ||
        (type === "emergencyManagement" && _listemergency) ||
        (type === "bannerManagement" && _bannerlist) ||
        (type === "feedbackManagement" && _feedback)
    );

    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, `${type}`);
    let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, `${type}_list.xlsx`);
  };
  const CallApiFunction = () => {
    if (type === "userManagement") {
      UserManagementFunction();
    } else if (type === "categoryManagement") {
      CategoryFunction();
    } else if (type === "resourceManagement") {
      ListResourchFunction();
    } else if (type === "emergencyManagement") {
      ListEmergency();
    } else if (type === "bannerManagement") {
      BannerListFuunction();
    } else if (type === "feedbackManagement") {
      FeedBackList();
    } else if (type === "reportManagement") {
      ReportManagementFunction();
    }
  };
  const CleanState = () => {
    setSearch();
    setStates();
    setDistrict();
    setOpenUserBlockUnblick();
    settoDate();
    setfromDate();
    setusertype();
    if (type === "userManagement") {
      UserManagementFunction();
    } else if (type === "categoryManagement") {
      CategoryFunction();
    } else if (type === "resourceManagement") {
      ListResourchFunction();
    } else if (type === "emergencyManagement") {
      ListEmergency();
    } else if (type === "bannerManagement") {
      BannerListFuunction();
    } else if (type === "feedbackManagement") {
      FeedBackList();
    } else if (type === "reportManagement") {
      ReportManagementFunction();
    } else {
    }
  };

  return (
    <div>
      <Box>
        <Divider className={classes.divider} />
        <Box className={classes.filterBox} mb={5} mt={4}>
          <Box
            style={{
              display: "flex",
              justifyContent: "flex-start",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            <Grid container spacing={1}>
              {/* //search */}
              {(type === "userManagement" ||
                type === "categoryManagement" ||
                type === "resourceManagement" ||
                type === "emergencyManagement" ||
                type === "bannerManagement" ||
                type === "feedbackManagement") && (
                <>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <label>Search </label>
                    <Box style={{ marginTop: "5px" }}>
                      <TextField
                        id="outlined-basic"
                        type="search"
                        variant="outlined"
                        placeholder={
                          (type === "userManagement" &&
                            "Serach by user name") ||
                          (type === "categoryManagement" &&
                            "Serach by Category Name") ||
                          (type === "resourceManagement" &&
                            "Serach by Resource title") ||
                          (type === "emergencyManagement" &&
                            "Serach by Location Name") ||
                          (type === "bannerManagement" &&
                            "Serach by Banner Name") ||
                          (type === "feedbackManagement" &&
                            "Serach by User Name")
                        }
                        fullWidth
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                style={{ fontSize: "20px", padding: "0px" }}
                                className="iconbtn"
                              >
                                <BsSearch
                                  style={{
                                    color: "#F38500",
                                    fontSize: "16px",
                                  }}
                                />
                              </IconButton>{" "}
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Box>
                  </Grid>
                </>
              )}

              {/* Rating */}
              {type === "feedbackManagement" && (
                <>
                  {" "}
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <label>Rating</label>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <Box style={{ marginTop: "5px" }}>
                        <Select
                          name="token"
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          onChange={(e) => setCurrentValue(e.target.value)}
                          value={currentvalue}
                          style={{ width: "100%" }}
                        >
                          <MenuItem value="Rating">Rating</MenuItem>
                          <MenuItem value="1">1</MenuItem>
                          <MenuItem value="2">2</MenuItem>
                          <MenuItem value="3">3</MenuItem>
                          <MenuItem value="4">4</MenuItem>
                          <MenuItem value="5">5</MenuItem>
                        </Select>
                      </Box>
                    </FormControl>
                  </Grid>
                </>
              )}

              {/* Emergency Type
               */}
              {type === "emergencyManagement" && (
                <>
                  <Grid item xs={12} sm={6} md={3} lg={3}>
                    <label>Emergency Type </label>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <Box style={{ marginTop: "5px" }}>
                        <Select
                          name="token"
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          onChange={(e) => setStates(e.target.value)}
                          value={states}
                          style={{ width: "100%" }}
                        >
                          <MenuItem value="select">
                            Select Emergency Type
                          </MenuItem>
                          <MenuItem value="police">Police</MenuItem>
                          <MenuItem value="fire">Fire</MenuItem>
                          <MenuItem value="ambulance">Ambulance</MenuItem>
                        </Select>
                      </Box>
                    </FormControl>
                  </Grid>
                </>
              )}

              {/* Format */}
              {/* {type === "resourceManagement" && (
                <>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <label>Format</label>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <Box style={{ marginTop: "5px" }}>
                        <Select
                          name="token"
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          onChange={(e) => setCurrentValue1(e.target.value)}
                          value={currentvalue1}
                          style={{ width: "100%" }}
                        >
                          <MenuItem value="Select">Select Format</MenuItem>
                          <MenuItem value="Audio">Audio</MenuItem>
                          <MenuItem value="Photo">Photo</MenuItem>
                          <MenuItem value="Video">Video</MenuItem>
                          <MenuItem value="Document">Document</MenuItem>
                        </Select>
                      </Box>
                    </FormControl>
                  </Grid>
                </>
              )} */}

              {/* Category */}
              {type === "resourceManagement" && (
                <>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <label>Category</label>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <Box style={{ marginTop: "5px" }}>
                        <Select
                          name="token"
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          onChange={(e) => setCurrentValue(e.target.value)}
                          value={currentvalue}
                          style={{ width: "100%" }}
                        >
                          <MenuItem value="Select Category">
                            Select Category
                          </MenuItem>
                          <MenuItem value="mental_health">
                            Mental Health
                          </MenuItem>
                          <MenuItem value="Menstrual Health">
                            {" "}
                            Menstrual Health
                          </MenuItem>
                          <MenuItem value="Personal Safety">
                            Personal Safety
                          </MenuItem>
                          <MenuItem value="Support Service">
                            Support Service
                          </MenuItem>
                        </Select>
                      </Box>
                    </FormControl>
                  </Grid>
                </>
              )}

              {/* USER TYPE */}
              {type === "userManagement" && (
                <>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <label>User Type </label>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <Box style={{ marginTop: "5px" }}>
                        <Select
                          name="token"
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          onChange={(e) => setusertype(e.target.value)}
                          value={usertype}
                          style={{ width: "100%" }}
                        >
                          {/* <MenuItem value="Users Type"></MenuItem> */}
                          <MenuItem value="All Users">All Users</MenuItem>
                          <MenuItem value="ACTIVE">Active Users</MenuItem>
                          <MenuItem value="BLOCK">Block Users</MenuItem>
                        </Select>
                      </Box>
                    </FormControl>
                  </Grid>
                </>
              )}
              {/* STATES */}
              {(type === "userManagement" || type === "reportManagement") && (
                <>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <label>State </label>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <Box style={{ marginTop: "5px" }}>
                        <Select
                          name="token"
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          onChange={(e) => setStates(e.target.value)}
                          value={states}
                          style={{ width: "100%" }}
                        >
                          {/* <MenuItem value="Location..."></MenuItem> */}
                          <MenuItem value="Delhi">Delhi</MenuItem>
                          <MenuItem value="Noida">Harayana</MenuItem>
                          <MenuItem value="Uttar Pradesh">
                            Uttar Pradesh
                          </MenuItem>
                        </Select>
                      </Box>
                    </FormControl>
                  </Grid>
                </>
              )}

              {/* DISTRICT */}
              {(type === "userManagement" || type === "reportManagement") && (
                <>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <label>District </label>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <Box style={{ marginTop: "5px" }}>
                        <Select
                          name="token"
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          onChange={(e) => setDistrict(e.target.value)}
                          value={destrict}
                          style={{ width: "100%" }}
                        >
                          {/* <MenuItem value="Location..."></MenuItem> */}
                          <MenuItem value="Delhi">Meerut</MenuItem>
                          <MenuItem value="Noida">Noida</MenuItem>
                          <MenuItem value="Uttar Pradesh">New Delhi</MenuItem>
                        </Select>
                      </Box>
                    </FormControl>
                  </Grid>
                </>
              )}
              {/* Select Activity */}
              {type === "reportManagement" && (
                <>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <label>Activity</label>
                      <Box mt={1}>
                        <Select
                          name="token"
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          onChange={(e) => {
                            setCurrentValue(e.target.value);
                          }}
                          value={currentvalue}
                          style={{ width: "100%" }}
                        >
                          {/* <MenuItem value="all">Select Activity</MenuItem> */}
                          {SelectActivity.map((value, i) => (
                            <MenuItem value={value.activity_key}>
                              {value?.activity}
                            </MenuItem>
                          ))}
                        </Select>
                      </Box>
                    </FormControl>
                  </Grid>
                </>
              )}
              {/* Sub Activity */}
              {type === "reportManagement" && (
                <>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <label>Sub Activity</label>
                      <Box mt={1}>
                        <Select
                          name="token"
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          onChange={(e) => {
                            setSubActivity(e.target.value);
                          }}
                          value={_subactivity}
                          style={{ width: "100%" }}
                        >
                          {console.log("_subactivity---->>", _subactivity)}
                          <MenuItem value="all">Select Sub Activity</MenuItem>
                          {MentalHealth &&
                            MentalHealth.map((value, i) => (
                              <MenuItem value={value.Activity}>
                                {value.Activity}
                              </MenuItem>
                            ))}
                        </Select>
                      </Box>
                    </FormControl>
                  </Grid>
                </>
              )}

              {/* FROM */}
              {(type === "userManagement" ||
                type === "categoryManagement" ||
                type === "resourceManagement" ||
                type === "emergencyManagement" ||
                type === "bannerManagement" ||
                type === "reportManagement" ||
                type === "feedbackManagement") && (
                <>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <label>From</label>

                    <Box style={{ marginTop: "5px" }}>
                      <KeyboardDateTimePicker
                        className={classes.inputFeild}
                        ampm={false}
                        value={fromDate}
                        onChange={(date) => {
                          setfromDate(new Date(date));
                        }}
                        onError={console.log}
                        disableFuture
                        format="YYYY/MM/DD HH:mm"
                      />
                    </Box>
                  </Grid>
                </>
              )}
              {/* TO */}
              {(type === "userManagement" ||
                type === "categoryManagement" ||
                type === "resourceManagement" ||
                type === "emergencyManagement" ||
                type === "bannerManagement" ||
                type === "reportManagement" ||
                type === "feedbackManagement") && (
                <>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <label>To</label>
                    <Box style={{ marginTop: "5px" }}>
                      <KeyboardDateTimePicker
                        className={classes.inputFeild}
                        ampm={false}
                        value={toDate}
                        // onChange={(date) => settoDate(date, "toDate")}
                        onChange={(date) => {
                          settoDate(new Date(date));
                        }}
                        onError={console.log}
                        disableFuture
                        minDate={moment(fromDate).format("YYYY-MM-DD HH:mm")}
                        format="YYYY-MM-DD HH:mm"
                      />
                    </Box>
                  </Grid>
                </>
              )}
              {/* SUBMIT */}
              {(type === "userManagement" ||
                type === "categoryManagement" ||
                type === "resourceManagement" ||
                type === "emergencyManagement" ||
                type === "bannerManagement" ||
                type === "reportManagement" ||
                type === "feedbackManagement") && (
                <>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <label style={{ color: "transparent" }}>Status</label>
                    <Box style={{ marginTop: "5px" }}>
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={CallApiFunction}
                      >
                        Submit
                      </Button>
                    </Box>
                  </Grid>
                </>
              )}
              {/* RESET */}
              {(type === "userManagement" ||
                type === "categoryManagement" ||
                type === "resourceManagement" ||
                type === "emergencyManagement" ||
                type === "bannerManagement" ||
                type === "reportManagement" ||
                type === "feedbackManagement") && (
                <>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <label style={{ color: "transparent" }}>Status</label>

                    <Box style={{ marginTop: "5px" }}>
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        style={{ padding: "5px 5px" }}
                        onClick={() => {
                          CleanState();
                          setSearch();
                        }}
                      >
                        Reset
                      </Button>
                    </Box>
                  </Grid>
                </>
              )}
              {/* Add resource */}
              {type === "resourceManagement" && (
                <>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Box style={{ margin: "30px 0px -15px" }} align="right">
                      <Button
                        style={{ width: "100%" }}
                        className={classes.AddCategory}
                        variant="contained"
                        color="primary"
                        onClick={() =>
                          history.push({
                            pathname: "/add-resource",
                            search: "Add",
                            state: {
                              id: "",
                            },
                          })
                        }
                      >
                        Add Resource
                      </Button>
                    </Box>
                  </Grid>
                </>
              )}
              {/*  Add Emergency button*/}
              {type === "emergencyManagement" && (
                <>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Box style={{ margin: "30px 0px -15px" }} align="right">
                      <RouterLink
                        to="/emergencyadd"
                        className={classes.textdecoration}
                      >
                        <Button
                          className={classes.AddEmergency}
                          variant="contained"
                          color="primary"
                          // onClick={() =>
                          //   history.push({
                          //     pathname: "/emergencyadd",
                          //   })
                          // }
                        >
                          Add Emergency
                        </Button>
                      </RouterLink>
                    </Box>
                  </Grid>
                </>
              )}
              {/*  Add Banner */}
              {type === "bannerManagement" && (
                <>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Box style={{ margin: "30px 0px -15px" }} align="right">
                      <Button
                        style={{ width: "100%" }}
                        className={classes.AddCategory}
                        variant="contained"
                        color="primary"
                        onClick={() =>
                          history.push({
                            pathname: "/bannerView",
                            search: "Add",
                          })
                        }
                      >
                        Add Banner
                      </Button>
                    </Box>
                  </Grid>
                </>
              )}
              {/*  Add Category button */}
              {type === "categoryManagement" && (
                <>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Box style={{ margin: "30px 0px -15px" }} align="right">
                      <Button
                        style={{ width: "100%" }}
                        className={classes.AddCategory}
                        variant="contained"
                        color="primary"
                        onClick={() =>
                          history.push({
                            pathname: "/stackingDetail",
                            search: "Add",
                          })
                        }
                      >
                        Add Category
                      </Button>
                    </Box>
                  </Grid>
                </>
              )}
              {/*  DOWNLOAD CSV BUTTON */}
              {(type === "emergencyManagement" ||
                type === "bannerManagement" ||
                type === "userManagement" ||
                type === "categoryManagement" ||
                type === "resourceManagement" ||
                type === "reportManagement" ||
                type === "feedbackManagement") && (
                <>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Box style={{ margin: "30px 0px -15px" }} align="right">
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        style={{ padding: "5px 5px" }}
                        onClick={downloadExcel}
                      >
                        Download CSV
                      </Button>
                    </Box>
                  </Grid>
                </>
              )}
            </Grid>
          </Box>
        </Box>
      </Box>
    </div>
  );
};
export default Filter;
