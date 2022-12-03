import React from "react";
import {
  Grid,
  Box,
  Container,
  Typography,
  makeStyles,
  Button,
  Link,
  Hidden,
} from "@material-ui/core";

import { Link as RouterLink } from "react-router-dom";
import { FaYoutube } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";
const useStyles = makeStyles((theme) => ({
  footerSection: {
    background: theme.palette.background.footercolor,
    // backgroundImage: "url('./images/fly.png')",
    position: "relative",
    padding: "50px 0px",
    backgroundPosition: " bottom left",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(4),
    },
    [theme.breakpoints.up("md")]: {
      paddingTop: theme.spacing(4),
    },
    // "&"
    "& h5": {
      fontWeight: "bold",
      fontSize: "16px",
      letterSpacing: "2px",
      textTransform: "uppercase",
      color: theme.palette.text.secondary,
    },
    "& ul": {
      paddingLeft: "0",
    },
    "& p": {
      marginBottom: "0px",
      marginTop: "10px",
      fontWeight: "500",
      fontSize: "12px",
      lineHeight: "18px",
      color: theme.palette.text.secondary,
    },
  },
  footerBg: {
    position: "absolute",
    bottom: "0",
    width: "100%",
    left: "0",
  },
  ListItem: {
    paddingLeft: "0px",
  },
  borderBottmo: {
    overflow: "hidden",
    background: theme.palette.background.footercolor,
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
    [theme.breakpoints.down("md")]: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
    },
  },
  signupBtn: {
    color: "#fff",
    display: "flex",
    fontSize: "16px",
    fontWeight: "bold",
    height: "45px",
    minWidth: "100px",
    borderRadius: "50px",
    position: "absolute",
    top: "5px",
    right: "5px",
    boxShadow:
      "0px 8px 24px rgba(38, 50, 56, 0.1), 0px 16px 32px rgba(38, 50, 56, 0.08)",
    lineHeight: "36px",
    alignItems: "center",
    textAlign: "center",
    letterSpacing: " 1px",
    background: "#040405",
    "&:hover": {
      background: "#040405",
      color: theme.palette.text.secondary,
    },
  },

  icons: {
    justify: "flex-end",
    [theme.breakpoints.down("sm")]: {
      justify: "center",
    },
  },
  textSection: {
    "& h3": {
      color: "#fff",
      //fontFamily: "'Red Rose', cursive",
      fontSize: "24px",
      fontWeight: "500",
      marginBottom: "30px",
      [theme.breakpoints.down("xs")]: {
        fontSize: "18px",
        marginBottom: "10px",
      },
    },
    "& p": {
      color: "#fff",
      //fontFamily: "'Russo One', sans-serif",
      fontSize: "15px",
      [theme.breakpoints.down("xs")]: {
        fontSize: "13px",
      },
    },
  },
  footerbase: {
    background: theme.palette.background.subfootercolor,
    // backgroundImage: "url('./images/fly.png')",
    position: "relative",
    padding: "15px 0px",
  },
  leftcontent: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    [theme.breakpoints.down("xs")]: {
      // flexDirection: "column",
    },
    "& p": {
      color: "#fff",
      fontSize: "12px",
      marginRight: "15px",
      [theme.breakpoints.down("xs")]: {
        marginBottom: "15px",
      },
    },
  },
  socilaIcons: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    "& svg": {
      color: "#fff",
      fontSize: "15px",
      margin: "0 8px",
      [theme.breakpoints.down("xs")]: {
        fontSize: " 15px",
        marginLeft: "10px",
      },
      "&:hover": {
        color: theme.palette.text.secondary,
        textDecoration: "none",
      },
    },
  },
  rightcontent: {
    display: "flex",
    // alignItems: "center",
    justifyContent: "end",
    [theme.breakpoints.down("xs")]: {
      justifyContent: "end",
    },
    "& p": {
      color: theme.palette.text.secondary,
      fontSize: "12px",
    },
  },
}));

export default function Liquidity() {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.footerSection}>
        <Container>
          <Box>
            <Grid container justify="space-around" spacing={1}>
              <Grid item lg={3} md={3} xs={6} sm={6}>
                <Box className={classes.textSection}>
                  <Typography variant="h3">PRODUCTS </Typography>
                  <Typography variant="body1">Spot</Typography>
                  <Typography variant="body1">Inverse Perpetual</Typography>
                  <Typography variant="body1">USDT Perpetual</Typography>
                  <Typography variant="body1">Inverse Futures</Typography>
                  <Typography variant="body1">Services</Typography>
                </Box>
              </Grid>
              <Grid item lg={3} md={3} xs={6} sm={6}>
                <Box className={classes.textSection}>
                  <Typography variant="h3">SERVICES</Typography>
                  <Typography variant="body1">Buy Crypto</Typography>
                  <Typography variant="body1">Markets</Typography>
                  <Typography variant="body1">Trading Fee</Typography>
                  <Typography variant="body1">Affiliate Program</Typography>
                  <Typography variant="body1">Referral Program</Typography>
                  <Typography variant="body1">API</Typography>
                  <Typography variant="body1">Listing Application</Typography>
                </Box>
              </Grid>
              <Grid item lg={3} md={3} xs={6} sm={6}>
                <Box className={classes.textSection}>
                  <Typography variant="h3">SUPPORT</Typography>
                  <Typography variant="body1">BitcoMine Learn</Typography>
                  <Typography variant="body1">Help Center</Typography>
                  <Typography variant="body1">User Feedback</Typography>
                </Box>
              </Grid>
              <Grid item lg={3} md={3} xs={6} sm={6}>
                <Box className={classes.textSection}>
                  <Typography variant="h3">ABOUT</Typography>
                  <Typography variant="body1">About BitcoMine</Typography>
                  <Typography variant="body1">Authenticity Check</Typography>
                  <Typography variant="body1">Blog</Typography>
                  <Typography variant="body1">Announcements</Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
      <Box className={classes.footerbase}>
        <Container>
          <Grid container>
            <Grid item xs={12} sm={8} md={6} lg={6}>
              <Box className={classes.leftcontent}>
                <Hidden xsDown>
                  <Typography variant="body1">&copy; 2022 Bitcomine</Typography>
                </Hidden>
                <RouterLink
                  to="/terms-condition"
                  style={{ textDecoration: "none" }}
                >
                  <Typography variant="body1">Terms & Conditions</Typography>
                </RouterLink>
                <RouterLink
                  to="privacy-policy"
                  style={{ textDecoration: "none" }}
                >
                  <Typography variant="body1">privacy Policy</Typography>
                </RouterLink>
                <RouterLink to="cookies" style={{ textDecoration: "none" }}>
                  <Typography variant="body1">Cookie Settings</Typography>
                </RouterLink>
              </Box>
            </Grid>

            <Hidden xsDown>
              <Grid item xs={6} sm={4} md={6} lg={6}>
                <Box className={classes.rightcontent}>
                  {/* <Typography variant="body1">Follow Bitcomine On:</Typography> */}
                  <Box className={classes.socilaIcons}>
                    <Link
                      target="_blank"
                      href="https://www.instagram.com/metaknightsnft/"
                    >
                      {" "}
                      <FaInstagram />
                    </Link>
                    <Link
                      target="_blank"
                      href="https://twitter.com/MetaKnightsNFT"
                    >
                      {" "}
                      <FaTwitter />
                    </Link>
                    <Link target="_blank" href="https://discord.gg/YZpk74EJwS">
                      {" "}
                      <FaFacebookF />
                    </Link>
                    <Link
                      target="_blank"
                      href="https://opensea.io/collection/metaknightsnft"
                    >
                      {" "}
                      <FaYoutube />
                    </Link>
                  </Box>
                </Box>
              </Grid>
            </Hidden>

            <Hidden smUp>
              <Grid item xs={6} sm={4} md={6} lg={6}>
                <Box className={classes.leftcontent} justifyContent="start">
                  <Typography variant="body1">
                    {" "}
                    &copy; 2022 Bitcomine
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={4} md={6} lg={6}>
                <Box className={classes.rightcontent}>
                  {/* <Typography variant="body1">Follow Bitcomine On:</Typography> */}
                  <Box className={classes.socilaIcons}>
                    <Link
                      target="_blank"
                      href="https://www.instagram.com/metaknightsnft/"
                    >
                      {" "}
                      <FaInstagram />
                    </Link>
                    <Link
                      target="_blank"
                      href="https://twitter.com/MetaKnightsNFT"
                    >
                      {" "}
                      <FaTwitter />
                    </Link>
                    <Link target="_blank" href="https://discord.gg/YZpk74EJwS">
                      {" "}
                      <FaFacebookF />
                    </Link>
                    <Link
                      target="_blank"
                      href="https://opensea.io/collection/metaknightsnft"
                    >
                      {" "}
                      <FaYoutube />
                    </Link>
                  </Box>
                </Box>
              </Grid>
            </Hidden>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
