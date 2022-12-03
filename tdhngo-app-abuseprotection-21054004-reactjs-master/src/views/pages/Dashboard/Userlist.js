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
import { convertDateTime } from "../../../utils/index";
import React, { useState, useEffect, useContext } from "react";
import Page from "src/component/Page";
import DataNotFound from "src/component/DataNotFound";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { useHistory, useLocation } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import Filter from "src/Filter/Filter";
import { BiCurrentLocation } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import moment from "moment";
import axios from "axios";
import apiConfig from "../../../APIconfig/ApiConfig";
import { Pagination } from "@material-ui/lab";
import PageLoading from "src/component/PageLoading";
// import { Filter } from "react-feather";
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
    id: "User001",
    name: "user",
    state: "Delhi",
    district: "New Delhi",
    datetime: "Jun 20, 2022,7:11:58",
    status: "Active",
  },
  {
    id: "User002",
    name: "user",
    state: "Delhi",
    district: "New Delhi",
    datetime: "Jun 20, 2022,7:11:58",
    status: "Active",
  },
  {
    id: "User003",
    name: "user",
    state: "Delhi",
    district: "New Delhi",
    datetime: "Jun 20, 2022,7:11:58",
    status: "Active",
  },
  {
    id: "User004",
    name: "user",
    state: "Delhi",
    district: "New Delhi",
    datetime: "Jun 20, 2022,7:11:58",
    status: "Active",
  },
  {
    id: "User005",
    name: "user",
    state: "Delhi",
    district: "New Delhi",
    datetime: "Jun 20, 2022,7:11:58",
    status: "Active",
  },
  {
    id: "User006",
    name: "user",
    state: "Delhi",
    district: "New Delhi",
    datetime: "Jun 20, 2022,7:11:58",
    status: "Active",
  },
];

export default function (props) {
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );
  const [_blockid, setBlockID] = useState("");
  console.log("_blockid111-->>", _blockid);
  const handleOpenBlockUnblock = (id) => {
    setBlockID(id);
    setOpen(true);
  };

  const [open, setOpen] = React.useState(false);
  const [userData, setUserData] = useState([]);
  const [idd1, setidd1] = React.useState([]);
  const [currentvalue, setCurrentValue] = useState("All Users");

  const [currentvalue1, setCurrentValue1] = useState();
  const [numpages, setNumpages] = useState(1);
  const [states, setStates] = useState();
  const [destrict, setDistrict] = useState();
  const history = useHistory();
  const [usertype, setusertype] = useState();
  const [openUserBlockUnblock, setOpenUserBlockUnblick] = useState(false);
  const [isLoading, setLoader] = useState(false);
  const [pages, setPages] = useState(1);
  const [toDate, settoDate] = useState();
  const [fromDate, setfromDate] = useState();
  const [search, setSearch] = useState();
  console.log("search-----", search);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [_storecount, setStoreCount] = useState();
  const [_useriid, setUserId] = useState();
  const [_datafound, setNotFount] = useState(true);
  console.log("_useriid--->>", fromDate);
  const [_limit, setLimit] = useState(`${10}`);
  const [_total, setTotal] = useState();

  const [_stateuser, setStatusUser] = useState();
  const handleClose = () => {
    setOpen(false);
  };
  const PageChange = (event, value) => {
    setPage(value);
  };
  const [_deleteId, setDeleteID] = useState("");

  const _blockActivity = (id) => {
    setDeleteID(id);
    setUnblock(true);
  };
  const _BlockClose = () => {
    setUnblock(false);
  };
  const [_block, setUnblock] = useState(false);
  // USER MANAGEMENT API
  const [_usermanagement, setUserManagement] = useState([]);
  const token = window.sessionStorage.getItem("token");

  console.log("userty_usermanagementpe-->>", _usermanagement);
  const UserManagementFunction = async (values) => {
    setSearch();
    try {
      setLoader(true);

      const res = await axios({
        url: apiConfig.listUsers,
        method: "POST",
        headers: {
          token: token,
        },
        data: {
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
        console.log("res--dfdfd>>", res);
        setLoader(false);
        setUserManagement(res?.data?.result?.docs);
        setNumpages(res?.data?.result?.pages);
        setTotal(res?.data?.result?.total);

        setCount(Math.ceil(res?.data?.result?.count / 10));
      }
    } catch (error) {
      setLoader(false);
    }
  };
  // BLOCK USER API
  // const [_block, setBlock] = useState();
  const BlockUserFunction = async () => {
    try {
      const res = await axios({
        url: apiConfig.blockUnblockUsers,
        headers: {
          token: token,
        },
        method: "PUT",
        params: {
          userId: _blockid,
        },
      });
      if (res) {
        UserManagementFunction();
        setOpen(false);
        setUnblock(false);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    UserManagementFunction();
  }, [pages]);

  const classes = useStyles();
  return (
    <Page title="User Management">
      {isLoading ? <PageLoading /> : ""}

      <Box className={classes.mainbox}>
        <Box>
          <Box className={classes.devicelistHeading}>
            <Typography variant="h1">User Management</Typography>
          </Box>
        </Box>
        <Filter
          UserManagementFunction={UserManagementFunction}
          _usermanagement={_usermanagement}
          type="userManagement"
          search={search}
          setSearch={(item) => setSearch(item)}
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

        <TableContainer>
          <Table style={{ minWidth: "900px" }}>
            <TableHead>
              <TableRow className={`${classes.tablerow1} tableHead`}>
                <TableCell>Sr.No</TableCell>
                {/* <TableCell>User ID</TableCell> */}
                <TableCell>User Name</TableCell>
                {/* <TableCell>Email</TableCell> */}
                <TableCell>State</TableCell>
                <TableCell>Distric</TableCell>
                <TableCell>Created date & time</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {_usermanagement &&
                _usermanagement.map((data, index) => {
                  return (
                    <StyledTableRow>
                      {/* {console.log("data-->>lll", data)} */}
                      <TableCell>{index + 1}</TableCell>
                      {/* <TableCell>{data?._id ? data?._id : "--"}</TableCell> */}
                      <TableCell>
                        {data?.userName ? data?.userName : "--"}
                      </TableCell>
                      {/* <TableCell>{data?.email ? data?.email : "--"}</TableCell> */}
                      <TableCell>
                        {data?.states ? data?.states : "--"}
                      </TableCell>
                      <TableCell>
                        {data?.districs ? data?.districs : "--"}
                      </TableCell>

                      <TableCell>{convertDateTime(data?.createdAt)}</TableCell>
                      <TableCell>{data?.status}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          onClick={() =>
                            history.push({
                              pathname: "/userDetails",
                              state: { id: data._id },
                            })
                          }
                        >
                          <VisibilityIcon style={{ color: "#F38500" }} />
                        </IconButton>

                        {data?.status === "BLOCK" ? (
                          <IconButton
                            onClick={() => _blockActivity(`${data?._id}`)}
                          >
                            <BlockIcon style={{ color: "red" }} />
                          </IconButton>
                        ) : (
                          <IconButton
                            onClick={() =>
                              handleOpenBlockUnblock(`${data?._id}`)
                            }
                          >
                            <BlockIcon style={{ color: "green" }} />
                          </IconButton>
                        )}
                      </TableCell>
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
                          <Typography variant="h2">
                            {console.log("data-------->>>1234", data?.status)}
                            {data?.status === "BLOCK"
                              ? "Unblock User"
                              : "Block User"}
                          </Typography>
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText
                            id="alert-dialog-description"
                            align="center"
                          >
                            <Typography variant="h5">
                              {" "}
                              Are you sure you want to{" "}
                              {data?.status === "BLOCK" ? "unblock " : "block "}
                              this user ?
                            </Typography>
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
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={BlockUserFunction}
                          >
                            Yes
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </StyledTableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        {_usermanagement.length === 0 && <DataNotFound />}
        <Dialog
          open={_block}
          fullWidth
          maxWidth="sm"
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle align="center" id="alert-dialog-title">
            <Typography variant="h2"> Unblock Banner</Typography>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description" align="center">
              <Typography variant="h5">
                {" "}
                Are you sure you want to Unblock this Banner ?
              </Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={_BlockClose} variant="contained" color="secondary">
              No
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={BlockUserFunction}
            >
              Yes {isLoading ? <ButtonCircularProgress /> : ""}
            </Button>
          </DialogActions>
        </Dialog>
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
      </Box>
    </Page>
  );
}
