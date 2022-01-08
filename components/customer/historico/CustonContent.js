
import { Box, Fab, Grid, InputAdornment, TextField } from '@mui/material';
import PaymentIcon from '@mui/icons-material/Payment';
import { useContext, useState } from 'react';
import { CustonListTable } from './CustonListTableVendas';
import { SellContex } from '../../../Context/SellContext';
import { PagamentoContext } from '../../../Context/PagamentoContext';
import { CustumerContext } from '../../../Context/CustumerContext';


export const CustonContent = () => {
  

  const { 
    totalDevedor
  } = useContext(SellContex);

  const { 
    handleCria
  } = useContext(PagamentoContext);

  const { 
    cliente
  } = useContext(CustumerContext);
  
  const [total_pago, stotal_pago] = useState(0);

  const [total_final, stotal_final] = useState(0);

  const handleChange_pago = (event) => {

    const total_finals = ( parseFloat(totalDevedor) - parseFloat(event.target.value)).toFixed(2);
    stotal_pago(event.target.value)

    if(event.target.value !== ''){
      stotal_final(total_finals)
    }else{
      stotal_final(totalDevedor)
    }
    
  };


return(

  <Box sx={{ 
    pl: 10, 
    pr: 10, 
    pb: 10, 
  }}>
    <Grid
      container
      spacing={3}
    >

      <Grid
        container
        spacing={3}
        sx={{ 
          mt:3,
        }}
      >
       
        {/* Total a pagar */} 
        <Grid
          item
          md={2}
          xs={12}
        >
          <TextField
            fullWidth
            disabled
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <p>R$</p>
                </InputAdornment>
              )
            }}
            label="Total a pagar"
            name="total_pagar"
            required
            value={totalDevedor}
            variant="outlined"
          />
        </Grid>

        {/* Total pago */} 
        <Grid
          item
          md={2}
          xs={12}
        >
          <TextField
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <p>R$</p>
                </InputAdornment>
              )
            }}
            label="Total pago"
            name="total_pago"
            onChange={handleChange_pago}
            required
            value={total_pago}
            variant="outlined"
          />
        </Grid>

        {/* Total final */} 
        <Grid
          item
          md={2}
          xs={12}
        >
          <TextField
            fullWidth
            disabled
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <p>R$</p>
                </InputAdornment>
              )
            }}
            label="Total Final"
            name="total_final"
            onChange={(e) => stotal_pago(e.target.value)}
            required
            value={total_final}
            variant="outlined"
          />
        </Grid>

        {/* ação */} 
        <Grid
          item
          md={2}
          xs={12}
        >
          <Fab 
            color="secondary" 
            aria-label="add"
            onClick={ async() => {
              if(total_pago !== '' && total_pago !== 0){
                await handleCria({valor_pago: total_pago, id_cliente: cliente.id})
              }
            }}
          >
            <PaymentIcon />
          </Fab>
        </Grid>

        
      </Grid>

      <Grid
        container
        spacing={3}
        sx={{ 
          mt:2,
        }}
      >
        
      
        <Grid
          item
          xs={12}
        >

          <CustonListTable/>
        </Grid>

      </Grid>

    </Grid>
  </Box>

  
)}

