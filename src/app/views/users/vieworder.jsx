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
  Card,
  CardMedia,
  CardContent,
  Typography,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { SimpleCard } from 'app/components';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MUIDataTable from 'mui-datatables';
import Stack from '@mui/material/Stack';
import axios from 'axios.js';
import { StyledButton } from '../material-kit/buttons/buttonBase';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from '../assets/Modal';
import NumberBadge from '../assets/Badge';
// import { useHistory } from 'react-router-dom';
// import EditUser from "./edituser";
import ConfirmDeleteDialog from '../assets/confirmdeletedialog';
import MessageAlert from '../assets/MessageAlert';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import AttachFileIcon from '@mui/icons-material/AttachFile';
// import EditUser from "./edituser";

const Container = styled('div')(({ theme }) => ({
  margin: '20px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
}));

const Order = () => {
  const { id } = useParams();
  console.log('ID', id);
  const [order, setOrder] = useState(null);
  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      const response = await axios.get('/api/order/' + id);
      if (response.status === 200) {
        console.log('response ', response.data);
        setOrder(response.data.data);
        // setLoading(false);
        console.log('Order ', order);
      } else {
        alert('Order could not be fetched');
      }
    } catch (error) {
      console.log('There was an error in fetching orders', error);
      // setLoading(false);
    }
  };
  return (
    <Container>
      <Card sx={{ padding: 2 }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Order #{order?.order_number}
          </Typography>
          <Typography variant="h9" color="text.secondary">
            Customer {order?.owner.name}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body1">Amount</Typography>
              <Typography variant="body2" color="text.secondary">
                Ksh.{order?.total_cost}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">Status</Typography>
              <Typography variant="body2" color="text.secondary">
                {'success'}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">Date</Typography>
              <Typography variant="body2" color="text.secondary">
                {'27/12/2030'}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">Customer</Typography>
              <Typography variant="body2" color="text.secondary">
                {/* {order?.owner} */}
              </Typography>
            </Grid>
          </Grid>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body1">Description</Typography>
          <Typography variant="body2" color="text.secondary">
            {'description'}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};
export default Order;
