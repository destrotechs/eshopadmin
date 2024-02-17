import React, { useEffect, useState } from 'react';
import { Box, Button, Fab, Icon, IconButton, styled } from '@mui/material';
import { SimpleCard } from 'app/components';
import MUIDataTable from 'mui-datatables';
import axios from 'axios.js';
import { StyledButton } from '../../material-kit/buttons/buttonBase';
import { Navigate } from 'react-router-dom';
import all_fields_array from 'app/views/assets/allfields';
import EditUser from './edituser';
import Modal from '../../assets/Modal';
const Container = styled('div')(({ theme }) => ({
  margin: '20px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
}));

const SystemUsers = () => {
  // const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [fields, setFields] = useState(all_fields_array[0]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [modal_actions, setModalActions] = useState({ method: 'post', url: '/api/users/register' });

  const AddItemButton = ({ onClick }) => (
    <IconButton className="button" color="success" aria-label="Success" onClick={onClick}>
      <Icon>add</Icon>
    </IconButton>
  );
  const handleOpenModal = () => {
    setOpen(true);
  };
  const handleCloseModal = () => {
    fetchUsers();
    setOpen(false);
  };
  const columns = [
    {
      name: 'Name',
      options: {
        filter: true,
        customBodyRender: (value, tableMeta) => {
          const customer = users[tableMeta.rowIndex];
          const name = customer.name;
          return name ? name : '';
        },
      },
    },
    {
      name: 'Email',
      options: {
        filter: true,
        customBodyRender: (value, tableMeta) => {
          const customer = users[tableMeta.rowIndex];
          const email = customer.email;
          return email ? email : '';
        },
      },
    },

    {
      name: 'User Type',
      options: {
        filter: true,
        customBodyRender: (value, tableMeta) => {
          const user = users[tableMeta.rowIndex];
          const type = user.usertype ? user.usertype.user_type_name : '';
          return type ? type : '';
        },
      },
    },
    {
      name: 'User Rights',
      options: {
        filter: true,
        customBodyRender: (value, tableMeta) => {
          const user = users[tableMeta.rowIndex];
          const rights = user.rights ? user.rights.map((right) => right.right_to) : '';
          return rights ? rights.join(' || ') : '';
        },
      },
    },
    // {
    //   name: 'Phone Number',
    //   options: {
    //     filter: true,
    //     customBodyRender: (value, tableMeta) => {
    //       const customer = users[tableMeta.rowIndex];
    //       const phoneNumber = customer.profile ? customer.profile.phone_number : '';
    //       return phoneNumber ? phoneNumber : '';
    //     },
    //   },
    // },
    {
      name: 'Actions',
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta) => {
          const user = users[tableMeta.rowIndex];
          const userid = user.id;

          return (
            <div>
              <IconButton
                className="button"
                onClick={() => handleEditClick(user)}
                color="primary"
                aria-label="Edit"
              >
                <Icon>edit</Icon>
              </IconButton>

              <IconButton className="button" color="error" aria-label="Delete">
                <Icon>delete</Icon>
              </IconButton>
            </div>
          );
        },
      },
    },
    // Add more columns as needed
  ];
  const [edit, goToEdit] = useState(false);
  const handleEditClick = (user) => {
    goToEdit(true);
    console.log('User ', user);
    if (goToEdit) {
      return <Navigate to="/users/edit" />;
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      if (response.status === 200) {
        setUsers(response.data.data);
        setLoading(false);
        console.log('response ', response.data.data);
        console.log('Users ', users);
      } else {
        alert('Users could not be fetched');
      }
    } catch (error) {
      console.log('There was an error in fetching users', error);
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
      return <AddItemButton onClick={handleOpenModal} />;
    },
  };

  return (
    <Container>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <MUIDataTable title={'All System Users'} data={users} columns={columns} options={options} />
      )}
      <Modal
        open={open}
        onClose={handleCloseModal}
        title={'Add New User'}
        form_fields={fields}
        actions={modal_actions}
      />
    </Container>
  );
};

export default SystemUsers;
