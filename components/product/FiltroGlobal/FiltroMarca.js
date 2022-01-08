import { Grid, TextField } from '@mui/material';
import React from 'react';

const marca = [
  {
    value: 0,
    label: ''
  },
  {
    value: 1,
    label: 'Atacadista'
  },
  {
    value: 2,
    label: 'Coca Cola'
  },
  {
    value: 3,
    label: 'Serra Dourada'
  },
  {
    value: 4,
    label: 'Império'
  },
  {
    value: 5,
    label: 'AmBev'
  },
  {
    value: 6,
    label: 'Arcon'
  },
  {
    value: 7,
    label: 'Petrópolis'
  },
  {
    value: 8,
    label: 'Campestre'
  },
  {
    value: 9,
    label: 'Brasil Kirin'
  },
  {
    value: 10,
    label: 'Golé'
  },
  {
    value: 11,
    label: 'Top Gelo'
  },
  {
    value: 12,
    label: 'Mineiro'
  },
  {
    value: 13,
    label: 'Puro Coco'
  },
  {
    value: 14,
    label: 'Life'
  }
];

export default function FiltroMarca({
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
        label="Marca"
        required
        select
        SelectProps={{ native: true }}
        value={value || ""}
        onChange={e => {
          setValue(e.target.value)
          onChange(e.target.value, "marca")
        }}
        variant="outlined"
      >
        
        {marca.map((option) => (
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


