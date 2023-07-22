import { IconButton } from '@mui/material';
// import defaultIcon from 'shared/templates/heart_icon.svg';
import { FavoriteBorderOutlined as Icon } from '@mui/icons-material';

export function LikeBtn({ sx }) {
  return (
    <IconButton
      color="inherit"
      sx={{
        color: 'text.primary',
        width: 32,
        height: 32,
        boxShadow:
          '0px 1px 1px 0px rgba(9, 10, 13, 0.08), 1px 0px 4px 0px rgba(9, 10, 13, 0.12)',
        ...sx,
      }}
    >
      <Icon sx={{ width: 16, height: 16 }} />
    </IconButton>
  );
}
