import {
  Box,
  TableCell,
  TableContainer,
  TableHead,
  Table,
  Typography,
  TableBody,
  TableRow,
  Button,
  FormControl,
  withStyles,
  Select,
  Grid,
  TextField,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import React, { useState, useEffect } from "react";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import MenuItem from "@material-ui/core/MenuItem";
import { Delete, GetApp, Search } from "@material-ui/icons";
import { BsSearch } from "react-icons/bs";
import apiConfig from "src/APIconfig/ApiConfig.js";
import axios from "axios";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import Filter from "src/Filter/Filter";
import DataNotFound from "./DataNotFound";
import { convertDateTime, sortAddress } from "src/utils/index";
import { Pagination } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  tableClass: {
    // marginTop: "-35px",
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

  inputFeild: {
    border: "1px solid #F38500",
    padding: "6px",
    color: "#fff",
    borderRadius: "5px",
    marginTop: "5px",
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
      color: "#000",
      fontSize: "14px",
      fontWeight: "400",
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
    border: "1px solid #F38500",
    padding: "6px 0px",
    color: "#fff",
    borderRadius: "5px",
    marginTop: "5px",
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
const reportData = [
  {
    img: "",
    title: "",
    lastData: "",
    status: "",
  },
];

export default function (props) {
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);

  const [deleteId, setDeleteId] = React.useState();
  const history = useHistory();

  const handleClose = () => {
    setOpen(false);
  };
  const [openUserBlockUnblock, setOpenUserBlockUnblick] = useState(false);
  const [search, setSearch] = useState();

  const [isLoading, setIsLoading] = useState(false);
  const classes = useStyles();
  const [fromData, setFromData] = useState();
  const [pages, setPages] = useState(1);
  const [numpages, setNumpages] = useState(1);
  const [idd1, setidd1] = React.useState([]);
  const [states, setStates] = useState("Delhi");
  const [destrict, setDistrict] = useState("Delhi");
  const [toData, setToData] = useState();
  const [currentvalue, setCurrentValue] = useState("all");
  const [toDate, settoDate] = useState();
  const [fromDate, setfromDate] = useState();
  const [_limit, setLimit] = useState(`${10}`);
  const [_total, setTotal] = useState();
  const token = window.sessionStorage.getItem("token");
  const [_reportmanagement, setReportManagement] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [_datafound, setNotFount] = useState(true);
  const [usertype, setusertype] = useState("All Users");
  const [_subactivity, setSubActivity] = useState();

  console.log("_subactivity--->>", _subactivity);
  const ReportManagementFunction = async () => {
    const formdata = new FormData();
    formdata.append("type", _subactivity);
    try {
      setIsLoading(true);

      const res = await axios({
        url: apiConfig.listReport,
        method: "POST",
        headers: {
          token: token,
        },
        data: formdata,
        data: {
          type: _subactivity,
          page: `${pages}`,
          limit: _limit,
          search: search,
          states: states,
          districs: destrict,
          fromDate: fromDate,
          toDate: toDate,
          currentvalue: currentvalue,
        },
      });
      if (res) {
        console.log("res--dfdfd>>", res);
        setIsLoading(false);
        setReportManagement(res?.data?.result?.docs);
        setNumpages(res?.data?.result?.pages);
        setTotal(res?.data?.result?.total);

        setCount(Math.ceil(res?.data?.result?.count / 10));
      } else if (res?.responseCode === 404) {
        setIsLoading(false);
        setNotFount(false);
      }
    } catch (error) {
      setIsLoading(false);

      console.log(error);
    }
  };
  // } else {

  // }
  if (_subactivity === "") {
    useEffect(() => {
      if (_subactivity === "SLEEP_TRACKING") {
        ReportManagementFunction();
      } else if (_subactivity === "MOOD") {
        ReportManagementFunction();
      } else if (_subactivity === "PERIOD_TRACKER") {
        ReportManagementFunction();
      }
    }, [_subactivity, pages]);
  } else {
  }

  return (
    <Box className={classes.mainbox}>
      <Box>
        <Box className={classes.filterBox}>
          <Filter
            ReportManagementFunction={ReportManagementFunction}
            _reportmanagement={_reportmanagement}
            type="reportManagement"
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
            currentvalue={currentvalue}
            setCurrentValue={setCurrentValue}
            _subactivity={_subactivity}
            setSubActivity={setSubActivity}
          />
        </Box>
      </Box>
      {_subactivity === undefined && (
        <>
          <TableContainer className={classes.tableClass}>
            <Table>
              <TableHead>
                <TableRow className={`${classes.tablerow1} tableHead`}>
                  <TableCell>Sr.No</TableCell>
                  <TableCell>User ID</TableCell>

                  <TableCell className="tableToken">State</TableCell>
                  <TableCell>District</TableCell>
                  <TableCell>Last Period Date Reported</TableCell>
                  <TableCell>Last Logged Symptom</TableCell>
                  <TableCell>Last view</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody></TableBody>
            </Table>
          </TableContainer>
        </>
      )}
      {_subactivity === "PERIOD_TRACKER" && (
        <>
          <TableContainer className={classes.tableClass}>
            <Table>
              <TableHead>
                <TableRow className={`${classes.tablerow1} tableHead`}>
                  <TableCell>Sr.No</TableCell>
                  <TableCell>User ID</TableCell>

                  <TableCell className="tableToken">State</TableCell>
                  <TableCell>District</TableCell>
                  <TableCell>Last Period Date Reported</TableCell>
                  <TableCell>Last Logged Symptom</TableCell>
                  <TableCell>Last view</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {_reportmanagement &&
                  _reportmanagement.map((data, index) => (
                    <>
                      <StyledTableRow className={classes.tableRow1}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          {sortAddress(data?.userId?.userId)}
                        </TableCell>

                        <TableCell className="tableToken">
                          {data?.userId?.state ? data?.userId?.state : "--"}
                        </TableCell>
                        <TableCell>
                          {data?.userId?.district
                            ? data?.userId?.district
                            : "--"}
                        </TableCell>
                        <TableCell>Last Period Date Reported</TableCell>
                        <TableCell>
                          {data?.symptomId?.name ? data?.symptomId?.name : "--"}
                        </TableCell>
                        <TableCell>
                          {convertDateTime(
                            data?.userId?.updatedAt
                              ? data?.userId?.updatedAt
                              : "--"
                          )}
                        </TableCell>

                        <TableCell>{data?.status}</TableCell>
                      </StyledTableRow>
                    </>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      {_subactivity === "SLEEP_TRACKING" && (
        <>
          <TableContainer className={classes.tableClass}>
            <Table>
              <TableHead>
                <TableRow className={`${classes.tablerow1} tableHead`}>
                  <TableCell>Sr.No</TableCell>
                  <TableCell>User ID</TableCell>
                  <TableCell className="tableToken">State</TableCell>
                  <TableCell>District</TableCell>
                  <TableCell>Bed Time</TableCell>
                  <TableCell>Wake Up TIme</TableCell>
                  <TableCell>Last veiwed date & time</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {_reportmanagement &&
                  _reportmanagement.map((data, index) => (
                    <>
                      <StyledTableRow className={classes.tableRow1}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          {sortAddress(data?.userId?.userId)}
                        </TableCell>

                        <TableCell className="tableToken">
                          {data?.userId?.state ? data?.userId?.state : "--"}
                        </TableCell>
                        <TableCell>
                          {data?.userId?.district
                            ? data?.userId?.district
                            : "--"}
                        </TableCell>
                        <TableCell>{data?.bedTime}</TableCell>
                        <TableCell>
                          {data?.wakeUpTime ? data?.wakeUpTime : "--"}
                        </TableCell>
                        <TableCell>
                          {convertDateTime(
                            data?.userId?.updatedAt
                              ? data?.userId?.updatedAt
                              : "--"
                          )}
                        </TableCell>

                        <TableCell>{data?.status}</TableCell>
                      </StyledTableRow>
                    </>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
      {_subactivity === "MOOD" && (
        <>
          <TableContainer className={classes.tableClass}>
            <Table>
              <TableHead>
                <TableRow className={`${classes.tablerow1} tableHead`}>
                  <TableCell>Sr.No</TableCell>
                  <TableCell>User ID</TableCell>
                  <TableCell className="tableToken">State</TableCell>
                  <TableCell>District</TableCell>
                  <TableCell>Last Mood Status</TableCell>
                  <TableCell>Created date & time</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {_reportmanagement &&
                  _reportmanagement.map((data, index) => (
                    <>
                      <StyledTableRow className={classes.tableRow1}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          {sortAddress(data?.userId?.userId)}
                        </TableCell>

                        <TableCell className="tableToken">
                          {data?.userId?.state ? data?.userId?.state : "--"}
                        </TableCell>
                        <TableCell>
                          {data?.userId?.district
                            ? data?.userId?.district
                            : "--"}
                        </TableCell>
                        <TableCell>{data?.mood}</TableCell>
                        <TableCell>
                          {convertDateTime(
                            data?.userId?.updatedAt
                              ? data?.userId?.updatedAt
                              : "--"
                          )}
                        </TableCell>

                        <TableCell>{data?.status}</TableCell>
                      </StyledTableRow>
                    </>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
      {_reportmanagement.length === 0 && <DataNotFound />}
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
              // onClick={() => blockUnblockUserApiHandler(idd1._id)}
              variant="contained"
              color="secondary"
            >
              Yes {isLoading && <ButtonCircularProgress />}
            </Button>
          </DialogActions>
        </Dialog>
      </>
    </Box>
  );
}
