import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "@/redux/users/selectors";
import {
  advertByIdSelector,
  selectAdvertsIsLoading,
} from "@/redux/marketplace/adverts/advertsSelector";
import { Box, Button, TextField, Typography } from "@mui/material";

export default function FormTrial({ selected, onClose }) {
  const dispatch = useDispatch();
  const { id: teacherId } = useParams();
  const currentUser = useSelector(selectCurrentUser);
  const teacher = useSelector(advertByIdSelector);
  console.log(teacher);
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Box
      sx={{
        width: { xs: "343px", md: "648px", lg: "1208px" },
        height: "400px",
        position: "fixed",
        top: "50%",
        left: "50%",
        backgroundColor: "white",
        transform: "translate(-50%,-50%)",
        padding: "48px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <h2>Fill in the details</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <Typography>
          {currentUser.firstName} {currentUser.lastName}
        </Typography>
        <Typography>
          {teacher.user.firstName} {teacher.user.lastName}
        </Typography>
        <Typography>{selected ? selected.toString() : ""}</Typography>
        <Typography>
          {teacher.price} USD 
        </Typography>
        <TextField label="Email" variant="outlined" type="email" required />
        <Button type="submit" variant="contained">
          Submit
        </Button>
        <Button variant="outlined" onClick={onClose}>
          Close
        </Button>
      </form>
    </Box>
  );
}
