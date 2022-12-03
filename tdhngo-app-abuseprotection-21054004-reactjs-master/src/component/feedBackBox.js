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
} from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import Rating from "@material-ui/lab/Rating";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { BiCopy } from "react-icons/bi";
import { toast } from "react-toastify";
import Divider from "@material-ui/core/Divider";
import apiConfig from "src/APIconfig/ApiConfig";
import axios from "axios";
import PageLoading from "src/component/PageLoading";
import StarRatings from "react-star-ratings";
import { convertDateTime } from "src/utils/index";
const useStyles = makeStyles((theme) => ({
  wrapper: {
    paddingTop: "23px",
    paddingBottom: "30px",
    "& h2 ": {},
  },
  container: {
    marginTop: "3rem",
    backgroundColor: "#FEDDB6",
    padding: "25px 40px",
    border: "1px solid #F38500",
    borderRadius: "15px",
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
  const [idd, setIdd] = useState("");
  const [isLoading, setIsLoading] = useState();
  const [_userrating, setUserRating] = useState(0);
  console.log("_userrating====>>12", _userrating);

  const [date, setDate] = useState();
  const [second, setSeconddate] = useState();
  const [userDetails, setUserDetails] = useState("");
  console.log("_userrating-->>>123_userrating", _userrating);
  const { _FeedBack_id } = location.state;
  // let ratingValue;
  const viewUserApiHandler = async () => {
    try {
      setIsLoading(true);
      const res = await axios({
        method: "GET",
        url: apiConfig.feedbackView,
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
        params: {
          feedbackId: _FeedBack_id,
        },
      });
      if (res) {
        setIsLoading(false);
        console.log("PageLoading---->>", res);
        setUserDetails(res.data.result);
        setUserRating(res?.data?.result?.rating);
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
      {console.log("ddhsvfgsdufhudf")}
      <Typography variant="h1">View Feedback</Typography>

      <Divider className={classes.divider} />

      <Container maxWidth="md">
        <Box className={classes.container}>
          <Grid container spacing={1}>
            <Grid item lg={3} md={4} sm={5} xs={12}>
              <Typography variant="h5">User Name &nbsp;:</Typography>
            </Grid>
            <Grid item lg={9} md={6} sm={7} xs={12}>
              <Typography variant="h6" style={{ wordBreak: "Break-all" }}>
                {userDetails?.userId?.userName}
              </Typography>
            </Grid>
            <Grid item lg={3} md={4} sm={5} xs={12}>
              <Typography variant="h5">User ID&nbsp;:</Typography>
            </Grid>
            <Grid item lg={9} md={6} sm={7} xs={12}>
              <Typography variant="h6">
                {userDetails?.userId?.userId}
              </Typography>
            </Grid>
            <Grid item lg={3} md={4} sm={5} xs={12}>
              <Typography variant="h5">Rating&nbsp;:</Typography>
            </Grid>
            <Grid item lg={9} md={6} sm={7} xs={12}>
              <StarRatings
                rating={Number(_userrating)}
                starDimension="40px"
                starSpacing="15px"
              />
            </Grid>

            <Grid item lg={3} md={4} sm={5} xs={12}>
              <Typography variant="h5">Feedback message&nbsp;:</Typography>
            </Grid>
            <Grid item lg={9} md={6} sm={7} xs={12}>
              <Typography variant="h6">{userDetails?.message}</Typography>
            </Grid>
            <Grid item lg={3} md={4} sm={5} xs={12}>
              <Typography variant="h5">Date & Time&nbsp;:</Typography>
            </Grid>
            <Grid item lg={9} md={6} sm={7} xs={12}>
              <Typography variant="h6">
                {convertDateTime(userDetails?.createdAt)}
              </Typography>
            </Grid>
          </Grid>

          <Box mt={4} align="center">
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                history.push("/feedbackMgmt");
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
