import { PropTypes } from "prop-types";
import { Box, Card, CardContent, Typography, Button, CardActionArea, CardActions, Stack } from "@mui/material/";
import StarBorderPurple500OutlinedIcon from "@mui/icons-material/StarBorderPurple500Outlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { CategoryList } from "../Card/CategoryList";
import { TeacherImage } from "./TeacherImage";
// import { languages } from "@/defaults";
import { useNavigate } from "react-router";

export function TeacherCard({ teacher }) {
  // console.log(teacher);
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/teachers/${teacher.id}`);
  };
  // const setBg = () => {
  //   return "#" + Math.floor(Math.random() * 16777215).toString(16);
  // };
  return (
    <Card
      teacher={teacher}
      sx={{
        // height: "500px",
        maxWidth: "350px",
        minWidth: "100wv",
        borderRadius: "8px",
        boxShadow: "0px 2px 5px 0px rgba(0, 0, 0, 0.15)",
        // backgroundColor: setBg,
      }}
    >
      <CardActionArea onClick={handleClick}>
        <TeacherImage src={teacher.imagePath} />
        <img
          src={`https://flagcdn.com/w40/${teacher.user.country?.alpha2.toLowerCase()}.png`}
          srcSet={`https://flagcdn.com/w80/${teacher.user.country?.alpha2.toLowerCase()}.png 2x`}
          width="40"
          height="36"
          alt="ua"
          style={{ width: "52px", height: "36px", marginLeft: "4px", position: "absolute", top: "10px", right: "10px" }}
        />
      </CardActionArea>
      <CardContent>
        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", gap: "24px", mb: "8px" }}>
          <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", gap: "10px" }}>
            <Typography
              // gutterBottom
              // variant="posterDescription"
              sx={{ fontWeight: "700", letterSpacing: "-0.003px" }}
            >
              {teacher.user.firstName + " " + teacher.user.lastName}
            </Typography>
            {/* <Typography color="grey.700" variant="posterStatus" sx={{ display: "inline-block" }}>
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
            </Typography> */}
          </Stack>

          <Typography>ID:&nbsp;{teacher.id}</Typography>
        </Stack>
        <Typography variant="posterItem" sx={{ color: (theme) => theme.palette.textColor.grey }}>
          Мови викладання:
        </Typography>
        {Boolean(teacher.teachingLanguages.length) && (
          <CategoryList elements={teacher.teachingLanguages && teacher.teachingLanguages.map((el) => el.languageUa)} />
        )}
        <Stack style={{ display: "flex", justifyContent: "flex-start", flexDirection: "row", marginBottom: "20px" }}>
          <Typography variant="posterItem" sx={{ color: (theme) => theme.palette.textColor.grey }}>
            Країна: {teacher.user.country?.alpha2}
          </Typography>
        </Stack>

        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Box style={{ display: "flex", gap: "12px", pt: "4px" }}>
            <Box sx={{ display: "flex", gap: "4px" }}>
              <StarBorderPurple500OutlinedIcon
                sx={{
                  fontSize: "16px",
                  color: (theme) => theme.palette.textColor.darkGrey,
                }}
              />
              <Typography variant="posterItem">{teacher.user.rating}</Typography>
            </Box>
            <Box sx={{ display: "flex", gap: "4px" }}>
              <FavoriteBorderOutlinedIcon
                sx={{
                  fontSize: "16px",
                  color: (theme) => theme.palette.textColor.darkGrey,
                }}
              />
              <Typography variant="posterItem">{teacher.user.rating}</Typography>
            </Box>
            <Box sx={{ display: "flex", gap: "4px" }}>
              <Typography variant="posterItem" sx={{ color: (theme) => theme.palette.textColor.darkGrey }}>
                Уроки:
              </Typography>
              <Typography variant="posterItem">156</Typography>
            </Box>
          </Box>
          <Box>
            <Typography color="grey.700" variant="posterStatus" sx={{ display: "inline-block" }}>
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
            backgroundColor: (theme) => theme.palette.buttonColor.main,
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
TeacherCard.propTypes = {
  teacher: PropTypes.object.isRequired,
};
