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
const initialState = {
  language: "",
  country: "",
  price: "",
  specialization: "",
};
export function TeacherFilterResult() {
  const [filters, setFilters] = useState(initialState);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAdvertsIsLoading);

  useEffect(() => {
    Object.keys(filters).length > 0 && dispatch(filterAdverts(filters));
  }, [dispatch, filters]);

  useEffect(() => {
    dispatch(getAdverts(page));
  }, [dispatch, page]);

  const onFiltersChange = (newFilters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
  };

  return (
    <>
      <FilterTeacherPanel onFiltersChange={onFiltersChange} />
      {isLoading ? (
        <Loader />
      ) : (
        <TeacherListBox page={page} setPage={setPage} />
      )}
    </>
  );
}
