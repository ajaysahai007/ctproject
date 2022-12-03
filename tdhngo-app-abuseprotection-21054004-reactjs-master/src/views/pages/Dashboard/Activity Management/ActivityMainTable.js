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
import apiConfig from "src/APIconfig/ApiConfig";
import { convertDateTime } from "src/utils/index";
import Page from "src/component/Page";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { useHistory, useLocation } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { Visibility, Edit, Delete, GetApp } from "@material-ui/icons";
import { BiCurrentLocation } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import moment from "moment";
import axios from "axios";
import { Pagination } from "@material-ui/lab";
import DataNotFound from "src/component/DataNotFound.js";

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
    categoryName: "Menstrual Health",
  },
  {
    img: "",
    categoryName: "Mental Health ",
  },
  {
    img: "",
    categoryName: "Personal Safety",
  },
];

export default function (props) {
  const classes = useStyles();
  const location = useLocation();
  const [numpages, setNumpages] = useState(1);
  const [_total, setTotal] = useState();
  const _subactivityId = location?.state?.id;
  console.log("locatiob12-->>", _subactivityId);
  const history = useHistory();
  const [pages, setPages] = useState(1);
  const [_limit, setLimit] = useState(`${10}`);

  const [_activitymanagement, setActivityManagement] = useState([]);
  console.log("_activitymanagement-->", _activitymanagement);
  const token = window.sessionStorage.getItem("token");
  const ActivityData = [
    {
      index: "1",
      title: "Menstrual Health",
      image: "./images/Mental Health and Well Being.jpeg",
      id: "1",
      createdAt: "2022-10-19 19:23",
    },
    {
      index: "2",
      title: "Mental Health and Well Being",
      image: "./images/Menstrual Health.jpeg",
      id: "2",
      createdAt: "2022-10-19 19:23",
    },
    {
      index: "3",
      title: "Personal Safety",
      image: "./images/Personal Safety.webp",
      id: "3",
      createdAt: "2022-10-19 19:23",
    },
    {
      index: "4",
      title: "Support Services",
      image: "./images/Support Services.jpeg",
      id: "4",
      createdAt: "2022-10-19 19:23",
    },
  ];
  // LIST ACTIVITY MANAGEMENT
  const ActivityListFunction = async () => {
    try {
      const res = await axios({
        url: apiConfig.listActivity,
        method: "POST",
        headers: {
          token: token,
        },
      });
      if (res) {
        console.log("res22222>>", res);
        setActivityManagement(res?.data?.result?.docs);
        setTotal(res?.data?.result?.total);
        setNumpages(res?.data?.result?.pages);
      }
    } catch (error) {
      console.log("error>>", error);
    }
  };
  useEffect(() => {
    // ActivityListFunction();
  }, [pages]);

  return (
    <Page title="User Management">
      <Box className={classes.mainbox} mt={4}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow className={`${classes.tablerow1} tableHead`}>
                <TableCell>Sr.No</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Category Name</TableCell>
                <TableCell>Created At</TableCell>

                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {ActivityData &&
                ActivityData.map((data, index) => {
                  return ( */}
              <StyledTableRow>
                <TableCell>1</TableCell>
                <TableCell>
                  <img
                    alt="Cindy Baker"
                    style={{
                      width: "50px",
                      height: "50px",

                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                    width="100%"
                    src="./images/Mental Health and Well Being.jpeg"
                    // src="./images/editimg.jpg"
                  />
                </TableCell>
                <TableCell>Menstrual Health</TableCell>
                <TableCell>2022-10-19 19:23</TableCell>

                <TableCell align="center">
                  <IconButton
                    onClick={() =>
                      history.push({
                        pathname: "/menstrual-health",
                        state: {
                          id: "1",
                          titleActivity: "Menstrual Health",
                        },
                      })
                    }
                  >
                    <VisibilityIcon style={{ color: "#F38500" }} />
                  </IconButton>
                </TableCell>
              </StyledTableRow>
              <StyledTableRow>
                <TableCell>2</TableCell>
                <TableCell>
                  <img
                    alt="Cindy Baker"
                    style={{
                      width: "50px",
                      height: "50px",

                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                    width="100%"
                    src="./images/Menstrual Health.jpeg"
                    // src="./images/editimg.jpg"
                  />
                </TableCell>
                <TableCell>Mental Health and Well Being</TableCell>
                <TableCell>2022-10-19 19:23</TableCell>

                <TableCell align="center">
                  <IconButton
                    onClick={() =>
                      history.push({
                        pathname: "/mental-health",
                        state: {
                          id: "2",
                          titleActivity: "Mental Health and Well Being",
                        },
                      })
                    }
                  >
                    <VisibilityIcon style={{ color: "#F38500" }} />
                  </IconButton>
                </TableCell>
              </StyledTableRow>
              <StyledTableRow>
                <TableCell>3</TableCell>
                <TableCell>
                  <img
                    alt="Cindy Baker"
                    style={{
                      width: "50px",
                      height: "50px",

                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                    width="100%"
                    src="./images/Personal Safety.webp"
                    // src="./images/editimg.jpg"
                  />
                </TableCell>
                <TableCell>Personal Safety</TableCell>
                <TableCell>2022-10-19 19:23</TableCell>

                <TableCell align="center">
                  <IconButton
                    onClick={() =>
                      history.push({
                        pathname: "/personal-safety",
                        state: {
                          id: "3",
                          titleActivity: "Personal Safety",
                        },
                      })
                    }
                  >
                    <VisibilityIcon style={{ color: "#F38500" }} />
                  </IconButton>
                </TableCell>
              </StyledTableRow>
              {/* <StyledTableRow>
                <TableCell>4</TableCell>
                <TableCell>
                  <img
                    alt="Cindy Baker"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                    width="100%"
                    src="./images/Support Services.jpeg"
                    // src="./images/editimg.jpg"
                  />
                </TableCell>
                <TableCell>Support Services</TableCell>
                <TableCell>2022-10-19 19:23</TableCell>

                <TableCell align="center">
                  <IconButton
                    onClick={() =>
                      history.push({
                        pathname: "/activitycategory",
                        state: {
                          id: "4",
                          titleActivity: "Support Services",
                        },
                      })
                    }
                  >
                    <VisibilityIcon style={{ color: "#F38500" }} />
                  </IconButton>
                </TableCell>
              </StyledTableRow> */}
              {/* ); */}
              {/* })} */}
            </TableBody>
          </Table>
          {/* {_activitymanagement.length === 0 ? <DataNotFound /> : ""} */}
          {_total && _total > 10 && (
            <Box
              mb={2}
              mt={2}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Pagination
                onChange={(e, v) => setPages(v)}
                count={parseInt(numpages)}
                color="primary"
              />
            </Box>
          )}
        </TableContainer>
      </Box>
    </Page>
  );
}
