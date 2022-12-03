/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from "react";
import { matchPath } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import {
  Box,
  List,
  makeStyles,
  Avatar,
  Typography,
  Button,
} from "@material-ui/core";
import { Dialog } from "@material-ui/core";
import NavItem from "src/layouts/DashboardLayout/NavBar/NavItem";
import { useHistory } from "react-router-dom";
import ConfirmationDialog from "src/component/ConfirmationDialog";
import apiConfig from "src/APIconfig/ApiConfig.js";
import axios from "axios";

import {
  FaWallet,
  FaSignOutAlt,
  FaUserEdit,
  FaUser,
  FaSignInAlt,
} from "react-icons/fa";

const sections = [
  // {
  //   title: "Login",
  //   href: "/login",
  //   icon: FaSignInAlt,
  // },
  {
    title: "Profile",
    href: "/view-profile",
    icon: FaUser,
  },
  {
    title: "Edit Profile",
    href: "/edit-profile",
    icon: FaUserEdit,
  },

  {
    title: "Logout",
    href: "/dashboard",
    icon: FaSignOutAlt,
  },
];

function renderNavItems({ items, pathname, depth = 0 }) {
  return (
    <List disablePadding>
      {items.reduce(
        (acc, item) => reduceChildRoutes({ acc, item, pathname, depth }),
        []
      )}
    </List>
  );
}

function reduceChildRoutes({ acc, pathname, item, depth }) {
  const key = item.title + depth;

  if (item.items) {
    const open = matchPath(pathname, {
      path: item.href,
      exact: false,
    });

    acc.push(
      <NavItem
        depth={depth}
        icon={item.icon}
        info={item.info}
        key={key}
        open={Boolean(open)}
        title={item.title}
      >
        {renderNavItems({
          depth: depth + 1,
          pathname,
          items: item.items,
        })}
      </NavItem>
    );
  } else {
    acc.push(
      <NavItem
        depth={depth}
        href={item.href}
        icon={item.icon}
        info={item.info}
        key={key}
        title={item.title}
      />
    );
  }

  return acc;
}

const useStyles = makeStyles((theme) => ({
  admin: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#000",
  },
  admintext: {
    display: "flex",
    alignItems: "center",
  },
  mobileDrawer: {
    width: 256,
  },
  desktopDrawer: {
    position: "absolute",
    right: -25,
    top: 30,
    width: 240,
    color: "#000",
    // background: theme.palette.primary.main,
  },
  avatar: {
    cursor: "pointer",
    width: 50,
    height: 50,
    "@media (max-width: 767px)": {
      width: "50px",
      height: "50px",
    },
  },
  btnHover: {
    "& button": {
      "& :hover": {
        backgroundColor: "#F38500",
        color: "#000",
      },
    },
  },
  avatarBig: {
    cursor: "pointer",
    width: 150,
    height: 150,
  },
  socialIcon: {
    cursor: "pointer",
    marginRight: 5,
  },
  //   .MuiButton-root:hover
}));

const NavBar = () => {
  const classes = useStyles();
  const [rightBar, setRightBar] = useState(false);
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const logoutHandler = () => {
  //   history.push("/login");
  //   window.localStorage.removeItem("token");
  // };
  // const [isLoading, setIsLoading] = useState(false);

  const [userDetails, setUserDetails] = useState("");

  const viewUserApiHandler = async () => {
    try {
      setIsLoading(true);
      const res = await axios({
        method: "GET",
        url: apiConfig.getProfile,
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
      });
      if (res?.status) {
        setIsLoading(false);

        console.log("res-->>", res);
        setUserDetails(res.data.result);
      }
    } catch (error) {
      setIsLoading(false);

      console.log(error);
    }
  };
  const confirmationHandler = () => {
    history.push("/login");
    window.localStorage.removeItem("token");
  };

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      {open && (
        <ConfirmationDialog
          open={open}
          handleClose={() => setOpen(false)}
          title={"Logout"}
          desc={"Do you want to logout ?"}
          confirmationHandler={confirmationHandler}
          style={{ color: "#fff" }}
        />
      )}
      <PerfectScrollbar
        options={{ suppressScrollX: true }}
        className="walletbox"
      >
        <Box>
          <Typography variant="h6" align="left">
            {userDetails?.name}
          </Typography>
          <Typography variant="caption" style={{ color: "#000" }} align="left">
            {userDetails?.email}
          </Typography>
        </Box>
        <div style={{ borderBottom: "1px solid #F38500", height: 10 }}></div>
        <Box pt={1}>
          {sections.map((section, i) => {
            const Icon = section.icon;
            return (
              <Button
                fullWidth
                className={classes.btnHover}
                style={{
                  justifyContent: "left",
                  color: "#000",
                  textTransform: "capitalize",
                }}
                key={i}
                onClick={() => {
                  section.title === "Logout"
                    ? setOpen(true)
                    : history.push(section.href);
                }}
              >
                <Icon color="#000" /> &nbsp;&nbsp;{section.title}
              </Button>
            );
          })}
        </Box>
      </PerfectScrollbar>
    </Box>
  );
  useEffect(() => {
    viewUserApiHandler();
  }, []);
  return (
    <>
      <Box className={classes.admintext}>
        <Avatar
          src={
            userDetails?.profilePic
              ? userDetails?.profilePic
              : "/images/t3.jpeg"
          }
          className={classes.avatar}
          onClick={() => {
            setRightBar(!rightBar);
          }}
        />{" "}
        &nbsp;
        {/* <Typography className={classes.admin}>Hii Admin</Typography> */}
      </Box>

      <Dialog
        classes={{ paper: classes.desktopDrawer }}
        open={rightBar}
        onClose={() => {
          setRightBar(false);
        }}
      >
        {content}
      </Dialog>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

export default NavBar;
