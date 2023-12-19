import { useEffect, useState } from "react";
import { FilterTeacherPanel } from "./FilterPanel";
import { TeacherListBox } from "./TeacherList";
import Loader from "../../components/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";

import { selectAdvertsIsLoading } from "@/redux/marketplace/adverts/advertsSelector";
import { filterAdverts } from "@/redux/marketplace/adverts/operations";

export function TeacherFilterResult() {
  const [filters, setFilters] = useState({});
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAdvertsIsLoading);

  useEffect(() => {
    console.log("use effect", filters, Object.keys(filters).length);
    Object.keys(filters).length > 0 && dispatch(filterAdverts(filters));
  }, [dispatch, filters]);

  const onFiltersChange = (newFilters) => {
    console.log("filters", newFilters);
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
  };
  return (
    <>
      <FilterTeacherPanel onFiltersChange={onFiltersChange} />
      {isLoading ? <Loader /> : <TeacherListBox />}
    </>
  );
}
