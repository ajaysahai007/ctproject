import React, { useState, useEffect, useRef, useContext } from "react";
import {
  Button,
  Grid,
  Box,
  Container,
  InputAdornment,
  FormControl,
  Typography,
  OutlinedInput,
  InputLabel,
  TextField,
  Divider,
  FormHelperText,
} from "@material-ui/core";
import Page from "src/component/Page";
import { FaPlus, FaSearch } from "react-icons/fa";
import { makeStyles } from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import * as yep from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import apiConfig from "src/APIconfig/ApiConfig";
import JoditEditor from "jodit-react";
import { AuthContext } from "src/context/Auth";
const useStyles = makeStyles((theme) => ({
  root: {
    paddingRight: 0,
  },
  inputAdornment: {
    backgroundColor: "#f5d5da",
    height: 40,
    maxHeight: 40,
    paddingRight: 10,
    paddingLeft: 10,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  mainbox: {
    padding: "23px 0 30px",
  },

  iconcolor: {
    backgroundColor: "#f5f5f5",
    padding: "16px",
    color: "#8a3ab9",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  iconcolor2: {
    cursor: "pointer",
    backgroundColor: "#00acee",
    padding: "16px",
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  iconcolor3: {
    cursor: "pointer",
    backgroundColor: "#ff0000",
    padding: "16px",
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  iconcolor4: {
    cursor: "pointer",
    backgroundColor: "#3b5998",
    padding: "16px",
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  iconcolor5: {
    cursor: "pointer",
    backgroundColor: "#f5f5f5",
    padding: "16px",
    color: "#54b6e7",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  iconcolor6: {
    cursor: "pointer",
    backgroundColor: "#7d9bff",
    padding: "16px",
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  mainSocail: {
    "& input": {
      border: "none",
      outline: "none",
      padding: "8px",
      minWidth: "352px",
      width: "100%",
      color: "#9a9a9a",
    },
  },
  subsocial: {
    cursor: "pointer",
  },
  iconPart: {
    color: "hsl(198deg 86% 53%)",
    background: "hsl(0deg 0% 96%)",
    padding: "8px",
  },
  iconPart1: {
    color: "hsl(1deg 93% 56%)",
    background: "hsl(0deg 0% 96%)",
    padding: "8px",
  },
  iconPart2: {
    color: "hsl(221deg 44% 41%)",
    background: "hsl(0deg 0% 96%)",
    padding: "8px",
  },
  iconPart3: {
    color: "hsl(279deg 45% 68%)",
    background: "hsl(0deg 0% 96%)",
    padding: "8px",
  },
  btnmargin: {
    marginTop: "30px",

    "@media(max-width:767px)": {
      marginTop: "20px",
    },
  },
  boxbutton: {
    display: "flex",
    alignItems: "center",
    marginTop: "10px",

    justifyContent: "center",
    paddingRight: "50px",
    "@media(max-width:960px)": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    "@media(max-width:375px)": {
      // display: 'grid',
      alignItems: "center",
      justifyContent: "center",
    },
  },
  btnmain: {
    textAlign: "center",
  },
  divider: {
    marginTop: "10px",
    backgroundColor: "#F38500",
    marginBottom: "20px",
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
  formBox: {
    border: " 1px solid #F38500",
    padding: "2rem",
    borderRadius: "15px",
    backgroundColor: "#FEDDB6",
  },
  placeholdercolor: {
    "& input": {
      color: theme.palette.text.black,
      "&::placeholder": {
        color: theme.palette.text.black,
      },
    },
    "& textarea": {
      color: theme.palette.text.black,

      "&::placeholder": {
        color: theme.palette.text.black,
      },
    },
  },
}));

const formValidationSchema = yep.object().shape({
  title: yep
    .string()
    .required(" Subject is required")
    .min(2, "Please enter atleast 2 characters")
    .max(35, "You can enter only 35 characters"),
  description: yep
    .string()
    .required(" Message is required")
    .min(2, "Please enter atleast 2 characters")
    .max(750, "You can enter only 750 characters"),
});

export default function KycList(props) {
  const classes = useStyles();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [btnText, setBtnText] = useState("SUBMIT");
  const [staticData, setSattaicsData] = useState();
  const location = useLocation();

  const auth = useContext(AuthContext);
  const editor = useRef(null);
  const [descritionValue, setdescriptionValue] = useState("");
  console.log("descritionValue--->>", descritionValue);
  const [isSubmit, setIsSubmit] = useState(false);
  const _type = location?.state?.type;

  const functionKey = location.search.split("?")[1];
  console.log("functionKey---12??", _type);

  const config = {
    readonly: false,
  };
  const [_isloading, setLoading] = useState();
  const [_viewstaticconstent, setViewStaticConstent] = useState();
  const [_cottentid, setContentID] = useState();
  const [_titlechange, setTitleChange] = useState();
  console.log("props???", _titlechange);
  //VIEW STATIC CONTENT API
  const viewStaticContent = async () => {
    try {
      setIsSubmit();
      const res = await axios({
        url: apiConfig.editStaticContent,
        method: "GET",
        params: {
          type: _type,
        },
      });
      if (res) {
        console.log("123res-->>", res);
        setIsSubmit(false);
        setViewStaticConstent(res?.data?.result);
        setTitleChange(res?.data?.result?.title);
        setContentID(res?.data?.result?._id);
        setdescriptionValue(res?.data?.result?.description);
      }
    } catch (error) {
      setIsSubmit(false);
      console.log(error);
    }
  };
  //Update Static Content API
  const EditStaticContent = async () => {
    try {
      const res = await axios({
        url: apiConfig.editStaticContent,
        method: "PUT",
        data: {
          _id: _cottentid,
          title: _titlechange,
          description: descritionValue,
        },
      });
      if (res) {
        history.push("./contentMgmt");
      }
    } catch (error) {}
  };
  useEffect(() => {
    viewStaticContent();
  }, [_type]);

  return (
    <Page title="Edit Content">
      <Box className={classes.mainbox}>
        <Box className={classes.devicelistHeading}>
          <Typography variant="h1" className="headingText">
            {`Edit ${
              functionKey === "Terms&Condition"
                ? "Terms & Condition"
                : functionKey === "About"
                ? "About Us"
                : functionKey === "Privacy"
                ? "Privacy Policy"
                : functionKey === "Contact"
                ? "Contact Us"
                : ""
            } Content`}
          </Typography>
        </Box>
        <Divider className={classes.divider} />

        <Container maxWidth="md">
          <Box className={classes.formBox}>
            <form>
              <Grid container spacing={2} direction={"column"}>
                <Grid item xs={12} md={12}>
                  <label>Title</label>
                  {/* {console.log("asdasdafwedf",allData[0].title)} */}
                  <TextField
                    // placeholder="Enter Subject"
                    type="text"
                    size="small"
                    variant="outlined"
                    fullWidth
                    name="title"
                    onChange={(e) => setTitleChange(e.target.value)}
                    value={`${
                      functionKey === "Terms&Condition"
                        ? _titlechange
                        : functionKey === "About"
                        ? "About Us"
                        : functionKey === "Privacy"
                        ? _titlechange
                        : functionKey === "Contact"
                        ? "Contact Us"
                        : ""
                    } `}
                    // onBlur={handleBlur}
                    // onChange={(e) => setTitle(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <label>Description</label>
                  <JoditEditor
                    ref={editor}
                    value={`${
                      (_type === "termsConditions" &&
                        _viewstaticconstent?.description) ||
                      (_type === "privacyPolicy" &&
                        _viewstaticconstent?.description) ||
                      (_type === "aboutUs" && _viewstaticconstent?.description)
                    }`}
                    // value="Only description"
                    // value={formData.description}
                    config={config}
                    // disabled={loader}
                    name="descritionValue"
                    variant="outlined"
                    fullWidth
                    size="small"
                    tabIndex={1}
                    onBlur={(e) => setdescriptionValue(e)} // preferred to use only this option to update the content for performance reasons
                    onChange={(newContent) => {}}
                  />

                  {isSubmit && descritionValue === "" && (
                    <FormHelperText error>
                      Description is required
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} md={12}>
                  <label>Created At</label>
                  {/* {console.log("asdasdafwedf",allData[0].title)} */}
                  <TextField
                    // placeholder="Enter Subject"
                    type="text"
                    size="small"
                    variant="outlined"
                    fullWidth
                    name="title"
                    value={_viewstaticconstent?.createdAt}
                    disabled
                    // onBlur={handleBlur}
                    // onChange={(e) => setTitle(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} align="center">
                  <Box mb={0} className={classes.btnmargin}>
                    <Box className={classes.boxbutton}>
                      <Box textAlign="center" style={{ margin: "0px 10px" }}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => history.push("/contentMgmt")}
                        >
                          BACK
                        </Button>
                      </Box>
                      <Box textAlign="center" className={classes.btnmain}>
                        <Button
                          variant="contained"
                          color="primary"
                          // onClick={() => history.push("/contentMgmt")}
                          onClick={EditStaticContent}
                        >
                          UPDATE
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Container>
      </Box>
    </Page>
  );
}
