import React, { useEffect, useState } from "react";
import {
  Grid,
  Box,
  Typography,
  makeStyles,
  Divider,
  Button,
  IconButton,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { useHistory, useLocation } from "react-router-dom";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import axios from "axios";
import apiConfig from "src/APIconfig/ApiConfig";
import DataNotFound from "src/component/DataNotFound.js";

import EditIcon from "@material-ui/icons/Edit";
const Accordion = withStyles({
  root: {
    "&:not(:last-child)": {
      background: "#000",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.12)",
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      border: " 1px solid #3d3d3d",
      background:
        "linear-gradient( 152.97deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)",
      backdropFilter: "blur(42px)",
    },
  },
})(MuiAccordion);
const useStyles = makeStyles((theme) => ({
  devicelistHeading: {
    marginTop: "30px",
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
    divider: {
      marginTop: "10px",
      background: "#F38500 !important",
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
const AccordionSummary = withStyles({
  root: {
    boxSizing: "border-box",
    // marginTop: "22px",
    borderRadius: "0",
    backdropFilter: "blur(4px)",
    backgroundColor: "#ffdead !important",
    "&$expanded": {
      minHeight: 50,
      borderBottom: "0",
      color: "#FFF",
      // backgroundColor: "transparent",
      border: " none !important",
    },
    "@media(max-width:605px)": {
      fontSize: "10px",
      minHeight: 50,
      "&$expanded": {
        minHeight: 40,
        borderBottom: "0",
        color: "#FFF",
        backgroundColor: "transparent",
        border: " none !important",
      },
    },
  },
  editbtn: {
    position: "absolute !important",
    right: "70px !important",
  },
  content: {
    background: "000 !important",
    color: "#fff",
    borderRadius: "5px",

    // background-color: transparent;
    // border: none !important;
    "&$expanded": {
      margin: "0px 0",
      // backgroundColor: "transparent",
      border: " none !important",
    },
  },
  expanded: {
    margin: "0",
  },
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    boxSizing: "border-box",
    backdropFilter: "blur(4px)",
    marginTop: "5px",
    background: "#ffdead !important,",
    borderRadius: "5px",
    "& h6": {
      color: "#fff",
      paddingBottom: "15px",
      "@media (max-width:767px)": {
        fontSize: "18px !important",
      },
    },
    "& p": {
      color: "black",
      marginTop: "2px",
      maxWidth: "1200px",
      fontSize: "16px",
      fontFamily: "Inter', sans-serif'",
      fontWeight: "400",
      lineHeight: "24px",
    },
  },
}))(MuiAccordionDetails);

export default function FaqData({ data, index }) {
  const [expanded, setExpanded] = React.useState("panel1");
  const classes = useStyles();
  const location = useLocation();
  const _subactivityId = location?.state?.id;

  const [_faq, setFAQ] = useState([]);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const history = useHistory();

  //FAQ MANAGEMENT
  const FAQFunction = async () => {
    try {
      const res = await axios({
        url: apiConfig.listFAQ,
        method: "GET",
      });
      if (res) {
        console.log("res2222-->>", res);
        setFAQ(res?.data?.result);
      }
    } catch (error) {
      console.log("error-->>", error);
    }
  };
  useEffect(() => {
    FAQFunction();
  }, []);
  return (
    <div>
      <Box className={classes.devicelistHeading}>
        <Typography variant="h1" className="headingText">
          FAQ Management
        </Typography>
      </Box>
      <Divider
        className={classes.divider}
        style={{
          background: "#F38500",
          marginTop: "20px",
          marginBottom: "30px",
        }}
      />
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() =>
            history.push({
              pathname: "/menstrual-health",
              state: {
                _id: _subactivityId,
              },
            })
          }
          style={{ marginRight: "10px" }}
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          // onClick={() => {
          //   pathname("/edit-faq");
          // }}
          onClick={() => history.push("/add-faq")}
        >
          Add FAQ
        </Button>
      </Box>
      {_faq &&
        _faq.map((data) => {
          return (
            <>
              <Accordion
                style={{ borderRadius: "5px", marginTop: "20px" }}
                square
                defaultExpanded={index == 0 ? true : false}
                // defaultExpanded={false}
                onChange={handleChange(index)}
              >
                <AccordionSummary
                  style={{ background: "#ffdead !important" }}
                  aria-controls={index}
                  expandIcon={
                    expanded === index ? (
                      <>
                        <AiOutlineMinus
                          style={{
                            fontSize: "20px",
                            fontWeight: "400",

                            color: "black",
                          }}
                        />
                      </>
                    ) : (
                      <AiOutlinePlus
                        style={{
                          fontSize: "20px",
                          fontWeight: "400",
                          display: "flex",
                          justifyContent: "space-between",
                          color: "black",
                        }}
                      />
                    )
                  }
                >
                  <Typography
                    variant="h6"
                    style={{
                      color: "black",
                      fontSize: "18px",
                      lineHeight: "25px",
                    }}
                    className="faqtextheader"
                  >
                    {data.question}
                  </Typography>
                  {/* <Button
                    className={classes.editbtn}
                    style={{
                      position: "absolute",
                      right: "70px",
                    }}
                  > */}
                  {/* <IconButton
                    
                  > */}
                  {/* <EditIcon
                    onClick={() =>
                      history.push({
                        pathname: "/edit-faq",
                        search: "Edit",
                        state: {
                          id: data?._id,
                        },
                      })
                    }
                    style={{
                      fontSize: "20px",
                      fontWeight: "400",
                      position: "absolute",
                      right: "70px",
                      color: "black",
                    }}
                  /> */}
                  {/* </IconButton> */}

                  {/* </Button> */}
                </AccordionSummary>
                <AccordionDetails
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <div
                    style={{ color: "black" }}
                    dangerouslySetInnerHTML={{ __html: data.answer }}
                  ></div>

                  {/* <Typography variant="body2">{data.answer}</Typography> */}
                </AccordionDetails>
              </Accordion>
            </>
          );
        })}
      {_faq.length === 0 ? <DataNotFound /> : ""}
    </div>
  );
}
