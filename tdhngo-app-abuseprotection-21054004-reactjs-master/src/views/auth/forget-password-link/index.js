import React from "react";
import "src/scss/main.css";
import Logo from "src/component/Logo";
import { BsCheckCircle } from "react-icons/bs";
import { Typography, Grid, Link, Box, makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  headbox: {
    background: theme.palette.background.dark1,
    "& h5": {
      color: theme.palette.text.black,
    },
    "& p": {
      color: theme.palette.text.black,
    },
    "& svg": {
      color: theme.palette.text.black,
    },
  },
}));
function ForgetasswordLink(props) {
  const classes = useStyles();

  return (
    <Box className={classes.headbox}>
      <Grid container>
        <Grid sm={3} md={4} />
        <Grid
          className="d-flex"
          container
          sm={6}
          md={4}
          direction={"column"}
          spacing={1}
          style={{ textAlign: "center", height: "100vh" }}
        >
          <Grid item>
            <Logo
              width="180"
              style={{ padding: "30px 0", cursor: "pointer" }}
            />
            <BsCheckCircle
              display="block"
              fontSize="80"
              style={{ margin: "0 auto" }}
              className={classes.checkicon1}
            />
            <Typography variant="h5" className="extra-bold">
              Instructions sent!
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" className="padding10">
              We have Sent you instructions on your mail <b>mail@mail.com</b>
              .please check and follow the steps.
            </Typography>
          </Grid>

          <Grid item>
            <Typography
              color="primary.main"
              variant="body2"
              style={{ marginTop: "20px" }}
            >
              <Link href="#">Back To Login</Link>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ForgetasswordLink;
