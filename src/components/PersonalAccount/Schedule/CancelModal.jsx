import React from "react";
import PropTypes from "prop-types";
import { Modal, Box, Button, Typography } from "@mui/material";
import { useIntl } from "react-intl";

export const CancelModal = ({ lesson, student, open, onClose, onConfirm }) => {
  const intl = useIntl();

  const studentName = student
    ? `${student.firstName} ${student.lastName ? student.lastName : ""}`
    : "Unknown";
  console.log(student);
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          borderRadius: "8px",
          boxShadow: 24,
          p: 4,
          textAlign: "start",
        }}
      >
        <Typography sx={{ fontSize: "16px" }}>
          {`${intl.formatMessage({
            id: "confirmCancel",
          })} ${studentName} ${intl.formatMessage({ id: "at" })} ${lesson}?`}
        </Typography>
        <Box
          sx={{ display: "flex", justifyContent: "end", mt: 2, gap: "16px" }}
        >
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
        </Box>
      </Box>
    </Modal>
  );
};

CancelModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  student: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  }),
};
