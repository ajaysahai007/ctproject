import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  Box,
  InputAdornment,
  FormControl,
  Typography,
  OutlinedInput,
  InputLabel,
  Divider,
} from "@material-ui/core";
import axios from "axios";
import apiConfig from "src/APIconfig/ApiConfig";
import DataNotFound from "src/component/DataNotFound";
import Page from "src/component/Page";
import { FaPlus, FaSearch } from "react-icons/fa";
import { makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import InstagramIcon from "@material-ui/icons/Instagram";
import YouTubeIcon from "@material-ui/icons/YouTube";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import { FaDiscord } from "react-icons/fa";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingRight: 0,
  },

  mainbox: {
    padding: "23px 0 30px",
  },

  mainSocail: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "10px",
    display: "flex",

    "& input": {
      border: "none",
      outline: "none",
      padding: "8px",
      minWidth: "352px",
      width: "100%",
      color: "#9a9a9a",
    },
  },
  subsocial: {
    cursor: "pointer",
    display: "flex",
    border: "1px solid #80808038",
  },
  iconPart: {
    color: "hsl(198deg 86% 53%)",
    background: "hsl(0deg 0% 96%)",
    padding: "8px",
  },
  iconPart1: {
    color: "hsl(1deg 93% 56%)",
    background: "hsl(0deg 0% 96%)",
    padding: "8px",
  },
  iconPart2: {
    color: "hsl(221deg 44% 41%)",
    background: "hsl(0deg 0% 96%)",
    padding: "8px",
  },
  iconPart3: {
    color: "hsl(279deg 45% 68%)",
    background: "hsl(0deg 0% 96%)",
    padding: "8px",
  },
  btnmargin: {
    marginTop: "30px",

    "@media(max-width:767px)": {
      marginTop: "20px",
    },
  },
  boxbutton: {
    display: "flex",
    alignItems: "center",
    marginTop: "10px",

    justifyContent: "center",
    // paddingRight: "50px",
    "@media(max-width:960px)": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    "@media(max-width:375px)": {
      // display: 'grid',
      alignItems: "center",
      justifyContent: "center",
    },
  },
  btnmain: {
    textAlign: "center",
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
}));

export default function KycList() {
  const classes = useStyles();
  const history = useHistory();
  const [staticLinks,setStaticLinks] = useState([])
  const [isLoading, setLoader] = useState(false);
  // Api integration
console.log("asdadqwdadsczxcvz",staticLinks);
  const UserListApi = async () => {
    setLoader(true);
    try {
      const res = await axios.get(
        apiConfig.staticLinK,

        {
          headers: {
            token: window.sessionStorage.getItem("token"),
          },
        }
      );
      if (res.data.statusCode === 200) {
        setStaticLinks(res.data.result);
        // console.log("saffkjadbf", res);
        // toast.success("Data found Sucessfully.");
        // const aboutdata = res.data.result.filter((data) => {
        //   return data?.title === "About Us";
        // });

        setLoader(false);
      }
    } catch (error) {
      console.log("ERROR", error);
      setLoader(false);
    }
  };
  useEffect(() => {
    UserListApi();
  }, []);
  // End APi
  return (
    <Page title="KYC">
      <container maxWeight="sm">
        <Box className={classes.mainbox}>
          <Grid container spacing={4} align="center">
            <Grid item xs={12} sm={12} md={12}>
              <Box className={classes.devicelistHeading}>
                <img src="images/Vector 83.png" className="icon1" />
                <Typography variant="h1" className="headingText">
                  Social Links
                </Typography>
                <img src="images/Vector 80.png" className="icon2" />
              </Box>
              <Divider style={{ marginTop: "30px" }} />
              <Box mt={6}>
                <Box className={classes.mainSocail}>
                  <Box className={classes.subsocial}>z
                    <TwitterIcon className={classes.iconPart} />
                    <input
                      // placeholder="https:twitter.com"
                      value={staticLinks[1]?.url}
                    />
                  </Box>
                </Box>
                <Box className={classes.mainSocail}>
                  <Box className={classes.subsocial}>
                    <YouTubeIcon className={classes.iconPart1} />
                    <input
                      // placeholder="https:twitter.com"
                      value={staticLinks[2]?.url}
                    />
                  </Box>
                </Box>
                <Box className={classes.mainSocail}>
                  <Box className={classes.subsocial}>
                    <FacebookIcon className={classes.iconPart2} />
                    <input
                      // placeholder="https:twitter.com"
                      value={staticLinks[0]?.url}
                    />
                  </Box>
                </Box>
                <Box className={classes.mainSocail}>
                  <Box className={classes.subsocial}>
                    <InstagramIcon className={classes.iconPart3} />
                    <input
                      placeholder="https:twitter.com"
                      value={staticLinks[3]?.url}
                    />
                  </Box>
                </Box>
                <Box className={classes.mainSocail}>
                  <Box className={classes.subsocial}>
                    <FaDiscord className={classes.iconPart3} />
                    <input
                      // placeholder="https:twitter.com"
                      value={staticLinks[4]?.url}
                    />
                  </Box>
                </Box>
              </Box>

              <Box mb={0} className={classes.btnmargin}>
                <Box className={classes.boxbutton}>
                  <Box textAlign="center" style={{ margin: "0px 10px" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      component={Link}
                      to="/resouceMgmt"
                    >
                      Back
                    </Button>
                  </Box>
                  <Box textAlign="center" className={classes.btnmain}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => history.push("/edit-links")}
                    >
                      Edit
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </container>
    </Page>
  );
}
