import React, { useState } from 'react';
import { Paper, Grid, TextField, Button, Typography, Divider, Alert } from '@mui/material';
import { isNull } from 'lodash';

const UserProfileForm = ({ userData }) => {
  const [profileInfo, setProfileInfo] = useState({
    paymentMode: userData.profile === null ? null : userData.profile.preferred_payment,
    cardNumber: userData.profile === null ? null : userData.profile.card_number,
    phoneNumber: userData.profile === null ? null : userData.profile.phone_number,
    locale: userData.profile === null ? null : userData.profile.locale,
    cvv: userData.profile === null ? null : userData.profile.cvv,
  });
  const [addresses, setAddresses] = useState(userData.addresses || []);
  const handleProfileInfoChange = (field, value) => {
    setProfileInfo((prevInfo) => ({
      ...prevInfo,
      [field]: value,
    }));
  };

  const handleProfileInfoSubmit = () => {
    // Handle submission logic here
    console.log('Profile Info submitted:', profileInfo);
  };

  const handleAddressChange = (index, field, value) => {
    setAddresses((prevAddresses) => {
      const updatedAddresses = [...prevAddresses];
      updatedAddresses[index][field] = value;
      return updatedAddresses;
    });
  };

  const handleAddAddress = () => {
    setAddresses((prevAddresses) => [...prevAddresses, {}]);
  };

  const handleRemoveAddress = (index) => {
    setAddresses((prevAddresses) => prevAddresses.filter((_, i) => i !== index));
  };

  const handleAddressSubmit = () => {
    // Handle submission logic for addresses here
    console.log('Addresses submitted:', addresses);
  };
  const getAddress = (index) => {
    return `Shipping Address ${index + 1}`;
  };
  return (
    // <Paper elevation={3} style={{ padding: 20 }}>
    <Grid container spacing={3}>
      {/* First Column: User Profile Information */}
      <Grid item xs={6} spacing={2}>
        <Typography variant="h7">Profile Information</Typography>
        {isNull(profileInfo.phoneNumber) ? (
          <>
            <Alert severity="error">{userData.name} Profile details are not available</Alert>
          </>
        ) : (
          <>
            <Divider></Divider>&nbsp;
            <TextField
              label="Payment Mode"
              fullWidth
              value={profileInfo.paymentMode}
              onChange={(e) => handleProfileInfoChange('paymentMode', e.target.value)}
            />
            &nbsp;
            <TextField
              label="Card Number"
              fullWidth
              value={profileInfo.cardNumber}
              onChange={(e) => handleProfileInfoChange('cardNumber', e.target.value)}
            />
            &nbsp;
            <TextField
              label="Phone Number"
              fullWidth
              value={profileInfo.phoneNumber}
              onChange={(e) => handleProfileInfoChange('phoneNumber', e.target.value)}
            />
            &nbsp;
            <TextField
              label="Locale"
              fullWidth
              value={profileInfo.locale}
              onChange={(e) => handleProfileInfoChange('locale', e.target.value)}
            />
            &nbsp;
            <TextField
              label="CVV"
              fullWidth
              value={profileInfo.cvv}
              onChange={(e) => handleProfileInfoChange('cvv', e.target.value)}
            />
            &nbsp;
            <Button
              style={{ top: '20px', marginBottom: '20px' }}
              variant="contained"
              color="primary"
              onClick={handleProfileInfoSubmit}
            >
              Update Profile Info
            </Button>{' '}
            &nbsp;
          </>
        )}
      </Grid>

      {/* Second Column: Address Information */}
      <Grid item xs={6}>
        <Typography variant="h7">Address Information</Typography>

        {/* Add address input fields here */}
        {userData.address == null ? (
          <>
            <Alert severity="error">{userData.name} Address information is not available</Alert>
          </>
        ) : (
          <>
            <Divider></Divider>&nbsp;
            {userData.addresses.map((address, index) => {
              return (
                <>
                  &nbsp;
                  <TextField
                    label={getAddress(index)}
                    fullWidth
                    value={address.shipping_address}
                    onChange={(e) => handleAddressChange(index, 'shipping_address', e.target.value)}
                  />
                  &nbsp;
                </>
              );
            })}
            <Button
              style={{ top: '20px', bottom: '20px' }}
              variant="contained"
              color="primary"
              onClick={handleAddressSubmit}
            >
              Update Address
            </Button>
          </>
        )}
      </Grid>
    </Grid>
    // </Paper>
  );
};

export default UserProfileForm;
