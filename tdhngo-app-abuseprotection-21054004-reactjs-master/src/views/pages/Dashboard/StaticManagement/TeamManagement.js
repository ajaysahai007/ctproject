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
  DialogTitle,
  Button,
  IconButton,
  FormControl,
  Divider,
  Select,
  withStyles
} from "@material-ui/core";
import CopyToClipboard from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import { BiBlock } from "react-icons/bi";
import VisibilityIcon from "@material-ui/icons/Visibility";
import FilterCard from "src/component/FilterCard";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
// import { sortAddress } from "../../../utils/index";
import { BiCopy } from "react-icons/bi";
import TeamTable from "src/component/TeamTable";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import React, { useState, useEffect } from "react";
import apiConfig from "src/APIconfig/ApiConfig";
import moment from "moment";
import DataNotFound from "src/component/DataNotFound";
import { Pagination } from "@material-ui/lab";
const useStyles = makeStyles((theme) => ({
  deviceSection: {
    display: "flex",
    alignItems: "center",
  },
  devicelistHeading: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap:'wrap',
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
  },
  iconcolor: {
    color: "#fff",

    "& path": {},
  },
  mainbox: {
    padding: "21px 0 40px",
    "& .tableHead": {
      backgroundColor: "#FEDDB6",
      "& th": {
        color: "#000",
        fontSize: "15px",
      },
      "& h1": {
        color: "#FFFFFF",
        fontSize: "30px",
        fontWeight: "600",
        lineHeight: "80px",
      },
    },
  },
  divider: {
    marginTop: "10px",
    background: "#F38500",
  },
  filterBox: {
    color: "#fff",
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
}));
const teamData = [
  {
    id:1
  },
  {
    id:1
  },
  {
    id:1
  },
  {
    id:1
  }
]
const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(even)': {
      backgroundColor: "#ffdead87",
    },
  },
}))(TableRow);
export default function (props) {
  const [open, setOpen] = React.useState(false);
  const history = useHistory();
  const [page, setPage] = useState(1);
  const [idd1, setidd1] = React.useState([]);
  const [noOfPages, setNoOfPages] = useState(1);
  const [open1, setOpen1] = React.useState(false);
  const [isLoading, setLoader] = useState(false);
  const [openUserBlockUnblock, setOpenUserBlockUnblick] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  

  const handleClickOpennew1 = (data) => {
    setidd1(data);
    setOpen1(true);
    console.log("kjhaskjdfhkajsd", data);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

  return (
    <Box className={classes.mainbox}>
      <Box className={classes.devicelistHeading}>
        
        <Typography variant="h1" className="headingText">
          {/* Splash Screen Management */}
          Tutorial Screen Management
        </Typography>
      
        {/* <Button
          variant="contained"
          color="primary"
          onClick={() => {
            history.push({
              pathname: "/view-team",
              search:"Add",
            });
          }}
        >
          Add New Splash
        </Button> */}

      </Box>
      <Divider className={classes.divider} />
      
      <Box style={{ marginTop: "70px" }}>
        {/* <TeamTable /> */}
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow className={`${classes.tablerow1} tableHead`}>
              <TableCell>Sr.No.</TableCell>
              {/* <TableCell>Splash Name</TableCell> */}
              <TableCell>Tutorial Name</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teamData.map((data, index) => (
              <StyledTableRow className={classes.tableRow1}>
                <TableCell>{index + 1}</TableCell>{" "}
                {/* <TableCell>
                  <img
                    src={data.picture}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                </TableCell> */}
                <TableCell>Tutorial Screen 1</TableCell>
                <TableCell>
                  <VisibilityIcon
                    style={{
                      fontSize: "20px",
                      color: "#F38500",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      history.push({
                        pathname: "/view-team",
                        search: "View",
                      });
                    }}
                  />
                  &nbsp;&nbsp;
                  <EditIcon
                    style={{
                      fontSize: "20px",
                      cursor: "pointer",
                      color:"#F38500"
                    }}
                    onClick={() => {
                      history.push({
                        pathname: "/view-team",
                        search:"Edit",
                      });
                    }}
                    className={classes.iconcolor}
                  />
                  &nbsp;&nbsp;
                    {/* <DeleteIcon
                      style={{
                        color: "#F38500",
                        fontSize: "20px",
                        cursor: "pointer",
                      }}
                      onClick={handleClickOpen}
                    /> */}
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        {/* {teamData.length === 0 && <DataNotFound />} */}
      </TableContainer>
      {/* {teamData && teamData.length !== 0 && (
        <Box mt={2} display="flex" justifyContent="">
          <Pagination
            count={noOfPages}
            page={page}
            onChange={(e, v) => setPage(v)}
          />
        </Box>
      )} */}
      <>
      <Dialog
        open={open}
        fullWidth
        maxWidth="sm"
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle align="center" id="alert-dialog-title">
                <Typography variant="h2">
                Delete Splash Screeen
                </Typography>
              </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" align="center">
            <Typography variant="h5">
              {" "}
              Are you sure you want to delete this splash screen?
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="secondary">
            No
          </Button>
          <Button onClick={handleClose} variant="contained" color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      </>
    </Box>
  );
}
