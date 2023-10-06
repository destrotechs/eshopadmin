import React, { useEffect,useState } from "react";
import { Box, Button, Fab, Icon, IconButton, styled,Grid,Paper,TextField,Divider, Avatar } from '@mui/material';
import { SimpleCard } from "app/components";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MUIDataTable from "mui-datatables";
import Stack from '@mui/material/Stack';
import axios from "axios.js";
import {StyledButton} from "../material-kit/buttons/buttonBase";
import { useNavigate,useParams } from 'react-router-dom';
import Modal from "../assets/Modal";
// import { useHistory } from 'react-router-dom';
// import EditUser from "./edituser";
import ConfirmDeleteDialog from "../assets/confirmdeletedialog";
import MessageAlert from "../assets/MessageAlert";

const Container = styled("div")(({ theme }) => ({
    margin: "20px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
      marginBottom: "30px",
      [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
  }));


  const EditProduct = ()=>{
    const productId = useParams()
    const [product,setProduct]  = useState(null)  
    const [productImages,setProductImages] = useState([])
    const [initialData, setInitialData] = useState({});
    const [editedData, setEditedData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [subcategories, setSubCategories] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    useEffect(()=>{
        fetchProduct();
        fetchSubCategories();
      },[]);
    const navigate = useNavigate();
    const fetchSubCategories = async () =>{
      try{
        const response = await axios.get('/api/subcategories/all');
        if(response.status===200){
          setSubCategories(response.data.data);
        }else{
          alert("Products subcategories could not be fetched");
        }
    
      }catch(error){
        console.log("There was an error in fetching categories",error)
      }
    };
    const fetchProduct = async()=>{
        const response = await axios.get('/api/products/'+productId.id)
        
        if(response.status === 200) {
            console.log("Response",response)
            console.log("Producteee",response.data.data.product)
            setProduct(response.data.data.product)
            setInitialData(response.data.data.product)
            setEditedData(response.data.data.product);
            setSelectedOption(response.data.data.product.subcategory)
            console.log("Producte",product)
        }else{
            console.log("There was an error fetching the product ")
            navigate('/session/404');
          }
       
    }
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEditedData({ ...editedData, [name]: value });
    };
    const handleSelectChange = (e) => {
      setSelectedOption(e.target.value);
    };
  
    const handleSave = () => {
      // Implement logic to save editedData (e.g., send it to an API)
      console.log('Edited data:', editedData);
  
      // After saving, exit edit mode
      setIsEditing(false);
    };
    return (
        <Container>
    <Grid container spacing={2}>
      {/* First Column */}
      <Grid item xs={8}>
        <Paper elevation={3} style={{ padding: '10px' }}>
          {/* First Form */}
          <FormControl fullWidth>
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
              label="Brand" fullWidth
              margin="normal"
              name="brand"
              value={editedData.brand}
              onChange={handleInputChange}
              autoFocus
           />
          <TextField 
            label="Model" fullWidth
            margin="normal"
            name="model"
            value={editedData.model}
            onChange={handleInputChange}
            autoFocus
           />
          <TextField 
              label="Options" fullWidth
              margin="normal"
              name="options"
              value={editedData.options}
              onChange={handleInputChange}
              autoFocus
          
           />
          <TextField 
              label="Size" fullWidth
              margin="normal"
              name="size"
              value={editedData.size}
              onChange={handleInputChange}
              autoFocus
          
           />
           <TextField 
              label="Warrant" fullWidth
              margin="normal"
              name="warrant"
              value={editedData.warrant}
              onChange={handleInputChange}
              autoFocus
          
           />
           <TextField 
              label="Sku" fullWidth
              margin="normal"
              name="sku"
              value={editedData.sku}
              onChange={handleInputChange}
              autoFocus
          
           />
           <TextField 
              label="Bar Code" fullWidth
              margin="normal"
              name="bar_code"
              value={editedData.bar_code}
              onChange={handleInputChange}
              autoFocus
          
           />
          <Divider style={{ margin: '20px 0' }} />
          <Button variant="outlined">Save Changes</Button>

        </Paper>
      </Grid>

      {/* Second Column */}
      <Grid item xs={4}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          {/* Third Form */}
          <fieldset>
            <legend>Product Images</legend>
            <Stack direction="row" spacing={1}>
            {product?(<div>{product.images?product.images.map((image,index)=>(
             
             <Avatar
             alt="img"
             
             src={image.img_url}
           />
            )):'No images uploaded'}</div>):"Loading..."}
            </Stack>
          </fieldset>
          </Paper>
      </Grid>
    </Grid>
        </Container>
    )
  }
  export default EditProduct;