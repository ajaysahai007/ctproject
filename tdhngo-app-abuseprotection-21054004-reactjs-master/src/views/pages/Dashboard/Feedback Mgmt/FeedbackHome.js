import React, { useEffect, useState } from "react";
import {
  Grid,
  Box,
  Typography,
  makeStyles,
  TextField,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Container,
  Divider,
  TableContainer,
  TableCell,
  Table,
  TableRow,
  TableBody,
  Button,
  TableHead,
  InputAdornment,
  withStyles,
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { BsSearch } from "react-icons/bs";
import Page from "src/component/Page";
import moment from "moment";
import DataNotFound from "src/component/DataNotFound";
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import { useHistory } from "react-router-dom";
import axios from "axios";
import apiConfig from "src/APIconfig/ApiConfig";
import { convertDateTime } from "src/utils/index";
import Filter from "src/Filter/Filter";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  NftBreed: {
    padding: "23px 0 ",
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
    marginTop: "10px",
    background: "#F38500",
  },
  filterbox: {
    marginTop: "30px",
    "& label": {
      fontSize: "14px",
      fontWeight: "400",
      color: "#000",
    },
  },
}));

//     userid: "User12",
//     datetime: "Jan 25,2022 19:50 PM",
//     rating: "4",
//   },
//   {
//     feedbackid: "278920",
//     userid: "User12",
//     datetime: "Jan 25,2022 19:50 PM",
//     rating: "4",
//   },
//   {
//     feedbackid: "278920",
//     userid: "User12",
//     datetime: "Jan 25,2022 19:50 PM",
//     rating: "4",
//   },
//   {
//     feedbackid: "278920",
//     userid: "User12",
//     datetime: "Jan 25,2022 19:50 PM",
//     rating: "4",
//   },
//   {
//     feedbackid: "278920",
//     userid: "User12",
//     datetime: "Jan 25,2022 19:50 PM",
//     rating: "4",
//   },
//   {
//     feedbackid: "278920",
//     userid: "User12",
//     datetime: "Jan 25,2022 19:50 PM",
//     rating: "4",
//   },
// ];
const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(even)": {
      backgroundColor: "#ffdead87",
    },
  },
}))(TableRow);
export default function Feedback() {
  const classes = useStyles();
  const history = useHistory();
  const [fromDate, setfromDate] = useState();
  const [toDate, settoDate] = useState();
  const [currentvalue, setCurrentValue] = useState("Rating");
  const [_feedback, setFeedBack] = useState([]);
  const [openUserBlockUnblock, setOpenUserBlockUnblick] = useState(false);
  const [search, setSearch] = useState();
  const [usertype, setusertype] = useState("All Users");
  const [states, setStates] = useState();
  const [destrict, setDistrict] = useState();
  const [pages, setPages] = useState(1);
  const [_limit, setLimit] = useState(`${10}`);

  const FeedBackList = async () => {
    try {
      const res = await axios({
        url: apiConfig.feedbackList,
        method: "POST",
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
        data: {
          page: `${pages}`,
          limit: _limit,
          search: search,
          states: states,
          districs: destrict,
          fromDate: fromDate,
          toDate: toDate,
          // userStatus: usertype,
        },
      });
      if (res) {
        console.log("res--->>123", res);
        setFeedBack(res?.data?.result?.docs);
      } else if (res?.data?.responseCode === 404) {
        toast(res?.data?.responseMessage);
      }
    } catch (error) {
      console.log();
    }
  };
  useEffect(() => {
    FeedBackList();
  }, []);

  return (
    <>
      <Page title="Feedback">
        <Box className={classes.NftBreed}>
          <Box className={classes.devicelistHeading}>
            <Typography variant="h1">Feedback Management</Typography>
          </Box>
          <Filter
            FeedBackList={FeedBackList}
            _feedback={_feedback}
            type="feedbackManagement"
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

          <Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow className={`${classes.tablerow1} tableHead`}>
                    <TableCell style={{ width: "50px", padding: "11px" }}>
                      Sr.No
                    </TableCell>
                    <TableCell>User Name</TableCell>
                    <TableCell>UserID</TableCell>
                    <TableCell>Feedback Date & Time</TableCell>
                    <TableCell>Rating</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {_feedback &&
                    _feedback.map((data, index) => (
                      <StyledTableRow className={classes.tablerow}>
                        <TableCell>{index + 1}</TableCell>

                        <TableCell>{data?.userId?.userName}</TableCell>
                        <TableCell>{data.userId?.userId}</TableCell>
                        <TableCell>{convertDateTime(data.createdAt)}</TableCell>
                        <TableCell>{data.rating}</TableCell>
                        <TableCell align="center">
                          <IconButton>
                            <VisibilityIcon
                              // onClick={() => history.push("/feedbackBox")}
                              onClick={() =>
                                history.push({
                                  pathname: "/feedbackBox",
                                  state: {
                                    _FeedBack_id: data._id,
                                  },
                                })
                              }
                              style={{
                                color: "#F38500",
                                cursor: "pointer",
                              }}
                            />
                          </IconButton>
                        </TableCell>
                      </StyledTableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            {_feedback.length === 0 && <DataNotFound />}
          </Box>
        </Box>
      </Page>
    </>
  );
}
