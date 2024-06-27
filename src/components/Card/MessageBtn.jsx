import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { Button, Link, Typography } from "@mui/material";

export function MessageBtn({ email }) {
  const intl = useIntl();
  return (
    <Link href={`mailto:${email}`} underline="none" sx={{display: "flex", flexGrow: 1}}>
      <Button variant="outlined" sx={{ p: "12px 18px", width: "100%" }}>
        <Typography variant="posterButton">
          {intl.formatMessage({ id: "message" })}
        </Typography>
      </Button>
    </Link>
  );
}

MessageBtn.propTypes = {
  email: PropTypes.string.isRequired,
};
