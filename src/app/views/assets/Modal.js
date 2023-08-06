import React, { useEffect,useState } from "react";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { setDayWithOptions } from "date-fns/fp";
import { Box, Button, Fab, Icon, IconButton, styled,useTheme,Alert,Snackbar, FormControl, InputLabel, NativeSelect, MenuItem, Select } from '@mui/material';



function Modal(props){
    const [attributes] = props;
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClose = () => {
        setOpen(false);
      };
    return (
        <div>
        <Dialog fullScreen={fullScreen} open={open} onClose={handleClose}>
          <DialogTitle>New Sub-Category</DialogTitle>
          <DialogContent>
          
          </DialogContent>
          <DialogActions>
            {/* <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button> */}
          </DialogActions>
        </Dialog>
      </div>
    );
}

export default Modal;