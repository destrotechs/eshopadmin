import React, { useEffect,useState } from "react";
import { Box, Button, Fab, Icon, IconButton, styled,useTheme,Alert,Snackbar } from '@mui/material';
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
import Modal from "../assets/Modal";

const Container = styled("div")(({ theme }) => ({
    margin: "20px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
      marginBottom: "30px",
      [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
  }));




const Categories = ()=> {
  // const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [opensnack, setOpenSnack] = useState(false);

  const [categoryname, setCategoryName] = useState('');
  const [categoryCode, setCategoryCode] = useState('');
  const [message, setMessage] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    const handleCloseSNack = () => {
        setOpenSnack(false);
    };
    
    const handleSave = async ()=>{
        const response = await axios.post('/api/categories/create', {
            'category_code':categoryCode,'category_name':categoryname
        });
        console.log("RES ",response.status);
        setCategoryCode('');
        setCategoryName('');	
        if(response.status===200){
            setMessage(response.data.message);
            fetchCategories();
            setOpenSnack(true);
            setOpen(false);
        }
    }
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
          const image = product.category_code?product.category_code:'';
          return image ? image : '';         
        },
      },
    },

    {
    name: 'Description',
    width:150,
    options: {
        filter: true,
        customBodyRender: (value, tableMeta) => {
        const product = categories[tableMeta.rowIndex];
        const description = product.category_name;
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
  const AddItemButton = ({ onClick }) => (
    <IconButton className="button" color="success" aria-label="Success" onClick={onClick}>
        <Icon>add</Icon>
    </IconButton>
  );

  useEffect(()=>{
    fetchCategories();
  },[]);
  const fetchCategories = async () =>{
    try{
      const response = await axios.get('/api/categories/all');
      if(response.status===200){
        setCategories(response.data.data);
        setLoading(false);
        console.log("response ",response.data.data);
        console.log("Products ",categories);
        

      }else{
        alert("Products categories could not be fetched");
      }
  
    }catch(error){
      console.log("There was an error in fetching categories",error)
      setLoading(false);
    }
  };

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
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const fields = [
    {
      id:'Category Code',
      field_type:'text',
      span:12,
      name:"category_code"
    },
    {
      id:'Category Name',
      field_type:'text',
      span:12,
      name:"category_name"
    },
    
  ];
  const modal_actions = {method:'post',url:'/api/categories/create'}

    return (
        <Container>
          {loading?(<div>Loading...</div>):(
            <MUIDataTable
            title={"All Categories"}
            data={categories}
            columns={columns}
            options={options}
            />
          )
          
        }
        {/* start modal */}
        <div>
      <Modal open={open} onClose={handleClose} title={"New Category"} form_fields={fields} actions={modal_actions}/>     
        
      </div>


    </Container>
    );
}

export default Categories;