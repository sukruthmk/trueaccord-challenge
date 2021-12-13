import interval from "../constants/interval";

// format the date in yyyy-mm-dd
const formatDate = (dateString) => {
  return dateString.split("T")[0];
};

export const calculateNextPaymentDate = (start, end, intervalString) => {
  let nextPaymentDate = new Date(start);
  const noOfDaysToAdd = interval[intervalString];
  if (end != null) {
    if (end.getTime() > start.getTime()) {
      const differenceInDays = Math.floor(
        (end.getTime() - start.getTime()) / (1000 * 3600 * 24)
      );
      const multiplier = Math.floor(differenceInDays / noOfDaysToAdd);
      nextPaymentDate.setDate(
        nextPaymentDate.getDate() + (multiplier + 1) * noOfDaysToAdd
      );
      return formatDate(nextPaymentDate.toISOString());
    }
  }
  nextPaymentDate.setDate(nextPaymentDate.getDate() + noOfDaysToAdd);
  return formatDate(nextPaymentDate.toISOString());
};
