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
  withStyles,
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
import React, { useState, useEffect } from "react";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { Link, useHistory } from "react-router-dom";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/styles";
import DevicesIcon from "@material-ui/icons/Devices";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { GrFormView } from "react-icons/gr";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";
import apiConfig from "src/APIconfig/ApiConfig";
import DataNotFound from "src/component/DataNotFound";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";

const useStyles = makeStyles((theme) => ({
  deviceSection: {
    display: "flex",
    alignItems: "center",
  },

  devicelistHeading: {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    padding: "23px 0 0px",
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
    color: "rgb(243, 133, 0)",
  },
  mainbox: {
    paddingTop: "20px",
    "& .tableHead": {
      backgroundColor: "#FEDDB6",
      "& th": {
        color: "#000",
        fontSize: "16px",
        padding: "11px",
        textAlign: "left",
      },
    },
  },
  inputFeild: {
    border: "1px solid #1EB808",
    padding: "6px",
    color: "#fff",
    borderRadius: "5px",
    marginTop: "5px",
    "& svg": {
      color: "#1eb808",
      fontSize: "16px",
    },
  },
  divider: {
    marginTop: "30px",
  },
  tablerow: {
    "& th": {
      color: theme.palette.text.black,
    },
    "& td": {
      color: theme.palette.text.black,
    },
  },
  divider: {
    marginTop: "10px",
    background: "#F38500",
  },
}));
const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(even)": {
      backgroundColor: "#ffdead87",
    },
  },
}))(TableRow);
const userdetails = [
  {
    image: "/images/cycle.png",
    question: "Mental Illness",
    answer: "Personal Safety",
    datetime: "Jan 25,2022 19:50 PM",
  },
  {
    image: "/images/cycle.png",
    question: "Coping with Depression",
    answer: " Mental Health",
    datetime: "Jan 25,2022 19:50 PM",
  },
  {
    image: "/images/cycle.png",
    question: "Impact of Stress",
    answer: "Menstrual Health",
    datetime: "Jan 25,2022 19:50 PM",
  },
  {
    image: "/images/cycle.png",
    question: "Understanding human behaviour",
    answer: "Personal Safety",
    datetime: "Jan 25,2022 19:50 PM",
  },

  {
    image: "/images/cycle.png",
    question: "Weight loss & diet",
    answer: "Mental Health and Well Being",
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
  const [open, setOpen] = React.useState(false);
  const [age, setAge] = useState("Active");
  const history = useHistory();
  const [deleteId, setDeleteId] = React.useState();
  const [faqData, setUserData] = useState([]);
  const [isLoading, setLoader] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickOpennew = (data) => {
    setDeleteId(data);
    setOpen(true);
    console.log("kjhaskjdfhkajsd", data);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <>
      <Box className={classes.devicelistHeading}>
        <Typography variant="h1" className="headingText">
          FAQ Management
        </Typography>
      </Box>
      <Divider className={classes.divider} />

      <Box className="filterBox">
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.push("/addFAQ")}
        >
          Add New FAQ
        </Button>
      </Box>
      <Box className={classes.mainbox}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow className={`${classes.tablerow1} tableHead`}>
                <TableCell>Sr.No.</TableCell>
                <TableCell align="center">Question</TableCell>

                <TableCell align="center">Answer</TableCell>

                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userdetails.map((data, index) => (
                <StyledTableRow className={classes.tablerow}>
                  {/* <TableRow className={classes.tableRow1}> */}
                  <TableCell>{index + 1}</TableCell>{" "}
                  <TableCell>{data.question}</TableCell>{" "}
                  <TableCell className="tableToken">
                    {/* {data.answer} */}
                    {data?.answer && (
                      <div
                        dangerouslySetInnerHTML={{ __html: data?.answer }}
                      ></div>
                    )}
                  </TableCell>
                  <TableCell>
                    <VisibilityIcon
                      style={{
                        fontSize: "20px",
                        color: "rgb(243, 133, 0)",
                        cursor: "pointer",
                      }}
                      // onClick={() => history.push("/Faq-manage")}
                      onClick={() =>
                        history.push({
                          pathname: "Faq-manage",
                          state: data,
                        })
                      }
                    />
                    &nbsp;&nbsp;
                    <EditIcon
                      style={{
                        fontSize: "1.2rem",
                        cursor: "pointer",
                        marginLeft: "7px",
                      }}
                      onClick={() =>
                        history.push({
                          pathname: "/edit-faq",
                          state: data,
                        })
                      }
                      className={classes.iconcolor}
                    />
                    &nbsp;&nbsp;
                    <DeleteIcon
                      onClick={() => handleClickOpennew(data?._id)}
                      style={{
                        fontSize: "1.2rem",
                        marginLeft: "7px",
                        cursor: "pointer",
                      }}
                      className={classes.iconcolor}
                    />
                  </TableCell>
                  {/* </TableRow> */}
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
          <Dialog
            open={open}
            fullWidth
            maxWidth="sm"
            onClose={() => {
              setOpen(false);
            }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle align="center" id="alert-dialog-title">
              <Typography variant="h2">Delete FAQ</Typography>
            </DialogTitle>
            <DialogContent>
              <DialogContentText
                style={{ color: "#000" }}
                id="alert-dialog-description"
                align="center"
              >
                Are you sure you want to Delete this FAQ ?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleClose}
                variant="contained"
                color="secondary"
              >
                No
              </Button>
              <Button variant="contained" onClick={handleClose} color="primary">
                Yes
              </Button>
            </DialogActions>
          </Dialog>
          {isLoading && <ButtonCircularProgress />}
          {faqData.length === 0 && <DataNotFound />}
        </TableContainer>
      </Box>
    </>
  );
}
