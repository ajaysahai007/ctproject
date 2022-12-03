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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import Page from "src/component/Page";
import { makeStyles } from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { Visibility, Edit, Delete, GetApp, Block } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import apiConfig from "src/APIconfig/ApiConfig";
import ButtonCircularProgress from "src/component/ButtonCircularProgress.js";
import axios from "axios";
import PageLoading from "src/component/PageLoading.js";

import { Pagination } from "@material-ui/lab";

import ReactPlayer from "react-player";
import { convertDateTime } from "src/utils/index";
import DataNotFound from "src/component/DataNotFound.js";

// import ActivityTable from "./ActivityTable";
import { useLocation } from "react-router-dom";

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
    padding: "21px 0 36px",
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
  reactClass: {
    width: "50px !important",
    height: "50px !important",
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
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const [_blocactivity_id, setBlockActivity_id] = useState("");
  const handleOpen = (id) => {
    setBlockActivity_id(id);
    setOpen(true);
  };
  const _blockActivity = (id) => {
    setBlockActivity_id(id);
    setUnblock(true);
  };
  const _BlockClose = () => {
    setUnblock(false);
  };
  const [_block, setUnblock] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const location = useLocation();
  const _subactivityId = location?.state?.id;
  const [_imgDef, setImgDef] = useState("");
  const [_datafound, setDataFount] = useState("");
  const [_total, setTotal] = useState();
  const [numpages, setNumpages] = useState(1);
  const [_isloading, setLoading] = useState(false);
  const [_subactivitymanagement, setSubActivityManagement] = useState([]);
  const [pages, setPages] = useState(1);
  const [_limit, setLimit] = useState(`${10}`);
  const token = window.sessionStorage.getItem("token");
  const { titleActivity, titleSubActivity, Add_send_id } = location?.state
    ? location?.state
    : "";
  console.log("765726t76234-->>", titleSubActivity, titleActivity);

  const MenstrualHygiene = async () => {
    try {
      setLoading(true);
      const res = await axios({
        url: apiConfig.listMenstrualHygiene,
        method: "POST",
        headers: {
          token: token,
        },
        data: {
          page: `${pages}`,
          limit: _limit,
          activityId: _subactivityId,
        },
      });
      if (res) {
        setLoading(false);
        console.log("ViewsetSubActivity-------->>", res);
        setSubActivityManagement(res?.data?.result?.docs);
        setTotal(res?.data?.result?.total);
        setNumpages(res?.data?.result?.pages);
      } else if (res?.data?.responseCode === 404) {
        setLoading(false);

        setDataFount(0);
      }
    } catch (error) {
      setLoading(false);

      console.log("error>>", error);
    }
  };

  useEffect(() => {
    console.log("6666Add_send_id--->>", Add_send_id);

    MenstrualHygiene();
  }, [Add_send_id, pages]);

  const BlockActivityFunction = async () => {
    setLoading(true);
    try {
      const res = await axios({
        url: apiConfig.blockUnblockMenstrualHygiene,
        headers: {
          token: token,
        },
        method: "PUT",
        params: {
          _id: _blocactivity_id,
        },
      });
      if (res) {
        setLoading(false);
        console.log("block activity function-->>", res);
        setOpen(false);
        setUnblock(false);
        // ListSleepTrainingData();
        MenstrualHygiene();
      }
    } catch (error) {
      setLoading(false);
      setOpen(false);
      setUnblock(false);

      console.log(error);
    }
  };
  useEffect(() => {
    // ViewSubActivityListFunction();
  }, [pages]);

  return (
    <Page title="Activity">
      {_isloading ? <PageLoading /> : ""}

      <Box mt={3}>
        <Box className={classes.devicelistHeading}>
          <Typography variant="h1" className="headingText">
            Activity Management {" - "}
            {titleActivity ? titleActivity : "Personal Safety "} {" - "}
            {titleSubActivity ? titleSubActivity : "Sexual abuse"}
          </Typography>
        </Box>

        <Divider className={classes.divider} />
        <Box mt={3} display="flex" justifyContent="space-between">
          <Button
            variant="contained"
            color="secondary"
            onClick={() =>
              history.push({
                pathname: "/menstrual-health",
                state: {
                  _id: _subactivityId,
                },
              })
            }
            style={{ marginRight: "10px" }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              history.push({
                pathname: "/menstrual-hygiene",
                search: "Add",
                state: {
                  _id: Add_send_id,
                  Add_send_id: Add_send_id,
                },
              })
            }
          >
            Add Activity
          </Button>
        </Box>
        <Box mt={4}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow className={`${classes.tablerow1} tableHead`}>
                  <TableCell>Sr.No</TableCell>
                  <TableCell>Article Name</TableCell>

                  <TableCell>Created At</TableCell>

                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {_subactivitymanagement &&
                  _subactivitymanagement.map((data, index) => {
                    return (
                      <>
                        <StyledTableRow>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>
                            {data?.article_name}
                            {/* <ReactPlayer
                              className={classes.reactClass}
                              url={data?.url ? data?.url : data?.video}
                              style={{ width: "50px", height: "50px" }}
                              controls={true}
                            /> */}
                          </TableCell>

                          <TableCell>
                            {convertDateTime(data.createdAt)}
                          </TableCell>
                          <TableCell align="center">
                            <IconButton
                              onClick={() =>
                                history.push({
                                  pathname: "/menstrual-hygiene",
                                  search: "View",
                                  state: {
                                    id: data?._id,
                                    Add_send_id: Add_send_id,
                                    titleActivity: titleActivity,
                                    titleSubActivity: titleSubActivity,
                                  },
                                })
                              }
                            >
                              {console.log("Add_send_id--->>>", Add_send_id)}
                              <VisibilityIcon style={{ color: "#F38500" }} />
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
                                    pathname: "/menstrual-hygiene",
                                    search: "Edit",
                                    state: {
                                      id: data?._id,
                                      Add_send_id: Add_send_id,
                                      titleActivity: titleActivity,
                                      titleActivity: titleSubActivity,
                                    },
                                  })
                                }
                              />
                            </IconButton>
                            &nbsp;&nbsp;
                            {data?.status === "BLOCK" ? (
                              <IconButton
                                onClick={() => _blockActivity(`${data?._id}`)}
                              >
                                <Block
                                  style={{
                                    fontSize: "20px",
                                    color: "red",
                                    cursor: "pointer",
                                  }}
                                />
                              </IconButton>
                            ) : (
                              <IconButton
                                onClick={() => handleOpen(`${data?._id}`)}
                              >
                                <Block
                                  style={{
                                    fontSize: "20px",
                                    color: "green",
                                    cursor: "pointer",
                                  }}
                                />
                              </IconButton>
                            )}
                          </TableCell>
                        </StyledTableRow>
                        <Dialog
                          open={open}
                          fullWidth
                          maxWidth="sm"
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                          <DialogTitle align="center" id="alert-dialog-title">
                            <Typography variant="h2">
                              {" "}
                              Block Activity
                            </Typography>
                          </DialogTitle>
                          <DialogContent>
                            <DialogContentText
                              id="alert-dialog-description"
                              align="center"
                            >
                              <Typography variant="h5">
                                {" "}
                                Are you sure you want to Block this activity ?
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
                              onClick={BlockActivityFunction}
                            >
                              Yes {_isloading ? <ButtonCircularProgress /> : ""}
                            </Button>
                          </DialogActions>
                        </Dialog>
                        <Dialog
                          open={_block}
                          fullWidth
                          maxWidth="sm"
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                          <DialogTitle align="center" id="alert-dialog-title">
                            <Typography variant="h2">
                              {" "}
                              Unblock Activity
                            </Typography>
                          </DialogTitle>
                          <DialogContent>
                            <DialogContentText
                              id="alert-dialog-description"
                              align="center"
                            >
                              <Typography variant="h5">
                                {" "}
                                Are you sure you want to Unblock this activity ?
                              </Typography>
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button
                              onClick={_BlockClose}
                              variant="contained"
                              color="secondary"
                            >
                              No
                            </Button>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={BlockActivityFunction}
                            >
                              Yes
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </>
                    );
                  })}
              </TableBody>
            </Table>
            {_subactivitymanagement.length === 0 ? <DataNotFound /> : ""}
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
