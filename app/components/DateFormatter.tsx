import { parseISO, format } from "date-fns";

type Props = {
  dateString: string;
};

const DateFormatter = ({ dateString }: Props) => {
  // Parse the ISO date string
  const date = parseISO(dateString);

  // Validate the date
  if (isNaN(date.getTime())) {
    return <p>Invalid date</p>; // Handle the error, perhaps by returning a placeholder
  }

  return <time dateTime={dateString}>{format(date, "MM-dd-yyyy")}</time>;
};

export default DateFormatter;
