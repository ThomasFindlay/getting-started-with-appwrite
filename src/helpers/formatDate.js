export const formatDate = (date, options) => {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    ...options,
  }).format(date);
};
