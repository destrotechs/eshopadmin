import React, { useEffect, useState } from 'react';
import { CircularProgress, Container, Typography } from '@mui/material';
import AddressCard from './addressCard';

const UserAddresses = ({ user_addresses }) => {
  console.log('user address', user_addresses);
  const [loading, setLoading] = useState(true);
  const [addresses, setUserAddresses] = useState([]);
  useEffect(() => {
    if (user_addresses) {
      setUserAddresses(user_addresses);
      setLoading(false);
    }
  }, []);
  console.log('user addresses', addresses);
  return (
    <Container>
      <Typography variant="h6" gutterBottom>
        User Addresses
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : addresses.length > 0 ? (
        addresses.map((address) => <AddressCard key={address.id} address={address} />)
      ) : (
        <Typography variant="body1" color="textSecondary">
          No addresses found.
        </Typography>
      )}
    </Container>
  );
};

export default UserAddresses;
