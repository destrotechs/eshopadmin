import React from 'react';
import Chip from '@mui/material/Chip';

const StockBadge = ({ value }) => {
  let color = 'error';
  let stock_message = '';
  if (value > 4 && value < 10) {
    color = 'warning';
    stock_message = value + ' available';
  } else if (value <= 4) {
    color = 'warning';
    stock_message = value + ' available';
  } else if (value >= 10 && value <= 20) {
    color = 'primary';
    stock_message = value + ' available';
  } else {
    color = 'success';
    stock_message = 'in stock';
  }

  return <Chip variant="outlined" label={stock_message} color={color} />;
};

export default StockBadge;
