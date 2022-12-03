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
  subject: yep
    .string()
    .required(" Subject is required")
    .min(2, "Please enter atleast 2 characters")
    .max(35, "You can enter only 35 characters")
    .matches(
      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/,
      "Only alphabets and whitespaces are allowed for this field number are not. "
    ),
  description: yep
    .string()
    .required(" Message is required")
    .min(2, "Please enter atleast 2 characters")
    .max(750, "You can enter only 750 characters"),
});

export default function KycList(props) {
  console.log("props???", props);
  const classes = useStyles();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [btnText, setBtnText] = useState("SUBMIT");
  const [staticData, setSattaicsData] = useState();
  const location = useLocation();
  const allData = location.state
  const auth = useContext(AuthContext);
  const editor = useRef(null);
  const [descritionValue, setdescriptionValue] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [Idd, setIdd] = useState();


console.log("asdasdasdas",allData);
const titleData = allData.title
const [title,setTitle] = useState(titleData ? titleData:"")
console.log("sdasdasiuowerq",titleData)



const [formValue, setFormValue] = useState({
    title: "",
    description: "",
  });
  const _onInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const temp = { ...formValue, [name]: value };
    setFormValue(temp);
  };

  const FormHandleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmit(true);
    setIsLoading(true);
    if (
      formValue.title !== "" &&
      descritionValue !== "" &&
      formValue.title.length < 40
    ) {
      try {
        const res = await axios({
          method: "PUT",
          url: apiConfig.static,
          data: {
            _id: allData?._id,
            title: title,
            description: descritionValue,
          },
        });
        if (res.data.statusCode === 200) {
          setIsSubmit(false);
          setBtnText("SUBMIT");
          toast.success(res.data.responseMessage);
          history.push("/policy");
          setIsLoading(false);
        }
      } catch (error) {
        setIsSubmit(false);
        toast.error(error.message);
        setIsLoading(false);
      }
    }
  };



  useEffect(() => {
    if (location.search.substring(1, location.search.length)) {
      const id = location.search.substring(1, location.search.length);
      setIdd(id);
    }
    if (location.search.substring(1, location.search.length)) {
      // viewExclusicContentHandler();
    }
  }, [location.search]);
  useEffect(() => {
    if (staticData) {
      setFormValue({
        title: staticData.title ? staticData.title : "",
        description: staticData.description ? staticData.description : "",
      });
      setdescriptionValue(staticData.description ? staticData.description : "");
    }
  }, [staticData]);
  const config = {
    readonly: false,
  };

  return (
    <Page title="KYC">
      <Box className={classes.mainbox}>
        <Box className={classes.devicelistHeading}>
          
          <Typography variant="h1" className="headingText">
            Edit Content
          </Typography>
          
        </Box>
        <Divider style={{ marginTop: "30px" }} />

        <Container maxWidth="md">
          <Box className={classes.formBox}>
            <form onSubmit={(event) => FormHandleSubmit(event)}>
              <Grid container spacing={2} direction={"column"}>
                <Grid item xs={12} md={12}>
                  <label>Title</label>
                  <TextField
                    placeholder="Enter Subject"
                    type="text"
                    size="small"
                    variant="outlined"
                    fullWidth
                    name="title"
                    value={title}
                    error={Boolean(
                      (isSubmit && formValue.title === "") ||
                        (formValue.title !== "" && formValue.title.length > 40)
                    )}
                    // onBlur={handleBlur}
                    onChange={_onInputChange}
                    
                  />
                  {(isSubmit && formValue.title === "" && (
                    <FormHelperText error>Title is required</FormHelperText>
                  )) ||
                    (formValue.title !== "" && formValue.title.length > 40 && (
                      <FormHelperText error>
                        Title should be less than 40 characters.
                      </FormHelperText>
                    ))}
                </Grid>
                <Grid item xs={12} md={12}>
                  <label>Description</label>
                  <JoditEditor
                    ref={editor}
                    // value={descritionValue}
                    value={allData.description}
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
                  {/* <TextField
                    placeholder="Enter your message"
                    type="text"
                    size="small"
                    variant="outlined"
                    multiline
                    fullWidth
                    maxRows={4}
                    Scroll="auto"
                    name="description"
                    value={formValue.description}
                    //   error={Boolean(touched.description && errors.description)}
                    // onBlur={handleBlur}
                    onChange={_onInputChange}
                  /> */}
                  {isSubmit && descritionValue === "" && (
                    <FormHelperText error>
                      Description is required
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} align="center">
                  <Box mb={0} className={classes.btnmargin}>
                    <Box className={classes.boxbutton}>
                      <Box textAlign="center" style={{ margin: "0px 10px" }}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => history.push("/resouceMgmt")}
                        >
                          BACK
                        </Button>
                      </Box>
                      <Box textAlign="center" className={classes.btnmain}>
                        <Button variant="contained" onClick={FormHandleSubmit} color="primary">
                          UPDATE
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                  {/* <Button
                    variant="contained"
                    color="secondary"
                    type="submit"
                    size="large"
                    disabled={isLoading}
                  >
                    Submit
                  </Button> */}
                </Grid>
              </Grid>
            </form>
          </Box>
        </Container>
      </Box>
    </Page>
  );
}
