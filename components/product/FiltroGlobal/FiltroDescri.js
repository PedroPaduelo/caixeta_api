import { Grid, InputAdornment, SvgIcon, TextField } from '@mui/material';
import React, { useContext } from 'react';
import { ProdContext } from '../../../Context/ProdsContext';
import { Search as SearchIcon } from '../../../icons/search';


export default function FiltroDescri() {

  const [produtoPesquisa, sprodutoPesquisa] = React.useState("")

  const { 
    handleListaLike,
    handleLista
  } = useContext(ProdContext);

  const handleChange_produtoPesquisa = async(e) => {
    sprodutoPesquisa(e.target.value);
    if(e.target.value !== ""){
      await handleListaLike(e.target.value)
    }else{
      await handleLista()
    }
  };

 
  return (

    <Grid
      item
      md={5}
      xs={12}
    >

      <TextField
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SvgIcon
                color="action"
                fontSize="small"
              >
                <SearchIcon />
              </SvgIcon>
            </InputAdornment>
          )
        }}
        label="Produto"
        name="produto"
        value={produtoPesquisa}
        onChange={handleChange_produtoPesquisa}
        required
        variant="outlined"
      />

    </Grid>

  )
}


