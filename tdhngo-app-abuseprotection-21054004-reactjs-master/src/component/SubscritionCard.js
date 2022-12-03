import { Typography, Box, Button, Paper } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Link, useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  mainbox: {
    textAlign: "center",
    "& h2": {
      fontSize: "20px",
      lineHeight: "38px",
      color: theme.palette.text.black,
    },
    "& h3": {
      fontSize: "36px",
      lineHeight: "38px",
      color: "#e46a76",
      fontWeight: "bold",
    },
  },
  list: {
    fontSize: "14px",
    lineHeight: "28px",
    color: theme.palette.text.black,
  },
  buttonReject: {
    minWidth: "98px",
  },
  kycCard: {
    border: "1px solid #e46a761f",
    color: "#fff",
    background: theme.palette.background.lightblack,

    padding: "15px",
    transition: "all 0.3s ease-in-out",
    transform: "translateY(0px)",
    "&:hover": {
      transform: "translateY(-5px)",
      transition: "all 0.3s ease-in-out",
    },
  },
}));
export default function KycCard({ data, index }) {
  const classes = useStyles();
  return (
    <Box className={classes.kycCard}>
      <Box className={classes.mainbox}>
        <Typography
          variant="h2"
          // className="extra-bold"
          className={classes.heading}
        >
          {data.name}
        </Typography>
        <Typography className="subscriptinheading" variant="h3">
          {" "}
          {data.price}
        </Typography>

        <ul>
          <li align="left" className={classes.list}>
            In publishing and graphic design Lorem .
          </li>
          <li align="left" className={classes.list}>
            In publishing and graphic design Lorem .
          </li>
          <li align="left" className={classes.list}>
            In publishing and graphic design Lorem .
          </li>
          <li align="left" className={classes.list}>
            In publishing and graphic design Lorem .
          </li>
        </ul>
      </Box>

      <Box mt={2} align="center">
       
        <Button
          variant="contained"
          color="primary"
          style={{ marginLeft: "10px", backgroundColor: "#625e5e" }}
        >
          Snifer
        </Button>

        <Button
          variant="contained"
          style={{ marginLeft: "10px", background: "green" }}
          color="primary"
        >
          Active
        </Button>
      </Box>
    </Box>
  );
}
