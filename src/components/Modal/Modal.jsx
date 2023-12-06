import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import { TrialLessonWrapper } from "./TrialLessonWrapper";
import { Box } from "@mui/material";

export const Modal = ({ onBackdropClose, children }) => {
  document.body.classList.add("openModal");
  const onBackdrop = (e) => {
    if (e.target === e.currentTarget) {
      onBackdropClose();
      document.body.classList.remove("openModal");
    }
  };
  return createPortal(
    <Box
      onClick={onBackdrop}
      id="Overlay"
      style={{
        backgroundColor: "#808080c7",
        position: "fixed",
        width: "100%",
        height: "100%",
        zIndex: "100",
        top: 0,
        left: 0,
      }}
    >
      <TrialLessonWrapper>{children}</TrialLessonWrapper>
    </Box>,

    document.querySelector("#modal-root")
  );
};

Modal.propTypes = {
  onBackdropClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
