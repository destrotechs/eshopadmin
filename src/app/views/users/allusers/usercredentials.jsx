import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Fab,
  Icon,
  IconButton,
  styled,
  Grid,
  Paper,
  TextField,
  Divider,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  InputLabel,
} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
const UserCredentials = ({ userData }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [password, setPassword] = useState('');
  const handleClickShowPassword = () => {
    // setPassword(user.password);
    setShowPassword((show) => !show);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Card sx={{ maxWidth: 345, display: 'flex', alignItems: 'center' }}>
        <CardMedia
          sx={{ height: 100, width: 100 }}
          image="/images/duser.png"
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {userData.name}
          </Typography>
          {/* <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species,
                    ranging across all continents except Antarctica
                  </Typography> */}
        </CardContent>
        <CardActions style={{ display: 'flex', alignItems: 'center' }}>
          <Button size="medium">Add Image</Button>
        </CardActions>
      </Card>
      &nbsp; &nbsp; &nbsp;
      <div>
        <h4>
          EMAIL&nbsp; <span>{userData.email}</span>
        </h4>
        <Divider></Divider>
        <h4>
          PASSWORD&nbsp;
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
        </h4>
      </div>
    </>
  );
};
export default UserCredentials;
