import { selectUser } from "@/redux/auth/selectors";
import { getUserById } from "@/redux/user/operations";
import { selectUserById } from "@/redux/user/selectors";

import { Box, Typography } from "@mui/material";
import { format } from "date-fns";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const Enquiry = () => {
  const user = useSelector(selectUserById);

  const userId = useSelector(selectUser).id;

  const dispatch = useDispatch();
  useEffect(() => {
    if (!userId) {
      return;
    }
    dispatch(getUserById(userId));
  }, [dispatch, userId]);
  console.log(user);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography>Profile</Typography>
      <form>
        <label>
          Name <input type="text" name="firstName" defaultValue={user?.firstName} />
        </label>
        <br />
        <label>
          Surename <input type="text" name="lastName" defaultValue={user?.lastName || ""} />
        </label>
        <br />
        <label>
          Email <input type="email" name="email" defaultValue={user?.email} />
        </label>
        <br />
        <label>
          Country <input type="text" name="country" defaultValue={user?.country?.alpha2} />
        </label>
        <br />
        <label>
          Registration date
          <input
            type="text"
            name="registeredAt"
            disabled
            defaultValue={user.registeredAt ? format(new Date(user.registeredAt), "dd.mm.yyyy") : ""}
          />
        </label>
        <br />
        <label>
          Sex
          <input
            type="radio"
            name="sex"
            id="maleUserSex"
            defaultValue="male"
            checked={user.sex === "male" ? true : false}
            onChange={(e) => console.log(e.target.value)}
          />
          <label htmlFor="maleUserSex">male</label>
          <input
            type="radio"
            name="sex"
            defaultValue="female"
            id="femaleUserSex"
            checked={user.sex === "female" ? true : false}
            onChange={(e) => console.log(e.target.value)}
          />
          <label htmlFor="femaleUserSex">female</label>
          <input
            type="radio"
            name="sex"
            defaultValue="other"
            id="otherUserSex"
            checked={user.sex === "other" ? true : false}
            onChange={(e) => console.log(e.target.value)}
          />
          <label htmlFor="otherUserSex">other</label>
        </label>
        <br />
        <label>Rating: {user.rating}</label>
      </form>
    </Box>
  );
};
