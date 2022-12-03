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
import ButtonCircularProgress from "../component/ButtonCircularProgress";
import axios from "axios";
import { convertDateTime } from "../utils/index";
import DataNotFound from "src/component/DataNotFound";

import { GoUnverified } from "react-icons/go";
import { MdOutlineVerifiedUser } from "react-icons/md";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import DeleteIcon from "@material-ui/icons/Delete";
import { useHistory } from "react-router-dom";

import { VscUnverified } from "react-icons/vsc";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { Delete } from "@material-ui/icons";
import Filter from "src/Filter/Filter.js";
import apiConfig from "../APIconfig/ApiConfig";
const useStyles = makeStyles((theme) => ({
  dengerous: {},
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
      fontSize: "25px",
    },
  },

  mainbox: {
    "& p": {
      color: "black",
    },
    "& .tableHead": {
      backgroundColor: "#1EB808",
      "& th": {
        color: "#fff",
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
const userdetails = [
  {
    image: "/images/cycle.png",
    title: "Mental Illness",
    category: "Personal Safety",
    datetime: "Jan 25,2022 19:50 PM",
  },
  {
    image: "/images/cycle.png",
    title: "Coping with Depression",
    category: " Mental Health",
    datetime: "Jan 25,2022 19:50 PM",
  },
  {
    image: "/images/cycle.png",
    title: "Impact of Stress",
    category: "Menstrual Health",
    datetime: "Jan 25,2022 19:50 PM",
  },
  {
    image: "/images/cycle.png",
    title: "Understanding human behaviour",
    category: "Personal Safety",
    datetime: "Jan 25,2022 19:50 PM",
  },

  {
    image: "/images/cycle.png",
    title: "Weight loss & diet",
    category: "Mental Health and Well Being",
    datetime: "Jan 25,2022 19:50 PM",
  },
];

export default function (props) {
  const [open, setOpen] = React.useState(false);
  const history = useHistory();
  const [_resourceId, setResourceId] = useState();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [states, setStates] = useState();
  const [destrict, setDistrict] = useState();
  const [pages, setPages] = useState(1);
  const [toDate, settoDate] = useState();
  const [fromDate, setfromDate] = useState();
  const [search, setSearch] = useState();
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [_resourchlist, setResouchList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [_deleteresource, setDeleteresource] = useState("");
  const [openUserBlockUnblock, setOpenUserBlockUnblick] = useState(false);
  const [usertype, setusertype] = useState("All Users");
  const [_limit, setLimit] = useState(`${10}`);
  const [currentvalue, setCurrentValue] = useState("Select Category");
  const [currentvalue1, setCurrentValue1] = useState("Select");

  const handleOpen = (id) => {
    setDeleteresource(id);
    setOpen(true);
  };
  const classes = useStyles();

  const ListResourchFunction = async () => {
    try {
      setLoading(true);
      const res = await axios({
        url: apiConfig.listResource,
        method: "POST",
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
        data: {
          page: `${pages}`,
          limit: _limit,
          search: search,
          states: states,
          districs: destrict,
          fromDate: fromDate,
          toDate: toDate,
        },
      });
      if (res) {
        setResouchList(res?.data?.result?.docs);
        setLoading(false);
        console.log("res----222", res);
      }
    } catch (error) {
      setLoading(false);
      console.log("error--", error);
    }
  };
  //
  const token = window.sessionStorage.getItem("token");

  const deleteEmergency = async () => {
    try {
      setLoading(true);
      const res = await axios({
        url: apiConfig.deleteResource,
        method: "DELETE",
        headers: {
          token: token,
        },
        data: {
          resourceId: _deleteresource,
        },
      });
      if (res?.data?.responseCode === 200) {
        setLoading(false);

        console.log("");
        ListResourchFunction();
        setOpen(false);
      }
    } catch (error) {
      setLoading(false);

      console.log("error--", error);
    }
  };

  useEffect(() => {
    ListResourchFunction();
    // ListCategoryFunction();
  }, []);
  return (
    <Box className={classes.mainbox}>
      <Filter
        ListResourchFunction={ListResourchFunction}
        _resourchlist={_resourchlist}
        type="resourceManagement"
        search={search}
        setSearch={setSearch}
        states={states}
        setStates={setStates}
        destrict={destrict}
        setDistrict={setDistrict}
        openUserBlockUnblock={openUserBlockUnblock}
        setOpenUserBlockUnblick={setOpenUserBlockUnblick}
        toDate={toDate}
        settoDate={settoDate}
        fromDate={fromDate}
        setfromDate={setfromDate}
        setusertype={setusertype}
        usertype={usertype}
        currentvalue={currentvalue}
        setCurrentValue={setCurrentValue}
        currentvalue1={currentvalue1}
        setCurrentValue1={setCurrentValue1}
      />
      <TableContainer>
        <Table style={{ minWidth: "900px" }}>
          <TableHead>
            <TableRow className={`${classes.tablerow1} tableHead`}>
              <TableCell style={{ width: "50px", padding: "11px" }}>
                Sr.No
              </TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Created Date & Time</TableCell>
              <TableCell>Category Name</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {_resourchlist &&
              _resourchlist.map((data, index) => (
                <StyledTableRow className={classes.tablerow}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <Box mt={1}>
                      <img
                        src={data.image}
                        style={{
                          width: "45px",
                          height: "45px",
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                      />
                    </Box>
                  </TableCell>
                  <TableCell>
                    <div
                      // className={classes.dengerous}
                      dangerouslySetInnerHTML={{
                        __html: data.title,
                      }}
                    ></div>
                    {/* {data.title} */}
                  </TableCell>
                  <TableCell>{convertDateTime(data.createdAt)}</TableCell>
                  <TableCell>{data?.categoryId?.name}</TableCell>
                  <TableCell align="center">
                    <IconButton>
                      <VisibilityIcon
                        onClick={() =>
                          history.push({
                            pathname: "/add-resource",
                            search: "View",
                            state: { id: data?._id },
                          })
                        }
                        style={{
                          color: "#F38500",
                          cursor: "pointer",
                        }}
                      />
                    </IconButton>

                    <IconButton>
                      <EditIcon
                        style={{
                          color: "#F38500",
                        }}
                        onClick={() =>
                          history.push({
                            pathname: "/add-resource",
                            search: "Edit",
                            state: { id: data?._id },
                          })
                        }
                        // onClick={() =>
                        //   history.push({
                        //     pathname: "/add-resource",
                        //     search: "Edit",
                        //   })
                        // }
                      />
                    </IconButton>
                    <IconButton>
                      <DeleteIcon
                        style={{
                          color: "#F38500",
                        }}
                        onClick={() => handleOpen(`${data?._id}`)}
                      />
                    </IconButton>
                  </TableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {_resourchlist.length === 0 && <DataNotFound />}

      <Dialog
        open={open}
        fullWidth
        maxWidth="sm"
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle align="center" id="alert-dialog-title">
          <Typography variant="h2">Delete Resource</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" align="center">
            <Typography variant="h5">
              {" "}
              Are you sure you want to delete this resource?
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="secondary">
            No
          </Button>
          <Button onClick={deleteEmergency} variant="contained" color="primary">
            Yes {isLoading ? <ButtonCircularProgress /> : ""}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
