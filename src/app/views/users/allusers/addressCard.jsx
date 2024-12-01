import React from 'react';
import { Card, CardContent, Typography, Box, styled, Divider } from '@mui/material';

const StyledCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(2),
  padding: theme.spacing(2),
  boxShadow: theme.shadows[2],
  backgroundColor: theme.palette.background.default,
}));

const AddressCard = ({ address }) => {
  if (!address) return null;

  return (
    <StyledCard>
      <CardContent>
        <Typography variant="body1" gutterBottom>
          {address.shipping_address}
        </Typography>
        <Divider sx={{ margin: '8px 0' }} />
      </CardContent>
    </StyledCard>
  );
};

export default AddressCard;
