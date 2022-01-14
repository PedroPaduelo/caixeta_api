import React, {  memo, useState } from 'react';
import { Grid, TextField } from '@mui/material';


function ImputComponente(props) {
  const [values, setValues] = useState({
    [props.name]: ""
  });

  

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };














  
  return (
    <Grid
      item
      md={props.md}
      xs={props.xs}
    >
      <TextField
        sx={props.sx}
        label={props.label}
        helperText={values[props.name]}

        name={props.name}
        value={values[props.name] || ''}
        onChange={handleChange}
        
        fullWidth
        variant="outlined"
      />
    </Grid>
  
  );
}

export const Imput = memo(ImputComponente);