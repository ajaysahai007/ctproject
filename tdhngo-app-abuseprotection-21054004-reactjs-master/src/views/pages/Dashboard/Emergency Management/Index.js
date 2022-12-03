import React, { useState, useEffect } from "react";
import { Box, Typography, Divider, Button } from "@material-ui/core";
import Page from "src/component/Page";
import { makeStyles } from "@material-ui/core";
import apiConfig from "src/APIconfig/ApiConfig";
import axios from "axios";
import PageLoading from "src/component/PageLoading";
import { Link as RouterLink } from "react-router-dom";
import { Pagination } from "@material-ui/lab";

import { useHistory } from "react-router-dom";
import EmergencyTable from "./EmergencyTable";
import DataNotFound from "src/component/DataNotFound";
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
    padding: "23px 0 36px",
  },
  devicelistHeading: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
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
  buttonApprove: {
    borderRadius: "5px",
    minHeight: "34px",
    color: "rgb(255, 255, 255)",
    backgroundColor: "rgb(228, 106, 118)",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    lineHeight: "1.5",
    fontWeight: "500",
    transition: "0.26s ease",
    paddingBottom: "3px",
    textTransform: "capitalize",
    marginRight: "15px",
    backgroundColor: "rgb(3, 201, 215)",
  },
  divider: {
    marginTop: "10px",
    background: "#F38500",
  },
}));

export default function () {
  const classes = useStyles();
  const history = useHistory();
  const [numpages, setNumpages] = useState(`${1}`);
  console.log("numpages111-->", numpages);
  const [_counttotal, setCountTotal] = useState();
  const [search, setSearch] = useState();

  const [isLoading, setLoader] = useState(false);
  const [_datafound, setDataFound] = useState(true);
  const [pages, setPages] = useState(`${1}`);
  const [_limit, setLimit] = useState(`${10}`);
  console.log("pages-->", pages);
  const [states, setStates] = useState();
  const [destrict, setDistrict] = useState();
  const [fromDate, setfromDate] = useState();
  const [toDate, settoDate] = useState();

  const [_listemergency, setListEmergency] = useState([]);
  console.log("_listemergency--->>", _listemergency);
  const [_total, setTotal] = useState();
  const ListEmergency = async () => {
    try {
      setLoader(true);
      const res = await axios({
        url: apiConfig.listEmergency,
        method: "POST",
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
        data: {
          page: `${pages}`,
          limit: _limit,
          search: search,
          states: states,
          districs: destrict,
          fromDate: fromDate,
          toDate: toDate,
          // userStatus: usertype,
        },
      });
      if (res) {
        setLoader(false);

        console.log("editctory--->>>", res);
        setListEmergency(res?.data?.result?.docs);
        setNumpages(res?.data?.result?.pages);
        setTotal(res?.data?.result?.total);
      } else if (res?.statusCode === 404) {
        setCountTotal(0);
        setDataFound(false);
      }
    } catch (error) {
      setLoader(false);

      console.log("error--->>>", error);
    }
  };

  // Edit Api

  useEffect(() => {
    ListEmergency();
  }, [pages]);
  return (
    <Page title="Emergency">
      <Box className={classes.mainbox}>
        <Box className={classes.devicelistHeading}>
          <Typography variant="h1" className="headingText">
            Emergency Number Management
          </Typography>
        </Box>

        {/* <Divider className={classes.divider} /> */}

        <Box>
          {isLoading ? <PageLoading /> : ""}

          <EmergencyTable
            _listemergency={_listemergency}
            ListEmergency={ListEmergency}
            search={search}
            setSearch={setSearch}
            states={states}
            setStates={setStates}
            destrict={destrict}
            setDistrict={setDistrict}
            // openUserBlockUnblock={openUserBlockUnblock}
            // setOpenUserBlockUnblick={setOpenUserBlockUnblick}
            toDate={toDate}
            settoDate={settoDate}
            fromDate={fromDate}
            setfromDate={setfromDate}
            // setusertype={setusertype}
            // usertype={usertype}
          />
          {_total && _total > 10 && (
            <Box
              mb={2}
              mt={2}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Pagination
                onChange={(e, v) => setPages(v)}
                count={parseInt(numpages)}
                color="primary"
              />
            </Box>
          )}
          {_listemergency.length === 0 && <DataNotFound />}
        </Box>
      </Box>
    </Page>
  );
}
