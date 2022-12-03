import {
  Box,
  Container,
  TableCell,
  TableContainer,
  TableHead,
  Table,
  Typography,
  TableBody,
  TableRow,
  Grid,
  Avatar,
  Button,
  FormControl,
  Select,
} from "@material-ui/core";
import axios from "axios";
import apiConfig from "src/APIconfig/ApiConfig";
import CopyToClipboard from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import VisibilityIcon from "@material-ui/icons/Visibility";
import React, { useState, useEffect } from "react";
import FilterCard from "src/component/FilterCard";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { sortAddress } from "../../../../utils/index";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import DataNotFound from "src/component/DataNotFound";

import { BiCopy } from "react-icons/bi";
const useStyles = makeStyles((theme) => ({
  deviceSection: {
    display: "flex",
    alignItems: "center",
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
  activeparent: {
    display: "flex",
    alignItems: "center",
  },
  activeDevice: {
    width: "10px",
    height: "10px",
    background: "green",
    borderRadius: "100px",
  },
  tableRow1: {
    "& td": {
      color: theme.palette.text.black,
    },
    "& th": {
      color: theme.palette.text.black,
    },
  },
  formControl: {
    minWidth: "15vh",
  },
  iconcolor: {
    color: "#fff",

    "& path": {},
  },
  mainbox: {
    padding: "40px 0 40px",
    "& .tableHead": {
      backgroundColor: "#FEDDB6",
      "& th": {
        color: "#000",
        fontSize: "15px",
      },
      "& h1": {
        color: "#FFFFFF",
        fontSize: "30px",
        fontWeight: "600",
        lineHeight: "80px",
      },
    },
  },
  filterBox: {
    color: "#fff",
    padding: "15px",
    position: "relative",
    "& h6": {
      position: "absolute",
      top: "-20px",
      background: theme.palette.background.dark1,

      padding: "5px 10px",
      left: "0px",
      fontSize: "19px",
      color: "#5a86ff",
      fontWeight: 600,
    },
    "& input": {
      color: theme.palette.text.black,
    },
    "& label": {
      fontSize: "14px",
      fontWeight: 600,
      color: theme.palette.text.black,
    },
    "& .iconbtn": {
      color: theme.palette.text.black,
    },
  },
}));

const Ddata = [
  {
    srno: "#1234",
    type: "Shoes",
    title: "Gummo Land 33",
    address: "0xddb69a2C056861b884ccf7B ",
    image: "images/nft_img.png",
  },
  {
    srno: "#1235",
    type: "Cycle",
    title: "Gummo Land 33",
    address: "0xddb69a2C056861b884ccf7B ",
    image: "images/nft_img.png",
  },
  {
    srno: "#1236",
    type: "Shoes",
    title: "Gummo Land 33",
    address: "0xddb69a2C056861b884ccf7B ",
    image: "images/nft_img.png",
  },
  {
    srno: "#1237",
    type: "Cycle",
    title: "Gummo Land 33",
    address: "0xddb69a2C056861b884ccf7B ",
    image: "images/nft_img.png",
  },
  {
    srno: "#1238",
    type: "Shoes",
    title: "Gummo Land 33",
    address: "0xddb69a2C056861b884ccf7B ",
    image: "images/nft_img.png",
  },
];

export default function (props) {
  const [open, setOpen] = React.useState(false);
  const [age, setAge] = useState("");
  const history = useHistory();
  const [isLoading, setLoader] = useState(false);
  const [nftData, setNftData] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const UserListApi = async () => {
    setLoader(true);
    try {
      const res = await axios.get(
        apiConfig.listAllNft,

        {
          headers: {
            token: window.sessionStorage.getItem("token"),
          },
        }
      );
      if (res.data.statusCode === 200) {
        console.log("saffkjadbf", res);

        setNftData(res.data.result);

        console.log(setNftData);
        setLoader(false);
      }
    } catch (error) {
      console.log("ERROR", error);
      setLoader(false);
    }
  };

  useEffect(() => {
    UserListApi();
    // blockUnblockUserApiHandler();
  }, []);

  return (
    <Box className={classes.mainbox}>
      <Box className="filterBox">
        <Button variant="contained" color="primary">
          NFT's on Stack
        </Button>
      </Box>
      <Box style={{ marginTop: "-24px" }}>
        <FilterCard />
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow className={`${classes.tablerow1} tableHead`}>
              <TableCell>NFT TOKEN ID</TableCell>
              <TableCell>NFT Type</TableCell>
              <TableCell>NFT Name</TableCell>
              <TableCell>NFT Image</TableCell>
              <TableCell>Wallet Address</TableCell>

              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {nftData.map((data) => (
              <TableRow className={classes.tableRow1}>
                <TableCell>{data.tokenId}</TableCell>{" "}
                <TableCell>{data.tokenName}</TableCell>{" "}
                <TableCell>{data.title}</TableCell>{" "}
                <TableCell>
                  <img
                    src={data.mediaFile}
                    style={{
                      width: "45px",
                      height: "45px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                </TableCell>
                <TableCell>
                  {sortAddress(data.userId?.walletAddress)}
                  <CopyToClipboard text={data.userId?.address}>
                    <BiCopy
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() => toast.success("Copied successfully")}
                    />
                  </CopyToClipboard>
                </TableCell>
                <TableCell>
                  <VisibilityIcon
                    style={{
                      fontSize: "20px",
                      color: "#fff",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      history.push({
                        pathname: "/nft-detail",
                        state: data?._id,
                      })
                    }
                  />
                  &nbsp;&nbsp;
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {isLoading && <ButtonCircularProgress />}
        {nftData.length === 0 && <DataNotFound />}
      </TableContainer>
    </Box>
  );
}
