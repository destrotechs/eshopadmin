import React, { useEffect, useState } from 'react';
import { Box, Button, Fab, Icon, IconButton, styled } from '@mui/material';
import { SimpleCard } from 'app/components';
import MUIDataTable from 'mui-datatables';
import axios from 'axios.js';
import { StyledButton } from '../material-kit/buttons/buttonBase';
import { useNavigate } from 'react-router-dom';
import Modal from '../assets/Modal';
// import { useHistory } from 'react-router-dom';
// import EditUser from "./edituser";
import ConfirmDeleteDialog from '../assets/confirmdeletedialog';
import MessageAlert from '../assets/MessageAlert';
import StockBadge from '../assets/stockBadge';
const Container = styled('div')(({ theme }) => ({
  margin: '20px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
}));

const Products = () => {
  // const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const columns = [
    {
      name: 'Image',
      options: {
        filter: true,
        customBodyRender: (value, tableMeta) => {
          const product = products[tableMeta.rowIndex];
          const image = product.images ? product.images[0] : '';
          //return image ? image.img_url : '';
          const imgurl = image ? image.img_url : '';
          return (
            <img
              src={imgurl}
              alt="Image"
              style={{
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                objectFit: 'cover',
                marginRight: '8px',
                // Add more inline styles as needed
              }}
            />
          );
        },
      },
    },
    {
      name: 'Name',
      options: {
        filter: true,
        customBodyRender: (value, tableMeta) => {
          const product = products[tableMeta.rowIndex];
          const name = product.name;
          return name ? name : '';
        },
      },
    },
    {
      name: 'Description',
      width: 150,
      options: {
        filter: true,
        customBodyRender: (value, tableMeta) => {
          const product = products[tableMeta.rowIndex];
          const description = product.description;
          return description ? description : '';
        },
      },
    },
    {
      name: 'Price',
      options: {
        filter: true,
        customBodyRender: (value, tableMeta) => {
          const product = products[tableMeta.rowIndex];
          const price = product.price;
          return price ? 'KES ' + price : '';
        },
      },
    },
    {
      name: 'Availability',
      options: {
        filter: true,
        customBodyRender: (value, tableMeta) => {
          const product = products[tableMeta.rowIndex];
          const available = product.stock;
          return <StockBadge value={available} />;
        },
      },
    },
    {
      name: 'Warranty',
      options: {
        filter: true,
        customBodyRender: (value, tableMeta) => {
          const product = products[tableMeta.rowIndex];
          const warranty = product.warranty;
          return warranty ? warranty : '';
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
          const product = products[tableMeta.rowIndex];
          const productid = product.id;

          return (
            <div>
              <IconButton
                className="button"
                onClick={() => handleEditClick(product)}
                color="primary"
                aria-label="Edit"
              >
                <Icon>edit</Icon>
              </IconButton>

              <IconButton
                className="button"
                onClick={() => handleDeleteClick(product)}
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
  const navigate = useNavigate();
  const [edit, goToEdit] = useState(false);
  const handleEditClick = (product) => {
    // goToEdit(true);
    console.log('Product ', product);
    // if(goToEdit){
    return navigate('/edit/product/' + product.id);
    // }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products');
      if (response.status === 200) {
        setProducts(response.data.data);
        setLoading(false);
        console.log('response ', response.data.data);
        console.log('Products ', products);
      } else {
        alert('Products could not be fetched');
      }
    } catch (error) {
      console.log('There was an error in fetching products', error);
      setLoading(false);
    }
  };
  const [open, setOpen] = useState(false);

  const AddItemButton = ({ onClick }) => (
    <IconButton className="button" color="success" aria-label="Success" onClick={onClick}>
      <Icon>add</Icon>
    </IconButton>
  );
  const handleOpenModal = () => {
    setOpen(true);
  };
  const [opendelete, setOpenDelete] = useState(false);
  const [severity, setSeverity] = useState('success');

  const [itemToDelete, setItemToDelete] = useState({});
  const handleCloseModal = () => {
    fetchProducts();
    setOpen(false);
  };
  const handleDeleteClick = (item) => {
    setOpenDelete(true);
    setItemToDelete(item);
  };
  const closeDelete = () => {
    setOpenDelete(false);
  };
  const [opensnack, setOpenSnack] = useState(false);

  const [message, setMessage] = useState('');
  const handleCloseSNack = () => {
    setOpenSnack(false);
  };
  const handleOpenSNack = () => {
    setOpenSnack(true);
  };
  const handleOnDelete = async () => {
    //logic to delete
    const response = await axios.delete('/api/product/' + itemToDelete.id);
    if (response.status === 200) {
      setMessage(response.data.message);
      setOpenSnack(true);
      fetchProducts();
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
  const fields = [
    {
      id: 'Subcategory',
      field_type: 'select',
      span: 12,
      name: 'subcategory_id',
      source: { url: '/api/subcategories/all', value: 'id', name: 'subcategory_name' },
    },
    {
      id: 'Product Code',
      field_type: 'text',
      span: 6,
      name: 'product_code',
    },
    {
      id: 'Name',
      field_type: 'text',
      span: 6,
      name: 'common_name',
    },
    {
      id: 'Brand',
      field_type: 'text',
      span: 6,
      name: 'brand',
    },
    {
      id: 'Model',
      field_type: 'text',
      span: 6,
      name: 'model',
    },
    {
      id: 'Size',
      field_type: 'text',
      span: 6,
      name: 'size',
    },
    {
      id: 'Description',
      field_type: 'text',
      span: 6,
      name: 'description',
    },
    {
      id: 'Price',
      field_type: 'text',
      span: 6,
      name: 'price',
    },
    {
      id: 'Options',
      field_type: 'text',
      span: 6,
      name: 'options',
    },
  ];

  const modal_actions = { method: 'post', url: '/api/products/create' };

  return (
    <Container>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <MUIDataTable title={'All Products'} data={products} columns={columns} options={options} />
      )}
      <ConfirmDeleteDialog
        open={opendelete}
        onClose={closeDelete}
        onDelete={handleOnDelete}
        itemName={itemToDelete.id}
      />
      <MessageAlert
        open={opensnack}
        onClose={handleCloseSNack}
        message={message}
        severity={severity}
      />
      <Modal
        open={open}
        onClose={handleCloseModal}
        title={'Add New Product'}
        form_fields={fields}
        actions={modal_actions}
      />
    </Container>
  );
};

export default Products;
