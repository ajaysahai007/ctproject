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
        backgroundColor: "#1EB808",
        "& th": {
          color: "#fff",
          padding: "11px",
        },
      },
    },
    mainbox1: {
      "& .tableHead": {
        backgroundColor: "#1EB808",
        "& th": {
          color: "#fff",
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
        color: "#ffffffde",
        fontSize: "14px",
        fontWeight: "400",
      },
      "& .iconbtn": {
        color: theme.palette.text.black,
      },
    },
    inputFeild: {
      border: "1px solid #F38500 ",
      padding: "6px",
      color: "#fff",
      borderRadius: "5px",
      marginTop: "5px",
      "& svg": {
        color: "#F38500 ",
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
    const [age, setAge] = useState("Active");
    const history = useHistory();
  
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
        <Box className={classes.filterBox} mb={5} mt={4}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4} lg={2}>
              <label>Search </label>
              <Box style={{ marginTop: "5px" }}>
                <TextField
                  id="outlined-basic"
                  type="search"
                  variant="outlined"
                  placeholder="search Here"
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {" "}
                        <IconButton
                          style={{ fontSize: "20px", padding: "0px" }}
                          className="iconbtn"
                        >
                          <BsSearch
                            style={{ color: "#F38500 ", fontSize: "16px" }}
                          />
                        </IconButton>{" "}
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={2}>
              <label>From</label>
              <Box>
                <KeyboardDatePicker
                  className={classes.inputFeild}
                  margin="normal"
                  id="date-picker-dialog"
                  format="YYYY-MM-DD HH:mm"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={2}>
              <label>To</label>
              <Box>
                <KeyboardDatePicker
                  className={classes.inputFeild}
                  margin="normal"
                  id="date-picker-dialog"
                  format="YYYY-MM-DD HH:mm"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </Box>
            </Grid>
  
            <Grid item xs={12} sm={6} md={4} lg={2}>
              <FormControl variant="outlined" className={classes.formControl}>
                <label>Status</label>
                <Box mt={1}>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={age}
                    style={{ width: "100%" }}
                    onChange={handleChange}
                  >
                    <MenuItem value="Active">None</MenuItem>
                    <MenuItem value={10} selected>
                      Active
                    </MenuItem>
                    <MenuItem value={20}>Blocked</MenuItem>
                  </Select>
                </Box>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={2}>
              <label style={{ color: "transparent" }}>Status</label>
              <Box style={{ marginTop: "5px" }}>
                <Button variant="contained" color="primary" fullWidth>
                  Reset
                </Button>
              </Box>
            </Grid>
  
          </Grid>
        </Box>
      </Box>
    );
  }
  