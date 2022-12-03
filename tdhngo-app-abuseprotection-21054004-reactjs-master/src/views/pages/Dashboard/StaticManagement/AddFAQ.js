import React, { useContext, useState, useEffect, useRef } from "react";
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
import JoditEditor from "jodit-react";
import Button from "@material-ui/core/Button";
import { FiUpload } from "react-icons/fi";
import { addImageHandler, getBase64 } from "src/utils";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import apiConfig from "src/APIconfig/ApiConfig";

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
    border: "1px solid #F38500",
    padding: "40px",
    borderRadius: "15px",
    backgroundColor: "#FEDDB6",
  },
  divider: {
    marginTop: "30px",
  },
  textField: {
    maxWidth: "100%",
  },

  image: {
    // display: "flex",
    // justifyContent: "center",
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
  divider: {
    marginTop: "10px",
    background: "#F38500",
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
  const [isLoadin, setIsLoading] = useState(false);
  const config = {
    readonly: false,
  };
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const editor = useRef(null);

  const FormHandleSubmit = async (values) => {
    setIsLoading(true);
    try {
      const res = await axios({
        method: "POST",
        url: apiConfig.faq,
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
        data: {
          question: question,
          answer: answer,
        },
      });
      if (res.data.statusCode === 200) {
        setIsLoading(false);
        toast.success("FAQ Added Successfully!");
        history.push("/view-announcements");
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <Box className={classes.NftBreed}>
      <Box className={classes.devicelistHeading}>
        <Typography variant="h1" className="headingText">
          Add New FAQ
        </Typography>

        <Divider className={classes.divider} />
      </Box>
      <Divider className={classes.divider} />
      <Container maxWidth="md">
        <Box mt={10} mb={2} className={classes.main}>
          <Grid container spacing={2}>
            <Grid
              item
              md={12}
              sm={12}
              lg={12}
              xs={12}
              className={classes.image}
            >
              <Box mt={2}>
                <form
                  className="formBox p-0"
                  //   onSubmit={(event) => FormHandleSubmit(event)}
                >
                  <Grid container spacing={2} className="BreedDetails">
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <>
                        <Box mt={2}>
                          <Typography
                            variant="h5"
                            color="primary"
                            style={{ paddingBottom: "8px" }}
                          >
                            Question :
                          </Typography>
                          <TextField
                            variant="outlined"
                            // name="ques"
                            onChange={(e) => setQuestion(e.target.value)}
                            // value={faqData.question}
                            placeholder="Enter Your Question"
                            className={classes.textField}
                          />
                        </Box>
                        <Box>
                          <Box style={{ marginTop: "10px" }}>
                            <Typography
                              variant="h5"
                              color="primary"
                              style={{ paddingBottom: "8px" }}
                            >
                              Answer :
                            </Typography>
                            <JoditEditor
                              ref={editor}
                              config={config}
                              name="answer"
                              value={answer}
                              onBlur={(e) => setAnswer(e)}
                              tabIndex={1} // tabIndex of textarea
                              onChange={(newContent) => {}}
                            />
                          </Box>
                        </Box>
                      </>

                      <Box style={{ marginTop: "16px" }}>
                        <Button
                          variant="contained"
                          color="secondary"
                          className={classes.newbtn}
                          onClick={() => history.push("/view-announcements")}
                        >
                          Back
                        </Button>
                        &nbsp;&nbsp;
                        <Button
                          variant="contained"
                          color="primary"
                          className={classes.newbtn}
                          onClick={FormHandleSubmit}
                        >
                          Submit
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
