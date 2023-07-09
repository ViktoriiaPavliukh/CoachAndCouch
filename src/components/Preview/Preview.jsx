import {
  Container,
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import { FiberManualRecord as FiberManualRecordIcon } from '@mui/icons-material';
import { DescriptionImage } from './DescriptionImage';

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
      </Box>
    </Container>
  );
}
