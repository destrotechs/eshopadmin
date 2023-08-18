import React, { useEffect,useState } from "react";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { setDayWithOptions } from "date-fns/fp";
import { Grid,Box, Button, Fab, Icon, IconButton, styled,useTheme,Alert,Snackbar, FormControl, InputLabel, NativeSelect, MenuItem, Select } from '@mui/material';
import axios from "axios.js";


import Field from "./field";
import MessageAlert from "./MessageAlert";

function Modal({ open, onClose, title=null, content=null, actions={},form_fields=[] }){
    console.log("Form Fields",form_fields);
  const [fields, setFields] = useState(form_fields);
    const [formData, setFormData] = useState({});
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    
    const [opensnack, setOpenSnack] = useState(false);
    const [message, setMessage] = useState('');
    
    const handleCloseSNack = () => {
        setOpenSnack(false);
    };
    const handleOpenSNack = () => {
        setOpenSnack(true);
    };
    const handleFieldChange = (fieldName, value) => {
      setFormData((prevData) => ({
          ...prevData,
          [fieldName]: value,
      }));
      console.log(formData, value)

    };


    const handleSave = async () => {
      setFields((prevFields) => [...prevFields, formData]);
      // console.log("Submitted data ",fields)
      console.log("Submitted data ",formData);
      //handle sub,mit to server
      const response = await axios[actions.method](actions.url, formData);
      console.log("Server Response ",response);
      setFormData({})
      setMessage(response.data.message);
      setOpenSnack(true);

    };
    return (
        <div>
        <Dialog fullScreen={fullScreen} open={open} onClose={onClose}>
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>
          <Grid container spacing={2}>
            {form_fields.map((field,index)=>(
              <Field key={index} {...field} onChange={handleFieldChange} value={field.value?field.value:formData[field.name]}/>
            ))}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogActions>
        </Dialog>
        <MessageAlert
        open={opensnack}
        onClose={handleCloseSNack}
        message={message}
        severity={'success'}
      />
      </div>
    );
}

export default Modal;