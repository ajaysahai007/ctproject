import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import CheckIcon from '@material-ui/icons/Check'
import { Box, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
export default function AlertDialog({
  open,
  handleClose,
  title,
  desc,
  confirmationHandler,
}) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      
      >
        <DialogTitle id="alert-dialog-title" style={{ textAlign: 'center' }}>
          <Typography variant="h2">
            Logout
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography
              style={{
                textAlign: 'center',
                fontSize: '24px',
                fontWeight: '400',
                color: '#000',
              }}
            >
              Are you sure you want to logout ?
            </Typography>

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              handleClose()
              // confirmationHandler()
            }}
          >
            No
          </Button>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Button variant="containedPrimary" onClick={handleClose} autoFocus>
              Yes
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  )
}
