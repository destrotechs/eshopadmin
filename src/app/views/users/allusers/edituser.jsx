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
  const { user } = useParams();
  console.log('Userrrrrrr ', user.name);
  const [value, setValue] = React.useState('1');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <Container>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Product Details" value="1" />
            <Tab label="Product Images" value="2" />
            <Tab label="product STOCKs" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Paper elevation={3} style={{ padding: '10px' }}></Paper>
        </TabPanel>
        <TabPanel value="2">
          <Grid item xs={12}>
            <Paper elevation={3} style={{ padding: '20px' }}></Paper>
          </Grid>
        </TabPanel>
        <TabPanel value="3">
          <Grid item xs={12}>
            <Paper elevation={3} style={{ padding: '20px' }}></Paper>
          </Grid>
        </TabPanel>
      </TabContext>
    </Container>
  );
};
export default EditUser;
