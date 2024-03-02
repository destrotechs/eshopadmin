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
      console.log('User Info', response);
      setUser(response.data.data);
    } else {
      console.error('User could not be fetched');
    }
  };
  console.log('roleees ', user.roles);
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
            <Paper elevation={3} style={{ padding: '20px' }}>
              {user.roles === null || user.roles === undefined || user.roles.length === 0 ? (
                <Alert severity="error">{user.name} has not been allocated roles</Alert>
              ) : (
                <Grid item xs={3}>
                  <TableContainer style={{ padding: '10px' }}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Role Name</TableCell>
                          <TableCell align="right">Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {user.roles.map((role, index) => {
                          return (
                            <TableRow>
                              <TableCell>{role.role_name}</TableCell>
                              <TableCell align="right">remove</TableCell>
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
    </Container>
  );
};
export default EditUser;
