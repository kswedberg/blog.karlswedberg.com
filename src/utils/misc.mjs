
export const slugify = (str) => {
  if (!str) {
    return '';
  }

  return str
  .toLowerCase()
  .replace(/['"`)(\]]/g, '')
  // replace non-alphanumeric with dash
  .replace(/[^a-z0-9]+/g, '-')
  // replace repeating dashes with a single dash
  .replace(/--+/g, '-')
  // remove leading and trailing dashes
  .replace(/^-|-$/g, '') || str;
};

const dateOptions = {year: 'numeric', month: '2-digit', day: '2-digit'};
const dateTimeFormat = new Intl.DateTimeFormat('en-US', dateOptions);

export const dateToYMD = (input) => {
  const date = new Date(input);
  const formatted = [];
  const parts = dateTimeFormat.formatToParts(date)
  .filter(({type}) => type !== 'literal');

  for (let {type, value} of parts) {
    if (type === 'year') {
      formatted.unshift(value);
    } else {
      formatted.push(value);
    }
  }

  return formatted.join('-');
};
