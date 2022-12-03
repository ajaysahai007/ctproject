import React, { useState } from "react";
import {
  Container,
  Grid,
  Box,
  Typography,
  makeStyles,
  Button,
  MenuItem,
  FormControl,
  Select,
  TextField,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    paddingBottom: "30px",
    "& h2 ": {
      paddingTop: "23px",
    },
  },
  container: {
    marginTop: "3rem",
    backgroundColor: "#FEDDB6",
    padding: "40px 40px",
    borderRadius: "15px",
  },

 
}));

function AddResource() {
  const classes = useStyles();
  const history = useHistory();
  const [currentvalue, setCurrentValue] = useState();
  return (
    <Box className={classes.wrapper}>
      <Container>
        <Box>
          <Typography variant="h2">View Resources</Typography>
        </Box>
        <Container maxWidth="md">
          <Box className={classes.container}>
            <Grid container spacing={2}>
              <Grid item lg={4} md={4} sm={4}>
                <Typography variant="h5">Category Name</Typography>
              </Grid>
              <Grid item lg={1} md={1} sm={1}>
                :
              </Grid>
              <Grid item lg={5} md={5} sm={5}>
              <Typography variant="h6">Mental Health and Well Being</Typography>
              </Grid>

              <Grid item lg={4} md={4} sm={4}>
                <Typography variant="h5">Title</Typography>
              </Grid>
              <Grid item lg={1} md={1} sm={1}>
                :
              </Grid>
              <Grid item lg={5} md={5} sm={5}>
                <Typography variant='h6'>Mental Illness</Typography>
              </Grid>
              <Grid item lg={4} md={4} sm={4}>
                <Typography variant="h5">Image</Typography>
              </Grid>
              <Grid item lg={1} md={1} sm={1}>
                :
              </Grid>
              <Grid item lg={5} md={5} sm={5}>
                <Box>
                <img src="images/cycle.png" width="50%"/>
                </Box>
              </Grid>
              <Grid item lg={4} md={4} sm={4}>
                <Typography variant="h5">Description</Typography>
              </Grid>
              <Grid item lg={1} md={1} sm={1}>
                :
              </Grid>
              <Grid item lg={5} md={5} sm={5}>
                <Typography variant="h6">
                Mental health refers to cognitive, behavioral, and emotional well-being. It is all about how people think, feel, 
                 behave. People sometimes use the term “mental health” to mean the absence of a mental disorder.
                </Typography>
              </Grid>
              <Grid item lg={4} md={4} sm={4}>
                <Typography variant="h5">Created Date & Time</Typography>
              </Grid>
              <Grid item lg={1} md={1} sm={1}>:</Grid>
              <Grid item lg={5} md={5} sm={5}>
                <Typography variant="h6">
                Jan 25,2022 19:50 PM
                </Typography>
              </Grid>
            </Grid>
          
            <Box align="center" mt={4}>
            <Button align='center' mt={2}
                variant="contained"
                color="secondary"
                onClick={() => {
                  history.push("/resouceMgmt");
                }}
              >
                Back
              </Button>
            </Box>
          </Box>
        </Container>
      </Container>
    </Box>
  );
}
export default AddResource;
