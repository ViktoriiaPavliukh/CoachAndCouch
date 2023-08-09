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
import StarBorderPurple500OutlinedIcon from "@mui/icons-material/StarBorderPurple500Outlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { CategoryList } from "../Card/CategoryList";
import { TeacherImage } from "./TeacherImage";
import { languages } from "@/defaults";
import { useNavigate } from "react-router";

export function TeacherCard() {
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    navigate("/announcement/2vc");
  };
  return (
    <Card
      sx={{
        maxWidth: "373px",
        borderRadius: "8px",
        boxShadow: "0px 2px 5px 0px rgba(0, 0, 0, 0.15)",
      }}
    >
      <CardActionArea onClick={handleClick}>
        <TeacherImage />
      </CardActionArea>
      <CardContent>
        <Stack
          direction="row"
          sx={{ justifyContent: "left", alignItems: "center", gap: "24px" }}
        >
          <Typography
            gutterBottom
            variant="posterDescription"
            component="div"
            sx={{ fontWeight: "700", letterSpacing: "-0.003px", mb: "8px" }}
          >
            Іван Іванчук
          </Typography>
          <Typography
            color="grey.700"
            variant="posterStatus"
            sx={{ display: "inline-block" }}
          >
            <Box
              component="span"
              sx={{
                display: "inline-block",
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: "#0E5B1D",
                mr: "4px",
              }}
            />
            Онлайн
          </Typography>
        </Stack>
        <Typography
          variant="posterItem"
          sx={{ color: (theme) => theme.palette.textColor.grey }}
        >
          Професійний викладач
        </Typography>
        <CategoryList elements={languages} />
        <Stack direction="row" sx={{ gap: "12px", pt: "4px" }}>
          <Box sx={{ display: "flex", gap: "4px" }}>
            <StarBorderPurple500OutlinedIcon
              sx={{
                fontSize: "16px",
                color: (theme) => theme.palette.textColor.darkGrey,
              }}
            />
            <Typography variant="posterItem">5.0</Typography>
          </Box>
          <Box sx={{ display: "flex", gap: "4px" }}>
            <FavoriteBorderOutlinedIcon
              sx={{
                fontSize: "16px",
                color: (theme) => theme.palette.textColor.darkGrey,
              }}
            />
            <Typography variant="posterItem">5.0</Typography>
          </Box>
          <Box sx={{ display: "flex", gap: "4px" }}>
            <Typography
              variant="posterItem"
              sx={{ color: (theme) => theme.palette.textColor.darkGrey }}
            >
              Уроки:
            </Typography>
            <Typography variant="posterItem">156</Typography>
          </Box>
        </Stack>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          sx={{
            width: "100vw",
            py: "12px",
            m: "8px",
            mt: "0",
            borderRadius: "8px",
            color: (theme) => theme.palette.buttonColor.fontColor,
            fontSize: "14px",
            fontWeight: "700",
            transition: "background-color 0.3s",
            "&:hover": {
              backgroundColor: (theme) => theme.palette.buttonColor.darkHover,
            },
          }}
        >
          ПРОБНИЙ УРОК
        </Button>
      </CardActions>
    </Card>
  );
}
