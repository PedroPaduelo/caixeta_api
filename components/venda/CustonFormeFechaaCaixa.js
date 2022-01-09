import { useCallback, useContext, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  InputAdornment,
  TextField
} from '@mui/material';
import { AuthContext } from '../../Context/AuthContext';
import { CaixaContext } from '../../Context/CaixaContext';
import { SellContex } from '../../Context/SellContext';


export const CustonFormeFechaaCaixa = () => {

  const { 
    user,
    UpdateUser
  } = useContext(AuthContext);

  
   
  const { 
    handleCria,
    set_open,
    dinheiro,
    debito,
    credito,
    pix,
    handleAtualizaVendas,
  } = useContext(CaixaContext);
  

  const { 
    vendas
  } = useContext(SellContex);




  




  return (
    <form
      autoComplete="off"
      noValidate
    >
      <Card>
        
        <CardContent>

          <Grid
            container
            spacing={2}
          >
            {/* Usuario atual */} 
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                disabled
                label="Total a pagar"
                name="email"
                required
                value={`${user?.user_email}`}
                variant="outlined"
              />
            </Grid>




            {/* Dinheiro */} 
            <Grid
              item
              md={12}
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
                label="Total em Dinheiro"
                name="Dinheiro"
                required
                value={`${dinheiro}`}
                variant="outlined"
              />
            </Grid>

            {/* Total no Debito */} 
            <Grid
              item
              md={12}
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
                label="Total em Debito"
                name="Debito"
                required
                value={`${debito}`}
                variant="outlined"
              />
            </Grid>

            {/* Total no Credito */} 
            <Grid
              item
              md={12}
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
                label="Total em credito"
                name="credito"
                required
                value={`${credito}`}
                variant="outlined"
              />
            </Grid>

            {/* Total no pix */} 
            <Grid
              item
              md={12}
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
                label="Total em Pix"
                name="Pix"
                required
                value={`${pix}`}
                variant="outlined"
              />
            </Grid>





          </Grid>

        </CardContent>

        <Divider />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            color="primary"
            variant="contained"
            onClick={ async() => {
              
              await handleCria({
                tipo: "Fechar o Caixa ",
                valor: (parseFloat(dinheiro) + parseFloat(debito) + parseFloat(credito) + parseFloat(pix)),
                referencia_externa: user?.caixa_id,
              });

              set_open(false);

              await UpdateUser({
                ...user,
                caixa_id: 0,
                caixa_aberto: "Não",
              });

              await handleAtualizaVendas(vendas)

              

          
            }}
          >
            Fechar o Caixa
          </Button>
        </Box>

      </Card>
    </form>
  );
};
