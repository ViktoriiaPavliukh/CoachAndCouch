import { useEffect, useState } from "react";
import { FilterTeacherPanel } from "./FilterPanel";
import { TeacherListBox } from "./TeacherList";
import Loader from "../../components/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";

import { selectAdvertsIsLoading } from "@/redux/marketplace/adverts/advertsSelector";
import {
  filterAdverts,
  getAdverts,
} from "@/redux/marketplace/adverts/operations";

export function TeacherFilterResult() {
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAdvertsIsLoading);

  useEffect(() => {
    Object.keys(filters).length > 0 && dispatch(filterAdverts(filters));
    Object.keys(filters).length === 0 && dispatch(getAdverts(page));
  }, [dispatch, filters, page]);

  const onFiltersChange = (newFilters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
  };

  const onResetFilter = () => {
    setFilters({});
  };
  return (
    <>
      <FilterTeacherPanel
        onFiltersChange={onFiltersChange}
        onResetFilter={onResetFilter}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <TeacherListBox page={page} setPage={setPage} />
      )}
    </>
  );
}
