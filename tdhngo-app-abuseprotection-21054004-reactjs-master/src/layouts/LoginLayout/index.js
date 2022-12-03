import React from "react";
import PropTypes from "prop-types";
import {
  makeStyles,
  Grid,
  Box,
  Container,
  Typography,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  content: {
    // height: "100vh",
    overflowX: "auto",
    background: theme.palette.background.dark1,
    [theme.breakpoints.down("sm")]: {
      height: "auto",
      overflow: "unset",
    },
  },
  left: {
    height: "100vh",
    [theme.breakpoints.down("sm")]: {
      height: "auto",
    },
    [theme.breakpoints.down("xs")]: {},
  },
  box: {
    background: theme.palette.background.lightblack,

    [theme.breakpoints.down("sm")]: {
      paddingBottom: "50px",
    },
  },
  centro: {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  opener: {
    // "@media(min-width:1280px)":{
    //   display:"none"
    // },
  },
  headBox: {},
  logBox: {
    // padding:"150px 20px 0px",
    [theme.breakpoints.down("md")]: {
      padding: "50px 60px",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "60px 40px",
    },
    [theme.breakpoints.down("xs")]: {
      padding: "70px 20px",
    },
  },
  loginBox: {
    background: "url('./images/background.png')",
    height: "100vh",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    "& h1": {
      [theme.breakpoints.down("sm")]: {
        fontSize: "30px",
      },
    },
  },
  gridView: {
    "@media(max-width:600px)": {
      display: "none",
    },
  },
  imgBox: {
    maxWidth: "300px",
    margin: "auto",
    marginBottom: "50px",
    "@media(max-width:600px)": {
      maxWidth: "120px",
    },
  },
  leftImg: {
    marginTop: "20px",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "150px",
      marginTop: "10px",
    },
  },
  PdTp: {
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  left: {
    height: "100vh",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  mainbox: {
    boxShadow: "0px 30px 30px rgba(0, 0, 0, 0.3)",
    backdropFilter: "blur(42px)",
    background:
      "linear-gradient(to bottom, rgb(255, 255, 255) 0%, rgb(250, 213, 168) 40%, rgb(249, 191, 121) 60%, rgb(247, 168, 75) 80%, rgb(245, 146, 27) 100%)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  content: {
    // height: "100vh",

    overflowX: "auto",
    // background: "#000",
    backgroundColor: "#fff",
    color: "#fff",
  },
}));

const LoginLayout = ({ children }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <>
      <Box className={classes.headBox}></Box>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={6} className={classes.left}>
          <Box
            className={classes.mainbox}
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <Box className="signupmain">
              {window.location.pathname === "/login" ||
              window.location.pathname === "/" ? (
                <Box display="flex" justifyContent="center">
                  <Typography
                    variant="h5"
                    style={{ fontSize: "30px", color: "#000" }}
                  >
                    Welcome Back
                  </Typography>
                </Box>
              ) : (
                ""
              )}

              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                style={{ cursor: "pointer" }}
              >
                <img
                  src="/images/loginFlow.png"
                  style={{ width: "250px", margin: "20px 0" }}
                  alt=""
                  onClick={() => history.push("/")}
                />
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6} className={classes.PdTp}>
          <Container>
            <Box className={classes.logBox}>
              <Box className={classes.imgBox}>
                <img
                  className={classes.opener}
                  src="./images/logo.png"
                  alt="LOGO for MOVE2EARN"
                  width="100%"
                />
              </Box>

              <Container>
                <Box
                  className={classes.content}
                  style={{ margin: "auto", maxWidth: "500px" }}
                >
                  {children}
                </Box>
              </Container>
            </Box>
          </Container>
        </Grid>
      </Grid>
    </>
  );
};

LoginLayout.propTypes = {
  children: PropTypes.node,
};

export default LoginLayout;
