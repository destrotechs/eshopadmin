import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Link } from 'react-router-dom';
import apiClient from '../../auth/apiClient';
import Chip from '@mui/material/Chip';
import CurrencyFormatter from '../assets/currency'; // Import CurrencyFormatter component
import PaymentDetailsModal from '../payments/PaymentDetailsModal';
const OrderDetailsModal = ({ selectedOrder, open, onClose, handleOpenReviewModal }) => {
  // State to manage the order status
  const [orderStatus, setOrderStatus] = useState(selectedOrder.status);
  const [statusChanged, setStatusChanged] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false); // State to manage PaymentDetailsModal visibility

  // Parse items function
  const parseItems = (items) => {
    try {
      const parsedItems = JSON.parse(items[0]['items']);
      return Array.isArray(parsedItems) ? parsedItems : Object.values(parsedItems);
    } catch (error) {
      console.error('Error parsing items:', error);
      return [];
    }
  };

  const items = parseItems(selectedOrder.items);

  // Handle status change
  const handleStatusChange = (event) => {
    setOrderStatus(event.target.value);
    setStatusChanged(true);
  };

  // Save changes to the order status
  const handleSaveChanges = async () => {
    try {
      await apiClient.put(`/orders/${selectedOrder.order_number}`, { status: orderStatus });
      setStatusChanged(false); // Reset the status change flag after saving
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const totalPaid = selectedOrder.payments.reduce(
    (sum, payment) => sum + parseFloat(payment.amount),
    0
  );

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

  // Usage
  const PaymentStatusBadge = ({ totalPaid, totalCost }) => {
    const paymentStatus =
      parseInt(totalPaid) >= parseInt(totalCost)
        ? 'Paid'
        : totalPaid > 0
        ? 'Partially Paid'
        : 'Not Paid';

    return getStatusBadge(paymentStatus);
  };

  // Print the order details
  const printOrderDetails = () => {
    const printContent = document.getElementById('order-details-table').outerHTML;
    const printItems = document.getElementById('order-items-table').outerHTML; // Capture the ordered items table
    const printWindow = window.open('', '', 'width=800,height=600');

    printWindow.document.write('<html><head><title>Order Details</title><style>');
    printWindow.document.write(`
      body { font-family: Arial, sans-serif; margin: 20px; }
      table { width: 100%; border-collapse: collapse; margin-bottom: 20px; } /* Add margin between tables */
      th, td { padding: 12px 20px; border: 1px solid #ddd; } /* Added padding to table cells */
      th { text-align: left; background-color: #f4f4f4; font-weight: bold; }
      td { text-align: left; }
      h3, h4 { margin: 0; font-weight: normal; }
      .order-summary { margin-bottom: 20px; }
      .action-btn { display: none; }  /* Hide action buttons in print */
    `);
    printWindow.document.write('</style></head><body>');
    printWindow.document.write('<h3>Order Details</h3>');
    printWindow.document.write(printContent);
    printWindow.document.write('<h4>Ordered Items</h4>');
    printWindow.document.write(printItems); // Add the ordered items table to the print content
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };

  const handleOpenPaymentModal = () => {
    console.log('Open Payments', selectedOrder.payment_info);
    setPaymentModalOpen(true); // This should open the modal
    console.log('open modal', paymentModalOpen);
  };

  // Function to close PaymentDetailsModal
  const handleClosePaymentModal = () => {
    setPaymentModalOpen(false);
  };
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          p: 4,
          maxWidth: 1000, // Increased the width
          margin: 'auto',
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 3,
          overflowY: 'auto',
          maxHeight: '90vh',
          width: '80vw', // Adjusted to ensure modal is wider
        }}
      >
        <Typography variant="h5" mb={3} fontWeight="bold" color="primary">
          Order Details
        </Typography>

        {/* Close Button */}
        <Box display="flex" justifyContent="flex-end">
          <Button onClick={onClose} variant="outlined" color="secondary">
            Close
          </Button>
        </Box>

        {/* Order Info */}
        <TableContainer component={Paper}>
          <Table id="order-details-table" sx={{ margin: 2 }}>
            <TableHead>
              <TableRow>
                <TableCell
                  colSpan={2}
                  align="center"
                  sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}
                >
                  Order Summary
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Order Number:</TableCell>
                <TableCell>{selectedOrder.order_number}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Customer:</TableCell>
                <TableCell>{selectedOrder.customer}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Order Date:</TableCell>
                <TableCell>{new Date(selectedOrder.order_date).toLocaleString()}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Shipping Address:</TableCell>
                <TableCell>{selectedOrder.shipping_address?.shipping_address}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Total Cost:</TableCell>
                <TableCell>
                  <CurrencyFormatter value={parseInt(selectedOrder.total_cost) || 0} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Payment Status:</TableCell>
                <TableCell>
                  <PaymentStatusBadge totalPaid={totalPaid} totalCost={selectedOrder.total_cost} />
                  {totalPaid === selectedOrder.total_cost && (
                    <Box mt={3} display="flex" justifyContent="center">
                      <Button
                        className="sm"
                        variant="contained"
                        color="primary"
                        onClick={handleOpenPaymentModal}
                      >
                        View Payment
                      </Button>
                    </Box>
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Payment Mode:</TableCell>
                <TableCell>{selectedOrder.payment_mode?.payment_mode_name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Amount Paid:</TableCell>
                <TableCell>
                  <CurrencyFormatter value={totalPaid} />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Order Status Change */}
        <Typography variant="h6" mb={2} fontWeight="bold" color="primary">
          Order Status
        </Typography>
        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select value={orderStatus} onChange={handleStatusChange} label="Status">
            <MenuItem value="Confirmed">Confirmed</MenuItem>
            <MenuItem value="Shipped">Shipped</MenuItem>
            <MenuItem value="Delivered">Delivered</MenuItem>
            <MenuItem value="Cancelled">Cancelled</MenuItem>
          </Select>
        </FormControl>

        {/* Save Changes Button */}
        {statusChanged && (
          <Box mt={3} display="flex" justifyContent="flex-end">
            <Button
              onClick={handleSaveChanges}
              variant="contained"
              color="primary"
              sx={{ textTransform: 'none' }}
            >
              Save Changes
            </Button>
          </Box>
        )}

        {/* Ordered Items */}
        <Typography variant="h6" mb={2} fontWeight="bold" color="primary">
          Ordered Item(s)
        </Typography>

        <TableContainer component={Paper}>
          <Table id="order-items-table" sx={{ margin: 2 }}>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Discount</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Typography>{item.product.name}</Typography>
                  </TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>
                    <CurrencyFormatter value={parseInt(item.product.price) || 0} />
                  </TableCell>
                  <TableCell>
                    <CurrencyFormatter value={parseInt(item.total) || 0} />
                  </TableCell>
                  <TableCell>{item.discount || 0}%</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleOpenReviewModal(item)}
                    >
                      Review
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Print Button */}
        <Box mt={3} display="flex" justifyContent="center">
          <Button variant="contained" color="secondary" onClick={printOrderDetails}>
            Print Order
          </Button>
        </Box>
        <PaymentDetailsModal
          payment={
            selectedOrder.payment_info ? selectedOrder.payment_info[0] : selectedOrder.payments
          } // Ensure this has the payment details
          open={paymentModalOpen} // Ensure this toggles the modal
          onClose={handleClosePaymentModal} // Ensure this closes the modal properly
        />
      </Box>
    </Modal>
  );
};

export default OrderDetailsModal;
