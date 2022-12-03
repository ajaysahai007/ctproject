/* eslint-disable no-use-before-define */
import React, { useEffect } from "react";
import { useLocation, matchPath, useHistory } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Drawer,
  Hidden,
  List,
  ListSubheader,
  makeStyles,
  Typography,
} from "@material-ui/core";
import Logo from "src/component/Logo";
import {
  FaTachometerAlt,
  FaUniversity,
  FaUserAlt,
  FaClipboardCheck,
  FaMoneyBillAlt,
  FaPhoneSquareAlt,
  FaCommentAlt,
} from "react-icons/fa";
import { AiFillPicture } from "react-icons/ai";
import { RiLayoutGridFill, RiLayoutRowFill } from "react-icons/ri";
import { IoLogOutOutline } from "react-icons/io5";
import { BiNews } from "react-icons/bi";
import { RiFileCopy2Fill } from "react-icons/ri";
import { IoCall } from "react-icons/io5";
import { FaRegIdCard } from "react-icons/fa";
import { GiToken, GiTrade } from "react-icons/gi";
import NavItem from "./NavItem";
import PeopleIcon from "@material-ui/icons/People";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import DevicesOtherIcon from "@material-ui/icons/DevicesOther";
import RecentActorsIcon from "@material-ui/icons/RecentActors";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
const sections = [
  {
    items: [
      {
        title: "Home",
        icon: FaTachometerAlt,
        href: "/dashboard",
      },

      {
        title: "User Management",
        icon: FaUserAlt,
        href: "/users",
      },
      {
        title: "Category Management",
        icon: RiLayoutGridFill,
        href: "/categoryMgmt",
      },
      // {
      //   title: "Activity Management",
      //   icon: SubscriptionsIcon,
      //   href: "/activityMgmt",
      // },

      // {
      //   title: "Activity Management",
      //   icon: SubscriptionsIcon,
      //   href: "activityMgmt",
      //   items: [
      //     {
      //       title: "Activity Management",
      //       icon: SubscriptionsIcon,
      //       href: "/activityMgmt",
      //     },
      //     // {
      //     //   title: "Sub-Activity Management",
      //     //   icon: SubscriptionsIcon,
      //     //   href: "/sub-activityMgmt",
      //     // },
      //   ],
      // },
      {
        title: "Activity Management",
        icon: SubscriptionsIcon,
        href: "/activityMgmt",
      },

      {
        title: "Resource Management",
        icon: FaRegIdCard,
        href: "/resouceMgmt",
      },
      {
        title: "Emergency Management",
        icon: IoCall,
        href: "/emergencyMgmt",
      },
      {
        title: "Banner Management",
        icon: AiFillPicture,
        href: "/bannerMgmt",
      },
      {
        title: "Content Management",
        icon: RiLayoutRowFill,
        href: "/contentMgmt",
      },
      {
        title: "Report Management",
        icon: RiFileCopy2Fill,
        href: "/report-management",
      },

      {
        title: "Feedback Management",
        icon: FaCommentAlt,
        href: "/feedbackMgmt",
      },

      // {
      //   title: "Device List",
      //   icon: DevicesOtherIcon,
      //   href: "/devicelist",
      // },
    ],
  },
];
const sectionsBelow = [
  {
    items: [
      {
        // title: "Logout",
        icon: ExitToAppIcon,
        href: "/terms-and-condition",
      },
      // {
      //   title: "Privacy Policy",
      //   //icon: PieChartIcon,
      //   href: "/privacy-policy",
      // },
    ],
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
  mobileDrawer: {
    width: 256,
    boxShadow: "0px 0px 5px black",
    backgroundColor: "#ffdead",
    // boxShadow: "rgb(90 114 123 / 11%) 0px 7px 30px",
  },
  desktopDrawer: {
    width: 256,
    top: 0,
    boxShadow: "0px 0px 5px black",
    height: "100%",
    backgroundColor: "#ffdead",
    // boxShadow: "0px 0px 5px black",
  },
  avatar: {
    cursor: "pointer",
    width: 64,
    height: 64,
  },
  socialIcon: {
    cursor: "pointer",
    marginRight: 5,
  },
  logoicon: {
    display: "flex",
    marginTop: "16px",
    alignItems: "center",
    justifyContent: "center",
  },
  logoutbutton: {
    justifyContent: "space-between",
    paddingLeft: 10,
    borderRadius: 0,
    width: "60px",
    textAlign: "center",
  },
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      {/* <Hidden mdDown> */}
      <Box padding={0} className={classes.logoicon}>
        <Logo
          width="180"
          style={{
            width: "200px",

            cursor: "pointer",
          }}
        />
      </Box>
      {/* </Hidden> */}
      <PerfectScrollbar options={{ suppressScrollX: true }}>
        <Box py={2}>
          {sections.map((section, i) => (
            <List
              key={`menu${i}`}
              subheader={
                <ListSubheader disableGutters disableSticky>
                  {section.subheader}
                </ListSubheader>
              }
            >
              {renderNavItems({
                items: section.items,
                pathname: location.pathname,
              })}
            </List>
          ))}
        </Box>
        <Box className="side_nev_Bottom">
          {sectionsBelow.map((section, i) => (
            <List
              key={`menu${i}`}
              subheader={
                <ListSubheader disableGutters disableSticky>
                  {section.subheader}
                </ListSubheader>
              }
            >
              {/* {section.items.map((itemList, i) => {
                return (
                  <Box align="left">
                    <Button
                      fullWidth
                      color="primary"
                      startIcon={
                        <IoLogOutOutline
                          style={{
                            fontSize: "40px",
                            color: "#F38500",
                          }}
                        />
                      }
                      key={i}
                      className={classes.logoutbutton}
                      style={{}}
                      onClick={handleClickOpen}
                    >
                      {itemList.title}
                    </Button>

                    <Dialog
                      open={open}
                      fullWidth
                      maxWidth="sm"
                      onClose={handleClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <Typography
                        variant="h2"
                        align="center"
                        style={{ fontSize: "24px" }}
                      >
                        Logout
                      </Typography>
                      <DialogContent>
                        <DialogContentText
                          id="alert-dialog-description"
                          align="center"
                        >
                          Are you sure you want to logout?sssss
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button
                          onClick={handleClose}
                          variant="contained"
                          style={{border:"1px solid #fff"}}
                          color="primary"
                        >
                          No
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          style={{border:"1px solid #fff"}}
                          // onClick={handleClose}
                          onClick={()=>{
                            history.push({pathname:'./'})
                          }}
                          autoFocus
                        >
                          Yes
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </Box>
                );
              })} */}
            </List>
          ))}
        </Box>
      </PerfectScrollbar>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

export default NavBar;
