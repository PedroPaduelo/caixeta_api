import { useCallback, useContext, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  TextField
} from '@mui/material';
import { SellItensContext } from '../../Context/SellItensContext';
import { CustumerContext } from '../../Context/CustumerContext';
import { SellContex } from '../../Context/SellContext';
import { AuthContext } from '../../Context/AuthContext';

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
  },
  {
    value: "Crediario",
    label: 'Crediario'
  }
];

export const CustonForme = () => {

  const { 
    total,
    itensSellList,
    reset_itens_sell_list,
  } = useContext(SellItensContext);

  const { 
    clientes
  } = useContext(CustumerContext);

  const { 
    set_open,
    handleCria
  } = useContext(SellContex);

  const { 
    user
  } = useContext(AuthContext);


  const [values, setValues] = useState({
    meio_pagto: 'Dinheiro',
    valor_total: total,
    id: 4,
  });



  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const Up_Insert = useCallback(async() => {
    console.log(values);

    await handleCria({
      itens: itensSellList,
      meio_pagto: values.meio_pagto,
      preco_final: values.valor_total,
      cliente: values.id,
      tipo: 'Venda',
      status_caixa: 'Aberto',
      referencia_externa: user.caixa_id,
    }, user.caixa_id);
    reset_itens_sell_list()
    set_open(false)
  },[values])

  




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
            {/* Total*/} 
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                disabled
                label="Total a pagar"
                name="valor_total"
                onChange={handleChange}
                required
                value={`R$ ${values.valor_total}`}
                variant="outlined"
              />
            </Grid>

            {/* Meio de pagamento (Select) */} 
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                label="Meio de pagamento"
                name="meio_pagto"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.meio_pagto}
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

            {/* Cliente (Select) */} 
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                label="Cliente"
                name="id"
                onChange={handleChange}
                select
                SelectProps={{ native: true }}
                value={values.id}
                variant="outlined"
              >
                {clientes.map((option) => (
                  <option
                    key={option.id}
                    value={option.id}
                  >
                    {option.nome}
                  </option>
                ))}
              </TextField>
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
            onClick={Up_Insert}
          >
            Gravar
          </Button>
        </Box>

      </Card>
    </form>
  );
};
