import {
  Container,
  Box,
  Button,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Stack
} from '@mui/material';
import { FiberManualRecord as FiberManualRecordIcon } from '@mui/icons-material';
import { DescriptionImage } from './DescriptionImage';
import { Filter } from './Filter';
import { TeacherCard } from './TeacherCard';
import {
  languageOptions,
  ratingOptions,
  lessonTimeOptions,
  hobbyOptions,
  countryOptions,
  specializationOptions,
  teacherCardData,
} from 'defaults';

export function Preview() {
  const listItemStyles = {
    color: theme => theme.palette.textColor.grey,
    fontSize: '20px',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: '16px',
  };
  return (
    <Container
      component="div"
      maxWidth="100vw"
      sx={{
        backgroundColor: 'background.paper',
        m: 0,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box maxWidth="1168px">
        <Box sx={{ display: 'flex', my: '80px', gap: '63px' }}>
          <Box
            sx={{
              display: 'flex',
              mt: '80px',
              flexDirection: 'column',
              gap: '60px',
            }}
          >
            <Typography
              variant="fontHeading"
              sx={{
                color: theme => theme.palette.primary.main,
              }}
            >
              Знайдіть ідеального викладача
            </Typography>
            <List
              sx={{
                padding: '0',
              }}
            >
              <ListItem sx={{ padding: '0' }}>
                <ListItemIcon sx={{ minWidth: '35px', padding: '0' }}>
                  <FiberManualRecordIcon
                    sx={{ color: theme => theme.palette.buttonColor.main }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary="Понад 1000 викладачів"
                  sx={listItemStyles}
                />
              </ListItem>
              <ListItem sx={{ padding: '0' }}>
                <ListItemIcon sx={{ minWidth: '35px' }}>
                  <FiberManualRecordIcon
                    sx={{ color: theme => theme.palette.buttonColor.main }}
                  />
                </ListItemIcon>
                <ListItemText primary="Понад 20 мов" sx={listItemStyles} />
              </ListItem>
              <ListItem sx={{ padding: '0' }}>
                <ListItemIcon sx={{ minWidth: '35px' }}>
                  <FiberManualRecordIcon
                    sx={{ color: theme => theme.palette.buttonColor.main }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary="Професійні викладачі та носії мови"
                  sx={listItemStyles}
                />
              </ListItem>
            </List>
            <Button
              type="button"
              variant="contained"
              sx={{ p: '12px 53px', maxWidth: '328px', borderRadius: '8px' }}
            >
              <Typography
                variant="posterButton"
                sx={{ color: theme => theme.palette.buttonColor.fontColor }}
              >
                Дізнатися більше
              </Typography>
            </Button>
          </Box>
          <DescriptionImage />
        </Box>
        <Stack direction="row" spacing={2} sx={{ mb: '43px' }}>
          <Filter
            options={languageOptions}
            // getOptionLabel={option => option.title}
            label="МОВА"
          />
          <Filter options={ratingOptions} label="РЕЙТИНГ" />
          <Filter options={lessonTimeOptions} label="ЧАС УРОКУ" />
          <Filter options={specializationOptions} label="СПЕЦІАЛІЗАЦІЯ" />
          <Filter options={countryOptions} label="КРАЇНА" />
          <Filter options={hobbyOptions} label="ХОБІ" />
        </Stack>
        <Box sx={{ flexGrow: 1, mb: '115px' }}>
          <Grid
            container
            sx={{
              columnGap: '24px',
              rowGap: '48px',
              justifyContent: 'space-between',
              flexBasis: '30%',
            }}
          >
            {teacherCardData.map(teacher => (
              <Grid key={teacher.id} item >
                <TeacherCard
                  picture={teacher.picture}
                  description={teacher.description}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
