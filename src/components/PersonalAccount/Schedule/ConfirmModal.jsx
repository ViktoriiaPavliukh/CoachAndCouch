import React from "react";
import moment from "moment";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const ConfirmModal = ({ open, onClose, onConfirm, slot }) => {
  if (!slot) {
    return null; // Don't render if slot is not provided
  }

    const formattedStartDate = moment(slot.start).format("MMM DD, YYYY");
    const formattedStartTime = moment(slot.start).format("HH:mm");
    const formattedEndDate = moment(slot.end).format("MMM DD, YYYY");
    const formattedEndTime = moment(slot.end).format("HH:mm");

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Slot</DialogTitle>
      <DialogContent>
        <Typography>
          Do you want to add this slot: {formattedStartDate}{" "}
          {formattedStartTime} - {formattedEndDate} {formattedEndTime}?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={() => {
            onConfirm();
            onClose();
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmModal;
