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
import all_fields_array from '../assets/allfields';
const Container = styled('div')(({ theme }) => ({
  margin: '20px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
}));
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const PaymentModes = () => {
  const [paymentModes, setPaymentModes] = useState({});
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');
  const [openMessage, setOpenMessage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const modal_actions = { method: 'post', url: '/api/payments/modes' };
  useEffect(() => {
    fetchModes();
  }, []);
  const AddItemButton = ({ onClick }) => (
    <IconButton className="button" color="success" aria-label="Success" onClick={onClick}>
      <Icon>add</Icon>
    </IconButton>
  );
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    fetchModes();
    setOpenModal(false);
  };
  const handleOpenMessage = () => {
    setOpenMessage(true);
  };
  const handleCloseMessage = () => {
    setOpenMessage(false);
  };
  const fetchModes = async () => {
    try {
      const response = await axios.get('/api/payments/modes');
      console.log('Payment Modes', response);
      if (response.status === 200) {
        setPaymentModes(response.data.data);
        setLoading(false);
      } else {
        setMessage('There was an error fetching payment modes');
        setSeverity('error');
        setOpenMessage(true);
      }
    } catch (error) {
      setMessage(error.message ? error.message : error);
      setSeverity('error');
      setOpenMessage(true);
    }
  };
  const options = {
    filterType: 'checkbox',
    responsive: 'standard',
    setHeaderStyle: {
      fontWeight: 'bold',
    },
    customToolbar: () => {
      return <AddItemButton onClick={handleOpenModal} />;
    },
  };
  const columns = [
    {
      name: 'Type',
      options: {
        filter: true,
        customBodyRender: (value, tableMeta) => {
          const mode = paymentModes[tableMeta.rowIndex];
          const name = mode.payment_mode_name;
          return name ? name : '';
        },
      },
    },
    {
      name: 'Mode Requirements',
      options: {
        filter: true,
        customBodyRender: (value, tableMeta) => {
          const mode = paymentModes[tableMeta.rowIndex];
          const name = mode.payment_mode_details;
          return name ? name : '';
        },
      },
    },

    {
      name: 'Actions',
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta) => {
          const mode = paymentModes[tableMeta.rowIndex];
          const modeId = mode.id;

          return (
            <div>
              <IconButton
                className="button"
                // onClick={() => handleEditClick(mode)}
                color="primary"
                aria-label="Edit"
              >
                <Icon>edit</Icon>
              </IconButton>

              <IconButton
                className="button"
                // onClick={() => handleDeleteClick(product)}
                color="error"
                aria-label="Delete"
              >
                <Icon>delete</Icon>
              </IconButton>
            </div>
          );
        },
      },
    },
    // Add more columns as needed
  ];
  return (
    <Container>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <MUIDataTable
          title={'Payment Modes'}
          data={paymentModes}
          columns={columns}
          options={options}
        />
      )}

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        title={'Add New Payment Mode'}
        form_fields={all_fields_array[7]}
        actions={modal_actions}
      />
      <MessageAlert
        open={openMessage}
        onClose={handleCloseMessage}
        message={message}
        severity={severity}
      />
    </Container>
  );
};
export default PaymentModes;
