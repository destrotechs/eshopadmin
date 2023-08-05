import React, { useEffect,useState } from "react";
import { Box, Button, Fab, Icon, IconButton, styled } from '@mui/material';
import { SimpleCard } from "app/components";
import MUIDataTable from "mui-datatables";
import axios from "axios.js";
import {StyledButton} from "../../material-kit/buttons/buttonBase";
import { useParams } from "react-router-dom";


const EditUser = () => {
    const {user} = useParams();
        console.log("User ",user);


    return (
        <>
        <h3>Edit user {user.name}</h3>
        </>
    );
};
export default EditUser;