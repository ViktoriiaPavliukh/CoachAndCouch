import { Box, Grid } from "@mui/material";
import { TeacherCard } from "./TeacherCard";
// import usePagination from "../../hooks/usePagination";
import { useSelector } from "react-redux";
import { advertsSelector } from "@/redux/marketplace/adverts/advertsSelector";

// import { useState } from "react";

export function TeacherListBox() {
  // let [page, setPage] = useState(1);

  const adverts = useSelector(advertsSelector);
  console.log(adverts);
  // const PER_PAGE = 9;
  // const items = usePagination(adverts, PER_PAGE);
  // const count = Math.ceil(adverts.length / PER_PAGE);
  // const handleChange = (e, p) => {
  //   setPage(p);
  //   items.jump(p);
  // };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", mb: "115px" }}>
        <Grid
          container
          sx={{
            flexDirection: { sm: "column", md: "row" },
            columnGap: { md: "14px", lg: "59px" },
            rowGap: { xs: "32px", md: "48px" },
            justifyContent: "center",
          }}
        >
          {adverts.adverts &&
            adverts.adverts?.map((teacher) => {
              return (
                <Grid item key={teacher.id}>
                  <TeacherCard teacher={teacher} />
                </Grid>
              );
            })}
        </Grid>
      </Box>
      {/* <Pagination
        sx={{ marginBottom: "50px" }}
        count={count}
        size="large"
        page={page}
        variant="outlined"
        shape="rounded"
        onChange={handleChange}
      /> */}
    </>
  );
}
