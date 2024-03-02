import React, { useState } from 'react';
import { Paper, Grid, TextField, Button, Typography, Divider, Alert } from '@mui/material';
import { isNull } from 'lodash';

const UserOrdersForm = ({ userData }) => {
  const [orderInfo, setOrderInfo] = useState({
    order_number: userData.orders === null ? null : userData.orders.order_number,
    vat: userData.orders === null ? null : userData.orders.vat,
  });
  console.log('DATA,', orderInfo.order_number);

  const handleOrderInfoChange = (field, value) => {
    setOrderInfo((prevInfo) => ({
      ...prevInfo,
      [field]: value,
    }));
  };

  const handleProfileInfoSubmit = () => {
    // Handle submission logic here
    console.log('Profile Info submitted:', orderInfo);
  };

  return (
    // <Paper elevation={3} style={{ padding: 20 }}>
    <Grid container spacing={3}>
      {/* First Column: User Profile Information */}
      <Grid item xs={12} spacing={2}>
        <Typography variant="h7">Orders Information</Typography>
        {orderInfo.order_number === null || orderInfo.order_number === undefined ? (
          <>
            <Alert severity="error">{userData.name} has no orders</Alert>
          </>
        ) : (
          <>
            <Divider></Divider>&nbsp; &nbsp;
            <Button
              style={{ top: '20px', marginBottom: '20px' }}
              variant="contained"
              color="primary"
              onClick={handleProfileInfoSubmit}
            >
              Update Order Info
            </Button>{' '}
            &nbsp;
          </>
        )}
      </Grid>
    </Grid>
    // </Paper>
  );
};

export default UserOrdersForm;
