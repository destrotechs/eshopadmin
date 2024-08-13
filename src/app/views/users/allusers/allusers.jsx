import React, { useEffect, useState } from 'react';
import { Box, Button, Fab, Icon, IconButton, styled } from '@mui/material';
import { SimpleCard } from 'app/components';
import MUIDataTable from 'mui-datatables';
import axios from 'axios.js';
import { StyledButton } from '../../material-kit/buttons/buttonBase';
import { Navigate } from 'react-router-dom';

import EditUser from './edituser';

const Container = styled('div')(({ theme }) => ({
  margin: '20px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
}));

const AppUsers = () => {
  // const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const columns = [
    {
      name: 'Name',
      options: {
        filter: true,
        customBodyRender: (value, tableMeta) => {
          const customer = users[tableMeta.rowIndex];
          const name = customer.name;
          return name ? name : '';
        },
      },
    },
    {
      name: 'Email',
      options: {
        filter: true,
        customBodyRender: (value, tableMeta) => {
          const customer = users[tableMeta.rowIndex];
          const email = customer.email;
          return email ? email : '';
        },
      },
    },
    {
      name: 'Shipping Address',
      options: {
        filter: true,
        customBodyRender: (value, tableMeta) => {
          const customer = users[tableMeta.rowIndex];
          const address = customer.addresses
            ? customer.addresses.map((address) => address.shipping_address)
            : '';
          return address ? address.join(' || ') : '';
        },
      },
    },
    {
      name: 'Preferred Payment',
      options: {
        filter: true,
        customBodyRender: (value, tableMeta) => {
          const customer = users[tableMeta.rowIndex];
          const preferredPayment = customer.profile ? customer.profile.preferred_payment : '';
          return preferredPayment ? preferredPayment : '';
        },
      },
    },
    {
      name: 'Phone Number',
      options: {
        filter: true,
        customBodyRender: (value, tableMeta) => {
          const customer = users[tableMeta.rowIndex];
          const phoneNumber = customer.profile ? customer.profile.phone_number : '';
          return phoneNumber ? phoneNumber : '';
        },
      },
    },
    {
      name: 'Actions',
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta) => {
          const user = users[tableMeta.rowIndex];
          const userid = user.id;

          return (
            <div>
              <IconButton
                className="button"
                onClick={() => handleEditClick(user)}
                color="primary"
                aria-label="Edit"
              >
                <Icon>edit</Icon>
              </IconButton>

              <IconButton className="button" color="error" aria-label="Delete">
                <Icon>delete</Icon>
              </IconButton>
            </div>
          );
        },
      },
    },
    // Add more columns as needed
  ];
  const [edit, goToEdit] = useState(false);
  const handleEditClick = (user) => {
    // goToEdit(true);
    // console.log('User ', user);
    // if (goToEdit) {
    //   return <Navigate to="/user/edit" />;
    // }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/customers');
      if (response.status === 200) {
        setUsers(response.data.data);
        setLoading(false);
        console.log('response ', response.data.data);
        console.log('Users ', users);
      } else {
        alert('Users could not be fetched');
      }
    } catch (error) {
      console.log('There was an error in fetching users', error);
      setLoading(false);
    }
  };

  const options = {
    filterType: 'checkbox',
    responsive: 'standard',
    setHeaderStyle: {
      fontWeight: 'bold',
    },
  };

  return (
    <Container>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <MUIDataTable title={'All Customers'} data={users} columns={columns} options={options} />
      )}
    </Container>
  );
};

export default AppUsers;
