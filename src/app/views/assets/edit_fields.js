import React from 'react';
import TextField from '@material-ui/core/TextField';

const Field = ({ label, value, onChange }) => {
  return (
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      variant="outlined"
      fullWidth
    />
  );
};

export default Field;
