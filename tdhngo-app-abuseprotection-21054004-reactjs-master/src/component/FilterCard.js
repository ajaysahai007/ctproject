import {
  Box,
  Container,
  TableCell,
  TableContainer,
  TableHead,
  Table,
  Typography,
  TableBody,
  TableRow,
  Grid,
  IconButton,
  Avatar,
  InputAdornment,
  Button,
  FormControl,
  Divider,
  InputLabel,
  Select,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { FiCopy } from "react-icons/fi";
import { toast } from "react-toastify";
import CopyToClipboard from "react-copy-to-clipboard";
import React, { useState } from "react";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { Link, useHistory } from "react-router-dom";
import Checkbox from "@material-ui/core/Checkbox";
// import * as XLSX from "xlsx";
import { makeStyles } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { BsSearch } from "react-icons/bs";
import { Delete, GetApp } from "@material-ui/icons";

import { BiCopy } from "react-icons/bi";

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
        color: "#000",
        padding: "11px",
      },
    },
  },

  filterBox: {
    color: "black",
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
      color: "#000",
      fontSize: "14px",
      // fontFamily:"'Roboto',sans-serif",
      fontWeight: "400",
    },
    "& .iconbtn": {
      color: theme.palette.text.black,
    },
  },
  filterLine: {
    marginRight: "20px",
    width: "180px",
    [theme.breakpoints.only("xs")]: {
      width: "145px",
    },
  },
  inputFeild: {
    border: "1px solid #F38500",
    padding: "6px 0px",
    color: "#000",
    borderRadius: "5px",

    "& svg": {
      color: "#F38500",
      fontSize: "16px",
    },
  },
  divider: {
    marginTop: "30px",
  },
}));

export default function (props) {
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const [open, setOpen] = React.useState(false);
  const [toData, setToData] = useState();

  const [fromData, setFromData] = useState();

  const [age, setAge] = useState("Active");

  const history = useHistory();
  const [search, setSearch] = useState();
  const [currentvalue, setCurrentValue] = useState("Select Category");
  const [currentvalue1, setCurrentValue1] = useState("Select");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box>
      <Box className={classes.filterBox} mb={5}>
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
                  placeholder="Search by title"
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
              <FormControl variant="outlined" className={classes.formControl}>
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
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <label>Category</label>
              <FormControl variant="outlined" className={classes.formControl}>
                <Box style={{ marginTop: "5px" }}>
                  <Select
                    name="token"
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    onChange={(e) => setCurrentValue(e.target.value)}
                    value={currentvalue}
                    style={{ width: "100%" }}
                  >
                    <MenuItem value="Select Category">Select Category</MenuItem>
                    <MenuItem value="Mental Health">Mental Health</MenuItem>
                    <MenuItem value="Menstrual Health">
                      {" "}
                      Menstrual Health
                    </MenuItem>
                    <MenuItem value="Personal Safety">Personal Safety</MenuItem>
                    <MenuItem value="Support Service">Support Service</MenuItem>
                  </Select>
                </Box>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <label>From</label>
              <Box style={{ marginTop: "5px" }}>
                <KeyboardDatePicker
                  className={classes.inputFeild}
                  margin="normal"
                  disableFuture
                  id="date-picker-dialog"
                  format="YYYY-MM-DD HH:mm"
                  value={fromData}
                  onChange={(date) => setFromData(date)}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <label>To</label>
              <Box style={{ marginTop: "5px" }}>
                <KeyboardDatePicker
                  className={classes.inputFeild}
                  margin="normal"
                  id="date-picker-dialog"
                  format="YYYY-MM-DD HH:mm"
                  disableFuture
                  value={toData}
                  onChange={(date) => setToData(date)}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
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
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <label style={{ color: "transparent" }}>Status</label>
              <Box style={{ marginTop: "5px" }}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  style={{ padding: "5px 5px" }}
                >
                  Download CSV
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
