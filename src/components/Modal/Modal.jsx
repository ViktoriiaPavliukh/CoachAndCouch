import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import { TrialLessonWrapper } from "./TrialLessonWrapper";
import { SendMessageWrapper } from "./SendMessageWrapper";
import { Box } from "@mui/material";

export const Modal = ({ onBackdropClose, contentType, children }) => {
  document.body.classList.add("openModal");
  const onBackdrop = (e) => {
    if (e.target === e.currentTarget) {
      onBackdropClose();
      document.body.classList.remove("openModal");
    }
  };

  const renderContent = () => {
    switch (contentType) {
      case "sendMessage":
        return <SendMessageWrapper />;
      case "trialLesson":
        return <TrialLessonWrapper />;
      default:
        return null;
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
      {renderContent()}
    </Box>,

    document.querySelector("#modal-root")
  );
};

Modal.propTypes = {
  onBackdropClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
