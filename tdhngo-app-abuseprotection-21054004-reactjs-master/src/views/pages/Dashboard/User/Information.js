import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Container,
  Typography,
  makeStyles,
  Button,
  IconButton,
  withStyles,
} from "@material-ui/core";
import axios from "axios";
import { GrFormView } from "react-icons/gr";
import Paper from "@material-ui/core/Paper";
import apiConfig from "src/APIconfig/ApiConfig";
import { toast } from "react-toastify";
import { sortAddress } from "src/utils/index";
import { BiCopy } from "react-icons/bi";
import CopyToClipboard from "react-copy-to-clipboard";
import moment from "moment";

import { Link, useLocation } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  bannerBox: {
    "& h3": {
      fontSize: "35px",
      fontWeight: "bold",
      lineHeight: "55px",
      color: "#fff",
      "@media (max-width: 767px)": {
        fontSize: "23px",
        lineHeight: "30px",
      },
    },
  },

  inputBox: {
    width: "100%",
    height: "45px",
    background: "#090c16",
    border: "1px solid #8a8b8b",
    color: "#fff",
    padding: "7px",
  },
  Main: {
    border: "1px solid #01FBB4",

    padding: "25px",
    background:
      "linear-gradient(152.97deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)",
    boxShadow: "0px 0px 53px rgb(0 0 0 / 25%)",
    borderRadius: "5px",
    backdropFilter: "blur(5px)",
    "&:hover": {
      boxShadow:
        "0 0 1rem #1eb80873, 0 0 0rem #1eb80873, 0 0 1rem #1eb80880, 0 0 4rem #1eb80866",
    },
  },

  inputBox: {
    width: "70%",
    height: "50px",
    background: "#090c16",
    border: "1px solid #8a8b8b",
    borderRadius: "5px",
    color: "#fff",
    padding: "7px",
    marginRight: "14px",

    "&:focus-visible": {
      outline: "none",
    },

    "@media (max-width: 767px)": {
      width: "100%",
    },
  },

  textBox: {
    fontSize: "16px",
    color: "#fff",
    fontWeight: "bold",
  },
  textBox1: {
    fontSize: "15px",
    color: "#fff",
    wordBreak: "break-all",
  },
  textBox2: {
    fontSize: "14px",
    color: "rgb(3 201 215)",
    marginTop: "20px",
  },

  nameBox: {
    "& h4": {
      fontSize: "20px",

      lineHeight: "55px",
      color: "#e46a76",
    },

    "& img": {
      width: "50px",
      height: "50px",
      borderRadius: "50%",
    },
  },

  copy: {
    "& svg": {
      fontSize: "30px",
    },

    "& p": {
      color: theme.palette.text.black,

      fontSize: "14px",
      [theme.breakpoints.down("md")]: {
        fontSize: "7px",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "8px",
      },
    },
  },
  devicelistHeading: {
    "& h3": {
      padding: "1rem 0",
      color: theme.palette.text.black,
    },
  },

  bannerBox: {
    padding: "50px 0 30px",
    "& figure": {
      width: "200px",
      height: "200px",
      margin: "auto",
      overflow: "hidden",
      borderRadius: "50%",
      marginBottom: "20px",
      "& img ": {
        width: "100%",
        height: "100%",
        borderRadius: "50%",
      },
    },
  },
  Profileimg: {
    border: "2px solid #083107",
    "@media (max-width: 375px)": {
      width: "200px",
    },
    "@media (max-width: 470px)": {
      width: "200px",
    },
  },
}));

export default function BestSeller(props) {
  const classes = useStyles();

  const location = useLocation();
  const id = location.state;
  console.log("lsakdfj", location.state);
  const [isLoading, setIsLoading] = useState(false);
  const [idd, setIdd] = useState("");
  const [viewUserData, setViewUserData] = useState([]);
  console.log("mydatatdata", viewUserData);

  const ViewUSerAPi = async () => {
    try {
      setIsLoading(true);
      const res = await axios({
        method: "GET",
        url: apiConfig.viewUser + "?_id=" + id,
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
      });
      if (res.data.statusCode === 200) {
        console.log("afkjhsakdjlfbg", res);
        setViewUserData(res.data.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      ViewUSerAPi();
    }
  }, [id]);

  return (
    <Box className={classes.bannerBox}>
      <Box mt={1} mb={5} className={classes.Main}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Box align="left">
              <figure style={{ margin: "0 auto" }}>
                <img
                  src={viewUserData.profilePic}
                  className={classes.Profileimg}
                  style={{ borderRadius: "50%" }}
                />
              </figure>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} lg={8} align="left">
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="h5" className={classes.textBox}>
                  Username
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6" className={classes.textBox1}>
                  {viewUserData.userType}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h5" className={classes.textBox}>
                  User Wallet Address:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6" className={classes.textBox1}>
                  {sortAddress(viewUserData.walletAddress)}
                  <CopyToClipboard text={viewUserData.address}>
                    <BiCopy
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() => toast.success("Copied successfully")}
                    />
                  </CopyToClipboard>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h5" className={classes.textBox}>
                  User Registration Date & Time:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6" className={classes.textBox1}>
                  {moment(viewUserData.createdAt).format("DD/MM/YYYY hh:mm A")}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h5" className={classes.textBox}>
                  Status
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6" className={classes.textBox1}>
                  {viewUserData.status}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h5" className={classes.textBox}>
                  Gender
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6" className={classes.textBox1}>
                  Male
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h5" className={classes.textBox}>
                  Date of Birth :
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6" className={classes.textBox1}>
                  16-July-2022
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h5" className={classes.textBox}>
                  Weight
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6" className={classes.textBox1}>
                  80 Kg
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h5" className={classes.textBox}>
                  Height
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6" className={classes.textBox1}>
                  5.6 Cm
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h5" className={classes.textBox}>
                  Email
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6" className={classes.textBox1}>
                  re-prince@indicchain.com
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
