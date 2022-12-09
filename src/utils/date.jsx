import { format } from "date-fns";

export const convertDateFormat = (seconds) => {
  const date = new Date(1000 * seconds);
  const formattedDate = format(date, "MMM d y");
  return formattedDate;
};
