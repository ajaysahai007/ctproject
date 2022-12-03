import {
  Box,
  Container,
  TableCell,
  TableContainer,
  TableHead,
  Table,
  Avatar,
  Typography,
  TextField,
  Dialog,
  InputAdornment,
  DialogContent,
  DialogActions,
  DialogContentText,
  TableBody,
  TableRow,
  Button,
  Grid,
  DialogTitle,
  FormControl,
  MenuItem,
  Select,
  IconButton,
  withStyles,
} from "@material-ui/core";
import axios from "axios";
import { Pagination } from "@material-ui/lab";

import DeleteIcon from "@material-ui/icons/Delete";
import DataNotFound from "../component/DataNotFound";

import { KeyboardDateTimePicker } from "@material-ui/pickers";
import { BsSearch } from "react-icons/bs";
import React, { useState, useEffect } from "react";
import { Visibility, Edit, Delete, GetApp } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import moment from "moment";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import ImageModal from "src/component/ImageModal";
import apiConfig from "src/APIconfig/ApiConfig";
import PageLoading from "./PageLoading";
import Filter from "src/Filter/Filter";

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
    // paddingTop: "23px",
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
    border: "1px solid #F38500",
    padding: "6px 0px",
    color: "#fff",
    borderRadius: "5px",
    // marginTop: "5px",
    "& svg": {
      color: "#F38500",
      fontSize: "16px",
    },
  },
  divider: {
    marginTop: "30px",
  },
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
    // paddingTop: "23px",
    "& .tableHead": {
      backgroundColor: "#FEDDB6",
      "& th": {
        color: "#000",
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
      color: "#000  ",
      fontSize: "14px",
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
  DownloadCsv: {
    marginTop: "-30px",
    marginBottom: "10px",
    display: "flex",
    justifyContent: "end",
    "@media (max-width:1440px)": {
      marginTop: "0px",
    },
  },
  AddCategory: {
    marginTop: "10px",
    width: "100%",
    "@media (max-width:1440px)": {
      marginTop: "10px",
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

const categoryData = [
  {
    productName: "Admin Data",
    imagesCategory: "./images/device.jpeg",
    createdDate: "18.01.2022 01:20 AM",
  },
  {
    productName: "Admin Data",
    imagesCategory: "./images/device.jpeg",
    createdDate: "18.01.2022 01:20 AM",
  },
  {
    productName: "Admin Data",
    imagesCategory: "./images/device.jpeg",
    createdDate: "18.01.2022 01:20 AM",
  },
  {
    productName: "Admin Data",
    imagesCategory: "./images/device.jpeg",
    createdDate: "18.01.2022 01:20 AM",
  },
  {
    productName: "Admin Data",
    imagesCategory: "./images/device.jpeg",
    createdDate: "18.01.2022 01:20 AM",
  },
  {
    productName: "Admin Data",
    imagesCategory: "./images/login.png",
    createdDate: "18.01.2022 01:20 AM",
  },
];

export default function () {
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );
  const [destrict, setDistrict] = useState();

  const [openImageData, setOpenImageData] = useState();
  const setDataImage = (values) => {
    setOpenImage(true);
    setOpenImageData(values);
  };
  const [openImage, setOpenImage] = useState();
  const [state, setState] = useState();
  const [_counttotal, setCountTotal] = useState("");
  const [_limit, setLimit] = useState(`${10}`);

  const [states, setStates] = useState();
  const [usertype, setusertype] = useState();
  const [open, setOpen] = React.useState(false);
  const [pages, setPages] = useState(1);
  const history = useHistory();
  const [search, setSearch] = useState();
  const [fromDate, setfromDate] = useState();
  const [toDate, settoDate] = useState();
  const [stakeData, setUserData] = useState([]);
  const [isLoading, setLoader] = useState(false);
  // const [isLoading, setLoader] = useState(false);
  const [_deletecategory, setDeleteCategory] = useState("");
  const [_total, setTotal] = useState();
  const [numpages, setNumpages] = useState(1);
  const [_deletecategory_isloading, setDeleteLoading] = useState(false);
  const [openUserBlockUnblock, setOpenUserBlockUnblick] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleOpen = (id) => {
    setDeleteCategory(id);

    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();
  // delete category api
  const token = window.sessionStorage.getItem("token");

  const deleteCategoryFunction = async () => {
    try {
      setDeleteLoading(true);
      const res = await axios({
        url: apiConfig.deleteCategory,
        method: "DELETE",
        headers: {
          token: token,
        },
        params: {
          _id: _deletecategory,
        },
      });
      if (res?.data?.responseCode === 200) {
        setDeleteLoading(false);

        console.log("");
        CategoryFunction();
        setOpen(false);
      }
    } catch (error) {
      setDeleteLoading(false);

      console.log("error--", error);
    }
  };
  //CATEGORY API
  const [_category, setCategory] = useState("");
  const [Count, setCount] = useState();
  const CategoryFunction = async () => {
    try {
      setLoader(true);
      const res = await axios({
        url: apiConfig.listCategory,
        method: "GET",
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
        // params: {
        //   page: `${pages}`,
        //   limit: _limit,
        // },
        params: {
          page: `${pages}`,
          limit: _limit,
          search: search,
          states: states,
          districs: destrict,
          fromDate: fromDate,
          toDate: toDate,
          userStatus: usertype,
        },
      });
      if (res) {
        setLoader(false);

        setCategory(res?.data?.result?.docs);
        setCount(res?.data?.result?.total);
        setTotal(res?.data?.result?.total);
        setNumpages(res?.data?.result?.pages);
      } else if (res) {
        setLoader(false);

        console.log("res009090990", res);
        setCountTotal("0");
      }
    } catch (error) {
      setLoader(false);

      console.log("error", error);
    }
  };
  useEffect(() => {
    CategoryFunction();
  }, [pages]);

  return (
    <>
      <Box>
        <Box className={classes.filterBox} mb={5} mt={4}>
          {isLoading ? <PageLoading /> : ""}
        </Box>
      </Box>

      <Filter
        CategoryFunction={CategoryFunction}
        _category={_category}
        type="categoryManagement"
        search={search}
        setSearch={setSearch}
        states={states}
        setStates={setStates}
        destrict={destrict}
        setDistrict={setDistrict}
        openUserBlockUnblock={openUserBlockUnblock}
        setOpenUserBlockUnblick={setOpenUserBlockUnblick}
        toDate={toDate}
        settoDate={settoDate}
        fromDate={fromDate}
        setfromDate={setfromDate}
        setusertype={setusertype}
        usertype={usertype}
      />
      <Box className={classes.mainbox}>
        <TableContainer>
          <Table
            style={{
              border: "1px solid rgb(243 133 0 / 44%)",
              minWidth: "900px",
            }}
          >
            <TableHead>
              <TableRow className={`${classes.tablerow1} tableHead`}>
                <TableCell>Sr.No</TableCell>
                <TableCell> Category Image</TableCell>

                <TableCell>Category Name</TableCell>
                <TableCell>Created date & time</TableCell>

                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {_category &&
                _category.map((data, index) => {
                  return (
                    <>
                      <StyledTableRow className={classes.tableRow1}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          <Avatar
                            alt="Cindy Baker"
                            width="100%"
                            onClick={() => setDataImage(data)}
                            style={{
                              width: "50px",
                              objectFit: "cover",
                              borderRadius: "50%",
                              cursor: "pointer",
                            }}
                            src={data.image ? data.image : "--"}
                          />
                        </TableCell>
                        <TableCell>{data.name ? data.name : "--"}</TableCell>
                        <TableCell>
                          {data.createdAt ? data.createdAt : "--"}
                        </TableCell>
                        <TableCell align="center">
                          <IconButton>
                            <Visibility
                              style={{
                                fontSize: "20px",
                                color: "#F38500",
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                history.push({
                                  pathname: "/stackingDetail",
                                  state: { id: data._id },
                                  search: "View",
                                })
                              }
                            />
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
                                  pathname: "/stackingDetail",
                                  state: { id: data._id },
                                  search: "Edit",
                                })
                              }
                            />
                          </IconButton>
                          &nbsp;&nbsp;
                          <IconButton>
                            <DeleteIcon
                              style={{
                                color: "#F38500",
                              }}
                              onClick={() => handleOpen(`${data?._id}`)}
                            />
                          </IconButton>
                          &nbsp;&nbsp;
                        </TableCell>
                      </StyledTableRow>
                    </>
                  );
                })}
            </TableBody>
          </Table>
          {_category.length === 0 ? <DataNotFound /> : ""}
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
            <Typography variant="h2">Delete Category</Typography>
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              style={{ color: "#000" }}
              id="alert-dialog-description"
              align="center"
            >
              Are you sure you want to Delete this Category ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="contained" color="secondary">
              No
            </Button>
            <Button
              variant="contained"
              onClick={deleteCategoryFunction}
              color="primary"
            >
              Yes {_deletecategory_isloading ? <ButtonCircularProgress /> : ""}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}
