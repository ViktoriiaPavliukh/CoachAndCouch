import { Box, Button, Container, Typography } from "@mui/material";
import { MainImage } from "./MainImage";
import { LikeBtn } from "./LikeBtn";
import { MessageBtn } from "./MessageBtn";
import { CategoryList } from "./CategoryList";
import { ReviewList } from "./ReviewList";
import userImage from "@assets/templates/avatar_1.webp";
import countryLogo from "@assets/templates/emojione-v1_flag-for-ukraine.svg";
import { useDispatch, useSelector } from "react-redux";
import { advertsSelector, specializationsSelector } from "@/redux/marketplace/adverts/advertsSelector";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getAdverts } from "@/redux/marketplace/adverts/operations";

// lineheight 52px main title height

// const languages = [
//   { id: "1", label: "Англійська" },
//   { id: "2", label: "Іспанська" },
//   { id: "3", label: "Українська" },
// ];
// const specialization = [
//   { id: "1", label: "Розмовна мова" },
//   { id: "2", label: "Вивчення азів" },
//   { id: "3", label: "Для дітей" },
//   { id: "4", label: "Підготовка для іспитів" },
//   { id: "5", label: "Для бізнесу" },
// ];
// const hobbies = [
//   { id: "1", label: "Спорт" },
//   { id: "2", label: "Кіно" },
//   { id: "3", label: "Творчість" },
//   { id: "4", label: "Кулінарія" },
//   { id: "5", label: "Тварини" },
//   { id: "6", label: "Машини" },
// ];

const reviews = [
  {
    id: "1",
    name: "Гліб Карпов",
    text: "Найкращий викладач. Дуже сподобалось навчання, готуємося до іспитів разом",
    image: userImage,
  },
  {
    id: "2",
    name: "Андрій Іващук",
    text: "Цікаве спілкування, працюємо над якісною вимовою.  Хочу продовжити навчання саме з чим вчителем",
    image: userImage,
  },
  {
    id: "3",
    name: "Максим Остапенко ",
    text: "Отримав корисні поради щодо вивчення української мови. Гарний вчитель. Рекомендую",
    image: userImage,
  },
  {
    id: "4",
    name: "Аліна Карпенко",
    text: "Дуже сподобався урок. Все чітко та якісно. Приємний у спілкуванні викладач. Готуємось разом для іспитів",
    image: userImage,
  },
];

export function Card() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAdverts());
  }, [dispatch]);

  const adverts = useSelector(advertsSelector);
  // console.log(adverts);
  const teacherId = useParams();
  // console.log(teacherId);
  const teacher = adverts.find((advert) => advert.id === +teacherId.id);
  // console.log(teacher);

  return (
    Boolean(teacher) && (
      <Container
        component="div"
        sx={{
          pt: 11,
          maxWidth: { lg: "1200px", md: "834px", sm: "375px" },
          pl: { lg: "30px", md: "20px", sm: "15px" },
          pr: { lg: "30px", md: "20px", sm: "15px" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "24px",
            mb: "40px",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <MainImage src={teacher.imagePath} />
          <Box
            sx={{
              display: "flex",
              width: "100%",
              paddingTop: "9.6px",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                width: "100%",
                mb: "20px",
                alignItems: "center",
                p: 0,
              }}
            >
              <Typography variant="posterName">{teacher.user.firstName + " " + teacher.user.lastName}</Typography>
              <img src={countryLogo} alt="country flag" style={{ width: "52px", height: "36px", marginLeft: "4px" }} />
              <MessageBtn sx={{ display: { xs: "none", lg: "block" } }} />
              <LikeBtn sx={{ display: { xs: "none", lg: "block" } }} />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: "20px" }}>
              <span
                style={{
                  display: "inline-block",
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  backgroundColor: "#0E5B1D",
                  marginRight: "12px",
                }}
              ></span>
              <Typography color="grey.700" variant="posterItem" sx={{ mr: 5.5 }}>
                Онлайн
              </Typography>
              <Typography variant="posterItem" color="grey.700" sx={{ mr: 0.5 }}>
                Рейтинг:
              </Typography>
              <Typography variant="posterItem" sx={{ mr: 3.5 }}>
                5,5
              </Typography>
              <Typography variant="posterItem" color="grey.700" sx={{ mr: 0.5 }}>
                Уроки:
              </Typography>
              <Typography variant="posterItem">156</Typography>
            </Box>
            <Typography variant="posterCategory" color="grey.600">
              Мови викладання
            </Typography>
            <CategoryList
              elements={teacher.teachingLanguages && teacher.teachingLanguages.map((el) => el.languageUa)}
            />
            <Typography variant="posterCategory" color="grey.600">
              Спеціалізація
            </Typography>
            <CategoryList
              elements={teacher.specialization && teacher.specialization.map((el) => el.specializationUa)}
            />
            <Typography variant="posterCategory" color="grey.600">
              Захоплення
            </Typography>
            <CategoryList elements={teacher.hobbies} />
            <Typography variant="posterCategory" color="grey.600">
              Платформи
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: { xs: "flex", lg: "none" },
            alignItems: "center",
            mb: "20px",
          }}
        >
          <MessageBtn />
          <LikeBtn />
        </Box>
        <Box mb="40px">
          <Typography variant="posterTitle" component="p" color="grey.600" mb="36px">
            Про мене
          </Typography>
          <Typography variant="posterDescription">{teacher.description}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column-reverse", lg: "row" },
            width: "100%",
            gap: "5%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: { xs: "100%", lg: "572px" },
              flexDirection: "column",
            }}
          >
            <Typography variant="posterTitle" color="grey.600" mb="36px">
              Відгуки
            </Typography>
            <ReviewList elements={reviews} />
          </Box>
          <Box
            sx={{
              width: { xs: "100%", lg: "50%" },
              display: "flex",
              flexDirection: "column",
              ml: "auto",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column-reverse", md: "row" },
                gap: 4,
                alignItems: "center",
                mb: 8,
              }}
            >
              <Button type="button" variant="contained" sx={{ p: "12px 24px", width: { xs: "100%", md: "328px" } }}>
                <Typography variant="posterButton">Пробний урок</Typography>
              </Button>
              <Typography variant="posterPrice">{Math.ceil(teacher.price)} $</Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    )
  );
}
