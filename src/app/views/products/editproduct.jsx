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

//tabs

const EditProduct = () => {
  const productId = useParams();
  const [product, setProduct] = useState(null);
  const [productStocks, setProductStocks] = useState(null);
  const [productImages, setProductImages] = useState([]);
  const [initialData, setInitialData] = useState({});
  const [editedData, setEditedData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [subcategories, setSubCategories] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [opensnack, setOpenSnack] = useState(false);
  const [openerror, setOpenError] = useState(false);
  const [errormessage, setErrorMessage] = useState(null);
  const [severity, setSeverity] = useState('success');

  useEffect(() => {
    fetchProduct();
    fetchSubCategories();
    fetchStocks();
  }, []);
  const navigate = useNavigate();
  const formData = new FormData();
  //tabs
  const [value, setValue] = React.useState('1');
  const [message, setMessage] = useState('');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const fetchSubCategories = async () => {
    try {
      const response = await axios.get('/api/subcategories/all');
      if (response.status === 200) {
        setSubCategories(response.data.data);
      } else {
        alert('Products subcategories could not be fetched');
      }
    } catch (error) {
      console.log('There was an error in fetching categories', error);
    }
  };
  const fetchProduct = async () => {
    const response = await axios.get('/api/products/' + productId.id);
    if (response.status === 200) {
      console.log('Response', response);
      console.log('Producteee', response.data.data.product);
      setProduct(response.data.data.product);
      setInitialData(response.data.data.product);
      setEditedData(response.data.data.product);
      setSelectedOption(response.data.data.product.subcategory);
      console.log('Producte', product);
    } else {
      console.log('There was an error fetching the product ');
      navigate('/session/404');
    }
  };
  const fetchStocks = async () => {
    const response = await axios.get('/api/stocks/fetch/' + productId.id);
    console.log('SSSSS', response.data.data);
    if (response.status === 200) {
      console.log('STocks Response ', response);
      setProductStocks(response.data.data);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };
  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };
  const handleCloseSNack = () => {
    setOpenSnack(false);
  };
  const handleFileChange = (event) => {
    // Access the selected file from the event
    const file = event.target.files[0];
    setSelectedFile(file);
    console.log('File changed');

    console.log('File', selectedFile);
  };
  const handleSaveChanges = async () => {
    // Implement logic to save editedData (e.g., send it to an API)
    console.log('Edited data:', editedData);
    const editResponse = await axios.put('/api/product/' + editedData.id, editedData);
    // After saving, exit edit mode
    if (editResponse.status === 200) {
      setMessage(editResponse.data.message);
      setSeverity('success');

      setOpenSnack(true);

      fetchProduct();
      setSelectedFile(null);
      delete formData.img;
    }
    console.log('Response from server', editResponse);
    setIsEditing(false);
  };
  const handleImageUpload = async () => {
    //upload file to serve
    formData.append('img', selectedFile);
    formData.append('product_id', productId.id);
    try {
      const uploadResponse = await axios.post('/api/product/images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (uploadResponse.status === 200) {
        setMessage(uploadResponse.data.message);
        setSeverity('success');
        setOpenSnack(true);
        fetchProduct();
      } else {
        console.log('File Upload Response ', uploadResponse);
        setMessage(uploadResponse.message ? uploadResponse.message : uploadResponse);
        setSeverity('error');
        setOpenSnack(true);
      }
    } catch (error) {
      setMessage(error.message ? error.message : error);
      setSeverity('error');
      setOpenSnack(true);
    }

    // console.log('File Upload Response ', uploadResponse);
  };
  const stockFields = [
    {
      id: 'Unit Of Measure',
      field_type: 'select2',
      span: 12,
      name: 'unit_of_measure',
      field_data: [
        { name: 'Pieces', value: 'Pieces' },
        { name: 'Kilograms', value: 'Kilograms' },
        { name: 'Grams', value: 'Grams' },
      ],
    },
    {
      id: 'Quantity',
      field_type: 'text',
      span: 12,
      name: 'quantity_added',
    },
    {
      id: 'Product Id',
      field_type: 'text',
      span: 12,
      name: 'product_id',
      form_value: productId.id,
      type: 'hidden',
    },
  ];
  const [open, setOpen] = useState(false);

  const modal_actions = { method: 'post', url: '/api/stocks/create' };
  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    fetchStocks();
    setOpen(false);
  };

  return (
    <Container>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Product Details" value="1" />
            <Tab label="Product Images" value="2" />
            <Tab label="product STOCKs" value="3" />
            <Tab label="product promotion" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Paper elevation={3} style={{ padding: '10px' }}>
            <Grid container spacing={2}>
              {/* First Column */}
              <Grid item xs={6}>
                {/* First Form */}
                <FormControl fullWidth style={{ borderTop: '20px' }}>
                  <InputLabel id="demo-simple-select-label">Sub-Category</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedOption}
                    onChange={handleSelectChange}
                    label="SubCategory"
                  >
                    {subcategories.map((subcat) => (
                      <MenuItem key={subcat.id} value={subcat.subcategory_code}>
                        {subcat.subcategory_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  label="Product Code"
                  fullWidth
                  margin="normal"
                  type="text"
                  variant="outlined"
                  name="product_code"
                  value={editedData.product_code}
                  onChange={handleInputChange}
                  autoFocus
                />

                <TextField
                  label="Name"
                  fullWidth
                  margin="normal"
                  name="name"
                  value={editedData.name}
                  onChange={handleInputChange}
                  autoFocus
                />
                <TextField
                  label="Description"
                  fullWidth
                  margin="normal"
                  name="description"
                  value={editedData.description}
                  onChange={handleInputChange}
                  autoFocus
                />
                <TextField
                  label="Price"
                  fullWidth
                  margin="normal"
                  name="price"
                  value={editedData.price}
                  onChange={handleInputChange}
                  autoFocus
                />

                <TextField
                  label="Brand"
                  fullWidth
                  margin="normal"
                  name="brand"
                  value={editedData.brand}
                  onChange={handleInputChange}
                  autoFocus
                />

                <TextField
                  label="Model"
                  fullWidth
                  margin="normal"
                  name="model"
                  value={editedData.model}
                  onChange={handleInputChange}
                  autoFocus
                />
                {/* </Paper> */}
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Options"
                  fullWidth
                  margin="normal"
                  name="options"
                  value={editedData.options}
                  onChange={handleInputChange}
                  autoFocus
                />
                <TextField
                  label="Size"
                  fullWidth
                  margin="normal"
                  name="size"
                  value={editedData.size}
                  onChange={handleInputChange}
                  autoFocus
                />
                <TextField
                  label="Warrant"
                  fullWidth
                  margin="normal"
                  name="warrant"
                  value={editedData.warrant}
                  onChange={handleInputChange}
                  autoFocus
                />
                <TextField
                  label="Sku"
                  fullWidth
                  margin="normal"
                  name="sku"
                  value={editedData.sku}
                  onChange={handleInputChange}
                  autoFocus
                />
                <TextField
                  label="Bar Code"
                  fullWidth
                  margin="normal"
                  name="bar_code"
                  value={editedData.bar_code}
                  onChange={handleInputChange}
                  autoFocus
                />
                <Divider style={{ margin: '20px 0' }} />
                <Button variant="contained" color="success" onClick={handleSaveChanges}>
                  Save Changes
                </Button>
                {/* </Paper> */}
              </Grid>

              {/* Second Column */}
            </Grid>
          </Paper>
        </TabPanel>
        <TabPanel value="2">
          <Grid item xs={12}>
            <Paper elevation={3} style={{ padding: '20px' }}>
              {/* Third Form */}
              <fieldset>
                <legend>Product Images</legend>
                <div>
                  <ImageList variant="masonry" rowHeight={160} cols={3} gap={8}>
                    {product ? (
                      <>
                        {product.images
                          ? product.images.map((image, index) => (
                              <ImageListItem key={index}>
                                <img
                                  sx={{ width: 300, height: 200 }}
                                  srcSet={`${image.img_url}?w=161&fit=crop&auto=format&dpr=2 2x`}
                                  src={`${image.img_url}?w=161&fit=crop&auto=format`}
                                  alt={'image.img_url'}
                                  loading="lazy"
                                />
                              </ImageListItem>
                            ))
                          : 'no images available'}
                      </>
                    ) : (
                      'Loading'
                    )}
                  </ImageList>
                </div>
              </fieldset>
              <Divider style={{ margin: '20px 0' }} />
              <Button
                onChange={handleFileChange}
                endIcon={<AttachFileIcon />}
                component="label"
                variant="outlined"
              >
                <input type="file" />
              </Button>
              &nbsp;
              <Button
                component="label"
                variant="contained"
                color="success"
                endIcon={<CloudUploadIcon />}
                onClick={handleImageUpload}
              >
                Upload File
              </Button>
              <showError open={openerror} error={'error'} />
            </Paper>
          </Grid>
        </TabPanel>
        <TabPanel value="3">
          <Grid item xs={12}>
            <Paper elevation={3} style={{ padding: '20px' }}>
              <IconButton
                className="button"
                color="success"
                aria-label="Success"
                onClick={handleOpenModal}
              >
                <Icon>add</Icon>
              </IconButton>
              <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Product</TableCell>
                      <TableCell align="right"></TableCell>
                      <TableCell align="right">Quantity</TableCell>
                      <TableCell align="right">Unit</TableCell>
                      <TableCell align="right">Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {productStocks !== null
                      ? productStocks.map((stock, index) => (
                          <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell component="th" scope="row">
                              {stock.product.common_name}
                            </TableCell>
                            <TableCell align="right">
                              {/* {stock.quantity_added < 0 ? 'Removed' : 'Added'} */}
                              <NumberBadge number={stock.quantity_added} />
                            </TableCell>
                            <TableCell align="right">{stock.quantity_added}</TableCell>
                            <TableCell align="right">{stock.unit_of_measure}</TableCell>
                            <TableCell align="right">{stock.date_altered}</TableCell>
                          </TableRow>
                        ))
                      : ''}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </TabPanel>
        <TabPanel value="4">
          <Grid item xs={12}>
            <Paper elevation={3} style={{ padding: '20px' }}>
              <IconButton
                className="button"
                color="success"
                aria-label="Success"
                onClick={handleOpenModal}
              >
                <Icon>add</Icon>
              </IconButton>
              <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>#</TableCell>
                      <TableCell>Promotion Attributes</TableCell>
                      <TableCell align="left">Value</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>1</TableCell>
                      <TableCell>Discount</TableCell>
                      <TableCell>
                        <TextField
                          label="Discount value"
                          fullWidth
                          margin="normal"
                          name="discount"
                          value={editedData.discount}
                          onChange={handleInputChange}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2</TableCell>
                      <TableCell>Offset</TableCell>
                      <TableCell>
                        <TextField
                          label="Offset value"
                          fullWidth
                          margin="normal"
                          name="offset"
                          value={editedData.offset}
                          onChange={handleInputChange}
                        />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <Button
                variant="contained"
                color="primary"
                style={{ marginTop: '20px' }}
                onClick={handleSaveChanges}
              >
                Submit Changes
              </Button>
            </Paper>
          </Grid>
        </TabPanel>
      </TabContext>
      <MessageAlert
        open={opensnack}
        onClose={handleCloseSNack}
        message={message}
        severity={severity}
      />
      <Modal
        open={open}
        onClose={handleCloseModal}
        title={'Add New Stock'}
        form_fields={stockFields}
        actions={modal_actions}
      />
    </Container>
  );
};
export default EditProduct;
