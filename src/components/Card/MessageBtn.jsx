import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { Button, Link, Typography } from "@mui/material";

export function MessageBtn({ onShowModalClick }) {
  const intl = useIntl();
  return (
    <Button
      onClick={onShowModalClick}
      sx={{ p: "12px 24px", borderRadius: "6px" }}
      variant="contained"
    >
      <Typography variant="posterButton">
        {intl.formatMessage({ id: "message" })}
      </Typography>
    </Button>
  );
}

MessageBtn.propTypes = {
  onShowModalClick: PropTypes.func.isRequired,
};
