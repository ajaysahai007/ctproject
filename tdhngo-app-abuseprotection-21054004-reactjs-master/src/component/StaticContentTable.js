import {
  Box,
  Container,
  Paper,
  Table,
  TableContainer,
  TableCell,
  Typography,
  TableHead,
  TableRow,
  Grid,
  TableBody,
  withStyles,
  Button,
  IconButton,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { makeStyles } from "@material-ui/styles";
import EditIcon from "@material-ui/icons/Edit";
import React, { useEffect, useState } from "react";
import { GrFormView } from "react-icons/gr";
import { GoUnverified } from "react-icons/go";
import { MdOutlineVerifiedUser } from "react-icons/md";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import DeleteIcon from "@material-ui/icons/Delete";
import { useHistory } from "react-router-dom";
import { convertDateTime } from "src/utils/index";
import { wait } from "@testing-library/react";
import axios from "axios";
import apiConfig from "src/APIconfig/ApiConfig";
import DataNotFound from "src/component/DataNotFound.js";

const useStyles = makeStyles((theme) => ({
  tablecell: {
    width: "200px",
  },
  tokenouter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headingSection: {
    "& h3": {
      padding: "1rem 0",
      fontSize: "50px",
    },
  },
  currencyBox: {
    height: "20px",
    width: "100%",
    background: "#00dcff40",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  tokenheading: {
    width: "100px",
    "& h5": {
      fontSize: "15px",
      fontWeight: "300",
      width: "150px",
    },
    "& h6": {
      fontSize: "12px",
      fontWeight: "200",
    },
  },
  actionIcons: {
    display: "flex",
  },
  devicelistHeading: {
    "& h3": {
      padding: "0px 0 10px 0",
    },
  },
  tablerow: {
    "& th": {
      color: theme.palette.text.black,
    },
    "& td": {
      color: theme.palette.text.black,
    },
  },
  iconcolor: {
    "& svg": {
      color: theme.palette.text.black,
      fontSize: "25px",
    },
  },
  iconcolor: {
    // color: theme.palette.text.black,
    fontSize: "20px",
    color: "#fff",
    "& path": {
      // stroke: theme.palette.text.black,
      fontSize: "20px",
      color: "#fff",
    },
  },
  mainbox: {
    "& .tableHead": {
      backgroundColor: "#1EB808",
      "& th": {
        color: "#fff",
        width: "100px",
      },
    },
  },
}));
const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(even)": {
      backgroundColor: "#ffdead87",
    },
  },
}))(TableRow);
const Userlist = [
  // {
  //   // type: "Splash Screen",
  //   type: "Tutorial Screen",
  //   link: "/team-management",
  //   editlink: "/edit-content",
  //  },
  {
    type: "Privacy Policy",
    link: "/policy",
    editlink: "/edit-content",
  },
  {
    type: "About Us",
    link: "/view-content",
    editlink: "/edit-content",
  },
  {
    type: "Contact Us",
    link: "/view-contact",
    editlink: "/edit-content",
  },
  {
    type: "Terms & Conditions",
    link: "/view-terms",
    editlink: "/edit-content",
  },
  {
    type: "FAQ",
    link: "/view-announcements",
    editlink: "/view-announcements",
  },
];

export default function (props) {
  const history = useHistory();

  const [_static, setStatic] = useState([]);
  //LIST STATIC CONTENT
  const ListStaticContent = async () => {
    try {
      const res = await axios({
        url: apiConfig.staticContentList,
        method: "GET",
      });
      if (res) {
        console.log("res--->>", res);
        setStatic(res?.data?.result);
      }
    } catch (error) {
      console.log("error--->>", error);
    }
  };
  useEffect(() => {
    ListStaticContent();
  }, []);
  const classes = useStyles();
  return (
    <Box className={classes.mainbox}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow className={`${classes.tablerow1} tableHead`}>
              <TableCell style={{ width: "50px", padding: "11px" }}>
                Sr.No
              </TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Created At</TableCell>

              <TableCell
                style={{
                  width: "50px",
                }}
              >
                ACTION
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {_static &&
              _static.map((data, index) => (
                <StyledTableRow className={classes.tablerow}>
                  <TableCell>{index + 1} </TableCell>{" "}
                  <TableCell>{data.title} </TableCell>{" "}
                  <TableCell>{convertDateTime(data.createdAt)} </TableCell>{" "}
                  <TableCell>
                    {data?.type === "termsConditions" && (
                      <VisibilityIcon
                        onClick={() => {
                          history.push({
                            pathname: "/term-and-condition",
                            state: {
                              type: data?.type,
                              id: data?._id,
                              StaticData: data,
                            },
                          });
                        }}
                        style={{
                          fontSize: "20px",
                          color: "rgb(243, 133, 0)",
                          cursor: "pointer",
                        }}
                      />
                    )}
                    {data?.type === "privacyPolicy" && (
                      <VisibilityIcon
                        onClick={() => {
                          history.push({
                            pathname: "/privacy-policy",
                            state: {
                              type: data?.type,
                              id: data?._id,
                              StaticData: data,
                            },
                          });
                        }}
                        style={{
                          fontSize: "20px",
                          color: "rgb(243, 133, 0)",
                          cursor: "pointer",
                        }}
                      />
                    )}
                    {data?.type === "aboutUs" && (
                      <VisibilityIcon
                        onClick={() => {
                          history.push({
                            pathname: "/about-us",
                            state: {
                              type: data?.type,
                              id: data?._id,
                              StaticData: data,
                            },
                          });
                        }}
                        style={{
                          fontSize: "20px",
                          color: "rgb(243, 133, 0)",
                          cursor: "pointer",
                        }}
                      />
                    )}
                    &nbsp;&nbsp;
                  </TableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
        {_static.length === 0 ? <DataNotFound /> : ""}
      </TableContainer>
    </Box>
  );
}
