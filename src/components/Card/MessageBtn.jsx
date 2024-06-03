import { PropTypes } from "prop-types";
import { useIntl } from "react-intl";
import { Button, Link, Typography } from "@mui/material";

export function MessageBtn({ email }) {
  const intl = useIntl();
  return (
    <Link href={`mailto:${email}`}>
      <Button
        variant="contained"
        sx={{ marginLeft: "125px", marginRight: " 20px", p: "10px 18px" }}
      >
        <Typography variant="posterButton">
          {intl.formatMessage({ id: "message" })}
        </Typography>
      </Button>
    </Link>
  );
}
MessageBtn.propTypes = {
  sx: PropTypes.objectOf(PropTypes.any),
  email: PropTypes.string.isRequired,
};
