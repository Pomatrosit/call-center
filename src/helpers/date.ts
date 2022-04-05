export const getDateSomeYearsAgo = (year: number) => {
  const now = new Date();
  const dateBefore = new Date();
  dateBefore.setFullYear(now.getFullYear() - year);
  return dateBefore;
};

const THIRTY_DAYS_IN_MILLISECONDS = 1000 * 60 * 60 * 24 * 30;

export const yesterday = () => {
  return new Date(Date.now() - 1000 * 60 * 60 * 24);
};

export const get30DaysAfterNow = () => {
  const now = Date.now();
  const after30Days = now + THIRTY_DAYS_IN_MILLISECONDS;
  return new Date(after30Days);
};
