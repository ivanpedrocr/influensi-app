import { format } from "date-fns";

export const formatMessageTime = (timestamp) => {
  if (
    format(new Date(timestamp), "dd/MM/yyyy") ===
    format(new Date(), "dd/MM/yyyy")
  ) {
    return format(new Date(timestamp), "h:mm aa");
  } else {
    return format(new Date(timestamp), "dd/MM/yyyy");
  }
};
