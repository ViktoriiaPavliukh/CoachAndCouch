import { Button, Typography } from '@mui/material';

const btnConfig = { label: 'Написати', type: 'button' };

export function MessageBtn() {
  return (
    <Button
      sx={{ marginLeft: 'auto', marginRight: ' 20px' }}
      type={btnConfig.type}
      variant="contained"
    >
      <Typography variant="posterButton">{btnConfig.label}</Typography>
    </Button>
  );
}
