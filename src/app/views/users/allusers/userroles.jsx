import React, { useEffect, useState } from 'react';
import { Box, Button, Fab, Icon, IconButton, styled } from '@mui/material';
import { SimpleCard } from 'app/components';
import MUIDataTable from 'mui-datatables';
import axios from 'axios.js';
import { StyledButton } from '../../material-kit/buttons/buttonBase';
import { Navigate } from 'react-router-dom';
import all_fields_array from 'app/views/assets/allfields';
import EditUser from './edituser';
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
import Stack from '@mui/material/Stack';
import Modal from '../../assets/Modal';
import { useNavigate } from 'react-router-dom';

const Container = styled('div')(({ theme }) => ({
  margin: '20px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
}));

const UserRoles = () => {
  // const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [fields, setFields] = useState(all_fields_array[5]);
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
  const NameInitials = ({ name }) => {
    const getInitials = (name) => {
      const words = name.split(' ');
      return words.map((word) => word.charAt(0)).join('');
    };
    const initials = getInitials(name);

    return <div>{initials}</div>;
  };
  const columns = [
    {
      name: 'Name',
      options: {
        filter: true,
        customBodyRender: (value, tableMeta) => {
          const user = users[tableMeta.rowIndex];
          const name = user.name;
          return name ? name : '';
        },
      },
    },
    {
      name: 'Email',
      options: {
        filter: true,
        customBodyRender: (value, tableMeta) => {
          const user = users[tableMeta.rowIndex];
          const email = user.email;
          return email ? email : '';
        },
      },
    },
    {
      name: 'Roles',
      options: {
        filter: true,
        customBodyRender: (value, tableMeta) => {
          const user = users[tableMeta.rowIndex];
          const roles = user.roles ? user.roles.map((role) => role.role_name) : '';
          return roles ? roles.join(' ||') : '';
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
          const user = users[tableMeta.rowIndex];
          const userid = user.id;

          return (
            <div>
              {/* <IconButton
                className="button"
                onClick={() => handleEditClick(user)}
                color="primary"
                aria-label="Edit"
              >
                <Icon>edit</Icon>
              </IconButton> */}
              <Stack direction="row" spacing={2}>
                <Avatar onClick={() => handleEditClick(user)} sx={{ bgcolor: deepPurple[300] }}>
                  <NameInitials name={user.name} />
                </Avatar>
                {/* <IconButton className="button" color="error" aria-label="Delete">
                <Icon>delete</Icon>
              </IconButton> */}
              </Stack>
            </div>
          );
        },
      },
    },
    // Add more columns as needed
  ];
  const navigate = useNavigate();
  const [edit, goToEdit] = useState(false);
  const handleEditClick = (user) => {
    return navigate('/user/edit/' + user.id);
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
        <MUIDataTable title={'All Users'} data={users} columns={columns} options={options} />
      )}
      <Modal
        open={open}
        onClose={handleCloseModal}
        title={'Create New User'}
        form_fields={fields}
        actions={modal_actions}
      />
    </Container>
  );
};

export default UserRoles;
