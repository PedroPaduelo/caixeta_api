import { useCallback, useContext, useState } from 'react';
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

import { v4 as uuidv4 } from 'uuid';


export const CustonFormeAbrirCaixa = () => {

  const { 
    user,
    UpdateUser
  } = useContext(AuthContext);
   
  const { 
    handleCria,
    set_open
  } = useContext(CaixaContext);
  

  const [values, setValues] = useState({
    valor_no_caixa: 0,
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };



  




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

            {/* Total no caixa */} 
            <Grid
              item
              md={12}
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
                label="Total a pagar"
                name="valor_no_caixa"
                onChange={handleChange}
                required
                value={`${values.valor_no_caixa}`}
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
              const id = uuidv4();

              set_open(false)

              await UpdateUser({
                ...user,
                caixa_id: id,
                caixa_aberto: "Sim",
               });

              await handleCria({
                tipo: "Abrir o caixa",
                valor: values.valor_no_caixa,
                referencia_externa: id,
              });

            }}
          >
            Abrir
          </Button>
        </Box>

      </Card>
    </form>
  );
};
