import { Box, Grid, Pagination } from "@mui/material";
import { TeacherCard } from "./TeacherCard";
import usePagination from "../../hooks/usePagination";
import { useSelector } from "react-redux";
import { advertsSelector } from "@/redux/marketplace/adverts/advertsSelector";
import { PropTypes } from "prop-types";

export function TeacherListBox({ page, setPage }) {
  const adverts = useSelector(advertsSelector);
  const PER_PAGE = 9;
  const items = usePagination(adverts, PER_PAGE);
  const count = adverts.totalPages;
  const handleChange = (e, p) => {
    setPage(p);
    items.jump(p);
  };
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
      <Pagination
        sx={{
          marginBottom: "50px",
          padding: "14px 41px",
          borderRadius: "15px",
          background: "#FFF",
          boxShadow:
            "0px 8px 16px 0px rgba(0, 0, 0, 0.08), 0px 0px 4px 0px rgba(0, 0, 0, 0.04)}",
          "& .MuiPaginationItem-page.Mui-selected": {
            color: "#FFF",
          },
          "& .MuiPagination-ul": {
            gap: "24px",
          },
        }}
        count={count}
        color="buttonColor"
        size="large"
        page={page}
        siblingCount={0}
        boundaryCount={2}
        onChange={handleChange}
      />
    </>
  );
}
TeacherListBox.propTypes = {
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
};
