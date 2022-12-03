import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  makeStyles,
  Divider,
  Dialog,
  DialogTitle,
  TextField,
  InputBase,
} from "@material-ui/core";
import { Link, useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { BiCopy } from "react-icons/bi";
import apiConfig from "src/APIconfig/ApiConfig";

const collectData = [
  {
    id: 1,
    title: "BACKGROUND",
    color: "#828282",
  },
  {
    id: 2,
    title: "Clothing",
    color: "#828282",
  },
  {
    id: 3,
    title: "Skin",
    color: "#828282",
  },
  {
    id: 4,
    title: "Headwear",
    color: "#828282",
  },
  {
    id: 5,
    title: "Body Accessory",
    color: "#828282",
  },
  {
    id: 6,
    title: "Headphones",
    color: "#828282",
  },
];

const useStyles = makeStyles((theme) => ({
  background: {
    padding: "23px 0",
    position: "relative",
    "& .addressBox": {
      display: "flex",
      alignItems: "center",
      "& svg": {
        color: "#fff",
        marginLeft: "6px",
        fontSize: "18px",
        cursor: "pointer",
      },
    },
  },
  imgBox: {
    maxWidth: "500px",
    "& img": {
      borderRadius: "5px",
      border: "4px solid #1EB808",
      cursor: "pointer",
    },
  },
  heading: {
    color: "#fff",
    fontWeight: "700",
    fontSize: "30px",
  },
  centering: {
    // display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    border: "1px solid #1eb808",
    borderRadius: "5px",
    maxWidth: "300px",
    textAlign: "center",
    padding: "10px",
    "&:hover": {
      boxShadow:
        "0 0 1rem rgb(30 184 8 / 45%), 0 0 0 rgb(30 184 8 / 45%), 0 0 1rem rgb(30 184 8 / 50%), 0 0 4rem rgb(30 184 8 / 40%)",
      transition: ".5s",
    },
    "& h4": {
      color: "#1EB808",
      fontFamily: "'Saira Semi Condensed', sans-serif",
      fontWeight: "700",
      fontSize: "21px",
      lineHeight: "38px",
    },
    "& h5": {
      color: "#fff",
      fontSize: "21px",
      lineHeight: "30px",
      fontWeight: "400",
      fontFamily: "'Saira Semi Condensed', sans-serif",
    },
  },
  Featuring: {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
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
  divider: {
    marginTop: "30px",
  },
}));

const Walletdetail = () => {
  const [allData, setAllData] = React.useState(collectData);
  const [open1, setOpen1] = React.useState(false);

  const handleClose1 = () => {
    setOpen1(false);
  };
  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const mediaid = location.state;
  console.log("fjksdukfhbgjg", mediaid);
  const [viewNFTData, setViewNFTData] = useState([]);

  const ViewNFTDetails = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: apiConfig.viewNFT + mediaid,
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
      });
      if (res.data.statusCode === 200) {
        console.log("Check----------", res);
        setViewNFTData(res.data.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (mediaid) {
      ViewNFTDetails();
    }
  }, [mediaid]);
  return (
    <Box className={classes.background}>
      <Box className={classes.Featuring}>
        <img src="images/Vector 83.png" className="icon1" />
        <Typography variant="h1" className="headingText">
          NFT Detail
        </Typography>
        <img src="images/Vector 80.png" className="icon2" />
      </Box>
      <Divider className={classes.divider} />
      <Container style={{ marginTop: "32px" }}>
        <Grid container spacing={6}>
          <Grid
            item
            xs={12}
            sm={12}
            md={5}
            lg={5}
            className={classes.centering}
          >
            <Box className={classes.imgBox}>
              <img
                src={viewNFTData.mediaFile}
                alt="shoes images"
                width="100%"
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={7} lg={7}>
            <Typography variant="h3" className={classes.heading}>
              {viewNFTData.title}
            </Typography>
            <Box className="addressBox" mb={3} mt={1}>
              <Typography variant="body1">
                {viewNFTData.userId?.walletAddress}
              </Typography>
              <BiCopy />
            </Box>
            <Grid container spacing={2}>
              {allData.map((values) => {
                return (
                  <>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <Box className={classes.card}>
                        <Typography variant="h4">{values.title}</Typography>
                        <Typography variant="h5">{values.color}</Typography>
                      </Box>
                    </Grid>
                  </>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Walletdetail;
