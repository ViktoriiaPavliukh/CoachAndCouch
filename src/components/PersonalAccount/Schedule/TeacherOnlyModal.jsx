import React from "react";
import { useIntl } from "react-intl";
import { Modal, Box, Typography, Button } from "@mui/material";
import PropTypes from "prop-types";

const TeacherOnlyModal = ({ open, onClose }) => {
  const intl = useIntl();
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="teacher-only-warning">
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
          textAlign: "center",
        }}
      >
        <Typography>{intl.formatMessage({ id: "onlyTeachers" })}</Typography>
        <Button
          type="button"
          variant="contained"
          onClick={onClose}
          sx={{ mt: "20px" }}
        >
          {intl.formatMessage({ id: "closeBtn" })}
        </Button>
      </Box>
    </Modal>
  );
};

TeacherOnlyModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default TeacherOnlyModal;
