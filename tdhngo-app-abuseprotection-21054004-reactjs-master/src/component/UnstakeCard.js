import React, { useState } from "react";
import {
  Box,
  Container,
  Card,
  Button,
  Typography,
  Grid,
  makeStyles,
} from "@material-ui/core";
import moment from "moment";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  cardBox: {
    cursor: "pointer",
    backdropFilter: "blur(5px)",
    padding: "15px",
    borderRadius: "5px",
    border: "1px solid #5b33b842",
    background:
      "linear-gradient(152.97deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)",
    boxShadow: "0px 0px 53px rgba(0, 0, 0, 0.25)",
    transition: "0.5s",
    "&:hover": {
      transform: "translateY(-10px)",
    },
    "& p": {
      fontSize: "13px",
      marginTop: "-11px",
    },
  },
  imgBox: {},
  cont: {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
  },
}));

export default function Stake({ data, NFTList }) {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Card
      className={classes.cardBox}
      onClick={() => {
        history.push({
          pathname: "/nft-detail",
          search: data.id,
        });
      }}
    >
      <Box className={classes.imgBox}>
        <img src={data.image} alt=" " width="100%" />
      </Box>
      <Box className={classes.cont} mb={2} mt={2}>
        <Typography variant="h6">{data.name}</Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item lg={6} xs={6}>
          <Typography variant="body1">{data.stakeon}</Typography>
        </Grid>
        <Grid item lg={6} xs={6} align="right">
          <Typography variant="body1">{data.date}</Typography>
        </Grid>
        <Grid item lg={6} xs={6}>
          <Typography variant="body1">Stake upto</Typography>
        </Grid>
        <Grid item lg={6} xs={6} align="right">
          <Typography variant="body1">{data.update}</Typography>
        </Grid>
        <Grid item lg={6} xs={6}>
          <Typography variant="body1">Expected Earning</Typography>
        </Grid>
        <Grid item lg={6} xs={6} align="right">
          <Typography variant="body1" style={{ color: "#1EB808" }}>
            {data.earning}
          </Typography>
        </Grid>{" "}
      </Grid>
    </Card>
  );
}
