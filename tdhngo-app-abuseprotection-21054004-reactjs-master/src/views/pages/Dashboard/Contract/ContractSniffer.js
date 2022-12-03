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
  Avatar,
  IconButton,
  InputAdornment, Button
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { BiCopy } from "react-icons/bi";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { makeStyles } from "@material-ui/styles";
import EditIcon from "@material-ui/icons/Edit";
import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { GrFormView } from "react-icons/gr";
import DeleteIcon from "@material-ui/icons/Delete";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { BsSearch } from "react-icons/bs";
import { Delete } from "@material-ui/icons";
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
      padding: "1rem 0",
      color: theme.palette.text.black,
    },
  },
  tableRow1: {
   
    "& th": {
      color: theme.palette.text.black,
    },
    "& td": {
      color: theme.palette.text.black,
    },
  },
  iconcolor: {
    color: theme.palette.text.black,
    "& path": {
      stroke: theme.palette.text.black,
    },
  },
  mainbox: {
    padding: "50px 0 36px",
    "& .tableHead": {
      backgroundColor: "#5a86ff",
      "& th": {
        color: "#fff",
      },
    },
  },
  filterBox: {
    border: "1px solid #c4c4c4",
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
  walletaddres: {
    margin: 0,
    textOverflow: "ellipsis",
    width: "100%",
    maxWidth: "100px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    display: "inline-block",
  },
}));
const Userlist = [
  {
    srno: "1",
    img: "images/fly.png",
    buyusername: "NK00000",
    currency: "0x04ae38F05d9B7DD4b99A63f17164DC2D88905aF1",
    score: "89",
    contact: "63%",
    holder: "60%",
    scan: "50%",
    market: "$9,008,334,567",
    date: "2022, Jan 24",
  },
  {
    srno: "2",
    img: "images/fly.png",
    buyusername: "NK00000",
    wallet: "Bitco Mine",
    currency: "0x04ae38F05d9B7DD4b99A63f17164DC2D88905aF1",
    contact: "63%",
    holder: "60%",
    scan: "50%",
    price: "$0.023",
    market: "$9,008,334,567",
    date: "2022, Jan 24",
  },
  {
    srno: "3",
    img: "images/fly.png",
    buyusername: "NK00000",
    wallet: "Bitco Mine",
    currency: "0x04ae38F05d9B7DD4b99A63f17164DC2D88905aF1",
    contact: "63%",
    holder: "60%",
    scan: "50%",
    price: "$0.023",
    market: "$9,008,334,567",
    date: "2022, Jan 24",
  },
  {
    srno: "4",
    img: "images/fly.png",
    buyusername: "NK00000",
    wallet: "FoxGirl",
    currency: "0x04ae38F05d9B7DD4b99A63f17164DC2D88905aF1",
    contact: "63%",
    holder: "60%",
    scan: "50%",
    price: "$0.023",
    market: "$9,008,334,567",
    date: "2022, Jan 24",
  },
  {
    srno: "5",
    img: "images/fly.png",
    buyusername: "NK00000",
    wallet: "Bitco Mine",
    currency: "0x04ae38F05d9B7DD4b99A63f17164DC2D88905aF1",
    contact: "63%",
    holder: "60%",
    scan: "50%",
    price: "$0.023",
    market: "$9,008,334,567",
    date: "2022, Jan 24",
  },
  {
    srno: "6",
    img: "images/fly.png",
    buyusername: "NK00000",
    wallet: "Bitco Mine",
    currency: "0x04ae38F05d9B7DD4b99A63f17164DC2D88905aF1",
    contact: "63%",
    holder: "60%",
    scan: "50%",
    price: "$0.023",
    market: "$9,008,334,567",
    date: "2022, Jan 24",
  },
];

export default function (props) {
  const classes = useStyles();
  return (
    // <Paper title="Kycpending">
    <Box className={classes.mainbox}>
      <Box className={classes.devicelistHeading} mb={2}>
        <Typography variant="h3">Contract Sniffed</Typography>
      </Box>
      <hr />
      <Box className={classes.filterBox} mb={5} mt={4}>
        <Typography variant="h6">Filter</Typography>
        <Grid container spacing={2} alignItems="flex-end">
          <Grid item xs={12} sm={4} md={3} lg={2}>
            <label>From</label>
            <TextField id="outlined-basic" type="date" variant="outlined" fullWidth />
            {/* <KeyboardDatePicker
              placeholder="YYYY-MM-DD"
              // value={toTimeFilter}
              // onChange={setToTimeFilter}
              format="YYYY-MM-DD"
              inputVariant="outlined"
              // margin="dense"
              fullWidth
              //minDate={""}
            /> */}
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={2}>
            <label>To</label>
            <TextField id="outlined-basic" type="date" variant="outlined" fullWidth />
          </Grid>
          {/* <Grid item xs={12} sm={4} md={3} lg={2}>
            <label>Type</label>
            <TextField
              id="outlined-select-currency"
              select
              fullWidth
              value={currency}
              onChange={handleChange}
              variant="outlined"
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid> */}
          
          <Grid item xs={12} sm={4} md={3} lg={3}>
            <label>Search </label>
            <TextField id="outlined-basic" type="search" variant="outlined" fullWidth InputProps={{
              endAdornment: <InputAdornment position="end"> <IconButton className="iconbtn"><BsSearch /></IconButton> </InputAdornment>,
            }} />
          </Grid>
          <Grid item xs={12} sm={4} md={2} lg={1}>
            {/* <label>&nbsp; </label> */}
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              style={{ backgroundColor: "#5a86ff", }}
            >
              Apply
            </Button>
          </Grid>
          <Grid item xs={12} sm={4} md={2} lg={1}>
            {/* <label>&nbsp; </label> */}
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              style={{ backgroundColor: "rgb(178, 178, 178)", }}
            >
              Clear
            </Button>
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={2}>
            {/* <label>&nbsp; </label> */}
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              style={{ backgroundColor: "rgb(178, 178, 178)", }}

            >
              Download CSV
            </Button>
          </Grid>
        </Grid>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow  className={`${classes.tablerow1} tableHead`}>
              <TableCell>Sr.No</TableCell>
              <TableCell>USER ID</TableCell>
              <TableCell>SNIFFED ADDRESS</TableCell>

              <TableCell>CONTACT SCAN</TableCell>
              <TableCell>HOLDERS SCAN</TableCell>
              <TableCell>LIQUIDITY SCAN</TableCell>
              <TableCell>DATE SCAN</TableCell>
              <TableCell>ACTION</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Userlist.map((data, index) => (
              <TableRow className={classes.tableRow1}>
                {/* */}
                <TableCell>{data.srno}</TableCell>{" "}
                <TableCell>
                  <Link
                    to="/sniffer-detail"
                    style={{
                      fontSize: "12px",
                      color: "#5a86ff",
                    }}
                    className={classes.tablerow1}
                  >
                    {data.buyusername}
                  </Link>
                </TableCell>{" "}
                <TableCell><p className={classes.walletaddres}>{data.currency}</p><BiCopy style={{
                  color: "#5a86ff",
                  fontSize: ' 14px', cursor: "pointer",
                  marginLeft: "5px",
                }} /></TableCell>
                <TableCell>{data.contact}</TableCell>
                <TableCell>{data.holder}</TableCell>
                <TableCell>{data.scan}</TableCell>
                <TableCell className="tableToken">
                  {data.date}
                  {data.time}
                </TableCell>
                <TableCell
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "start",
                  }}
                >
                  <Link component={IconButton} to="/sniffer-detail">
                    <GrFormView
                      style={{ fontSize: "25px" }}
                      className={classes.iconcolor}
                    />
                  </Link>
                  <Link component={IconButton} to="/edit-profile">
                    {" "}
                    <FaExternalLinkAlt
                      style={{
                        fontSize: "14px",
                      }}
                      className={classes.iconcolor}
                    />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
    // </Paper>
  );
}
