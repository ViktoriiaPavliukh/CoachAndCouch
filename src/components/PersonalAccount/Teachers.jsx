import { Box } from "@mui/material";
// import { FiberManualRecord as FiberManualRecordIcon } from "@mui/icons-material";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAdvertsIsLoading } from "@/redux/marketplace/adverts/advertsSelector";
import { getAdverts } from "@/redux/marketplace/adverts/operations";
import Loader from "../../components/Loader/Loader";
import { FilterTeacherPanel } from "../Teachers/FilterPanel";
import { TeacherListBox } from "../Teachers/TeacherList";
import {
  getCountries,
  getLanguages,
  getSpecializations,
} from "@/redux/admin/operations";

export function Teachers() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAdverts());
    dispatch(getLanguages());
    dispatch(getSpecializations());
    dispatch(getCountries());
  }, [dispatch]);
  const isLoading = useSelector(selectAdvertsIsLoading);

  return (
    <>
      <Box
        maxWidth="1168px"
        width="100%"
        // minWidth="320px"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <FilterTeacherPanel />
            <TeacherListBox />
          </>
        )}
      </Box>
    </>
  );
}