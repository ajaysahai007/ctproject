import React from "react";
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
  TextField,
} from "@material-ui/core";

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
   
    paddingTop: "10px",
    maxWidth:"400px",
    margin:"auto",

    "& input": {
      border: "none",
      outline: "none",
      padding: "12px",
      minWidth: "352px",
      width: "100%",
      color: "#9a9a9a",
    },
  },
  subsocial: {
    cursor: "pointer",
    display: "flex",
    // border: "1px solid #80808038",
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

  return (
    <Page title="KYC">
      <container maxWeight="sm">
        <Box className={classes.mainbox}>
          <Grid container spacing={4} align="center">
            <Grid item xs={12} sm={12} md={12}>
              <Box className={classes.devicelistHeading}>
                <img src="images/Vector 83.png" className="icon1" />
                <Typography variant="h1" className="headingText">
                  Edit Links
                </Typography>
                <img src="images/Vector 80.png" className="icon2" />
              </Box>
              <Divider style={{ marginTop: "30px" }} />
              <Box mt={6}>
                <Box style={{color:"#fff",marginLeft:"2px"}}>
                  <label >Social Link</label>
                </Box>

                <Box className={classes.mainSocail}>
                  <Box className={classes.subsocial}>
                    <TextField variant="outlined"
                    placeholder="https://www.facebook.com"
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
                      BACK
                    </Button>
                  </Box>
                  <Box textAlign="center" className={classes.btnmain}>
                    <Button variant="contained" color="primary">
                      Update
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
