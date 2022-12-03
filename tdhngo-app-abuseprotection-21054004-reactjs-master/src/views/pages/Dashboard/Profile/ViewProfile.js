import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Button,
  Box,
  Typography,
  FormControl,
  makeStyles,
  IconButton,
  InputAdornment,
  TextField,
} from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import PageLoading from "src/component/PageLoading";

import { KeyboardDatePicker } from "@material-ui/pickers";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { BiCopy } from "react-icons/bi";
import { toast } from "react-toastify";
import Divider from "@material-ui/core/Divider";
import apiConfig from "src/APIconfig/ApiConfig.js";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    paddingTop: "23px",
    paddingBottom: "30px",
    "& h2 ": {},
  },
  container: {
    marginTop: "3rem",
    backgroundColor: "#FEDDB6",
    border: "1px solid #F38500",
    padding: "25px 40px",
    borderRadius: "15px",
  },
  upload: {
    width: "150px",
    height: "150px",
    margin: "16px 0",
    cursor: "pointer",
    borderRadius: "20px",
    position: "relative",
    "& img": {
      width: "100%",
      height: "100%",
      border: "1px solid #F38500",
      // borderRadius: "50%",
      objectFit: "cover",
    },
  },
  typo: {
    marginLeft: "3rem",
  },
  btn: {
    textAlign: "center",
    paddingTop: "20px",
  },
  typo: {
    marginBottom: "5px",
  },
  divider: {
    marginTop: "10px",
    backgroundColor: "#F38500",
  },
  walletcopy: {
    "& h6": {
      wordBreak: "break-word",
    },
  },
}));

function Viewuser() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  //   const [idd, setIdd] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  //   const [date, setDate] = useState();
  //   const [second, setSeconddate] = useState();
  const [userDetails, setUserDetails] = useState("");
  console.log("userDetails-->>", userDetails);

  const viewUserApiHandler = async () => {
    try {
      setIsLoading(true);
      const res = await axios({
        method: "GET",
        url: apiConfig.getProfile,
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
      });
      if (res?.status) {
        setIsLoading(false);

        console.log("res-->>", res);
        setUserDetails(res.data.result);
      }
    } catch (error) {
      setIsLoading(false);

      console.log(error);
    }
  };

  useEffect(() => {
    viewUserApiHandler();
  }, []);

  return (
    <Box className={classes.wrapper}>
      {isLoading ? <PageLoading /> : ""}

      <Typography variant="h1">View Profile</Typography>

      <Divider className={classes.divider} />

      <Container maxWidth="md">
        <Box className={classes.container}>
          <Grid container spacing={1}>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <figure className={classes.upload}>
                <img src={userDetails?.profilePic} />
              </figure>
            </Grid>
            <Grid item xs={12} sm={3} md={3} lg={3}></Grid>
            <Grid item xs={12} sm={9} md={9} lg={9}>
              <Grid container spacing={2}>
                <Grid item lg={6} md={6} sm={6} xs={6}>
                  <Typography variant="h6">Name &nbsp;:</Typography>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={6}>
                  <Typography variant="h6" style={{ wordBreak: "Break-all" }}>
                    {userDetails?.userName}
                  </Typography>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={6}>
                  <Typography variant="h6">Email&nbsp;:</Typography>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={6}>
                  <Typography variant="h6" style={{ wordBreak: "Break-all" }}>
                    {" "}
                    {userDetails?.email}
                  </Typography>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={6}>
                  <Typography variant="h6">Mobile Number&nbsp;:</Typography>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={6}>
                  <Typography variant="h6">
                    {" "}
                    {userDetails?.mobileNumber}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Box mt={4} align="center">
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                history.push("/dashboard");
              }}
            >
              Back
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
export default Viewuser;
