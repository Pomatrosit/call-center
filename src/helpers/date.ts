export const getDateSomeYearsAgo = (year: number): string => {
  const now = new Date();
  const dateBefore = new Date();
  dateBefore.setFullYear(now.getFullYear() - year);
  return dateBefore.toDateString();
};

const THIRTY_DAYS_IN_MILLISECONDS = 1000 * 60 * 60 * 24 * 30;

export const dateNow = () => {
  return new Date().toDateString();
};

export const get30DaysAfterNow = () => {
  const now = Date.now();
  const after30Days = now + THIRTY_DAYS_IN_MILLISECONDS;
  return new Date(after30Days).toDateString();
};
