import React from 'react';
import Badge from '@mui/material/Badge';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

const NumberBadge = ({ number }) => {
  const getBadgeColor = () => {
    return number < 0 ? ['Removed', 'error'] : number > 0 ? ['Added', 'success'] : '';
  };

  return <Chip label={getBadgeColor()[0]} color={getBadgeColor()[1]} />;
};

export default NumberBadge;
