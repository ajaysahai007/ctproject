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
import BlockIcon from "@material-ui/icons/Block";
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import React, { useState, useEffect, useContext } from "react";
import Page from "src/component/Page";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { useHistory, useLocation } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { Visibility, Edit, Delete, GetApp } from "@material-ui/icons";
import { BiCurrentLocation } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  deviceSection: {
    display: "flex",
    alignItems: "center",
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
}));

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(even)": {
      backgroundColor: "#ffdead87",
    },
  },
}))(TableRow);

const tabledetails = [
  {
    img: "",
    subActivityName: "Positive Thinking",
    activityName: "Mental well-being",
    categoryName: "Mental Health & well-being",
    datetime: "Jan 25,2022 19:50 PM",
  },
  {
    img: "",
    subActivityName: "Self Care",
    activityName: "Mental well-being",
    categoryName: "Mental Health & well-being",
    datetime: "Jan 25,2022 19:50 PM",
  },
  {
    img: "",
    subActivityName: "Mindfulness",
    activityName: "Mental well-being",
    categoryName: "Mental Health & well-being",
    datetime: "Jan 25,2022 19:50 PM",
  },
  {
    img: "",
    subActivityName: "Managing emotion",
    activityName: "Mental well-being",
    categoryName: "Mental Health & well-being",
    datetime: "Jan 25,2022 19:50 PM",
  },
  {
    img: "",
    subActivityName: "Managing stress",
    activityName: "Mental well-being",
    categoryName: "Mental Health & well-being",
    datetime: "Jan 25,2022 19:50 PM",
  },
  {
    img: "",
    subActivityName: "Relationship",
    activityName: "Mental well-being",
    categoryName: "Mental Health & well-being",
    datetime: "Jan 25,2022 19:50 PM",
  },
];

export default function (props) {
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleOpenBlockUnblock = () => {
    setOpen(true);
  };
  const [open, setOpen] = React.useState(false);
  const [userData, setUserData] = useState([]);
  const [idd1, setidd1] = React.useState([]);
  const [currentvalue, setCurrentValue] = useState("All Users");

  const [currentvalue1, setCurrentValue1] = useState("Delhi");
  const [numpages, setNumpages] = useState(1);
  const [states, setStates] = useState("select");
  const history = useHistory();
  const [usertype, setusertype] = useState("format");
  const [openUserBlockUnblock, setOpenUserBlockUnblick] = useState(false);
  const [isLoading, setLoader] = useState(false);
  const [pages, setPages] = useState(1);
  const [toDate, settoDate] = useState();
  const [fromDate, setfromDate] = useState();
  const [search, setSearch] = useState();
  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();
  return (
    <Page title="User Management">
      <Box className={classes.mainbox}>
        <Box>
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
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <label>Search </label>
                  <Box style={{ marginTop: "5px" }}>
                    <TextField
                      id="outlined-basic"
                      type="search"
                      variant="outlined"
                      placeholder="Search by subactivity name"
                      fullWidth
                      onChange={(e) => setSearch(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              style={{ fontSize: "20px", padding: "0px" }}
                              className="iconbtn"
                            >
                              <BsSearch
                                style={{ color: "#F38500", fontSize: "16px" }}
                              />
                            </IconButton>{" "}
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                </Grid>
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
                        onChange={(e) => setusertype(e.target.value)}
                        value={usertype}
                        style={{ width: "100%" }}
                      >
                        <MenuItem value="format">Select Format</MenuItem>
                        <MenuItem value="Audio">Audio</MenuItem>
                        <MenuItem value="Video">Video</MenuItem>
                        <MenuItem value="Image">Image</MenuItem>
                        <MenuItem value="Document">Document</MenuItem>
                      </Select>
                    </Box>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <label>Category </label>
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
                        <MenuItem value="select">Select Category</MenuItem>
                        <MenuItem value="Mental">Mental Health</MenuItem>
                        <MenuItem value="Service">Support Service</MenuItem>
                        <MenuItem value="Health">Menstrual Health</MenuItem>
                        <MenuItem value="safety">Personal safety</MenuItem>
                      </Select>
                    </Box>
                  </FormControl>
                </Grid>

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
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <label style={{ color: "transparent" }}>Status</label>
                  <Box style={{ marginTop: "5px" }}>
                    <Button variant="contained" color="primary" fullWidth>
                      Submit
                    </Button>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <label style={{ color: "transparent" }}>Status</label>
                  <Box style={{ marginTop: "5px" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      style={{ padding: "5px 5px" }}
                    >
                      Reset
                    </Button>
                  </Box>
                </Grid>
              </Grid>

              <Box
                className={classes.filterLine}
                style={{ marginLeft: "12px" }}
              ></Box>

              <Box
                className={classes.filterLine}
                style={{ marginLeft: "15px" }}
              ></Box>

              <Box className={classes.filterLine}></Box>
            </Box>
          </Box>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow className={`${classes.tablerow1} tableHead`}>
                <TableCell>Sr.No</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Sub Activity Name</TableCell>
                <TableCell>Activity Name</TableCell>
                <TableCell>Category Name</TableCell>
                <TableCell>Created date & time</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tabledetails.map((data, index) => {
                return (
                  <StyledTableRow>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <img
                        alt="Cindy Baker"
                        style={{
                          width: "50px",
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                        width="100%"
                        // src={data.img}
                        src="./images/editimg.jpg"
                      />
                    </TableCell>
                    <TableCell>{data.subActivityName}</TableCell>
                    <TableCell>{data.activityName}</TableCell>
                    <TableCell>{data.categoryName}</TableCell>
                    <TableCell>{data.datetime}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={() =>
                          history.push({
                            pathname: "/subActivityView",
                            search: "View",
                          })
                        }
                      >
                        <VisibilityIcon style={{ color: "#F38500" }} />
                      </IconButton>
                      &nbsp;&nbsp;
                      <IconButton>
                        <Edit
                          style={{
                            fontSize: "20px",
                            color: "#F38500",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            history.push({
                              pathname: "/subActivityView",
                              search: "Edit",
                            })
                          }
                        />
                      </IconButton>
                      &nbsp;&nbsp;
                      <IconButton onClick={() => handleClickOpen()}>
                        <Delete
                          style={{
                            fontSize: "20px",
                            color: "#F38500",
                            cursor: "pointer",
                          }}
                          // onClick={() =>
                          //   history.push({
                          //     pathname: "/stackingDetail",
                          //   })
                          // }
                        />
                      </IconButton>
                    </TableCell>
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Dialog
        open={open}
        fullWidth
        maxWidth="sm"
        onClose={() => {
          setOpenUserBlockUnblick(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle align="center" id="alert-dialog-title">
          <Typography variant="h2">Delete Sub-Activity</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" align="center">
            <Typography variant="h5">
              {" "}
              Are you sure you want to delete this sub activity ?
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="secondary">
            No
          </Button>
          <Button variant="contained" color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Page>
  );
}
