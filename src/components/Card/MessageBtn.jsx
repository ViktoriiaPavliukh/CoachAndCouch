import { PropTypes } from "prop-types";
import { useIntl } from "react-intl";
import { Button, Typography } from "@mui/material";

export function MessageBtn({ onShowModalClick }) {
  const intl = useIntl();
  return (
    <Button
      onClick={onShowModalClick}
      sx={{ marginLeft: "125px", marginRight: " 20px", p: "10px 18px" }}
      variant="contained"
    >
      <Typography variant="posterButton">
        {intl.formatMessage({ id: "message" })}
      </Typography>
    </Button>
  );
}
MessageBtn.propTypes = {
  sx: PropTypes.objectOf(PropTypes.any),
  onShowModalClick: PropTypes.func.isRequired,
};
