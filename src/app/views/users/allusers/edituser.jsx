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
  Alert,
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
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { StyledButton } from '../../material-kit/buttons/buttonBase';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from '../../assets/Modal';
import NumberBadge from '../../assets/Badge';
// import { useHistory } from 'react-router-dom';
// import EditUser from "./edituser";
import ConfirmDeleteDialog from '../../assets/confirmdeletedialog';
import MessageAlert from '../../assets/MessageAlert';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import AttachFileIcon from '@mui/icons-material/AttachFile';
// import { Visibility, VisibilityOff } from '@material-ui/icons';
// import { InputAdornment } from '@material-ui/core';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import UserProfileForm from './userprofile';
import UserCredentials from './usercredentials';
import UserOrdersForm from './orders';
import all_fields_array from '../../assets/allfields';
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

const EditUser = () => {
  useEffect(() => {
    fetchUser();
    // fetchSubCategories();
    // fetchStocks();
  }, []);

  const userId = useParams();
  const [value, setValue] = React.useState('1');
  const [user, setUser] = useState({});
  const [see, setSee] = useState(false);
  const [inputType, setInputType] = useState('password');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const fetchUser = async () => {
    const response = await axios.get('/api/user/' + userId.id);
    if (response.status === 200) {
      setUser(response.data.data);
    } else {
    }
  };
  const [opendelete, setOpenDelete] = useState(false);

  const [roleToDelete, setRoleToDelete] = useState({});
  const [opensnack, setOpenSnack] = useState(false);

  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    user_id: '',
    role_id: '',
    // Add other form fields as needed
  });
  const handleDeleteClick = (role) => {
    setRoleToDelete(role);
    setFormData({ user_id: parseInt(userId.id), role_id: role.id });
    setOpenDelete(true);
  };
  const closeDelete = () => {
    setOpenDelete(false);
  };
  const handleOnDelete = async () => {
    //logic to delete
    const response = await axios.post('/api/roles/remove', formData);
    if (response.status === 200) {
      setMessage(response.data.message);
      setOpenSnack(true);
      fetchUser();
    }
  };
  const handleCloseSNack = () => {
    setOpenSnack(false);
  };

  const [open, setOpen] = useState(false);
  const assign_fields = [
    {
      id: 'User',
      field_type: 'text',
      span: 6,
      type: 'hidden',
      form_value: parseInt(userId.id),
      name: 'user_id',
    },
    {
      id: 'Select a Role',
      field_type: 'select',
      span: 12,
      name: 'role_id',
      source: { url: '/api/users/roles', value: 'id', name: 'role_name' },
    },
  ];
  const modal_actions = { method: 'post', url: '/api/user/assign/roles' };
  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    fetchUser()
    setOpen(false);
  };
  return (
    <Container>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Credentials" value="1" />
            <Tab label="Profile" value="2" />
            <Tab label="Orders" value="3" />
            <Tab label="Roles" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Grid item xs={12}>
            <Paper elevation={3} style={{ padding: '10px', display: 'flex', alignItems: 'center' }}>
              <UserCredentials userData={user} />
            </Paper>
          </Grid>
        </TabPanel>
        <TabPanel value="2">
          <Grid item xs={12}>
            <Paper elevation={3} style={{ padding: '20px' }}>
              <UserProfileForm userData={user} />
            </Paper>
          </Grid>
        </TabPanel>
        <TabPanel value="3">
          <Grid item xs={12}>
            <Paper elevation={3} style={{ padding: '20px' }}>
              <UserOrdersForm userData={user} />
            </Paper>
          </Grid>
        </TabPanel>
        <TabPanel value="4">
          <Grid item xs={12}>
            <Paper xs={6} elevation={3} style={{ padding: '20px' }}>
              <IconButton
                className="button"
                color="success"
                aria-label="Success"
                onClick={handleOpenModal}
              >
                <Icon>add</Icon>
              </IconButton>
              {user.roles === null || user.roles === undefined || user.roles.length === 0 ? (
                <Alert severity="error">{user.name} has not been allocated roles</Alert>
              ) : (
                <Grid item xs={3}>
                  <TableContainer style={{ padding: '10px' }}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                      <TableHead>
                        <TableRow>
                          <TableCell>#</TableCell>
                          <TableCell>Role Name</TableCell>
                          <TableCell align="right">Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {user.roles.map((role, index) => {
                          return (
                            <TableRow>
                              <TableCell>{index + 1}</TableCell>
                              <TableCell>{role.role_name}</TableCell>
                              <TableCell align="right">
                                <IconButton
                                  className="button"
                                  onClick={() => handleDeleteClick(role)}
                                  color="error"
                                  aria-label="Delete"
                                >
                                  <Icon>delete</Icon>
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              )}
            </Paper>
          </Grid>
        </TabPanel>
      </TabContext>
      <ConfirmDeleteDialog
        open={opendelete}
        onClose={closeDelete}
        onDelete={handleOnDelete}
        itemName={roleToDelete.role_name}
      />
      <MessageAlert
        open={opensnack}
        onClose={handleCloseSNack}
        message={message}
        severity="success"
      />
      <Modal
        open={open}
        onClose={handleCloseModal}
        title={'Assign user a role'}
        form_fields={assign_fields}
        actions={modal_actions}
      />
    </Container>
  );
};
export default EditUser;
