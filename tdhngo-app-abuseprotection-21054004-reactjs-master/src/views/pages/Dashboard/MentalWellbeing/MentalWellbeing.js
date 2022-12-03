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
  const { titleSubActivity } = location?.state;
  const [_total, setTotal] = useState();
  const [numpages, setNumpages] = useState(1);
  const [_isloading, setLoading] = useState();
  const [_subactivitymanagement, setSubActivityManagement] = useState([]);
  console.log("location--->>1231235555", location);
  const token = window.sessionStorage.getItem("token");

  useEffect(() => {
    console.log("call useEffect-->>>");
  }, [_subactivityId]);
  return (
    <Page title="Activity">
      {_isloading ? <PageLoading /> : ""}
      <Box className={classes.mainbox}>
        <Box className={classes.devicelistHeading}>
          <Typography variant="h1" className="headingText">
            Activity Management - {titleActivity} - {titleSubActivity}
          </Typography>
        </Box>

        <Divider className={classes.divider} />
        <Box mt={3} textAlign="right">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => history.goBack()}
            style={{ marginRight: "10px" }}
          >
            Back
          </Button>
        </Box>

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
                <StyledTableRow>
                  <TableCell>1</TableCell>
                  <TableCell>
                    <img
                      alt="Cindy Baker"
                      style={{
                        width: "50px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                      width="100%"
                      src="./images/Period Tracker.png"
                    />
                  </TableCell>
                  <TableCell>Positive Thinking</TableCell>
                  <TableCell>11-Oct-2022 01:20 pm</TableCell>

                  <TableCell align="center">
                    <IconButton
                      onClick={() =>
                        history.push({
                          pathname: "/mental-well-being",
                          // search: "View",
                          state: {
                            Add_send_id: "21",
                            titleSubActivity: "Positive Thinking",
                            titleActivity: titleActivity,
                            type: "POSITIVE_THINKING",
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
                        objectFit: "cover",
                      }}
                      width="100%"
                      src="./images/Period Tracker.png"
                    />
                  </TableCell>
                  <TableCell>Self Care</TableCell>
                  <TableCell>11-Oct-2022 01:20 pm</TableCell>

                  <TableCell align="center">
                    <IconButton
                      onClick={() =>
                        history.push({
                          pathname: "/mental-well-being",
                          //   search: "View",
                          state: {
                            Add_send_id: "22",
                            titleSubActivity: "Self Care",
                            titleActivity: titleActivity,
                            type: "SELF_CARE",
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
                      }}
                      width="100%"
                      src="./images/Period Tracker.png"
                    />
                  </TableCell>
                  <TableCell>Mindfulness</TableCell>
                  <TableCell>11-Oct-2022 01:20 pm</TableCell>

                  <TableCell align="center">
                    <IconButton
                      onClick={() =>
                        history.push({
                          pathname: "/mental-well-being",
                          //   search: "View",
                          state: {
                            Add_send_id: "23",
                            titleSubActivity: "Mindfulness",
                            titleActivity: titleActivity,
                            type: "MINDFULNESS",
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
                      }}
                      width="100%"
                      src="./images/Period Tracker.png"
                    />
                  </TableCell>
                  <TableCell>Managing Stress</TableCell>
                  <TableCell>11-Oct-2022 01:20 pm</TableCell>

                  <TableCell align="center">
                    <IconButton
                      onClick={() =>
                        history.push({
                          pathname: "/mental-well-being",
                          //   search: "View",
                          state: {
                            Add_send_id: "24",
                            titleSubActivity: "Managing Stress",
                            titleActivity: titleActivity,
                            type: "MANAGING_STRESS",
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
                <StyledTableRow>
                  <TableCell>3</TableCell>
                  <TableCell>
                    <img
                      alt="Cindy Baker"
                      style={{
                        width: "50px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                      width="100%"
                      src="./images/Period Tracker.png"
                    />
                  </TableCell>
                  <TableCell>Managing Emotion</TableCell>
                  <TableCell>11-Oct-2022 01:20 pm</TableCell>

                  <TableCell align="center">
                    <IconButton
                      onClick={() =>
                        history.push({
                          pathname: "/mental-well-being",
                          //   search: "View",
                          state: {
                            Add_send_id: "24",
                            titleSubActivity: "Managing Emotion",
                            titleActivity: titleActivity,
                            type: "MANAGING_EMOTION",
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
                      }}
                      width="100%"
                      src="./images/Period Tracker.png"
                    />
                  </TableCell>
                  <TableCell>Relationship</TableCell>
                  <TableCell>11-Oct-2022 01:20 pm</TableCell>

                  <TableCell align="center">
                    <IconButton
                      onClick={() =>
                        history.push({
                          pathname: "/mental-well-being",
                          //   search: "View",
                          state: {
                            Add_send_id: "24",
                            titleSubActivity: "Relationship",
                            titleActivity: titleActivity,
                            type: "RELATIONSHIP",
                          },
                        })
                      }
                    >
                      <VisibilityIcon style={{ color: "#F38500" }} />
                    </IconButton>
                  </TableCell>
                </StyledTableRow>
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
