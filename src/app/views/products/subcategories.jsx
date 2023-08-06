import React, { useEffect,useState } from "react";
import { Box, Button, Fab, Icon, IconButton, styled,useTheme,Alert,Snackbar, FormControl, InputLabel, NativeSelect, MenuItem, Select } from '@mui/material';
import { SimpleCard } from "app/components";
import MUIDataTable from "mui-datatables";
import axios from "axios.js";
import {StyledButton} from "../material-kit/buttons/buttonBase";
import { Navigate } from 'react-router-dom';

// import EditUser from "./edituser";

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { setDayWithOptions } from "date-fns/fp";
import MessageAlert from "../assets/MessageAlert";
const Container = styled("div")(({ theme }) => ({
    margin: "20px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
      marginBottom: "30px",
      [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
  }));

const SubCategories = ()=> {
  // const navigate = useNavigate();
  const [subcategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const columns = [
    {
      name: 'Category',
      options: {
        filter: true,
        setHeaderStyle: {
            fontWeight: 'bold',
          },
        customBodyRender: (value, tableMeta) => {
          const subcat = subcategories[tableMeta.rowIndex];
          const cat = subcat.category?subcat.category:'';
          return cat.category_name ? cat.category_name : '';         
        },
      },
    },
    {
      name: 'Sub-Category Code',
      options: {
        filter: true,
        setHeaderStyle: {
            fontWeight: 'bold',
          },
        customBodyRender: (value, tableMeta) => {
          const subcat = subcategories[tableMeta.rowIndex];
          const cat = subcat.subcategory_code?subcat.subcategory_code:'';
          return cat ? cat : '';         
        },
      },
    },

    {
    name: 'Description',
    width:150,
    options: {
        filter: true,
        customBodyRender: (value, tableMeta) => {
        const product = subcategories[tableMeta.rowIndex];
        const description = product.subcategory_name;
        return description ? description : '';
        },
    },
    }
    
    // {
    //   name: 'Actions',
    //   options: {
    //     filter: false,
    //     sort: false,
    //     empty: true,
    //     customBodyRender: (value, tableMeta) => {
    //       const user = users[tableMeta.rowIndex];
    //       const userid = user.id;

    //       return (
    //         <div>
    //           <IconButton className="button" onClick={() => handleEditClick(user)} color="primary" aria-label="Edit">
    //             <Icon>edit</Icon>
    //           </IconButton>
              
    //            <IconButton className="button" color="error" aria-label="Delete">
    //             <Icon>delete</Icon>
    //           </IconButton>
             
              
    //         </div>
    //       );
    //     },
    //   },
    // },
    // Add more columns as needed
  ];
  const [edit,goToEdit] = useState(false);
  const handleEditClick = (user) => {
    goToEdit(true);
    // console.log("ID",customerid);
    // const userid = customerid; // Replace with the actual user ID you want to edit
    // navigate('/user/edit',{state:userid});
    console.log("User ",user);
    if(goToEdit){
      return <Navigate to="/users/edit"/>;
    }
  };


  useEffect(()=>{
    fetchSubCategories();
  },[]);
  const fetchSubCategories = async () =>{
    try{
      const response = await axios.get('/api/subcategories/all');
      if(response.status===200){
        setSubCategories(response.data.data);
        setLoading(false);
        console.log("response ",response.data.data);
        console.log("subcategories ",subcategories);
        

      }else{
        alert("Products subcategories could not be fetched");
      }
  
    }catch(error){
      console.log("There was an error in fetching categories",error)
      setLoading(false);
    }
  };
  const [open, setOpen] = useState(false);
  const [subcategoryCode, setSubCategoryCode] = useState('');
  const [subcategoryname, setSubCategoryName] = useState('');
  const [message, setMessage] = useState('');
  const [alertMessage, setOpenAlert]  = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [opensnack, setOpenSnack] = useState(false);

  const AddItemButton = ({ onClick }) => (
    <IconButton className="button" color="success" aria-label="Success" onClick={onClick}>
        <Icon>add</Icon>
    </IconButton>
  );
  const handleClickOpen = () => {
      fetchCategories();
      setOpen(true);

  };
  const openSnack = ()=>{
    setOpenAlert(true);
  }
  const handleCloseSNack = () => {
    setOpenSnack(false);
};
  const handleClose = () => {
    setOpen(false);
  };
  const handleSave = async() => {
    const response = await axios.post("/api/subcategories/create",{
      "category_id":category,"subcategory_code":subcategoryCode,"subcategory_name":subcategoryname
    });
    if(response.status===200){
      console.log("Response...",response.data);
      setMessage(response.data.message);
      setOpen(false);

      fetchSubCategories();
      setOpenSnack(true);
      setSubCategoryCode('');
      setSubCategoryName('');
      setCategory('');

    }
  };
  const fetchCategories = async () =>{
    try{
      const response = await axios.get('/api/categories/all');
      if(response.status===200){
        setCategories(response.data.data);
        setLoading(false);
        console.log("response ",response.data.data);
        console.log("Categories ",categories);
        

      }else{
        alert("Products categories could not be fetched");
      }
  
    }catch(error){
      console.log("There was an error in fetching categories",error)
      setLoading(false);
    }
  };
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));


  const options = {
    filterType: 'checkbox',
    responsive:'standard',
    setHeaderStyle: {
      fontWeight: 'bold',
    },
    customToolbar: () => {
      return <AddItemButton onClick={handleClickOpen} />;
    },
  };
  


    return (
        <Container>
          {loading?(<div>Loading...</div>):(
            <MUIDataTable
            title={"All Sub-Categories"}
            data={subcategories}
            columns={columns}
            options={options}
            />
          )
          
        }
        {/* start modal */}
        <div>
        <Dialog fullScreen={fullScreen} open={open} onClose={handleClose}>
          <DialogTitle>New Sub-Category</DialogTitle>
          <DialogContent>
            <FormControl fullWidth>
              <InputLabel id="label">
                Select Category
              </InputLabel>
              <Select 
              sx={{ m: 1 }} 
              labelId="label" 
              id="select" 
              label="Category" 
              onChange={e => {
                setCategory(e.target.value)
            }}
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>{category.category_name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField fullWidth 
            id="outlined-basic" 
            label="Sub-Category Code" 
            variant="outlined" 
            sx={{ m: 1 }} 
            value={subcategoryCode}
            onChange={e => {
                setSubCategoryCode(e.target.value)
            }}
            
            />
            <TextField fullWidth 
            id="outlined-basic" 
            label="Description" 
            variant="outlined" 
            sx={{ m: 1}} 
            value={subcategoryname}
            onChange={e => {
                setSubCategoryName(e.target.value)
            }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogActions>
        </Dialog>
      </div>
      {/* end modal */}
      {/* message alert */}
      <MessageAlert
      open={opensnack}
      onClose={handleCloseSNack}
      message={message}
      severity={'success'}
      />

      {/* end message alert */}
                
        </Container>
    );
}

export default SubCategories;