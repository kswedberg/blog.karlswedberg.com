const dateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  timeZone: 'America/Detroit',
  // timeZoneName: 'short',
});

export const formatDate = (date) => {
  const isDate = date instanceof Date;
  const d = isDate ? date : new Date(date);

  return dateFormatter.format(d);
};

export const getAged = (pubDate) => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const day = now.getDate();
  const pubYear = pubDate.getFullYear();
  const pubMonth = pubDate.getMonth();
  const pubDay = pubDate.getDate();

  if (year - pubYear < 3) {
    return undefined;
  }

  let yearDiff = year - pubYear;

  if (month === pubMonth && day < pubDay) {
    return `about ${yearDiff} years ago`;
  }

  if (month < pubMonth) {
    yearDiff = yearDiff - 1;
  }

  return `over ${yearDiff} years ago`;
};

// const pub = new Date('2021-03-11');

// console.log(getAged(pub));
