import React from 'react';

const CurrencyFormatter = ({ value, currencyCode = 'KES', locale = 'en-US' }) => {
  const formattedValue = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'KES',
  }).format(value);

  return <span>{formattedValue}</span>;
};

export default CurrencyFormatter;
