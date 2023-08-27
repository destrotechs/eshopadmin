import React, { useEffect,useState } from "react";
import { Box, Button, Fab, Icon, IconButton, styled,Grid } from '@mui/material';
import { SimpleCard } from "app/components";
import MUIDataTable from "mui-datatables";
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
    const [product,setProduct]  = useState({})  


    useEffect(()=>{
        fetchProduct();
      },[]);

    const fetchProduct = async()=>{
        const response = await axios.get('/api/products/'+productId.id)
        if(response.status === 200) {
            console.log("Product",response.data.data)
            setProduct(response.data.data)
        }else{
            console.log("There was an error fetching the product ")
        }
    }
    return (
        <Container>
        <Grid container spacing={2}>
            <Grid item xs={8}>
                xs=8
            </Grid>
            
        </Grid>
        </Container>
    )
  }
  export default EditProduct;