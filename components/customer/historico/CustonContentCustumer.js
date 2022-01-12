
import { Box, Fab, Grid, InputAdornment, TextField } from '@mui/material';
import PaymentIcon from '@mui/icons-material/Payment';
import { useContext, useState } from 'react';
import { CustonListTable } from './CustonListTable';
import { SellContex } from '../../../Context/SellContext';
import { PagamentoContext } from '../../../Context/PagamentoContext';
import { CustumerContext } from '../../../Context/CustumerContext';
import { AuthContext } from '../../../Context/AuthContext';
const meio_de_pg = [
  {
    value: "Dinheiro",
    label: 'Dinheiro'
  },
  {
    value: "Pix",
    label: 'Pix'
  },
  {
    value: "Cartão de Crédito",
    label: 'Cartão de Crédito'
  },
  {
    value: "Cartão de Debito",
    label: 'Cartão de Debito'
  }
];

const tipo_de_lancamentos = [
  {
    value: "Pagamento",
    label: 'Pagamento'
  },
  {
    value: "Saque",
    label: 'Saque'
  },
  {
    value: "Depósito",
    label: 'Deposito'
  }
];



export const CustonContentCustumer = () => {
  const { 
    user
  } = useContext(AuthContext);
  const { 
    totalDevedor,
    handleSumByCol
  } = useContext(SellContex);
  const { 
    handleCria
  } = useContext(PagamentoContext);
  const { 
    cliente
  } = useContext(CustumerContext);
  
  const [total_pago, stotal_pago] = useState(0);
  const [total_final, stotal_final] = useState(0);
  const [meio_de_pagamento, smeio_de_pagamento] = useState("Dinheiro");
  const [tipo_de_lancamento, stipo_de_lancamento] = useState("Pagamento");
  

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
            label="Lançamento"
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

        {/* Meio de pagamento (Select) */} 
        <Grid
          item
          md={3}
          xs={12}
        >
          <TextField
            fullWidth
            label="Meio de pagamento"
            name="meio_de_pagamento"
            
            required
            select
            SelectProps={{ native: true }}
            value={meio_de_pagamento}
            onChange={(e)=>{smeio_de_pagamento(e.target.value)}}
            variant="outlined"
          >
            
            {meio_de_pg.map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </TextField>
        </Grid>

        {/* Tipo do lançamento (Select) */} 
        <Grid
          item
          md={2}
          xs={12}
        >
          <TextField
            fullWidth
            label="Tipo do lançamento"
            name="tipo_de_lancamento"
            
            required
            select
            SelectProps={{ native: true }}
            value={tipo_de_lancamento}
            onChange={(e)=>{stipo_de_lancamento(e.target.value)}}
            variant="outlined"
          >
            
            {tipo_de_lancamentos.map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </TextField>
        </Grid>

        {/* ação */} 
        <Grid
          item
          md={1}
          xs={12}
        >
          <Fab 
            color="secondary" 
            aria-label="add"
            onClick={ async() => {

              if(total_pago !== '' && total_pago !== 0){
                await handleCria({
                  valor_pago: total_pago, 
                  id_cliente: cliente.id,
                  meio_pagto: meio_de_pagamento,
                  referencia_externa: user.caixa_id,
                  tipo_de_lancamento: tipo_de_lancamento,
                })
                await handleSumByCol(cliente.id);
                stotal_pago(0)
                stotal_final(0)
              }else{
                alert('Preencha o campo total pago')
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

