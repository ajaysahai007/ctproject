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
  console.log("location--->>1231235555", location?.state);
  const token = window.sessionStorage.getItem("token");

  const [_check_id, setCheckId] = useState([]);

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
                <StyledTableRow>
                  <TableCell>1</TableCell>
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
                      src="./images/Period-Tracker.png"
                    />
                  </TableCell>
                  <TableCell>Period Tracker</TableCell>
                  <TableCell>11-Oct-2022 01:20 pm</TableCell>

                  <TableCell align="center">
                    <IconButton
                      onClick={() =>
                        history.push({
                          pathname: "/menstrual-health-list",
                          // search: "View",
                          state: {
                            Add_send_id: "11",
                            titleSubActivity: "Period Tracker",
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
                        objectFit: "cover",
                        height: "50px",
                      }}
                      width="100%"
                      src="./images/Menstrual-Hygiene.jpeg"
                    />
                  </TableCell>
                  <TableCell>Menstrual Hygiene</TableCell>
                  <TableCell>11-Oct-2022 01:20 pm</TableCell>

                  <TableCell align="center">
                    <IconButton
                      onClick={() =>
                        history.push({
                          pathname: "/menstrual-hygiene-list",
                          // search: "View",
                          state: {
                            Add_send_id: "12",
                            titleSubActivity: "Menstrual Hygiene",
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
                        height: "50px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                      width="100%"
                      src="./images/FAQ's.webp"
                    />
                  </TableCell>
                  <TableCell>FAQ's</TableCell>
                  <TableCell>11-Oct-2022 01:20 pm</TableCell>

                  <TableCell align="center">
                    <IconButton
                      onClick={() =>
                        history.push({
                          pathname: "/Faq-manage",
                          // search: "View",
                          state: {
                            Add_send_id: "13",
                            titleSubActivity: "FAQ's",
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
