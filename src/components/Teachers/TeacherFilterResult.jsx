import { useEffect, useState } from "react";
import { FilterTeacherPanel } from "./FilterPanel";
import { TeacherListBox } from "./TeacherList";
import { useDispatch } from "react-redux";

import { filterAdverts } from "@/redux/marketplace/adverts/operations";

export function TeacherFilterResult() {
  const [filters, setFilters] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    Object.keys(filters).length > 0 && dispatch(filterAdverts(filters));
  }, [dispatch, filters]);

  const onFiltersChange = (newFilters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
  };
  return (
    <>
      <FilterTeacherPanel
        onFiltersChange={(newFilters) => onFiltersChange(newFilters)}
      />
      <TeacherListBox />
    </>
  );
}
