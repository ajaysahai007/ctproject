import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  makeStyles,
  Button,
  Grid,
  Paper,
  MenuItem,
  Select,
  FormControl,
} from "@material-ui/core";
import Chart from "react-apexcharts";
import { Link } from "react-router-dom";
import axios from "axios";
import apiConfig from "src/APIconfig/ApiConfig";

const useStyles = makeStyles((theme) => ({}));

export default function MetricsChart({
  _chartdata,
  _months,
  _year,
  _totalusers,
}) {
  // const [_year, setYear] = useState([_chartdata?.year]);
  console.log("_chartdata00000-->>", _months, _year, _totalusers);
  console.log("_chartdata-->>", _chartdata);

  const classes = useStyles();
  const [currentvalue, setCurrentValue] = useState("Select");
  const options = {
    series: [
      {
        name: "Users",
        data: _totalusers,
        //  [
        //   2010, 2045, 2099, 2022, 2018, 2020, 2022, 2023, 2012, 2016, 2018,
        //   2011,
        // ],
      },
    ],
    options: {
      chart: {
        height: 300,
        type: "line",
        zoom: {
          enabled: false,
        },
        categories: {
          color: "#fff",
          fontSize: "15px !important",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },

      fill: {
        colors: ["#F44336", "#E91E63", "#9C27B0"],
      },
      grid: {
        row: {
          colors: ["#fff", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: _months,
        // [
        //   " January",
        //   " February ",
        //   "March",
        //   "April",
        //   "May",
        //   "June",
        //   "July",
        //   "August",
        //   "September",
        //   "October",
        //   "November",
        //   "December",
        // ],
      },
      noData: {
        text: "Loading...",
      },
    },
  };

  return (
    <Box className={classes.mainBox}>
      <Paper style={{ paddingTop: "16px" }}>
        <Box>
          <Grid container spacing={2} style={{ padding: "0px 15px" }}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
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
                      fullWidth
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
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography variant="h6" style={{ opacity: "0" }}>
                Time Period
              </Typography>
              <Button variant="contained" color="primary" fullWidth>
                Submit
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography variant="h6" style={{ opacity: "0" }}>
                Time Period
              </Typography>
              <Button variant="contained" color="primary" fullWidth>
                Reset
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Chart
          options={options.options}
          series={options.series}
          type="line"
          height={300}
        />
      </Paper>
    </Box>
  );
}
