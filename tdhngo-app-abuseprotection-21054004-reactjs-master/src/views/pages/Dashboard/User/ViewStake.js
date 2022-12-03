import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  Container,
  makeStyles,
  Typography,
  Grid,
  Button,
  Paper,
  Divider,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import UnstakeCard from "src/component/UnstakeCard";
import axios from "axios";
import { UserContext } from "src/context/User";
import { useWeb3React } from "@web3-react/core";

const useStyles = makeStyles((theme) => ({
  bannerBox: {
    position: "relative",
    zIndex: " 1",
    padding: "30px 0",
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
    // border: "1px solid #fff",
  },
}));

const cardData = [
  {
    image: "/images/StakeCard1.png",
    name: "New Shoes_00",
    stakeon: "Stake on",
    date: "22-07-2022",
    stakeup: "Stake upto",
    update: "22-07-2022",
    earning: "1.2569145 MSTEP",
    earningtym: "1.2569145 MSTEP",
  },
  {
    image: "/images/StakeCard1.png",
    name: "New Shoes_00",
    stakeon: "Stake on",
    date: "22-07-2022",
    stakeup: "Stake upto",
    update: "22-07-2022",
    earning: "1.2569145 MSTEP",
    earningtym: "1.2569145 MSTEP",
  },
  {
    image: "/images/StakeCard1.png",
    name: "New Shoes_00",
    stakeon: "Stake on",
    date: "22-07-2022",
    stakeup: "Stake upto",
    update: "22-07-2022",
    earning: "1.2569145 MSTEP",
    earningtym: "1.2569145 MSTEP",
  },
  {
    image: "/images/StakeCard1.png",
    name: "New Shoes_00",
    stakeon: "Stake on",
    date: "22-07-2022",
    stakeup: "Stake upto",
    update: "22-07-2022",
    earning: "1.2569145 MSTEP",
    earningtym: "1.2569145 MSTEP",
  },
  {
    image: "/images/StakeCard1.png",
    name: "New Shoes_00",
    stakeon: "Stake on",
    date: "22-07-2022",
    stakeup: "Stake upto",
    update: "22-07-2022",
    earning: "1.2569145 MSTEP",
    earningtym: "1.2569145 MSTEP",
  },
  {
    image: "/images/StakeCard1.png",
    name: "New Shoes_00",
    stakeon: "Stake on",
    date: "22-07-2022",
    stakeup: "Stake upto",
    update: "22-07-2022",
    earning: "1.2569145 MSTEP",
    earningtym: "1.2569145 MSTEP",
  },
  {
    image: "/images/StakeCard1.png",
    name: "New Shoes_00",
    stakeon: "Stake on",
    date: "22-07-2022",
    stakeup: "Stake upto",
    update: "22-07-2022",
    earning: "1.2569145 MSTEP",
    earningtym: "1.2569145 MSTEP",
  },
  {
    image: "/images/StakeCard1.png",
    name: "New Shoes_00",
    stakeon: "Stake on",
    date: "22-07-2022",
    stakeup: "Stake upto",
    update: "22-07-2022",
    earning: "1.2569145 MSTEP",
    earningtym: "1.2569145 MSTEP",
  },
];
export default function Dashboard(props) {
  var classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [tabview, setTabView] = useState("My");
  const { account, chainId, library } = useWeb3React();
  const [openConnectWallet, setOpenConnectWallet] = useState(false);
  const [loader, setLoader] = React.useState(false);
  const user = useContext(UserContext);
  const [NftData, setNftData] = useState([]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }; //stake/stakeList

  return (
    <>
      <Box className={classes.bannerBox}>
        <Box mt={3}>
          <Grid container spacing={3}>
            {cardData.map((data, i) => {
              return (
                <Grid item lg={3} md={4} sm={6} xs={12}>
                  <UnstakeCard data={data} type="card" index={i} />
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Box>
    </>
  );
}
