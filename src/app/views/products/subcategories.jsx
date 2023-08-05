import React, { useEffect,useState } from "react";
import { Box, Button, Fab, Icon, IconButton, styled } from '@mui/material';
import { SimpleCard } from "app/components";
import MUIDataTable from "mui-datatables";
import axios from "axios.js";
import {StyledButton} from "../material-kit/buttons/buttonBase";
import { Navigate } from 'react-router-dom';

// import EditUser from "./edituser";

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
      name: 'Sub-Category Code',
      options: {
        filter: true,
        setHeaderStyle: {
            fontWeight: 'bold',
          },
        customBodyRender: (value, tableMeta) => {
          const product = subcategories[tableMeta.rowIndex];
          const image = product.subcategory_code?product.subcategory_code:'';
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

  const options = {
    filterType: 'checkbox',
    responsive:'standard',
    setHeaderStyle: {
      fontWeight: 'bold',
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
                
        </Container>
    );
}

export default SubCategories;