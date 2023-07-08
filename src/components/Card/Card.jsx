import { Box, Button, Container, Typography } from '@mui/material';
import { MainImage } from './MainImage';
import { LikeBtn } from './LikeBtn';
import { MessageBtn } from './MessageBtn';
import { CategoryList } from './CategoryList';
import { ReviewList } from './ReviewList';
import userImage from 'shared/templates/avatar_1.webp';
import countryLogo from 'shared/templates/emojione-v1_flag-for-ukraine.svg';

const languages = [
  { id: '1', label: 'Англійська' },
  { id: '2', label: 'Іспанська' },
  { id: '3', label: 'Українська' },
];
const specialization = [
  { id: '1', label: 'Розмовна мова' },
  { id: '2', label: 'Вивчення азів' },
  { id: '3', label: 'Для дітей' },
  { id: '4', label: 'Підготовка для іспитів' },
  { id: '5', label: 'Для бізнесу' },
];
const hobbies = [
  { id: '1', label: 'Спорт' },
  { id: '2', label: 'Кіно' },
  { id: '3', label: 'Творчість' },
  { id: '4', label: 'Кулінарія' },
  { id: '5', label: 'Тварини' },
  { id: '6', label: 'Машини' },
];

const reviews = [
  {
    id: '1',
    name: 'Гліб Карпов',
    text: 'Найкращий викладач. Дуже сподобалось навчання, готуємося до іспитів разом',
    image: userImage,
  },
  {
    id: '2',
    name: 'Андрій Іващук',
    text: 'Цікаве спілкування, працюємо над якісною вимовою.  Хочу продовжити навчання саме з чим вчителем',
    image: userImage,
  },
  {
    id: '3',
    name: 'Максим Остапенко ',
    text: 'Отримав корисні поради щодо вивчення української мови. Гарний вчитель. Рекомендую',
    image: userImage,
  },
  {
    id: '4',
    name: 'Аліна Карпенко',
    text: 'Дуже сподобався урок. Все чітко та якісно. Приємний у спілкуванні викладач. Готуємось разом для іспитів',
    image: userImage,
  },
];

export function Card() {
  return (
    <Container
      component="div"
      maxWidth="lg"
      sx={{ backgroundColor: 'background.paper', pt: 11 }}
    >
      <Box display="flex" gap="24px" mb="40px">
        <MainImage />
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            paddingTop: '9.6px',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              mb: '20px',
              alignItems: 'center',
              p: 0,
            }}
          >
            <Typography variant="posterName">Іван Іванчук</Typography>
            <img
              src={countryLogo}
              alt="country flag"
              style={{ width: '52px', height: '36px', marginLeft: '4px' }}
            />
            <MessageBtn />
            <LikeBtn />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: '20px' }}>
            <span
              style={{
                display: 'inline-block',
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: '#0E5B1D',
                marginRight: '12px',
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
          <CategoryList elements={languages} />
          <Typography variant="posterCategory" color="grey.600">
            Спеціалізація
          </Typography>
          <CategoryList elements={specialization} />
          <Typography variant="posterCategory" color="grey.600">
            Захоплення
          </Typography>
          <CategoryList elements={hobbies} />
          <Typography variant="posterCategory" color="grey.600">
            Платформи
          </Typography>
        </Box>
      </Box>
      <Box mb="40px">
        <Typography
          variant="posterTitle"
          component="p"
          color="grey.600"
          mb="36px"
        >
          Про мене
        </Typography>
        <Typography variant="posterDescription">
          Lorem ipsum dolor sit amet consectetur. Lectus consequat posuere eu
          leo euismod nisl gravida. Montes diam imperdiet at consequat sagittis
          sed. Fames dictum elit at vivamus. Pretium phasellus laoreet sagittis
          integer nisi. Vulputate senectus etiam dolor sed at at enim tellus
          tempor. Et quis vulputate mauris nulla sit viverra vestibulum nunc
          tortor. Mi nulla donec placerat faucibus. Feugiat lectus felis
          consequat purus amet cursus porta vestibulum libero. In cras amet
          curabitur lobortis ultricies. Ornare non vitae nec at mi nec tellus
          commodo. Commodo semper vitae sit risus gravida non. Elit quis vitae
          integer quisque. In magna orci at at.{' '}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            width: '572px',
            flexDirection: 'column',
          }}
        >
          <Typography variant="posterTitle" color="grey.600" mb="36px">
            Відгуки
          </Typography>
          <ReviewList elements={reviews} />
        </Box>
        <Box
          sx={{
            width: '438px',
            display: 'flex',
            flexDirection: 'column',
            ml: 'auto',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: 4,
              alignItems: 'center',
            }}
          >
            <Button
              type="button"
              variant="contained"
              sx={{ p: '12px 24px', width: '100%' }}
            >
              <Typography variant="posterButton">Пробний урок</Typography>
            </Button>
            <Typography variant="posterPrice">10$</Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
