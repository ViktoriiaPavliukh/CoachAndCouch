import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  CardActionArea,
  CardActions,
  Stack,
} from "@mui/material/";
import mainBg from "@assets/images/bg.png";

export default function PageError() {
  return (
    <Box
      sx={{
        backgroundImage: `url(${mainBg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "calc(100vh - 70px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box>
        <Typography>404</Typography>
        <Typography>Oops! Сторінку не знайдено</Typography>
        <Typography>
          Перевірте URL адресу сторінки або поверніться на головну{" "}
        </Typography>
        <Button>Перейти на головну</Button>
      </Box>
    </Box>
  );
}
