import React, { useEffect, useState } from 'react';
import { Box, Button, Fab, Icon, IconButton, styled } from '@mui/material';
import { SimpleCard } from 'app/components';
import MUIDataTable from 'mui-datatables';
import axios from 'axios.js';
import { StyledButton } from '../material-kit/buttons/buttonBase';
import { useNavigate } from 'react-router-dom';

// import EditUser from "./edituser";

const Container = styled('div')(({ theme }) => ({
  margin: '20px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
}));

const Orders = () => {
  // const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const columns = [
    {
      name: 'Number',
      options: {
        filter: true,
        customBodyRender: (value, tableMeta) => {
          const order = orders[tableMeta.rowIndex];
          const num = order.order_number ? order.order_number : '';
          return num ? num : '';
        },
      },
    },
    {
      name: 'Owner (Customer)',
      options: {
        filter: true,
        customBodyRender: (value, tableMeta) => {
          const product = orders[tableMeta.rowIndex];
          const name = product.owner.name;
          return name ? name : '';
        },
      },
    },
    {
      name: 'Ordered Items',
      options: {
        filter: true,
        customBodyRender: (value, tableMeta) => {
          const product = orders[tableMeta.rowIndex];
          const description = product.description;
          return description ? description : '';
        },
      },
    },
    {
      name: 'Date ordered',
      options: {
        filter: true,
        customBodyRender: (value, tableMeta) => {
          const product = orders[tableMeta.rowIndex];
          const available = product.created_at;
          return available ? available : '';
        },
      },
    },
    {
      name: 'Shipping Address',
      options: {
        filter: true,
        customBodyRender: (value, tableMeta) => {
          const product = orders[tableMeta.rowIndex];
          const warranty = product.shipping_address.shipping_address;
          return warranty ? warranty : '';
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
          const order = orders[tableMeta.rowIndex];
          const orderid = order.id;

          return (
            <div>
              <IconButton
                className="button"
                onClick={() => handleViewClick(order)}
                color="primary"
                aria-label="Edit"
              >
                <Icon>edit</Icon>
              </IconButton>
            </div>
          );
        },
      },
    },
    // Add more columns as needed
  ];
  const navigate = useNavigate();
  const [edit, goToEdit] = useState(false);
  const handleViewClick = (order) => {
    console.log(order);
    goToEdit(true);
    if (goToEdit) {
      return navigate('/order/' + order.id);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  const fetchOrders = async () => {
    try {
      const response = await axios.get('/api/orders');
      if (response.status === 200) {
        setOrders(response.data.data);
        setLoading(false);
        console.log('response ', response.data.data);
        console.log('Orders ', orders);
      } else {
        alert('Orders could not be fetched');
      }
    } catch (error) {
      console.log('There was an error in fetching orders', error);
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
        <MUIDataTable title={'All Orders'} data={orders} columns={columns} options={options} />
      )}
    </Container>
  );
};

export default Orders;
