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
  MenuItem,
  Select,
  IconButton,
  withStyles,
} from "@material-ui/core";
import apiConfig from "src/APIconfig/ApiConfig";
import axios from "axios";
import { convertDateTime } from "src/utils/index";
// import PageLoading from "../../../../component/ButtonCircularProgress"
import DataNotFound from "src/component/DataNotFound";
import { Pagination } from "@material-ui/lab";

import BlockIcon from "@material-ui/icons/Block";
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import { BsSearch } from "react-icons/bs";
import React, { useState, useEffect } from "react";
import { Visibility, Edit, Delete, GetApp } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import moment from "moment";
import { sortString } from "src/utils/index";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import Filter from "src/Filter/Filter";

const useStyles = makeStyles((theme) => ({
  deviceSection: {
    display: "flex",
    alignItems: "center",
  },
  addBanner: {
    width: "100%",
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
  deviceSection: {
    display: "flex",
    alignItems: "center",
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

  divider: {
    marginTop: "30px",
  },
  deviceSection: {
    display: "flex",
    alignItems: "center",
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
    // margin: "40px 0px 10px ",
    "& .tableHead": {
      backgroundColor: "#FEDDB6",
      "& th": {
        color: "#000",
        padding: "11px",
      },
    },
  },

  filterLine: {
    marginRight: "20px",
    width: "180px",
    [theme.breakpoints.only("xs")]: {
      width: "145px",
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

export default function () {
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );
  const [_deleteId, setDeleteID] = useState("");
  console.log("_deleteId-->>", _deleteId);
  const handleOpen = (_id) => {
    setDeleteID(_id);

    setOpen(true);
  };
  const [destrict, setDistrict] = useState();

  const [state, setState] = useState();
  const [states, setStates] = useState();
  const [usertype, setusertype] = useState();
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [pages, setPages] = useState(1);
  const history = useHistory();
  const [numpages, setNumpages] = useState(1);
  const [_total, setTotal] = useState();

  const [search, setSearch] = useState();
  const [fromDate, setfromDate] = useState();
  const [toDate, settoDate] = useState();
  const [isLoading, setLoader] = useState(false);
  const [openUserBlockUnblock, setOpenUserBlockUnblick] = useState(false);
  const [_limit, setLimit] = useState(`${10}`);

  const handleClose = () => {
    setOpen(false);
  };
  const handleClose1 = () => {
    setOpen1(false);
  };
  const handleOpenBlockUnblock = (_id) => {
    setDeleteID(_id);

    setOpen1(true);
  };
  const _blockActivity = (id) => {
    setDeleteID(id);
    setUnblock(true);
  };
  const _BlockClose = () => {
    setUnblock(false);
  };
  const [_block, setUnblock] = useState(false);

  const classes = useStyles();

  //BANNER MANAGEMENT
  const [_bannerlist, setBannerList] = useState([]);
  console.log("_listemergency--->>", search);
  const BannerListFuunction = async () => {
    try {
      setLoader(true);
      const res = await axios({
        url: apiConfig.listAdminBanner,
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
        },
      });
      if (res) {
        setLoader(false);

        console.log("editctory--->>>", res);
        setBannerList(res?.data?.result?.docs);
        setNumpages(res?.data?.result?.pages);
        setTotal(res?.data?.result?.total);
      } else if (res?.statusCode === 404) {
        // setDataFound(false);
      }
    } catch (error) {
      setLoader(false);

      console.log("error--->>>", error);
    }
  };
  const [_buttoncircular, setButtonCircular] = useState(false);
  //DELETE BANNER API
  const DeleteFunction = async () => {
    try {
      setButtonCircular(true);
      const res = await axios({
        url: apiConfig.deleteBanner,
        method: "DELETE",
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
        params: {
          bannerId: _deleteId,
        },
      });
      if (res) {
        setButtonCircular(false);
        console.log("delete banner successfully");
        setOpen(false);
        BannerListFuunction();
      }
    } catch (error) {
      setButtonCircular(false);

      console.log("error--->>", error);
    }
  };
  //BLOCK BANNER API
  const BlockAPI = async () => {
    try {
      setButtonCircular(true);
      const res = await axios({
        url: apiConfig.blockunblockBanner,
        method: "PUT",
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
        params: {
          bannerId: _deleteId,
        },
      });
      if (res) {
        setButtonCircular(false);
        console.log("delete banner successfully");
        setOpen1(false);
        setUnblock(false);
        setOpen(false);

        BannerListFuunction();
      }
    } catch (error) {
      setButtonCircular(false);

      console.log("error--->>", error);
    }
  };

  useEffect(() => {
    BannerListFuunction();
  }, [pages]);

  return (
    <>
      <Box className={classes.filterBox}>
        <Filter
          BannerListFuunction={BannerListFuunction}
          _bannerlist={_bannerlist}
          type="bannerManagement"
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
      </Box>

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
                <TableCell> Image</TableCell>

                <TableCell>Title</TableCell>
                {/* <TableCell> Position</TableCell>
                <TableCell>Description</TableCell> */}
                <TableCell>Created Date & Time</TableCell>
                <TableCell>Status</TableCell>

                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {_bannerlist &&
                _bannerlist.map((data, index) => {
                  return (
                    <>
                      {console.log("data123....>>", data)}
                      <StyledTableRow className={classes.tableRow1}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          <img
                            alt="Cindy Baker"
                            style={{
                              width: "50px",
                              borderRadius: "50%",
                              objectFit: "cover",
                            }}
                            width="100%"
                            src={data.image}
                          />
                        </TableCell>
                        <TableCell>{data.title ? data.title : "--"}</TableCell>
                        {/* <TableCell>
                          {data.position ? data.position : "--"}
                        </TableCell>
                        <TableCell>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: data?.description
                                ? data?.description
                                : "--",
                            }}
                          ></div>
                        </TableCell> */}
                        <TableCell>{convertDateTime(data.createdAt)}</TableCell>
                        <TableCell>{data.status}</TableCell>

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
                                  pathname: "/bannerView",
                                  search: "View",
                                  state: { id: data?._id },
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
                                  pathname: "/bannerView",
                                  search: "Edit",
                                  state: { id: data?._id },
                                })
                              }
                            />
                          </IconButton>
                          &nbsp;&nbsp;
                          <IconButton
                            onClick={() => handleOpen(`${data?._id}`)}
                          >
                            <Delete
                              style={{
                                fontSize: "20px",
                                color: "#F38500",
                                cursor: "pointer",
                              }}
                              // onClick={() =>
                              //   history.push({
                              //     pathname: "/stackingDetail",
                              //   })
                              // }
                            />
                          </IconButton>
                          &nbsp;&nbsp;
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
                      </StyledTableRow>
                      {/* {_bannerlist === 0 ? <DataNotFound /> : ""} */}

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
                    </>
                  );
                })}
            </TableBody>
          </Table>
          {isLoading && <ButtonCircularProgress />}
          {_bannerlist.length === 0 && <DataNotFound />}
        </TableContainer>
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
          <DialogTitle align="center" id="alert-dialog-title">
            <Typography variant="h2">Block Banner</Typography>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description" align="center">
              <Typography variant="h5">
                {" "}
                Are you sure you want to block this banner ?
              </Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose1}
              variant="contained"
              color="secondary"
            >
              No
            </Button>
            <Button variant="contained" onClick={BlockAPI} color="primary">
              Yes {_buttoncircular ? <ButtonCircularProgress /> : ""}
            </Button>
          </DialogActions>
        </Dialog>
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
            <Typography variant="h2">Delete Banner</Typography>
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              style={{ color: "#000" }}
              id="alert-dialog-description"
              align="center"
            >
              Are you sure you want to Delete this Banner ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="contained" color="secondary">
              No
            </Button>
            <Button
              variant="contained"
              onClick={DeleteFunction}
              color="primary"
            >
              Yes {_buttoncircular ? <ButtonCircularProgress /> : ""}
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
            <Button variant="contained" color="primary" onClick={BlockAPI}>
              Yes {isLoading ? <ButtonCircularProgress /> : ""}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}
