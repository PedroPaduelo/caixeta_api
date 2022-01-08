import { Grid, TextField } from '@mui/material';
import React from 'react';

const categorias = [
  {
    value: 0,
    label: ''
  },
  {
    value: 7,
    label: 'Tabacaria'
  },
  {
    value: 8,
    label: 'Alcoólicos'
  },
  {
    value: 9,
    label: 'Não Alcoílicos'
  },
  {
    value: 10,
    label: 'Mercearia'
  }
];

export default function FiltroCat({
  onChange,
}) {

  const [value, setValue] = React.useState("")
 
  return (

    <Grid
      item
      md={3}
      xs={12}
    >

      <TextField
        fullWidth
        label="Categoria"
        required
        select
        SelectProps={{ native: true }}
        value={value || ""}
        onChange={e => {
          setValue(e.target.value)
          onChange(e.target.value, "categorias")
        }}
        variant="outlined"
      >
        
        {categorias.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </TextField>

    </Grid>

  )
}


