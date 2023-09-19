import { Container, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { PersonalImage } from "./PersonalImage";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { advertsSelector } from "@/redux/marketplace/adverts/advertsSelector";
import { getAdverts } from "@/redux/marketplace/adverts/operations";


export function PersonalAccount() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAdverts());
  }, [dispatch]);
  const adverts = useSelector(advertsSelector);
  console.log(adverts);

  return (
    <Container
      component="div"
      sx={{
        pt: 11,
        maxWidth: { lg: "1200px", md: "834px", sm: "375px" },
        pl: { lg: "30px", md: "20px", sm: "15px" },
        pr: { lg: "30px", md: "20px", sm: "15px" },
      }}
    >
      <Box>
        <PersonalImage />
        <Link to="/">Головна</Link>
     </Box>
      
    </Container>
  );
}
