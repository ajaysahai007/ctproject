import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Divider,
  Button,
  TableContainer,
  TableHead,
  Table,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  withStyles,
  Switch,
} from "@material-ui/core";
import Page from "src/component/Page";
import { makeStyles } from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import apiConfig from "src/APIconfig/ApiConfig";
import { convertDateTime } from "src/utils/index";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Pagination } from "@material-ui/lab";
import DataNotFound from "src/component/DataNotFound.js";
import ReactPlayer from "react-player";
import PageLoading from "src/component/PageLoading.js";
import { useHistory } from "react-router-dom";
// import ActivityTable from "./ActivityTable";
// import ActivityMainTable from "./ActivityMainTable";
const useStyles = makeStyles((theme) => ({
  root: {
    paddingRight: 0,
  },
  inputAdornment: {
    backgroundColor: "#f5d5da",
    height: 40,
    maxHeight: 40,
    paddingRight: 10,
    paddingLeft: 10,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  mainbox: {
    padding: "23px 0 36px",
  },
  devicelistHeading: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
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
  buttonApprove: {
    borderRadius: "5px",
    minHeight: "34px",
    color: "rgb(255, 255, 255)",
    backgroundColor: "rgb(228, 106, 118)",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    lineHeight: "1.5",
    fontWeight: "500",
    transition: "0.26s ease",
    paddingBottom: "3px",
    textTransform: "capitalize",
    marginRight: "15px",
    backgroundColor: "rgb(3, 201, 215)",
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
const tabledetails = [
  {
    img: "",
    categoryName: "Period Tracker",
  },
  {
    img: "",
    categoryName: "Menstrual Hygiene",
  },
  {
    img: "",
    categoryName: "Exercise Suggestion",
  },
];
export default function () {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [pages, setPages] = useState(1);
  const [_limit, setLimit] = useState(`${10}`);
  // const [_datafound, setDataFount] = useState("");

  const _subactivityId = location?.state?.id;
  const { titleActivity } = location?.state;
  const [_total, setTotal] = useState();
  const [numpages, setNumpages] = useState(1);
  const [_isloading, setLoading] = useState();
  const [_subactivitymanagement, setSubActivityManagement] = useState([]);
  console.log("location--->>1231235555", _subactivityId);
  const token = window.sessionStorage.getItem("token");
  // LIST ACTIVITY MANAGEMENT
  const SubActivityListFunction = async () => {
    try {
      setLoading(true);
      const res = await axios({
        url: apiConfig.listSleepTrackingData,
        method: "GET",
        headers: {
          token: token,
        },
        data: {
          page: `${pages}`,
          limit: _limit,
          activityId: _subactivityId,
        },
        // data: formdata,
      });
      if (res) {
        setLoading(false);

        console.log("setSubActivityManagement>>", res);
        setSubActivityManagement(res?.data?.result?.docs);
        setTotal(res?.data?.result?.total);
        setNumpages(res?.data?.result?.pages);
      } else if (res?.responseCode === 404) {
        console.log(">>>>>>res", res);
        // _datafound(0);
      }
    } catch (error) {
      setLoading(false);

      console.log("error>>", error);
    }
  };
  useEffect(() => {
    // SubActivityListFunction();
  }, [pages]);
  const [_check_id, setCheckId] = useState([]);

  useEffect(() => {
    console.log("call useEffect-->>>");
  }, [_subactivityId]);
  return (
    <Page title="Activity">
      {_isloading ? <PageLoading /> : ""}
      <Box className={classes.mainbox}>
        <Box className={classes.devicelistHeading}>
          <Typography variant="h1" className="headingText">
            Activity Management - {titleActivity}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              history.push("/activityMgmt");
            }}
          >
            Back
          </Button>
        </Box>

        <Divider className={classes.divider} />

        <Box mt={4}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow className={`${classes.tablerow1} tableHead`}>
                  <TableCell>Sr.No</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Type Name</TableCell>
                  <TableCell>Created At</TableCell>

                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* {PersonalSafety &&
                  PersonalSafety.map((data, index) => {
                    return ( */}
                <StyledTableRow>
                  <TableCell>1</TableCell>
                  <TableCell>
                    <img
                      alt="Cindy Baker"
                      style={{
                        width: "50px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        height: "50px",
                      }}
                      width="100%"
                      src="./images/SleepTracking.jpeg"
                    />
                  </TableCell>
                  <TableCell>Sleep Tracking</TableCell>
                  <TableCell>11-Oct-2022 01:20 pm</TableCell>

                  <TableCell align="center">
                    <IconButton
                      onClick={() =>
                        history.push({
                          pathname: "/sleep-tracking-list",
                          // search: "View",
                          state: {
                            Add_send_id: "21",
                            titleSubActivity: "Sleep Tracking",
                            titleActivity: titleActivity,
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
                        borderRadius: "50%",
                        height: "50px",
                        objectFit: "cover",
                      }}
                      width="100%"
                      src="./images/Sleep Training.jpeg"
                    />
                  </TableCell>
                  <TableCell>Sleep Training</TableCell>
                  <TableCell>11-Oct-2022 01:20 pm</TableCell>

                  <TableCell align="center">
                    <IconButton
                      onClick={() =>
                        history.push({
                          pathname: "/activityorder",
                          search: "View",
                          state: {
                            Add_send_id: "22",
                            titleSubActivity: "Sleep Training",
                            titleActivity: titleActivity,
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
                        borderRadius: "50%",
                        objectFit: "cover",
                        height: "50px",
                      }}
                      width="100%"
                      src="./images/Mental Well-being.jpeg"
                    />
                  </TableCell>
                  <TableCell>Mental Well-being</TableCell>
                  <TableCell>11-Oct-2022 01:20 pm</TableCell>

                  <TableCell align="center">
                    <IconButton
                      onClick={() =>
                        history.push({
                          pathname: "/mental-well-being-list",
                          // search: "View",
                          state: {
                            Add_send_id: "23",
                            titleSubActivity: "Mental Well-being",
                            titleActivity: titleActivity,
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
                        borderRadius: "50%",
                        height: "50px",
                        objectFit: "cover",
                      }}
                      width="100%"
                      src="./images/Exercise Suggestion.webp"
                    />
                  </TableCell>
                  <TableCell>Exercise Suggestion</TableCell>
                  <TableCell>11-Oct-2022 01:20 pm</TableCell>

                  <TableCell align="center">
                    <IconButton
                      onClick={() =>
                        history.push({
                          pathname: "/exercise-suggestion",
                          // search: "View",
                          state: {
                            titleSubActivity: "Exercise Suggestion",
                            titleActivity: titleActivity,
                          },
                        })
                      }
                    >
                      <VisibilityIcon style={{ color: "#F38500" }} />
                    </IconButton>
                  </TableCell>
                </StyledTableRow>
                {/* ); */}
                {/* })} */}
              </TableBody>
            </Table>
            {/* {PersonalSafety.length === 0 ? <DataNotFound /> : ""} */}
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
      </Box>
    </Page>
  );
}
