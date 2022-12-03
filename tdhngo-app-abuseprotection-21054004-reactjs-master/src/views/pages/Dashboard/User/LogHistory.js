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
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";

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
        fontSize:"15px",
       
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
    srno: "1",

    IP: "173:123:32:23 ",
    Browser: "Mozila ",
    add: "New Delhi, India",
    date: "15-march-2022, 12:30 PM",
  
  },
  {
    srno: "2",

    IP: "173:123:32:23 ",
    Browser: "Mozila ",
    add: "New Delhi, India",
    date: "15-march-2022, 12:30 PM",
  
  },

  {
    srno: "3",

    IP: "173:123:32:23 ",
    Browser: "Mozila ",
    add: "New Delhi, India",
    date: "15-march-2022, 12:30 PM",
  
  },
  {
    srno: "4",

    IP: "173:123:32:23 ",
    Browser: "Mozila ",
    add: "New Delhi, India",
    date: "15-march-2022, 12:30 PM",
  
  },
  {
    srno: "5",

    IP: "173:123:32:23 ",
    Browser: "Mozila ",
    add: "New Delhi, India",
    date: "15-march-2022, 12:30 PM",
  
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
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow className={`${classes.tablerow1} tableHead`}>
              <TableCell>SR. No</TableCell>
              <TableCell>IP Address</TableCell>
              <TableCell>Browser</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Last Active Date & Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Ddata.map((data) => (
              <TableRow className={classes.tableRow1}>
                <TableCell>{data.srno}</TableCell>{" "}
                <TableCell>{data.IP}</TableCell>{" "}
                <TableCell>
                  {data.Browser}
                 
                </TableCell>
                <TableCell>{data.add}</TableCell>
                <TableCell>
                  <Box>{data.date}</Box>
                </TableCell>
               
               
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
