import React from 'react';

const CurrencyFormatter = ({ value, currencyCode, locale='en-US' }) => {
  const formattedValue = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
  }).format(value);

  return <span>{formattedValue}</span>;
};

export default CurrencyFormatter;