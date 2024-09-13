import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import { TrialLessonWrapper } from "./TrialLessonWrapper/TrialLessonWrapper";
import { SendMessageWrapper } from "./SendMessageWrapper";
import RequestToSignIn from "./ReguestToSignIn";
import { Box } from "@mui/material";
import { useEffect } from "react";

export const Modal = ({
  onBackdropClose,
  contentType,
  id,
  isOpen,
  teacherBookings,
  isFirstTimeBooking,
}) => {
  useEffect(() => {
    const handleNoScroll = () => {
      document.body.style.overflow = isOpen ? "hidden" : "auto";
    };
    const handlePressEsc = (e) => {
      if (e.code === "Escape") {
        onBackdropClose();
      }
    };
    if (isOpen) {
      handleNoScroll();
      window.addEventListener("resize", handleNoScroll);
    }
    window.addEventListener("keydown", handlePressEsc);

    return () => {
      window.removeEventListener("keydown", handlePressEsc);
      window.removeEventListener("resize", handleNoScroll);
      document.body.style.overflow = "auto";
    };
  }, [onBackdropClose, isOpen]);

  const onBackdrop = (e) => {
    if (e.target === e.currentTarget) {
      onBackdropClose();
    }
  };

  const renderContent = () => {
    switch (contentType) {
      case "sendMessage":
        return <SendMessageWrapper id={id} onBackdropClose={onBackdropClose} />;
      case "trialLesson":
        return (
          <TrialLessonWrapper
            id={id}
            teacherBookings={teacherBookings || []}
            isFirstTimeBooking={isFirstTimeBooking || false}
            onBackdropClose={onBackdropClose}
          />
        );
      case "signInOrRegister":
        return <RequestToSignIn onBackdropClose={onBackdropClose} />;
      default:
        return null;
    }
  };
  return createPortal(
    <Box
      onClick={onBackdrop}
      id="Overlay"
      sx={{
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
  isOpen: PropTypes.bool,
};
