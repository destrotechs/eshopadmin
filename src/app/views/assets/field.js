import React, { useEffect,useState } from "react";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { setDayWithOptions } from "date-fns/fp";
import { Grid,Box, Button, Fab, Icon, IconButton, styled,useTheme,Alert,Snackbar, FormControl, InputLabel, NativeSelect, MenuItem, Select } from '@mui/material';
import CurrencyFormatter from "./currency";
import axios from "axios.js";

function Field({field_type,span,id,value=null,onChange,name,source={}}){
    const [sourcedata,setSourcedata] = useState([]);
    
    const fetchData = async (url)=> {
        if(url){
            const response = await axios.get(url);
            if(response.status===200){
                setSourcedata(response.data.data);
            }
        }else{
            return null;
        }
        
    }
    useEffect(() => {
        // Fetch data from the sourceUrl and update the state
        fetchData(source.url)
      }, []);

    if(field_type==='text'){
        return(
            <Grid item xs={12} sm={4} md={span}>
            <TextField fullWidth 
                id="outlined-basic" 
                label={id} 
                variant="outlined" 
                sx={{ m: 1}} 
                value={value || ''}
                onChange={(e) => onChange(name, e.target.value)}
                />
            </Grid>
        )
    }
    else if(field_type==='file'){
        
        return(
            <Grid item xs={12} sm={4} md={span}>
            <TextField fullWidth 
                id="outlined-basic" 
                label={id} 
                variant="outlined" 
                type="file"
                inputProps={{ accept: '.jpg, .jpeg, .png' }}
                sx={{ m: 1}} 
                value={value || ''}
                onChange={(e) => onChange(name, e.target.value)}
                
                />
            </Grid>
        )
    }
    else if(field_type==='select'){
        return(

                <Grid item xs={12} sm={4} md={span} className="mt-2">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">{id}</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label={id}
                      value={value || ''}
                        onChange={(e) => onChange(name, e.target.value)}
                
                    >
                       {sourcedata.map((data,index)=>(
                        <MenuItem key={index} value={data[source.value]}>{data[source.name]}</MenuItem>

                        ))} 
                      </Select>
                  </FormControl>
               
                </Grid>

        )
    }
    return null;
}
export default Field;