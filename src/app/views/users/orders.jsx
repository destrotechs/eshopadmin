import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Select,
  MenuItem,
  Grid,
  styled,
  Typography,
  Chip, // Import Chip for payment status badges
} from '@mui/material';
import MUIDataTable from 'mui-datatables';
import { Container } from '@mui/system';
import apiClient from '../../auth/apiClient';
import OrderDetailsModal from './ordersDetailModal'; // Import the modal component
import CurrencyFormatter from '../assets/currency';
const StyledContainer = styled(Container)(({ theme }) => ({
  margin: theme.spacing(3),
  '& .MuiTypography-h6': { marginBottom: theme.spacing(2) },
}));

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [status, setStatus] = useState('');
  const [openOrderDetailsModal, setOpenOrderDetailsModal] = useState(false);

  const columns = [
    { name: 'order_number', label: 'Order Number' },
    { name: 'customer', label: 'Customer' },
    {
      name: 'total_cost',
      label: 'Total Cost',
      options: {
        customBodyRenderLite: (dataIndex) => {
          return <CurrencyFormatter value={orders[dataIndex].total_cost} />;
        },
      },
    },
    {
      name: 'total_paid',
      label: 'Total Paid',
      options: {
        customBodyRenderLite: (dataIndex) => {
          const totalPaid = orders[dataIndex].payments.reduce(
            (sum, payment) => sum + parseFloat(payment.amount),
            0
          );
          return <CurrencyFormatter value={totalPaid} />;
        },
      },
    },
    {
      name: 'payment_status',
      label: 'Payment Status',
      options: {
        customBodyRenderLite: (dataIndex) => {
          const totalPaid = orders[dataIndex].payments.reduce(
            (sum, payment) => sum + parseFloat(payment.amount),
            0
          );
          const totalCost = orders[dataIndex].total_cost;
          const paymentStatus =
            totalPaid >= totalCost ? 'Paid' : totalPaid > 0 ? 'Partially Paid' : 'Not Paid';

          return getStatusBadge(paymentStatus); // Get status badge
        },
      },
    },
    { name: 'status', label: 'Status' },
    {
      name: 'Actions',
      options: {
        customBodyRenderLite: (dataIndex) => (
          <Button
            variant="outlined"
            onClick={() => handleViewOrder(orders[dataIndex].order_number)}
          >
            View Order
          </Button>
        ),
      },
    },
  ];

  const handleViewOrder = (orderId) => {
    const order = orders.find((o) => o.order_number === orderId);
    setSelectedOrder(order);
    setStatus(order.status); // Initialize the status for editing
    setOpenOrderDetailsModal(true); // Open the modal to view order details
  };

  const handleCloseOrderDetailsModal = () => {
    setOpenOrderDetailsModal(false); // Close the modal
    setSelectedOrder(null); // Clear the selected order
  };

  const handleOpenReviewModal = (item) => {
    // Handle opening the review modal for the item
    console.log('Open review modal for:', item);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await apiClient.get('/api/orders');
      if (response.status === 200) {
        setOrders(response.data.data);
      } else {
        console.error('Orders could not be fetched');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleSaveStatus = async () => {
    // Make API call to update status
    try {
      await apiClient.put(`/api/orders/${selectedOrder.order_number}`, { status });
      setSelectedOrder(null); // Close modal after saving
      fetchOrders(); // Refresh the order list
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  // Function to return payment status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Paid':
        return <Chip label="Paid" style={{ backgroundColor: '#4caf50', color: 'white' }} />;
      case 'Partially Paid':
        return (
          <Chip label="Partially Paid" style={{ backgroundColor: '#ff9800', color: 'white' }} />
        );
      case 'Not Paid':
        return <Chip label="Not Paid" style={{ backgroundColor: '#f44336', color: 'white' }} />;
      default:
        return <Chip label="Unknown" style={{ backgroundColor: '#9e9e9e', color: 'white' }} />;
    }
  };

  const options = {
    filter: true,
    responsive: 'standard',
    selectableRows: 'none',
  };

  return (
    <StyledContainer>
      <Typography variant="h6">Order List</Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <MUIDataTable data={orders} columns={columns} options={options} />
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <OrderDetailsModal
          selectedOrder={selectedOrder}
          open={openOrderDetailsModal}
          onClose={handleCloseOrderDetailsModal}
          handleOpenReviewModal={handleOpenReviewModal}
        />
      )}
    </StyledContainer>
  );
};

export default Orders;
