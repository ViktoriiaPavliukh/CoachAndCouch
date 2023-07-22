import { Button, Typography } from '@mui/material';

const btnConfig = { label: 'Написати', type: 'button' };

export function MessageBtn({ sx }) {
  return (
    <Button
      sx={{ marginLeft: 'auto', marginRight: ' 20px', p: '10px 18px', ...sx }}
      type={btnConfig.type}
      variant="contained"
    >
      <Typography variant="posterButton">{btnConfig.label}</Typography>
    </Button>
  );
}
