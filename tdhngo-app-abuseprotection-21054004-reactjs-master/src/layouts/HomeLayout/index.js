import React from 'react'
import { makeStyles } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import Footer from './Footer'
import TopBar from './TopBar'
import SocialBar from './SocialBar'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#fff',
  },
  MainLayout: {
    minHeight: 'calc(100vh - 415px)',
    // paddingTop: "50px",
    backgroundColor: '#f5f7fa',
  },
}))

const MainLayout = ({ children }) => {
  const classes = useStyles()
  const history = useHistory()
  console.log(history.location)
  return (
    <div className={classes.root}>
      <SocialBar />
      <TopBar />
      <div
        style={
          history.location.pathname !== '/'
            ? { display: 'block' }
            : { display: 'none' }
        }
      ></div>

      <div className={classes.MainLayout}>{children}</div>
      <Footer />
    </div>
  )
}

export default MainLayout
