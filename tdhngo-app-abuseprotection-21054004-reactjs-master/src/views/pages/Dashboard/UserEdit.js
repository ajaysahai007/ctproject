import React from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core";
import { GoVerified } from "react-icons/go";
const useStyles = makeStyles((theme) => ({
  mainbox: {
    color:"#fff",
    padding: "50px 0 30px",
    "& h3": {
      fontSize: "25px",
      fontWeight: "500",
      color:"#fff",
      // color: "rgba(0, 0, 0, 0.87)",
    },
    "& h4": {
      fontSize: "14px",
      fontWeight: "600",
      color: "rgba(0, 0, 0, 0.87)",
    },
    "& p": {
      fontSize: "14px",
      fontWeight: "400",
      color: "rgba(0, 0, 0, 0.87)",
      marginTop: "10px",
    },
  },
  button: {
    //border: '2px solid #3f78e0',
    borderRadius: "5px",
    minHeight: "39px",
    color: "rgb(255, 255, 255)",
    backgroundColor: "rgb(228, 106, 118)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    lineHeight: "1.5",
    fontWeight: "500",
    transition: "0.26s ease",
    minWidth: "64px",
    paddingBottom: "3px",
    textTransform: "capitalize",
    marginRight: "15px",
    marginBottom: "10px",
    marginTop: "27px",
  },
  devicelistHeading: {
    color:"#fff",
    "& h3": {
      padding: "0px 0 10px 0",
      color: theme.palette.text.black,
    },
  },
  leftbox: {
   
    padding: "20px",
    "& h3": {
      fontSize: "25px",
      fontWeight: "500",
      color:"#fff",
      // color: "rgba(0, 0, 0, 0.87)",
    },
    "& h4": {
      fontSize: "14px",
      fontWeight: "600",
      color: "rgba(0, 0, 0, 0.87)",
    },
    "& p": {
      fontSize: "14px",

      color: theme.palette.text.black,

      marginTop: "10px",
      fontWeight: "500",
    },
  },
  boxImage: {
    position: "relative",
    display: "inline-block",
    width: "125px",
    "& span": {
      position: "absolute",
      top: "10px",
      right: "10px",
    },
  },
  box: { position: "relative", padding: "25px" },
  buttonApprove: {
    borderRadius: "5px",
    minHeight: "39px",
    color: "rgb(255, 255, 255)",
    backgroundColor: "rgb(228, 106, 118)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    lineHeight: "1.5",
    fontWeight: "500",
    transition: "0.26s ease",
    minWidth: "64px",
    paddingBottom: "3px",
    textTransform: "capitalize",
    marginRight: "15px",
    marginBottom: "10px",
    marginTop: "27px",
    backgroundColor: "rgb(3, 201, 215)",
  },

  buttonReject: {
    color: "rgb(255, 255, 255)",
    display: "flex",
    fontSize: "14px",
    minWidth: "155px",
    marginTop: "27px",
    minHeight: "39px",
    transition: "0.26s ease",
    alignItems: "center",
    fontWeight: "500",
    lineHeight: "1.5",
    marginRight: "15px",
    borderRadius: "5px",
    marginBottom: "10px",
    paddingBottom: "3px",
    textTransform: "capitalize",
    justifyContent: "center",
    backgroundColor: "rgb(228, 106, 118)",
  },
  inputFile: {
    border: "1px solid #c4c4c4",
    borderRadius: "4px",
    padding: "10px",
    width: "95%",
    [theme.breakpoints.down("xs")]: {
      width: "92%",
    },
  },
  addadd: {
    color:"fff",
    "& input": {
      color: theme.palette.text.black,
      "& svg": {
        color: theme.palette.text.black,
      },

      "&::placeholder": {
        color: theme.palette.text.black,
      },
    },
  },
}));
function EditAdd() {
  const classes = useStyles();

  return (
    <Box className={classes.mainbox}>
      <Box className={classes.devicelistHeading}>
        <Typography variant="h3" color="primary">Edit User Management</Typography>
      </Box>
      <hr />
      <Container maxWidth="sm">
        <Paper elevation={1}>
          <Box className={classes.leftbox} mt={5}>
          
            <Box mt={3} className={classes.addadd}>
              <Box mb={1}>
                <Typography>Name</Typography>
              </Box>
              <TextField
                variant="outlined"
                type="text"
                fullWidth
                // placeholder="Add heading"
                className={classes.text}
                //   value="Nirav Joshi"
              />
            </Box>
            <Box mt={3} className={classes.addadd}>
              <Box mb={1}>
                <Typography>User ID</Typography>
              </Box>
              <TextField
                variant="outlined"
                // type="date"
                fullWidth
                className={classes.text}
                // value="nirav@gadga.com"
              />
            </Box>
            <Box mt={3} className={classes.addadd}>
              <Box mb={1}>
                <Typography>Pan Card No.</Typography>
              </Box>
              <TextField
                variant="outlined"
                type="text"
                fullWidth
                className={classes.text}
                // value="561984651"
              />
            </Box>
            <Box mt={3} className={classes.addadd}>
              <Box mb={1}>
                <Typography>Voter card No.</Typography>
              </Box>
              <TextField
                variant="outlined"
                type="link"
                fullWidth
                placeholder="Add link"
                className={classes.text}
                //   value="Hosting Press HTML"
              />
            </Box>
            <Box mt={3} className={classes.addadd}>
              <Box mb={1}>
                <Typography>Driving Licence No.</Typography>
              </Box>
              <TextField
                variant="outlined"
                type="link"
                fullWidth
                placeholder="Add link"
                className={classes.text}
                //   value="Hosting Press HTML"
              />
            </Box>
            <Box mt={3} className={classes.addadd}>
              <Box mb={1}>
                <Typography>Mobile Number</Typography>
              </Box>
              <TextField
                variant="outlined"
                type="link"
                fullWidth
                placeholder="Add link"
                className={classes.text}
                //   value="Hosting Press HTML"
              />
            </Box>
            <Box mt={3} className={classes.addadd}>
              <Box mb={1}>
                <Typography>Email Address</Typography>
              </Box>
              <TextField
                variant="outlined"
                type="link"
                fullWidth
                placeholder="Add link"
                className={classes.text}
                //   value="Hosting Press HTML"
              />
            </Box>
            <Box mt={3} className={classes.addadd}>
              <Box mb={1}>
                <Typography>Address:</Typography>
              </Box>
              <TextField
                variant="outlined"
                type="link"
                fullWidth
                placeholder="Add link"
                className={classes.text}
                //   value="Hosting Press HTML"
              />
            </Box>

            <Box mt={2} style={{ display: "flex" }}>
              <Button variant="contained" className={classes.buttonApprove}>
                Submit
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default EditAdd;
