import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  makeStyles,
  Divider,
} from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import apiConfig from "src/APIconfig/ApiConfig";
import DataNotFound from "src/component/DataNotFound";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { convertDateTime } from "src/utils/index";

const useStyles = makeStyles((theme) => ({
  headcontent: {
    display: "flex",
    padding: "40px 0px",
    flexDirection: "column",
    paddingBottom: "10px",
    alignItems: "center",
    justifyContent: "center",

    "& h6": {
      display: "flex",
      justifyContent: "center",
      paddingBottom: "40px",
    },
  },
  topsection: {
    padding: "15px 0px",
    backgroundColor: " #FEDDB6",
    border: " 1px solid #F38500",
    borderRadius: "15px",
    padding: "1rem",
    "& h4": {
      padding: "10px 0px",
      color: theme.palette.text.black,
    },
    "& h5": {
      padding: "10px 0px",
      color: theme.palette.text.black,
    },
    "& h6": {
      padding: "10px 0px",
      color: theme.palette.text.black,
    },
    "& p": {
      color: theme.palette.text.black,
    },
  },
  headingpara: {
    display: "flex",
    alignItems: "center",
    paddingBottom: "50px",
    paddingTop: "20px",
    "& p": {
      color: "#262626",
    },
  },
  headbox: {
    padding: "23px 0 30px",
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
  divider: {
    marginTop: "10px",
    backgroundColor: "#F38500",
  },
  devicelistHeading: {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    "& h3": {
      padding: "1rem 0",
      color: "#000",
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
}));

function Terms() {
  const classes = useStyles();
  const location = useLocation();
  const _type = location?.state?.type;

  const history = useHistory();
  const [privacydata, setStaticData] = useState();
  const [isLoading, setLoader] = useState(false);
  console.log("privacydata", privacydata);

  const PrivacyPolicy = async () => {
    try {
      setLoader(true);
      const res = await axios({
        url: apiConfig.viewStaticContent,
        method: "GET",
        params: {
          type: _type,
        },
      });
      if (res) {
        setLoader(false);

        console.log("res12--->>", res);
        setStaticData(res?.data?.result);
      }
    } catch (error) {
      setLoader(false);

      console.log("error--->>", error);
    }
  };
  useEffect(() => {
    PrivacyPolicy();
  }, [_type]);

  return (
    <>
      <Box className={classes.headbox}>
        <Box className={classes.devicelistHeading}>
          <Typography variant="h1" className="headingText">
            Privacy Policy
          </Typography>
        </Box>
        <Divider className={classes.divider} />

        <Box>
          <Box mb={5}>
            {/* {isLoading && <ButtonCircularProgress />} */}
            <Box className={classes.topsection} mt={2}>
              <Box align="left">
                {/* {isLoading && <ButtonCircularProgress />} */}

                <Typography variant="h5" style={{ color: "#000" }}>
                  {convertDateTime(privacydata?.createdAt)}
                </Typography>
              </Box>
              <Box>
                {/* {isLoading && <ButtonCircularProgress />} */}

                <Typography variant="h6" style={{ color: "#000" }}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: privacydata?.description,
                    }}
                  ></div>
                </Typography>
              </Box>
              <Box mb={0} className={classes.btnmargin} align="left">
                <Box className={classes.boxbutton}>
                  <Box textAlign="center" style={{ margin: "0px 10px" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => history.push("/contentMgmt")}
                    >
                      BACK
                    </Button>
                  </Box>
                  <Box textAlign="center" className={classes.btnmain}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        history.push({
                          pathname: "/edit-content",
                          search: "Privacy",
                          state: {
                            type: privacydata?.type,
                          },
                        })
                      }
                    >
                      EDIT
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Terms;
