import React, { useRef } from "react";
import {
  Button,
  Grid,
  Box,
  InputAdornment,
  FormControl,
  Typography,
  OutlinedInput,
  InputLabel,
  TextField,
  Divider,
} from "@material-ui/core";
import Page from "src/component/Page";
import { FaPlus, FaSearch } from "react-icons/fa";
import { makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import JoditEditor from "jodit-react";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingRight: 0,
  },
  inputAdornment: {
    backgroundColor: "#f5d5da",
    height: 40,
    maxHeight: 40,
    paddingRight: 10,
    paddingLeft: 10,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  mainbox: {
    padding: "23px 0 30px",
  },

  iconcolor: {
    backgroundColor: "#f5f5f5",
    padding: "16px",
    color: "#8a3ab9",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  iconcolor2: {
    cursor: "pointer",
    backgroundColor: "#00acee",
    padding: "16px",
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  iconcolor3: {
    cursor: "pointer",
    backgroundColor: "#ff0000",
    padding: "16px",
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  iconcolor4: {
    cursor: "pointer",
    backgroundColor: "#3b5998",
    padding: "16px",
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  iconcolor5: {
    cursor: "pointer",
    backgroundColor: "#f5f5f5",
    padding: "16px",
    color: "#54b6e7",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  iconcolor6: {
    cursor: "pointer",
    backgroundColor: "#7d9bff",
    padding: "16px",
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  mainSocail: {
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
  placeholdercolor: {
    "& input": {
      color: theme.palette.text.black,
      "&::placeholder": {
        color: theme.palette.text.black,
      },
    },
    "& textarea": {
      color: theme.palette.text.black,

      "&::placeholder": {
        color: theme.palette.text.black,
      },
    },
  },
}));

export default function KycList() {
  const classes = useStyles();
  const history = useHistory();
  const editor = useRef(null);
  return (
    <Page title="KYC">
      <Box className={classes.mainbox}>
        <Box className={classes.devicelistHeading}>
          
          <Typography variant="h1" className="headingText">
            Edit Content
          </Typography>
          
        </Box>
        <Divider style={{ marginTop: "30px" }} />

        <Grid container spacing={4} align="center">
          <Grid item xs={12} sm={2} md={2} lg={2}></Grid>
          <Grid item xs={12} sm={8} md={8}>
            <Box style={{ marginTop: "30px" }}>
              <JoditEditor
                ref={editor}
                // value={description}
                // config={config}
                tabIndex={1} // tabIndex of textarea
                // onBlur={(e) => setDescription(e)}
                onChange={(newContent) => {}}
              />
            </Box>
            {/* <input  rows={4} placeholder="https:twitter.com"  /> */}

            <Box mb={0} className={classes.btnmargin}>
              <Box className={classes.boxbutton}>
                <Box textAlign="center" style={{ margin: "0px 10px" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => history.push("/resouceMgmt")}
                  >
                    BACK
                  </Button>
                </Box>
                <Box textAlign="center" className={classes.btnmain}>
                  <Button variant="contained" color="primary">
                    UPDATE
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={2} md={2} lg={2}></Grid>
        </Grid>
      </Box>
    </Page>
  );
}
