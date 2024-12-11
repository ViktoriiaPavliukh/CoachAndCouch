import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import paymentLight from "@assets/icons/payment.svg";
import paymentDark from "@assets/icons/payment_dark.svg";

export function PaymentImage() {
  const theme = useTheme();
  const paymentImage =
    theme.palette.mode === "dark" ? paymentDark : paymentLight;

  return (
    <Box
      component="img"
      loading="lazy"
      src={paymentImage}
      alt="payment options"
      sx={{
        maxWidth: { xs: "134px", xl: "161px" },
        pt: { xs: "16px", md: "0" },
      }}
    />
  );
}
