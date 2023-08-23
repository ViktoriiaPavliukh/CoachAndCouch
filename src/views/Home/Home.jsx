import { Button, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { changeTheme } from 'redux/theme/slice';

export function Home() {
  const dispatch = useDispatch();

  return (
    <>
      <Typography component="h1" variant="h5">
        Home Page
      </Typography>
      <Button
        variant="outlined"
        onClick={() => {
          dispatch(changeTheme());
        }}
      >
        Change theme
      </Button>
    </>
  );
}
