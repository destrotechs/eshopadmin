import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';

const PaymentDetailsModal = ({ payment, open, onClose }) => {
  if (!payment || !payment.payment_details) return null;

  // Parse the stringified JSON inside payment_details
  let parsedPaymentDetails;
  try {
    parsedPaymentDetails = JSON.parse(payment.payment_details); // Safely parse the JSON string
  } catch (error) {
    console.error('Error parsing payment details:', error);
    return (
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Payment Details</DialogTitle>
        <DialogContent dividers>
          <Typography color="textSecondary">Error parsing payment details.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} variant="contained" color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  const callback = parsedPaymentDetails.Body?.stkCallback;

  // If callback is undefined or null, log it and return a default message
  if (!callback) {
    console.log('No callback details found in payment.');
    return (
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Payment Details</DialogTitle>
        <DialogContent dividers>
          <Typography color="textSecondary">No payment callback details available.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} variant="contained" color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  const callbackMetadata = callback.CallbackMetadata?.Item || [];

  // Process metadata details
  const metadataDetails = callbackMetadata.reduce((acc, item) => {
    const key = item?.Name || 'Unknown'; // Default for missing Name
    const value = item?.Value !== undefined ? item.Value : 'Not Available'; // Default for missing Value
    acc[key] = value;
    return acc;
  }, {});
  // Construct a general information object
  const paymentInfo = {
    'Order ID': payment.order_id,
    Amount: payment.amount,
    Currency: payment.currency,
    'Payment Mode': payment.payment_mode,
    'Payment ID': payment.payment_id,
    'Paid On': payment.paid_on,
  };

  // Extract and map metadata details correctly

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Payment Details</DialogTitle>
      <DialogContent dividers>
        {/* General Information */}
        <Typography variant="h6" gutterBottom>
          General Information
        </Typography>
        <Table>
          <TableBody>
            {Object.entries(paymentInfo).map(([key, value]) => (
              <TableRow key={key}>
                <TableCell>
                  <strong>{key}</strong>
                </TableCell>
                <TableCell>{value || 'N/A'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Callback Metadata */}
        <Typography variant="h6" gutterBottom>
          Transaction Details
        </Typography>
        {Object.keys(metadataDetails).length > 0 ? (
          <Table>
            <TableBody>
              {Object.entries(metadataDetails).map(([key, value]) => (
                <TableRow key={key}>
                  <TableCell>
                    <strong>{key}</strong>
                  </TableCell>
                  <TableCell>{value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Typography color="textSecondary">No callback metadata available.</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PaymentDetailsModal;
