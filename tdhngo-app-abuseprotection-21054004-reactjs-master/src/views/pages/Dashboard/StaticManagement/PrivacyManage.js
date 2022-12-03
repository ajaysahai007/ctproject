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
    Avatar,
    Button,
    FormControl,
    Select,
  } from "@material-ui/core";
  import CopyToClipboard from "react-copy-to-clipboard";
  import { toast } from "react-toastify";
  import VisibilityIcon from "@material-ui/icons/Visibility";
  import React, { useState } from "react";
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
    },
    iconcolor: {
      color: "#fff",
  
      "& path": {},
    },
    mainbox: {
      padding: "40px 0 40px",
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
  
  const Ddata = [
    {
      srno: "#1234",
      title: "Prince sharma",
      address: "16-March-2022, 12:30 PM",
      image: "images/nft_img.png",
    },
    {
      srno: "#1235",
      title: "Prince sharma",
      address: "16-March-2022, 12:30 PM",
      image: "images/nft_img.png",
    },
    {
      srno: "#1236",
      title: "Prince sharma",
      address: "16-March-2022, 12:30 PM",
      image: "images/nft_img.png",
    },
    {
      srno: "#1237",
      title: "Prince sharma",
      address: "16-March-2022, 12:30 PM",
      image: "images/nft_img.png",
    },
    {
      srno: "#1238",
      title: "Prince sharma",
      address: "16-March-2022, 12:30 PM",
      image: "images/nft_img.png",
    },
  ];
  
  export default function (props) {
    const [open, setOpen] = React.useState(false);
    const [age, setAge] = useState("");
    const history = useHistory();
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const classes = useStyles();
    const handleChange = (event) => {
      setAge(event.target.value);
    };
    return (
      <Box className={classes.mainbox}>
        <Box className="filterBox">
          <Typography variant="h1">Filter</Typography>
          <Button variant="contained" color="primary" onClick={()=> history.push("/")}>
          Add Privacy
          </Button>
        </Box>
        <Box style={{ marginTop: "-24px" }}>
          <TeamTable />
        </Box>
  
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow className={`${classes.tablerow1} tableHead`}>
                <TableCell>Sr.No.</TableCell>
                <TableCell>Team Member</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Last Update Date & Time</TableCell>
  
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Ddata.map((data) => (
                <TableRow className={classes.tableRow1}>
                  <TableCell>{data.srno}</TableCell>{" "}
                  <TableCell>
                    <img
                      src={data.image}
                      style={{
                        width: "40px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  </TableCell>
                  <TableCell>{data.title}</TableCell>{" "}
                  
                  <TableCell>
                    {data.address}
  
                   
                  </TableCell>
                  <TableCell>
                    <VisibilityIcon
                      style={{
                        fontSize: "20px",
                        color: "#fff",
                        cursor: "pointer",
                      }}
                      onClick={() => history.push("/view-team")}
                    />
                  
                     &nbsp;&nbsp;
                    <EditIcon
                      style={{
                        fontSize: "1.2rem",
                        cursor: "pointer",
                        marginLeft: "7px",
                      }}
                      onClick={() => history.push("/edit-team")}
                      className={classes.iconcolor}
                    />
                    &nbsp;&nbsp;
                    <DeleteIcon
                      onClick={handleClickOpen}
                      style={{
                        fontSize: "1.2rem",
                        marginLeft: "7px",
                        cursor: "pointer",
                      }}
                      className={classes.iconcolor}
                    />
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
  