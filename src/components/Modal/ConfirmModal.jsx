import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

function ConfirmModal({ setIsDialogOpen, handleClose, isDialogOpen, message }) {
  return (
    <Dialog
      open={isDialogOpen}
      onClose={() => setIsDialogOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Discard Changes?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsDialogOpen(false)}>No, Keep Editing</Button>
        <Button onClick={() => handleClose()} autoFocus>
          Yes,Discard Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmModal;
