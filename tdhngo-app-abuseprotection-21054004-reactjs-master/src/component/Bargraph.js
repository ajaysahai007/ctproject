// import "./styles.css";

import React, { useState } from "react";
import { useTheme } from "@material-ui/core/styles";
import ReactApexChart from "react-apexcharts";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import { ApexOptions } from "apexcharts";
import {
  Paper,
  Box,
  makeStyles,
  Typography,
  FormControl,
  Select,
  Menu,
  MenuItem,
  Grid,
  Button,
} from "@material-ui/core";
import { blue, yellow, red } from "@material-ui/core/colors";

// const EditRoleForm = ({ onCompleted, onCancel, value, ...rest }: EditRoleFormProps) => {
const useStyles = makeStyles(() => ({
  numberofHours: {
    transform: "rotate(270deg)",
    fontSize: "18px",
    fontWeight: "500",
    marginTop: "13rem",
    color: "#000",
  },
  numberBox: {
    display: "flex",
  },
}));
const TravelDetailsView = () => {
  const theme = useTheme();

  const chartData: ApexOptions = {
    chart: {
      id: "apexchart-example",
      foreColor: theme.palette.primary.main,
      type: "bar",
    },
    xaxis: {
      categories: [
        "Mental health",
        "Menstrual health",
        "Personal Safety",
        "Support Service",
      ],
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "bar",
        shadeIntensity: 0.5,
        gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        fill: [red, blue, yellow],
        stops: [0, 50, 100],
        // colorStops: []
      },
    },
    series: {
      colors: ["#1A73E8", "#B32824"],
    },
    legend: {
      // position: '',
      width: 400,
      // position: 'top',
    },
    series: [
      {
        name: "Distance Traveled",
        type: "bar",

        data: [440, 505, 414, 571],
      },
      {
        name: "Time Traveled",
        type: "bar",
        // data: [0, 0, 0, 0]
      },
    ],
  };

  return <ReactApexChart options={chartData} series={chartData.series} />;
};

const Bargraph = () => {
  const classes = useStyles();
  const [currentvalue, setCurrentValue] = useState("Select");
  const [currentvalue1, setCurrentValue1] = useState("Select");
  const [currentvalue2, setCurrentValue2] = useState("Select");
  return (
    <Paper className="barcharback">
      <Grid
        container
        spacing={1}
        style={{ marginTop: "10px", padding: "0px 15px" }}
      >
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <Box className={classes.selectbox}>
            <Typography variant="h6">Time Period</Typography>
            <FormControl variant="outlined">
              <Box>
                <Select
                  name="token"
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  onChange={(e) => setCurrentValue(e.target.value)}
                  value={currentvalue}
                  style={{ width: "100%" }}
                >
                  <MenuItem value="Select">Select</MenuItem>
                  <MenuItem value="Today">Today</MenuItem>
                  <MenuItem value="Weekly">Weekly</MenuItem>
                  <MenuItem value="Monthly">Monthly</MenuItem>
                </Select>
              </Box>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <Box className={classes.selectbox}>
            <Typography variant="h6">Gender</Typography>
            <FormControl variant="outlined">
              <Box>
                <Select
                  name="token"
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  onChange={(e) => setCurrentValue1(e.target.value)}
                  value={currentvalue1}
                  style={{ width: "100%" }}
                >
                  <MenuItem value="Select">Select</MenuItem>
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </Box>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <Box className={classes.selectbox}>
            <Typography variant="h6">Location</Typography>
            <FormControl variant="outlined">
              <Box>
                <Select
                  name="token"
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  onChange={(e) => setCurrentValue2(e.target.value)}
                  value={currentvalue2}
                  style={{ width: "100%" }}
                >
                  <MenuItem value="Select">Select</MenuItem>
                  <MenuItem value="Delhi">Delhi</MenuItem>
                  <MenuItem value="Kashmir">Kashmir</MenuItem>
                  <MenuItem value="Goa">Goa</MenuItem>
                </Select>
              </Box>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <Typography variant="h6" style={{ opacity: "0" }}>
            Time Period
          </Typography>
          <Button variant="contained" fullWidth color="primary">
            Submit
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <Typography variant="h6" style={{ opacity: "0" }}>
            Time Period
          </Typography>
          <Button variant="contained" fullWidth color="primary">
            Reset
          </Button>
        </Grid>
      </Grid>
      <Box>
        <Grid container spacing={3}>
          <Grid item lg={2} md={2} sm={12} xs={12}>
            <Box className={classes.numberBox}>
              {/* <ArrowRightAltIcon /> */}
              <Typography className={classes.numberofHours}>
                Number of Users
              </Typography>
            </Box>
          </Grid>
          <Grid item lg={10} md={10} sm={12} xs={12}>
            <Box>
              <TravelDetailsView />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default Bargraph;
