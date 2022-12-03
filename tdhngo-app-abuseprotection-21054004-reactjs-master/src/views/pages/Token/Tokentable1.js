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
  IconButton
} from "@material-ui/core";
import { Link } from "react-router-dom";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { makeStyles } from "@material-ui/styles";
import EditIcon from "@material-ui/icons/Edit";
import React from "react";
import {GrFormView} from "react-icons/gr";
import { GoUnverified } from "react-icons/go";
import { MdOutlineVerifiedUser } from "react-icons/md";
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import DeleteIcon from "@material-ui/icons/Delete";
import TokentableCard from 'src/component/TokentableCard';
import { VscUnverified } from "react-icons/vsc";



import { Delete } from "@material-ui/icons";
const useStyles = makeStyles((theme) => ({
  tablecell:{
    width:"200px",
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
  mainbox:{
    padding: "50px 0 36px",
    height:"80vh",
  },
 
}));


export default function (props) {
  const classes = useStyles();
  return (
  
      <Box className={classes.mainbox}>
    
      <Box className={classes.devicelistHeading}>
          <Typography variant="h3">Tokens Added</Typography>
        </Box>
        <hr/>
        <TokentableCard  />
      
      </Box>

  );
}
