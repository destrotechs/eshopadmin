import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Fab,
  Icon,
  IconButton,
  styled,
  useTheme,
  Alert,
  Snackbar,
} from '@mui/material';
import { SimpleCard } from 'app/components';
import MUIDataTable from 'mui-datatables';
import axios from 'axios.js';
import { StyledButton } from '../material-kit/buttons/buttonBase';
import { Navigate } from 'react-router-dom';

// import EditUser from "./edituser";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { setDayWithOptions } from 'date-fns/fp';
import Modal from '../assets/Modal';
import ConfirmDeleteDialog from '../assets/confirmdeletedialog';

import MessageAlert from '../assets/MessageAlert';

const Container = styled('div')(({ theme }) => ({
  margin: '20px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
}));

const Categories = () => {
  // const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [opensnack, setOpenSnack] = useState(false);

  const [categoryname, setCategoryName] = useState('');
  const [categoryCode, setCategoryCode] = useState('');
  const [message, setMessage] = useState('');
  const handleCloseSNack = () => {
    setOpenSnack(false);
  };
  const handleOpenSNack = () => {
    setOpenSnack(true);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    {
      name: 'Category Code',
      options: {
        filter: true,
        setHeaderStyle: {
          fontWeight: 'bold',
        },
        customBodyRender: (value, tableMeta) => {
          const product = categories[tableMeta.rowIndex];
          const image = product.category_code ? product.category_code : '';
          return image ? image : '';
        },
      },
    },

    {
      name: 'Description',
      width: 150,
      options: {
        filter: true,
        customBodyRender: (value, tableMeta) => {
          const product = categories[tableMeta.rowIndex];
          const description = product.category_name;
          return description ? description : '';
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
          const item = categories[tableMeta.rowIndex];
          const itemid = item.id;

          return (
            <div>
              <IconButton
                className="button"
                onClick={() => handleEditClick(item)}
                color="primary"
                aria-label="Edit"
              >
                <Icon>edit</Icon>
              </IconButton>

              <IconButton
                className="button"
                color="error"
                onClick={() => handleDeleteClick(item)}
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
  const fields = [
    {
      id: 'Category Code',
      field_type: 'text',
      span: 12,
      name: 'category_code',
    },
    {
      id: 'Category Name',
      field_type: 'text',
      span: 12,
      name: 'category_name',
    },
  ];
  // const modal_actions = { method: 'post', url: '/api/categories/create' };
  const [title, setTitle] = useState('New Category');
  const [data, setFieldData] = useState({});
  const [edit, goToEdit] = useState(false);
  const [opendelete, setOpenDelete] = useState(false);
  const [severity, setSeverity] = useState('success');

  const [form_fields, setFields] = useState(fields);
  const [itemToDelete, setItemToDelete] = useState({});
  const [modal_actions, setModalActions] = useState({
    method: 'post',
    url: '/api/categories/create',
  });
  const handleEditClick = (item) => {
    console.log('Editing.........', item);
    fields.map((field) => {
      if (item.hasOwnProperty(field.name)) {
        field['value'] = item[field.name];
        console.log('New field', field);
      }
    });
    setFields(fields);
    setFieldData(item);
    setTitle('Edit Category');
    setModalActions({ method: 'put', url: '/api/category/' + item.id });
    setOpen(true);
  };

  const handleDeleteClick = (item) => {
    setOpenDelete(true);
    setItemToDelete(item);
  };
  const closeDelete = () => {
    setOpenDelete(false);
  };
  const handleOnDelete = async () => {
    //logic to delete
    const response = await axios.delete('/api/category/' + itemToDelete.id);
    if (response.status === 200) {
      setMessage(response.data.message);
      setOpenSnack(true);
      fetchCategories();
    }
  };
  const AddItemButton = ({ onClick }) => (
    <IconButton className="button" color="success" aria-label="Success" onClick={onClick}>
      <Icon>add</Icon>
    </IconButton>
  );

  useEffect(() => {
    fetchCategories();
  }, []);
  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/categories/all');
      if (response.status === 200) {
        setCategories(response.data.data);
        setLoading(false);
      } else {
        alert('Products categories could not be fetched');
      }
    } catch (error) {
      console.log('There was an error in fetching categories', error);
      setLoading(false);
    }
  };

  const options = {
    filterType: 'checkbox',
    responsive: 'standard',
    setHeaderStyle: {
      fontWeight: 'bold',
    },
    customToolbar: () => {
      return <AddItemButton onClick={handleClickOpen} />;
    },
  };
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Container>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <MUIDataTable
          title={'All Categories'}
          data={categories}
          columns={columns}
          options={options}
        />
      )}
      {/* start modal */}
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          title={title}
          form_fields={form_fields}
          actions={modal_actions}
          field_data={{ ...data }}
        />
        <ConfirmDeleteDialog
          open={opendelete}
          onClose={closeDelete}
          onDelete={handleOnDelete}
          itemName={itemToDelete.id}
        />
      </div>
      <MessageAlert
        open={opensnack}
        onClose={handleCloseSNack}
        message={message}
        severity={severity}
      />
    </Container>
  );
};

export default Categories;
