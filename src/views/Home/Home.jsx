import { Button, Typography, Container } from "@mui/material";
import { useDispatch } from "react-redux";
import { changeTheme } from "@/redux/theme/slice";

export function Home() {
  const dispatch = useDispatch();

  return (
    <Container>
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
    </Container>
  );
}
