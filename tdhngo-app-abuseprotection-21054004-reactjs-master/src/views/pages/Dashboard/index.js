import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Box,
  Typography,
  makeStyles,
  Divider,
} from "@material-ui/core";
import MetricsChart from "src/component/MetricsChart";
import Page from "src/component/Page";
import Bargraph from "src/component/Bargraph";
import Bargraph2 from "src/component/Bargraph2";
import Graph from "../../../component/Graph";
import axios from "axios";
import apiConfig from "src/APIconfig/ApiConfig";
import PageLoading from "src/component/PageLoading";
const useStyles = makeStyles((theme) => ({
  activeAndInactive: {
    padding: "0 40px",
  },
  headBox: {
    "& h3": {
      color: "black",
      marginBottom: "15px",
    },
  },
  mainbox: {
    background: " #FFD4A0",
    padding: "20px",
    borderRadius: "9px",
    height: "85px",
    boxShadow: "2px 1px 5px black",

    transition: "0.3s",
    "& h4": {
      textAlign: "center",
      justifyContent: "center",
      color: "black",
    },

    "& h2": {
      textAlign: "center",
      marginTop: "10px",
      color: "black",
    },
    "&:hover": {
      transform: "translateY(-10px)",
    },
  },
  divider: {
    marginTop: "10px",
    backgroundColor: "#F38500",
  },
}));

export default function Index() {
  const classes = useStyles();
  const [_dashboard, setDashBoard] = useState();
  console.log("dashboard--->>>", _dashboard);

  // DASHBOARD API
  const token = window.sessionStorage.getItem("token");
  const [_isLoading, setIsLoading] = useState(false);
  const dashboard = [
    {
      heading: "Total Users",
      subheading: _dashboard?.totalUsers,
    },
    {
      heading: "Active Users",
      subheading: _dashboard?.activeUsers,
    },
    {
      heading: "Inactive Users",
      subheading: _dashboard?.inactiveUsers,
    },
    {
      heading: "Total Resources Uploaded",
      subheading: _dashboard?.totalArticles,
    },
    {
      heading: "Total Feedback",
      subheading: _dashboard?.totalFeedback,
    },
    {
      heading: "Total Categories",
      subheading: _dashboard?.totalNotification,
    },
  ];

  const DashboardApi = async () => {
    try {
      setIsLoading(true);
      const res = await axios({
        url: apiConfig.adminDashboard,
        method: "GET",
        headers: {
          token: token,
        },
      });
      if (res) {
        setIsLoading(false);
        setDashBoard(res?.data?.result);
      }
    } catch (error) {
      console.log("error--->>", error);
      setIsLoading(false);
    }
  };
  //  registeredUserGraph
  const [_chartdata, setChartData] = useState("");
  const [_months, setMonths] = useState([]);
  const [_year, setYear] = useState([]);
  const [_totalusers, setTotalUsers] = useState([]);
  console.log("_months--->>", _totalusers);

  const RegisteredUserGraphApi = async () => {
    try {
      const res = await axios({
        url: apiConfig.registeredUserGraph,
        method: "GET",
        headers: {
          token: token,
        },
        params: {
          year: "2022",
        },
      });
      if (res) {
        console.log("res-registeredUserGraph-->>", res);
        setChartData(res?.data?.result?.docs);
        setMonths(res?.data?.result?.docs.map((o) => o.month));
        setYear(res?.data?.result?.docs.map((o) => o.year));
        setTotalUsers(
          res?.data?.result?.docs.map((o) => o.totalRegisteredUser?.userTotal)
        );
      }
    } catch (error) {
      console.log("error--->>", error);
    }
  };
  useEffect(() => {
    DashboardApi();
    RegisteredUserGraphApi();
  }, []);
  return (
    <Page title="Dashboard">
      {_isLoading ? <PageLoading /> : ""}
      <Box style={{ paddingTop: "23px" }} className={classes.headBox}>
        <Typography variant="h1">Dashboard</Typography>
        <Divider className={classes.divider} />
        <Box mt={5}>
          <Grid container spacing={3}>
            {dashboard &&
              dashboard.map((data) => {
                return (
                  <>
                    <Grid item lg={3} md={3} sm={6} xs={12}>
                      <Box className={classes.mainbox}>
                        <Box className={classes.subbox}>
                          <Typography variant="h4">{data.heading}</Typography>
                          <Typography variant="h2">
                            {data.subheading}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </>
                );
              })}
          </Grid>
        </Box>
        <Box mt={10}>
          <Grid container>
            <Grid item lg={8} md={8} sm={6} xs={12}>
              <Typography variant="h3">Registered User Graph</Typography>
              <Box>
                <MetricsChart
                  _chartdata={_chartdata}
                  _months={_months}
                  _year={_year}
                  _totalusers={_totalusers}
                />
              </Box>
            </Grid>

            <Grid item lg={3} md={4} sm={6} xs={12}>
              <Typography variant="h3" className={classes.activeAndInactive}>
                Active Vs Inactive User Graph
              </Typography>

              <Box>
                <Graph dashboard={dashboard} />
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box mt={10}>
          <Typography variant="h3">Activity Status</Typography>
          <Bargraph />
        </Box>
        <Box mt={10}>
          <Typography variant="h3">Chat Report Graph</Typography>
          <Bargraph2 />
        </Box>
      </Box>
    </Page>
  );
}
