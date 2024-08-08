import { useMemo } from "react";
import { format, addHours } from "date-fns";

const useFormattedDate = (startDate) => {
  return useMemo(() => {
    if (!startDate) return "";

    const start = new Date(startDate);
    const end = addHours(start, 1);

    const formattedStartDate = format(start, "dd.MM.yyyy, HH:mm");
    const formattedEndDate = format(end, "HH:mm");

    return `${formattedStartDate}-${formattedEndDate}`;
  }, [startDate]);
};

export default useFormattedDate;
