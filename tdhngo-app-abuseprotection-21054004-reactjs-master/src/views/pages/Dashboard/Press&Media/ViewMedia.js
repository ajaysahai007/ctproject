import React, { useContext, useState, useEffect } from "react";
import {
  Grid,
  Box,
  Typography,
  makeStyles,
  TextField,
  FormControl,
  IconButton,
  FormHelperText,
  MenuItem,
  Select,
  Container,
  Divider,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { FiUpload } from "react-icons/fi";
import { addImageHandler, getBase64 } from "src/utils";
import { useHistory } from "react-router-dom";
import axios from "axios"
import apiConfig from "src/APIconfig/ApiConfig";
import { Link, useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  NftBreed: {
    padding: "23px 0 ",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: "100%",
    margin: "0 10px",
  },
  main: {
    border: "1px solid #01FBB4",
    padding: "40px",
    background:
      "linear-gradient(152.97deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)",
    boxShadow: "0px 0px 53px rgb(0 0 0 / 25%)",
    borderRadius: "5px",
    "&:hover": {
      boxShadow:
        "0 0 1rem #1eb80873, 0 0 0rem #1eb80873, 0 0 1rem #1eb80880, 0 0 4rem #1eb80866",
    },
  },
  divider: {
    marginTop: "30px",
  },
  textField: {
    maxWidth: "100%",
  },

  image: {
    cursor: "pointer",
  },
  upload: {
    width: "150px",
    height: "150px",
    margin: "16px 0",
    cursor: "pointer",
    borderRadius: "20px",
    position: "relative",
    "& img": {
      width: "100%",
      height: "100%",
      border: "1px solid #01FBB4",
      borderRadius: "50%",
      objectFit: "cover",
    },

    "& button": {
      position: "absolute",
      border: "3px solid black",
      bottom: 0,
      right: 0,
      backgroundColor: "#fff",
      color: "#000",
      fontSize: "15px",
      "&:hover": {
        backgroundColor: "#fff",
        border: "3px solid black",
      },
      "& input": {
        width: "100%",
        height: "100%",
        position: "absolute",
        top: "0",
        left: "0",
        opacity: 0,
      },
    },
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
  newbtn: {
    "@media(max-width:400px)": {
      marginTop: "10px",
    },
  },
}));

export default function CreateNFT(userProfileData) {
  const classes = useStyles();
  const history = useHistory();
  const [base64Img, setBase64Img] = useState("");
  const [base64Img1, setBase64Img1] = useState("");
  const [imgFile, setImgfile] = useState("");
  const [profile, setprofile] = useState();
  const location = useLocation();
  const mediaid = location.state;
  console.log("fjksdukfhbgjg",mediaid)
const [viewMediaData,setViewMediaData] = useState([])
  function imageUpload(event) {
    let base64img = userData.profilepic;
    let reader = new FileReader();
    reader.onload = function () {
      base64img = reader.result;
      setBase64Img(base64img);
    };

    reader.readAsDataURL(event.target.files[0]);
  }
  const [userData, setUserData] = useState({
    coverPic: "",
    profilePic: "",

    profilePic: "",
    coverPic: "",
  });

  const viewMedia = async () => {
    try {
      // setIsLoading(true);
      const res = await axios({
        method: "GET",
        url: apiConfig.mediaList  + `/${mediaid}`,
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
      });
      if (res.data.statusCode === 200) {
        console.log("afkjhsakdjlfbg", res);
        setViewMediaData(res.data.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (mediaid) {
      viewMedia();
    }
  }, [mediaid]);

  return (
    <Box className={classes.NftBreed}>
      <Box className={classes.devicelistHeading}>
        <img src="images/Vector 83.png" className="icon1" />
        {window.location.pathname === "/view-media" && (
          <Typography variant="h1" className="headingText">
            View Press & Media
          </Typography>
        )}

        <img src="images/Vector 80.png" className="icon2" />
      </Box>
      <Divider className={classes.divider} />
      <Container maxWidth="md">
        <Box mt={10} mb={2} className={classes.main}>
          <Grid container spacing={2}>
            <Grid item md={4} sm={4} lg={4} xs={12}>
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <Box>
                  <figure className={classes.upload}>
                    <img src={viewMediaData.picture} />
                    
                  </figure>
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                    }}
                  >
                    <Typography variant="h6" color="primary">
                    {viewMediaData.title}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item md={8} sm={8} lg={8} xs={12} className={classes.image}>
              <Box mt={2}>
                <form className="formBox p-0" autoComplete="off">
                  <Grid container spacing={2} className="BreedDetails">
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <Box>
                        <Typography variant="h4" color="primary">
                          Upload media photo :
                        </Typography>
                      </Box>
                      <Box mt={2}>
                        <Typography
                          variant="h5"
                          color="primary"
                          style={{ paddingBottom: "8px" }}
                        >
                          Title :
                        </Typography>
                        <TextField
                        readOnly
                          variant="outlined"
                          // placeholder="Prince Sharma"
                          value={viewMediaData.title}
                          className={classes.textField}
                          inputProps={{readOnly:"true"}}
                        />
                      </Box>
                      <Box mt={2}>
                        <Typography
                          variant="h5"
                          color="primary"
                          style={{ paddingBottom: "8px" }}
                        >
                          Source URL(Optional) :
                        </Typography>
                        <TextField
                          variant="outlined"
                          inputProps={{readOnly:"true"}}
                          aria-readonly
                          value={viewMediaData.url}
                          placeholder="https://www.lipsum.com/"
                          className={classes.textField}
                        />
                      </Box>
                      <Box mt={2}>
                        <Typography
                          variant="h5"
                          color="primary"
                          style={{ paddingBottom: "8px" }}
                        >
                          Description :
                        </Typography>
                        <TextField
                          variant="outlined"
                          inputProps={{readOnly:"true"}}
                          fullWidth
                          aria-readonly
                          value={viewMediaData.description}
                          placeholder="Lorem Ipsum is simply dummy text of Lorem Ipsum is simply dummy text of
                          Lorem Ipsum is simply dummy text of
                          Lorem Ipsum is simply dummy text of"
                          className={classes.textField}
                          multiline
                          rows={4}
                        />
                      </Box>
                      <Box style={{ marginTop: "16px" }}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => history.push("/pressMedia")}
                          className={classes.newbtn}
                        >
                          Back
                        </Button>
                      </Box>
                    </FormControl>
                  </Grid>
                </form>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
