import React from "react";
import { Box, Button, Fab, Icon, IconButton, styled,useTheme,Alert,Snackbar, FormControl, InputLabel, NativeSelect, MenuItem, Select } from '@mui/material';
function MessageAlert (props){
    const {open,severity,message,onClose} = props;
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
            <Alert onClose={onClose} severity={severity} >
                {message}
            </Alert>
        </Snackbar>
    );
}

export default  MessageAlert;