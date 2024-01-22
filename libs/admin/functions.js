export const calculateStartDate = (year, month, week) => {
  const daysInWeek = 7;
  //   console.log(year, month, week, typeof(year), typeof(month), typeof(week) )
  const startDate = new Date(`${year}-${getMonthNumber(month)}-01`);

  const startOfWeek = new Date(startDate);
  startOfWeek.setDate((week - 1) * daysInWeek + 1);

  return startOfWeek.toISOString();
};

export const calculateEndDate = (year, month, week) => {
  const daysInWeek = 7;
  const startDate = new Date(`${year}-${getMonthNumber(month)}-01`);

  const endOfWeek = new Date(startDate);
  endOfWeek.setDate((week - 1) * daysInWeek + daysInWeek);

  return endOfWeek.toISOString();
};

export const getMonthNumber = (month) => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return monthNames.indexOf(month) + 1;
};

const currentYear = new Date().getFullYear();

export const yearsArray = Array.from(
  { length: currentYear - 2023 },
  (_, index) => 2024 + index
);
