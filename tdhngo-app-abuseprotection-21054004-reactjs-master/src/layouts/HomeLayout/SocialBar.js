import React, { useState, useEffect, useContext } from 'react'
import {
  Grid,
  Box,
  Container,
  Typography,
  makeStyles,
  Button,
  ListItem,
  List,
} from '@material-ui/core'
import TwitterIcon from '@material-ui/icons/Twitter'
import FacebookIcon from '@material-ui/icons/Facebook'
import InstagramIcon from '@material-ui/icons/Instagram'
import YouTubeIcon from '@material-ui/icons/YouTube'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import IconButton from '@material-ui/core/IconButton'
import Brightness3Icon from '@material-ui/icons/Brightness3'
import Brightness7Icon from '@material-ui/icons/Brightness7'
import typography from 'src/theme/typography'
import { createMuiTheme } from '@material-ui/core/styles'
import { AuthContext } from 'src/context/Auth'
const useStyles = makeStyles((theme) => ({
  socialBox: {
    background: theme.palette.background.subfootercolor,

    '& ul': {
      padding: 0,
      display: 'flex',
      alignItems: 'center',
      '& li': {
        width: 'auto',
        padding: '5px',
        '& a': {
          color: '#fff',
          textDecoration: 'none',
          fontSize: '14px',
          fontWeight: 300,
          '&:hover': {
            color: '#5a86ff',
          },
          '& svg': {
            fontSize: '20px',
            [theme.breakpoints.down('xs')]: {
              fontSize: '17px',
            },
          },
        },
      },
    },
    '& .leftBox': {
      justifyContent: 'flex-end',
    },
    '& .submit': {
      backgroundColor: '#5a86ff',
      paddingLeft: '5px',
      paddingRight: '5px',
      [theme.breakpoints.down('xs')]: {
        fontSize: '12px',
      },
      '&:hover': {
        color: '#fff',
      },
    },
  },
  toggleButtonShell: {
    // border: '1px solid #000',
    borderRadius: '32px',
    width: '50px',
    // backgroundColor: '#000',
    height: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '4px 3px',
  },
  toggleButton: {
    border: '1px solid #000',
    borderRadius: '100%',
    display: 'flex',
    padding: '6px',
    cursor: 'pointer',
  },
}))

export default function Liquidity() {
  const classes = useStyles()

  const auth = useContext(AuthContext)

  return (
    <Box className={classes.socialBox}>
      <Container>
        <Grid container alignItems="center">
          <Grid item xs={6} sm={6}>
            <List>
              {/* <ListItem>
                <Link to="">Bitcomin</Link>
              </ListItem>
              <ListItem>
                <Link to="/white-paper">White Paper</Link>
              </ListItem> */}
              <ListItem>
                <Link to="" className="submit">
                  Submit your Token
                </Link>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Box display="flex" alignItems="center" justifyContent="flex-end">
              <List className="leftBox">
                <ListItem>
                  <a href="https://www.instagram.com/" target="_blank">
                    <InstagramIcon />
                  </a>
                </ListItem>
                <ListItem>
                  <a href="https://twitter.com/" target="_blank">
                    <TwitterIcon />
                  </a>
                </ListItem>
                <ListItem>
                  <a href="https://www.facebook.com/" target="_blank">
                    <FacebookIcon />
                  </a>
                </ListItem>
                <ListItem>
                  <a href="https://www.youtube.com/" target="_blank">
                    <YouTubeIcon />
                  </a>
                </ListItem>
              </List>
              <Box
                className={`${classes.toggleButtonShell} `}
                style={
                  !auth.theme
                    ? { backgroundColor: '#fff' }
                    : { backgroundColor: '#4c4949', border: '1px solid #000' }
                }
              >
                <IconButton
                  // className={classes.toggleButton}
                  style={
                    auth.theme
                      ? { color: '#000', padding: '1px' }
                      : { background: '#242538', padding: '1px' }
                  }
                >
                  <Brightness7Icon
                    style={
                      auth.theme
                        ? { color: '#000', fontSize: '20px' }
                        : { color: 'rgb(244 144 24)', fontSize: '20px' }
                    }
                    onClick={() => auth?.setTheme(false)}
                  />
                </IconButton>
                <IconButton
                  // className={classes.toggleButton}
                  style={
                    !auth.theme
                      ? { color: '#000', padding: '1px' }
                      : { background: '#000', padding: '1px' }
                  }
                >
                  <Brightness3Icon
                    onClick={() => auth?.setTheme(true)}
                    style={
                      !auth.theme
                        ? {
                            color: '#000',
                            transitionDuration: '4s',
                            fontSize: '20px',
                          }
                        : {
                            color: '#ffc107',
                            transform: 'rotate(152deg)',
                            transitionDuration: '4s',
                            fontSize: '20px',
                          }
                    }
                  />
                </IconButton>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
