import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Typography, styled, Container } from '@mui/material';
import MUIDataTable from 'mui-datatables';
import apiClient from '../../auth/apiClient';
import PaymentDetailsModal from './PaymentDetailsModal'; // Import the payment details modal
import CurrencyFormatter from '../assets/currency'; // Import the CurrencyFormatter

const StyledContainer = styled(Container)(({ theme }) => ({
  margin: theme.spacing(3),
  '& .MuiTypography-h6': { marginBottom: theme.spacing(2) },
}));

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [openPaymentDetailsModal, setOpenPaymentDetailsModal] = useState(false);

  const columns = [
    { name: 'order_id', label: 'Order ID' },
    {
      name: 'amount',
      label: 'Amount',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => (
          // Use the CurrencyFormatter to display the amount with currency
          <CurrencyFormatter
            value={value}
            currencyCode={tableMeta.rowData[3]} // Assuming column 2 is the currency
          />
        ),
      },
    },
    { name: 'payment_mode', label: 'Payment Mode ID' },
    { name: 'payment_id', label: 'Payment ID' },
    { name: 'paid_on', label: 'Paid On' },
    {
      name: 'Actions',
      options: {
        customBodyRenderLite: (dataIndex) => (
          <Button
            variant="outlined"
            onClick={() => handleViewPayment(payments[dataIndex].payment_id)}
          >
            View Details
          </Button>
        ),
      },
    },
  ];

  const handleViewPayment = (paymentId) => {
    const payment = payments.find((p) => p.payment_id === paymentId);
    setSelectedPayment(payment);
    setOpenPaymentDetailsModal(true); // Open the modal to view payment details
  };

  const handleClosePaymentDetailsModal = () => {
    setOpenPaymentDetailsModal(false); // Close the modal
    setSelectedPayment(null); // Clear the selected payment
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await apiClient.get('/api/payments/all');
      if (response.status === 200) {
        setPayments(response.data.data);
      } else {
        console.error('Payments could not be fetched');
      }
    } catch (error) {
      console.error('Error fetching payments:', error);
    } finally {
      setLoading(false);
    }
  };

  const options = {
    filter: true,
    responsive: 'standard',
    selectableRows: 'none',
  };

  return (
    <StyledContainer>
      <Typography variant="h6">Payments List</Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <MUIDataTable data={payments} columns={columns} options={options} />
      )}

      {/* Payment Details Modal */}
      {selectedPayment && (
        <PaymentDetailsModal
          payment={selectedPayment}
          open={openPaymentDetailsModal}
          onClose={handleClosePaymentDetailsModal}
        />
      )}
    </StyledContainer>
  );
};

export default Payments;
