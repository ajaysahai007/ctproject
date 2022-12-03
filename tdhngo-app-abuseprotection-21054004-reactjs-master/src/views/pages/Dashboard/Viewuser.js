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
import axios from "axios";
import { convertDateTime } from "src/utils/index";

import { KeyboardDatePicker } from "@material-ui/pickers";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { BiCopy } from "react-icons/bi";
import { toast } from "react-toastify";
import Divider from "@material-ui/core/Divider";
import apiConfig from "../../../APIconfig/ApiConfig";

const useStyles = makeStyles((theme) => ({
  profileCircle: {
    width: "100px",
    // padding
    height: "200px",
    padding: "0px 50px",
    borderRadius: "50%",
    background: "#f3850096",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  MainprofileCircle: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
  },
  wrapper: {
    paddingTop: "23px",
    paddingBottom: "30px",
    "& h5 ": {
      lineHeight: "33px",
    },
  },
  container: {
    marginTop: "3rem",
    backgroundColor: "#FEDDB6",
    border: "1px solid #F38500",
    padding: "25px 40px",
    borderRadius: "15px",
  },
  upload: {
    width: "250px",
    // height: "150px",
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
  gridBox: {
    [theme.breakpoints.down("md")]: {
      display: "flex",
      justifyContent: "center",
    },
  },
  FirsrLatter: {
    fontSize: "140px",
    marginTop: "-20px",
    "@media(max-width:514px)": {
      fontSize: "80px",
      marginTop: "-20px",
    },
  },
}));

function Viewuser(props) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [idd, setIdd] = useState(location.state.id);
  const [userDetails, setUserDetails] = useState("");
  const [_firststring, setFirstString] = useState("");
  const viewUserApiHandler = async () => {
    try {
      setIsLoading(true);
      const res = await axios({
        method: "GET",
        url: apiConfig.viewUsers,
        params: {
          userId: idd,
        },
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
      });
      if (res?.status === 200) {
        console.log("location-->>>-->>", res);
        setIsLoading(false);
        setUserDetails(res?.data?.result);
        setFirstString(res?.data?.result?.userName);
        toast.success("User details!");
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
      <Typography variant="h1">User Details</Typography>

      <Divider className={classes.divider} />

      <Box className={classes.container}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={4} lg={4} className={classes.gridBox}>
            <Box className={classes.MainprofileCircle}>
              <Box className={classes.profileCircle}>
                <Typography className={classes.FirsrLatter}>
                  {_firststring.charAt(0)}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={8}
            lg={8}
            style={{ display: "flex", alignItems: "center" }}
          >
            <Grid container spacing={1}>
              <Grid item lg={5} md={5} sm={5} xs={12}>
                <Typography variant="h5">User Name&nbsp;:</Typography>
              </Grid>
              <Grid item lg={7} md={7} sm={7} xs={12}>
                <Typography variant="h6">
                  {" "}
                  {userDetails?.userName ? userDetails?.userName : "--"}
                </Typography>
              </Grid>
              <Grid item lg={5} md={5} sm={5} xs={12}>
                <Typography variant="h5">District:</Typography>
              </Grid>
              <Grid item lg={7} md={7} sm={7} xs={12}>
                <Typography variant="h6">
                  {userDetails?.districs ? userDetails?.districs : "--"}
                </Typography>
              </Grid>
              <Grid item lg={5} md={5} sm={5} xs={12}>
                <Typography variant="h5">State:</Typography>
              </Grid>
              <Grid item lg={7} md={7} sm={7} xs={12}>
                <Typography variant="h6">
                  {userDetails?.states ? userDetails?.states : "--"}
                </Typography>
              </Grid>
              <Grid item lg={5} md={5} sm={5} xs={12}>
                <Typography variant="h5">Created date & time:</Typography>
              </Grid>
              <Grid item lg={7} md={7} sm={7} xs={12}>
                <Typography variant="h6">
                  {convertDateTime(
                    userDetails?.date ? userDetails?.date : "--"
                  )}
                </Typography>
              </Grid>

              <Grid item lg={5} md={5} sm={5} xs={12}>
                <Typography variant="h5">Status :</Typography>
              </Grid>
              <Grid item lg={7} md={7} sm={7} xs={12}>
                <Typography variant="h6">{userDetails?.status}</Typography>
              </Grid>
              <Grid item lg={5} md={5} sm={5} xs={12}>
                <Typography variant="h5">Summary:</Typography>
              </Grid>
              <Grid item lg={7} md={7} sm={7} xs={12}>
                <Typography variant="h6">
                  {userDetails?.summary ? userDetails?.summary : "--"}
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
              history.push("/users");
            }}
          >
            Back
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
export default Viewuser;
