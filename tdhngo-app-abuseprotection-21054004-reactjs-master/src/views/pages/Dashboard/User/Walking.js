
import { Box, Grid, Typography, makeStyles } from "@material-ui/core";
import React from "react";
import SportLog from "./SportLog";
const useStyles = makeStyles((theme) => ({
  Main: {
    marginTop: "-25px",
  },
  mainbox: {
    border: "1px solid #5b33b842",
    padding: "15px",
    background:
      "linear-gradient(152.97deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)",
    boxShadow: "0px 0px 53px rgb(0 0 0 / 25%)",
    transition: "0.5s",
    borderRadius: "5px",
    backdropFilter: "blur(5px)",
    "&:hover": {
      transform: "translateY(-10px)",
      border: "1px solid #1eb808",
    },

    "& h2": {
      fontSize: "20px",
      color: "#fff",
      textAlign: "center",
    },
    "& h5": {
      fontSize: "25px",
      paddingTop: "10px",
      color: "#fff",
      textAlign: "center",
    },
  },
}));

const Running = () => {
  const classes = useStyles();
  return (
    <div>
      <Box>
        <Box mt={5}>
          <Grid container spacing={3}>
            {cardData.map((data) => {
              return (
                <Grid item lg={3} md={4} sm={6} xs={12}>
                  <Box className={classes.mainbox}>
                    <Box>
                      <Typography
                        variant="h5"
                        style={{ paddingBottom: "10px" }}
                      >
                        {data.title}
                      </Typography>
                      <Typography variant="h2">{data.amount}</Typography>
                    </Box>
                    {/* {data.icon} */}
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Box>
        <Box style={{ marginTop: "-35px" }}>
          <SportLog />
        </Box>
      </Box>
    </div>
  );
};

export default Running;
