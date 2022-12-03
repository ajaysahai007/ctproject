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
  Button,
  IconButton,
  Avatar,
  InputAdornment,
  Select,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/styles";
import DevicesIcon from "@material-ui/icons/Devices";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { GrFormView } from "react-icons/gr";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ApiConfig from "src/APIconfig/ApiConfig";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import axios from "axios";
import { toast } from "react-toastify";
import InputLabel from "@material-ui/core/InputLabel";
import * as yep from "yup";
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
// import EditProfile from "src/views/pages/Dashboard/User/EditProfile";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { BsSearch } from "react-icons/bs";
import { Delete, NotInterested } from "@material-ui/icons";
const useStyles = makeStyles((theme) => ({
  deviceSection: {
    display: "flex",
    alignItems: "center",
  },
  devicelistHeading: {
    "& h3": {
      padding: "20px 0 30px 0",
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
  tablerow1: {
    "& th": {
      color: theme.palette.text.black,
    },
    "& td": {
      color: theme.palette.text.black,
    },
  },
  iconcolor: {
    color: theme.palette.text.black,
    "& path": {
      stroke: theme.palette.text.black,
    },
  },
  mainbox: {
    color: "#fff",
    "& .tableHead": {
      backgroundColor: "#5a86ff",
      "& th": {
        color: "#fff",
      },
    },
  },

  filterBox: {
    // border: "1px solid #c4c4c4",
    padding: "15px",
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
      fontSize: "14px",
      fontWeight: 600,
      color: theme.palette.text.black,
    },
    "& .iconbtn": {
      color: theme.palette.text.black,
    },
  },
  walletaddres: {
    margin: 0,
    textOverflow: "ellipsis",
    width: "100%",
    maxWidth: "100px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    display: "inline-block",
  },
}));

//

export default function (props) {
  const [open, setOpen] = React.useState(false);
  const [sudAdminData, setSubAdminData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  console.log("sudAdminData", sudAdminData);

  const [idds, setIdd] = useState([]);
  console.log("idds", idds);

  const handleEdit = (id) => {
    setIdd(id);
    setOpen(true);
  };
  const history = useHistory();

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();
  return (
    <Box className={classes.mainbox}>
      <Box className={classes.filterBox} mb={5} mt={4}>
        <Typography variant="h6">Filter</Typography>
        <Grid container spacing={2} alignItems="flex-end">
          <Grid item xs={12} sm={4} md={3} lg={2}>
            <label>From</label>
            <TextField
              id="outlined-basic"
              type="date"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={2}>
            <label>To</label>
            <TextField
              id="outlined-basic"
              type="date"
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={4} md={3} lg={3}>
            <label>Search </label>
            <TextField
              id="outlined-basic"
              type="search"
              variant="outlined"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {" "}
                    <IconButton className="iconbtn">
                      <BsSearch />
                    </IconButton>{" "}
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} sm={4} md={2} lg={1}>
            {/* <label>&nbsp; </label> */}
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              style={{ backgroundColor: "#5a86ff" }}
            >
              Search
            </Button>
          </Grid>
          <Grid item xs={12} sm={4} md={2} lg={1}>
            {/* <label>&nbsp; </label> */}
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              style={{ backgroundColor: "#5a86ff" }}
            >
              Reaset
            </Button>
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={2}>
            {/* <label>&nbsp; </label> */}
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              style={{ backgroundColor: "#5a86ff" }}
            >
              EXPORT AS EXCEL
            </Button>
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={1}>
            {/* <label>&nbsp; </label> */}
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              style={{ backgroundColor: "#5a86ff" }}
            >
              ADD
            </Button>
          </Grid>
        </Grid>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow className={`${classes.tablerow1} tableHead`}>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Created Date & Time</TableCell>
              <TableCell>Last Logged In Date & Time</TableCell>

              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sudAdminData &&
              sudAdminData?.map((data) => (
                <TableRow className={classes.tablerow1}>
                  <TableCell>{data?.srno}</TableCell>{" "}
                  <TableCell>
                    <Avatar src={data?.img} />
                  </TableCell>{" "}
                  <TableCell>{data?.userName}</TableCell>
                  <TableCell>
                    <Box className={classes.activeparent}>
                      {/* <Box className={classes.activeDevice} ></Box>
                        &nbsp;&nbsp;&nbsp;
                        <Typography style={{fontSize:"15px", fontWeight:"300"}}> */}
                      {data.devices}
                    </Box>
                  </TableCell>
                  <TableCell>
                    {data.token}
                    {data.sme}
                  </TableCell>
                  {/* <TableCell>{data.Docu}</TableCell>
                  <TableCell className="tableToken">{data.createdAt}</TableCell> */}
                  <TableCell
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "start",
                    }}
                  >
                    <Link component={IconButton}>
                      <GrFormView
                        style={{ fontSize: "25px" }}
                        className={classes.iconcolor}
                        onClick={() =>
                          history.push({
                            pathname: "/user-list",
                            state: "viewAddmin",
                            search: data?._id,
                          })
                        }
                      />
                    </Link>
                    <Link
                      component={IconButton}
                      style={{ marginRight: "10px" }}
                    >
                      {" "}
                      <EditIcon
                        style={{
                          fontSize: "1.2rem",
                        }}
                        className={classes.iconcolor}
                        // onClick={() => handleEdit(data)}
                        onClick={() =>
                          history.push({
                            pathname: "/user-list",
                            state: "editAddmin",
                            search: data?._id,
                          })
                        }
                      />
                    </Link>
                    <Link component={IconButton}>
                      <NotInterested
                        style={{
                          fontSize: "1.2rem",

                          cursor: "pointer",
                        }}
                        className={classes.iconcolor}
                      />
                    </Link>
                    <Link component={IconButton}>
                      <DeleteIcon
                        style={{
                          fontSize: "1.2rem",

                          cursor: "pointer",
                        }}
                        className={classes.iconcolor}
                        onClick={() =>
                          history.push({
                            pathname: "/user-list",
                            state: "deleteAddmin",
                            search: data?._id,
                          })
                        }
                      />
                    </Link>

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
                          onClick={handleClose}
                          variant="contained"
                          color="secondary"
                        >
                          Yes
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
