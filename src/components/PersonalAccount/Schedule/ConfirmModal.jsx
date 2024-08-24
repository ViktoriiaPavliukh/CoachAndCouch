import React from "react";
import { useIntl } from "react-intl";
import moment from "moment";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const ConfirmModal = ({ open, onClose, onConfirm, slot }) => {
  const intl = useIntl();
  if (!slot) {
    return null;
  }

  const formattedStartDate = moment(slot.start).format("MMM DD, YYYY");
  const formattedStartTime = moment(slot.start).format("HH:mm");
  const formattedEndDate = moment(slot.end).format("MMM DD, YYYY");
  const formattedEndTime = moment(slot.end).format("HH:mm");

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle> {intl.formatMessage({ id: "confirmSlot" })}</DialogTitle>
      <DialogContent>
        <Typography>
          {intl.formatMessage({ id: "addSlot" })}
          {formattedStartDate} {formattedStartTime} - {formattedEndDate}{" "}
          {formattedEndTime}?
        </Typography>
      </DialogContent>
      <DialogActions sx={{ mb: "20px", pr: "20px" }}>
        <Button type="button" variant="outlined" onClick={onClose}>
          <Typography
            variant="posterButton"
            sx={{ color: (theme) => theme.palette.textColor.fontColor }}
          >
            {intl.formatMessage({ id: "closeBtn" })}
          </Typography>
        </Button>
        <Button
          type="button"
          variant="contained"
          onClick={() => {
            onConfirm();
            onClose();
          }}
        >
          {intl.formatMessage({ id: "confirmBtn" })}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmModal;
