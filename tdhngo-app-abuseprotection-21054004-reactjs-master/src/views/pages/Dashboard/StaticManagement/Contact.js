import {
  makeStyles,
  Button,
  Box,
  Grid,
  Typography,
  Container,
  Divider,
} from "@material-ui/core";
import axios from "axios";
import React, { useState, useEffect } from "react";
import apiConfig from "src/APIconfig/ApiConfig";
import DataNotFound from "src/component/DataNotFound";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  pageSection: {
    padding: "23px 0 30px",
    "& p": {
      fontStyle: "regular",
    },
  },
  loremtext: {
    marginTop: "40px",

    "& h1": {
      fontSize: "50px",
      fontWeight: "600",
      color: theme.palette.text.black,

      marginBottom: "20px",
      textAlign: "left",
      [theme.breakpoints.down("sm")]: {
        fontSize: "30px",
      },
    },
    "& p": {
      width: "100%",
      fontSize: "15px",

      textAlign: "left",
      color: theme.palette.text.black,
    },
    "@media(min-width:200px) and (max-width:300px)": {
      "& h1": {
        fontSize: "20px",
      },
    },
  },
  topsection: {
    padding: "15px 0px",
    backgroundColor: " #FEDDB6",
    border: " 1px solid #F38500",
    borderRadius: "15px",
    padding: "1rem",
    "& h4": {
      padding: "10px 0px",
      color: theme.palette.text.black,
    },
    "& h5": {
      padding: "10px 0px",
      color: theme.palette.text.black,
    },
    "& h6": {
      padding: "10px 0px",
      color: theme.palette.text.black,
    },
    "& p": {
      color: theme.palette.text.black,
    },
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
    paddingRight: "50px",
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
  divider: {
    marginTop: "10px",
    backgroundColor: "#F38500",
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

function Become() {
  const classes = useStyles();
  const history = useHistory();
  const [staticData, setStaticData] = useState([]);
  const [isLoading, setLoader] = useState(false);

  return (
    <>
      <Box className={classes.pageSection}>
        <Box className={classes.devicelistHeading}>
          <Typography variant="h1" className="headingText">
            Contact Us{" "}
          </Typography>
        </Box>
        <Divider className={classes.divider} />
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Box className={classes.loremtext}>
              <Box mt={2} className={classes.topsection}>
                {isLoading && <ButtonCircularProgress />}
                <Box mt={2} align="left">
                  {/* <Typography variant="h3">{data?.title}</Typography> */}
                </Box>

                <Box align="left">
                  {/* {isLoading && <ButtonCircularProgress />} */}

                  <Typography variant="h5" style={{ color: "#000" }}>
                    Jun 16, 2022, 3:53:50 PM,
                  </Typography>
                </Box>
                <Box>
                  {/* {isLoading && <ButtonCircularProgress />} */}

                  <Typography variant="h6" style={{ color: "#000" }}>
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout. The point of using Lorem Ipsum is that it has a
                    more-or-less normal distribution of letters, as opposed to
                    using 'Content here, content here', making it look like
                    readable English.
                  </Typography>
                </Box>
              </Box>

              {/* {staticData.length === 0 && <DataNotFound />} */}
              <Box mb={0} className={classes.btnmargin}>
                <Box className={classes.boxbutton}>
                  <Box textAlign="center" style={{ margin: "0px 10px" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => history.push("/contentMgmt")}
                    >
                      BACK
                    </Button>
                  </Box>
                  <Box textAlign="center" className={classes.btnmain}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        history.push({
                          pathname: "/edit-content",
                          search: "Contact",
                        })
                      }
                    >
                      EDIT
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Become;
