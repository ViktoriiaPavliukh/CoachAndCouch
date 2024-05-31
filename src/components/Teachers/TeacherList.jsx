import { Box, Grid, Pagination, Typography } from "@mui/material";
import { useIntl } from "react-intl";
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
  const intl = useIntl();

  const handleChange = (p) => {
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
            columnGap: { md: "28px" },
            rowGap: { xs: "28px", lg: "40px" },
            justifyContent: "center",
          }}
        >
          {adverts.adverts?.length ? (
            adverts.adverts?.map((teacher) => {
              return (
                <Grid item key={teacher.id}>
                  <TeacherCard teacher={teacher} />
                </Grid>
              );
            })
          ) : (
            <Typography>
              {intl.formatMessage({ id: "filterAdverts" })}
            </Typography>
          )}
        </Grid>
      </Box>
      <Pagination
        sx={{
          marginBottom: "50px",
          padding: "14px 41px",
          borderRadius: "15px",
          background: (theme) => theme.palette.background,
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
          boxShadow: "0px 2px 5px 0px rgba(0, 0, 0, 0.15)",
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
