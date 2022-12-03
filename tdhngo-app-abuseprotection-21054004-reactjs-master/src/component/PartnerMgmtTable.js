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
  KeyboardDateTimePicker,
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
import moment from "moment";
import { BiBlock } from "react-icons/bi";
import DevicesIcon from "@material-ui/icons/Devices";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { GrFormView } from "react-icons/gr";
import axios from "axios";
import { Pagination } from "@material-ui/lab";
import apiConfig from "src/APIconfig/ApiConfig";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { BsSearch } from "react-icons/bs";
import { Delete, GetApp, Search } from "@material-ui/icons";
import { sortAddress } from "../utils/index";
import { BiCopy } from "react-icons/bi";
import FilterCard from "src/component/FilterCard";
import DataNotFound from "src/component/DataNotFound";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import * as XLSX from "xlsx";
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
      backgroundColor: "#FEDDB6",
      "& th": {
        color: "#000",
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
  filterLine: {
    marginRight: "20px",
    width: "180px",
    [theme.breakpoints.only("xs")]: {
      width: "145px",
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
}));

export default function (props) {
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleClickOpennew1 = (data) => {
    setidd1(data);
    setOpen1(true);
    console.log("kjhaskjdfhkajsd", data);
  };
  const [open, setOpen] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState();
  const [fromData, setFromData] = useState();
  const [toData, setToData] = useState();
  const [page, setPage] = useState(1);
  const [pagesCount, setPagesCount] = useState(1);
  const [userData, setUserData] = useState([]);
  const [currentvalue, setCurrentValue] = useState("");
  const [clear, setIsClear] = useState(false);
  const [search, setSearch] = useState();
  const [age, setAge] = useState("Active");
  const [numpages, setNumpages] = useState(1);
  const [open1, setOpen1] = React.useState(false);
  const [toDate, settoDate] = useState();
  const [fromDate, setfromDate] = useState();
  const [idd1, setidd1] = React.useState([]);
  const [openUserBlockUnblock, setOpenUserBlockUnblick] = useState(false);
  const history = useHistory();
  const handleClickOpennew = (data) => {
    setDeleteId(data);
    setOpen(true);
    console.log("kjhaskjdfhkajsd", data);
  };
  const [pages, setPages] = useState(1);
  const handleClose = () => {
    setOpen(false);
  };

  const [isLoading, setIsLoading] = useState(false);
  const classes = useStyles();
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const [loader, setLoader] = useState(false);
  const [partnerData, setPartnerData] = useState([]);
  // console.log("mediaData",mediaData);
  const [toggle, setToggle] = useState(true);

  const partnerListAPI = async () => {
    setLoader(true);
    try {
      const res = await axios.get(apiConfig.partnerList, {
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
        params: {
          fromDate: fromDate ? fromDate : null,
          toDate: toDate ? toDate : null,
          page: pages,
          search: search ? search : null,
          status: currentvalue ? currentvalue : null,
        },
      });
      if (res.data.statusCode === 200) {
        console.log("saffkjadbf", res);
        setPartnerData(res.data.result.docs);
        console.log("asdasdasdasdsa", partnerData);
        setNumpages(res.data.result.pages);

        setIsClear(false);
        setLoader(false);
      }
    } catch (error) {
      console.log("ERROR", error);
      setLoader(false);
    }
  };

  useEffect(() => {
    partnerListAPI();
  }, []);
  useEffect(() => {
    if (fromDate || toDate || pages || currentvalue || search) {
      partnerListAPI();
      setPages(1);
    }
  }, [fromDate, toDate, currentvalue, pages, search]);

  const DeletePressAPI = async (id) => {
    {
      console.log("lkasjdlfk", id);
    }
    setLoader(true);
    try {
      const res = await axios.delete(apiConfig.partnerList, {
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
        params: {
          _id: id,
        },
      });
      if (res.data.statusCode === 200) {
        console.log("kjasdfl", res);
        setOpen(false);
        toast.success("Partner Deleted Successfully");
        setLoader(false);
        partnerListAPI();
      }
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  const blockUnblockUserApiHandler = async (id) => {
    console.log("lkajgkl", id);
    try {
      const res = await axios({
        method: "PUT",
        url: apiConfig.blockPartnerList + id,
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
        // data: {
        //   _id: id,
        // },
      });
      if (res.data.statusCode === 200) {
        toast.success(res.data.responseMessage);
        partnerListAPI();
        setOpen1(false);
      } else {
      }
    } catch (error) {}
  };

  const handlereset = () => {
    setfromDate();
    settoDate();
    setCurrentValue("");
    setIsClear(true);
  };
  const downloadExcel = () => {
    const workSheet = XLSX.utils.json_to_sheet(partnerData);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "userList");
    let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, "User-List.xlsx");
  };

  return (
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
            <Box className={classes.filterLine}>
              <label>Search </label>
              <Box style={{ marginTop: "5px" }}>
                <TextField
                  id="outlined-basic"
                  type="search"
                  variant="outlined"
                  placeholder="Search Here"
                  fullWidth
                  onChange={(e) => setSearch(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {" "}
                        <IconButton
                          style={{ fontSize: "20px", padding: "0px" }}
                          className="iconbtn"
                        >
                          <BsSearch
                            style={{ color: "#1eb808", fontSize: "16px" }}
                          />
                        </IconButton>{" "}
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </Box>
            <Box className={classes.filterLine}>
              <label>From</label>
              <Box>
                <KeyboardDateTimePicker
                  className={classes.inputFeild}
                  ampm={false}
                  value={fromDate}
                  // onChange={(date) => setfromDate(date, "fromDate")}
                  // onChange={(date) => {
                  //   setfromDate(moment(date).format("lll"));
                  // }}
                  onChange={(date) => {
                    setfromDate(new Date(date));
                  }}
                  onError={console.log}
                  disableFuture
                  format="YYYY/MM/DD HH:mm"
                />
              </Box>
            </Box>
            <Box className={classes.filterLine}>
              <label>To</label>
              <Box>
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
            </Box>

            <Box className={classes.filterLine}>
              <FormControl variant="outlined" className={classes.formControl}>
                <label>Status</label>
                <Box mt={1}>
                  <Select
                    name="token"
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    onChange={(e) => setCurrentValue(e.target.value)}
                    value={currentvalue}
                    style={{ width: "100%" }}
                  >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="ACTIVE">Active</MenuItem>
                    <MenuItem value="BLOCK">Blocked</MenuItem>
                  </Select>
                </Box>
              </FormControl>
            </Box>
            <Box className={classes.filterLine}>
              <label style={{ color: "transparent" }}>Status</label>
              <Box style={{ marginTop: "5px" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handlereset}
                  fullWidth
                >
                  Reset
                </Button>
              </Box>
            </Box>

            <Box className={classes.filterLine}>
              <label style={{ color: "transparent" }}>Status</label>
              <Box style={{ marginTop: "5px" }}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={downloadExcel}
                  style={{ padding: "5px 5px" }}
                >
                  Download CSV &nbsp; <GetApp />
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow className={`${classes.tablerow1} tableHead`}>
              <TableCell>Sr.No.</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Last Updated</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {partnerData.map((data, tara) => (
              <TableRow className={classes.tableRow1}>
                <TableCell>{tara + 1}</TableCell>{" "}
                <TableCell>
                  {data.logo ? (
                    <>
                      <img
                        src={data?.logo}
                        alt="Logo"
                        style={{
                          borderRadius: "50%",
                          width: "45px",
                          height: "45px",
                          objectFit: "cover",
                        }}
                      />
                    </>
                  ) : (
                    "N/A"
                  )}
                </TableCell>
                <TableCell>
                  {data.partnerName ? data.partnerName : "N/A"}
                </TableCell>
                <TableCell className="tableToken">
                  {" "}
                  {moment(data.createdAt).format("DD/MM/YYYY hh:mm A")}
                </TableCell>
                <TableCell className="tableToken">
              
                        {data.status === "BLOCK" ? (
                          <>
                            <Typography style={{ color: "red" }}>
                              {data.status}
                            </Typography>
                          </>
                        ) : (
                          <>
                            <Typography style={{ color: "green" }}>
                              {data.status}
                            </Typography>
                          </>
                        )}
                        {/* {data.status} */}
                     
                </TableCell>
               
                <TableCell>
                  <VisibilityIcon
                    style={{
                      fontSize: "20px",
                      color: "#fff",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      history.push({
                        pathname: "/view-partner",
                        state: data?._id,
                      })
                    }
                  />
                  &nbsp;&nbsp;
                  {console.log("asdasdjg", data)}
                  <EditIcon
                    style={{
                      fontSize: "1.2rem",
                      cursor: "pointer",
                      marginLeft: "7px",
                    }}
                    onClick={() =>
                      history.push({
                        pathname: "/partnerDataEdit",
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

<IconButton
                    size="small"
                    style={{ marginTop: "-11px" }}
                    onClick={() => {
                      handleClickOpennew1(data);
                    }}
                  >
                    {console.log("asdkjgkj", data.status)}
                    {data.status === "BLOCK" ? (
                      <>
                        <BiBlock color="red" />
                      </>
                    ) : (
                      <>
                        <BiBlock color="green" />
                      </>
                    )}
                  </IconButton>
                  <Dialog
                    open={open}
                    fullWidth
                    maxWidth="sm"
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <Typography variant="h2" className="deleteText">
                      Delete
                    </Typography>

                    {/* <DialogTitle
                        id="alert-dialog-title"
                        style={{ fontSize: "20px" }}
                      >
                      
                        {"Delete"}
                      </DialogTitle> */}
                    <DialogContent>
                      <DialogContentText
                        id="alert-dialog-description"
                        align="center"
                      >
                        Are you sure you want to delete?
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={handleClose}
                        variant="contained"
                        color="primary"
                      >
                        No
                      </Button>
                      <Button
                        onClick={() => DeletePressAPI(deleteId)}
                        variant="contained"
                        color="secondary"
                      >
                        Yes {isLoading && <ButtonCircularProgress/>}
                      </Button>
                    </DialogActions>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {isLoading && <ButtonCircularProgress />}
        {partnerData.length === 0 && <DataNotFound />}
      </TableContainer>
      <Box>
        {partnerData && partnerData.length > 0 && (
          <Box mb={2} mt={2} style={{ width: "100%" }}>
            <Pagination
              onChange={(e, v) => setPages(v)}
              count={parseInt(numpages)}
              color="primary"
            />
          </Box>
        )}
        <>
        <Dialog
          open={open1}
          fullWidth
          maxWidth="sm"
          onClose={() => {
            setOpenUserBlockUnblick(false);
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            {console.log("lsadjfkls", idd1.status)}
            <DialogContentText id="alert-dialog-description" align="center">
              {`Are you sure you want to 
                              ${idd1.status === "BLOCK" ? "ACTIVE" : "BLOCK"} 
                               the user?`}
              {console.log("84646", idd1.status)}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="contained" color="primary">
              No
            </Button>
            <Button
              onClick={() => blockUnblockUserApiHandler(idd1._id)}
              variant="contained"
              color="secondary"
            >
              Yes {isLoading && <ButtonCircularProgress/>}
            </Button>
          </DialogActions>
        </Dialog>
        </>
      </Box>
    </Box>
  );
}
