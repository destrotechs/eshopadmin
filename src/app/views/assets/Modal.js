import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import { setDayWithOptions } from 'date-fns/fp';
import {
  Grid,
  Box,
  Button,
  Fab,
  Icon,
  IconButton,
  styled,
  useTheme,
  Alert,
  Snackbar,
  FormControl,
  InputLabel,
  NativeSelect,
  MenuItem,
  Select,
} from '@mui/material';
import axios from 'axios.js';

import Field from './field';
import MessageAlert from './MessageAlert';
function Modal({
  open,
  onClose,
  title = null,
  content = null,
  actions = {},
  form_fields = [],
  isEditMode = false,
}) {
  console.log('Fields', form_fields);
  const [fields, setFields] = useState(form_fields);
  const [formData, setFormData] = useState({});
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [severity, setSeverity] = useState('success');
  const [opensnack, setOpenSnack] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [message, setMessage] = useState('');

  const handleCloseSNack = () => {
    setOpenSnack(false);
  };
  const handleOpenSNack = () => {
    setOpenSnack(true);
  };
  const handleCloseError = () => {
    setOpenError(false);
  };
  const handleOpenError = () => {
    setOpenError(true);
  };
  useEffect(() => {
    // Trigger the initial onChange event with default values
    form_fields.forEach((field) => {
      console.log('FRIEEEEEE', field.value);

      handleFieldChange(
        field.name,
        field.form_value !== null || field.form_value !== undefined ? field.form_value : field.value
      ); // Provide the initial value here if needed
    });
  }, [form_fields]);
  const handleFieldChange = (fieldName, value) => {
    setFormData((prevData) => ({
      ...formData,
      [fieldName]: value,
    }));
    console.log('form data', formData);
  };

  const handleSave = async () => {
    setFields((prevFields) => [...prevFields, formData]);
    // console.log("Submitted data ",fields)
    console.log('Submitted data ', formData);
    //handle sub,mit to server
    try {
      const response = await axios[actions.method](actions.url, formData);
      console.log('Server Response ', response);
      if (response.status !== 200) {
        console.error('ERROR: ', response);
        setMessage(response.message ? response.message : response);
        setSeverity('error');
        setOpenSnack(true);
      } else if (!response) {
        setMessage('An error occured while saving: ');
        setSeverity('error');
        setOpenSnack(true);
      }
      setFormData({});
      setSeverity('success');
      setMessage(response.data.message);
      setOpenSnack(true);
    } catch (error) {
      console.error('Error', error);
      setMessage('An error occured while saving: ' + error.message ? error.message : error);
      setSeverity('error');
      setOpenSnack(true);
    }
  };
  return (
    <div>
      <Dialog maxWidth="md" fullWidth open={open} onClose={onClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            {form_fields.map((field, index) => (
              <Field
                key={index}
                {...field}
                onChange={handleFieldChange}
                value={formData[field.name] || field.value}
              />
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} startIcon={<CloseIcon />}>
            Cancel
          </Button>
          <Button onClick={handleSave} startIcon={<SaveIcon />}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <MessageAlert
        open={opensnack}
        onClose={handleCloseSNack}
        message={message}
        severity={severity}
      />
    </div>
  );
}

export default Modal;
