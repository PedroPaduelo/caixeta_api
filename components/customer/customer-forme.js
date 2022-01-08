import { useCallback, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  TextField
} from '@mui/material';
import { useCustumer } from '../../hooks/useCustumer';



export const CustumerForme = () => {

  const { handleCria,handleAtualiza, cliente, set_open } = useCustumer()

  const [values, setValues] = useState( cliente || {});

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const criar = useCallback(async() => {

    if(cliente){
      await handleAtualiza({
        id: cliente.id,
        nome: values.nome,
        avatar: values.avatar,
        telefone_whats: values.telefone_whats,
        cep: values.cep,
        rua: values.rua,
        bairro: values.bairro,
        cidade: values.cidade,
        numero: values.numero,
        uf: values.uf
      })
    }else{
      await handleCria({
        nome: values.nome,
        avatar: values.avatar,
        telefone_whats: values.telefone_whats,
        cep: values.cep,
        rua: values.rua,
        bairro: values.bairro,
        cidade: values.cidade,
        numero: values.numero,
        uf: values.uf
      })
    }
    
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


            {/* Nome cliente*/} 
            <Grid
              item
              md={9}
              xs={12}
            >
              <TextField
                fullWidth
                label="Nome do cliente"
                name="nome"
                onChange={handleChange}
                required
                value={values.nome}
                variant="outlined"
              />
            </Grid>

            {/* Telefone */} 
            <Grid
              item
              md={3}
              xs={12}
            >
              <TextField
                fullWidth
                required
                label="Telefone"
                name="telefone_whats"
                onChange={handleChange}
                value={values.telefone_whats}
                variant="outlined"
              />
            </Grid>




            {/* Foto do cliente*/} 
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                label="Foto do cliente"
                name="avatar"
                onChange={handleChange}
                
                value={values.avatar}
                variant="outlined"
              />
            </Grid>




            {/* cep */} 
            <Grid
              item
              md={2}
              xs={12}
            >
              <TextField
                fullWidth
                label="Cep"
                name="cep"
                onChange={handleChange}
                value={values.cep}
                variant="outlined"
              />
            </Grid>

            {/* rua */} 
            <Grid
              item
              md={5}
              xs={12}
            >
              <TextField
                fullWidth
                label="Rua"
                name="rua"
                onChange={handleChange}
                value={values.rua}
                variant="outlined"
              />
            </Grid>

            {/* Bairro */} 
            <Grid
              item
              md={3}
              xs={12}
            >
              <TextField
                fullWidth
                label="Bairro"
                name="bairro"
                onChange={handleChange}
                value={values.bairro}
                variant="outlined"
              />
            </Grid>

            {/* Cidade */} 
            <Grid
              item
              md={2}
              xs={12}
            >
              <TextField
                fullWidth
                label="Cidade"
                name="cidade"
                onChange={handleChange}
                value={values.cidade}
                variant="outlined"
              />
            </Grid>

            {/* numero */} 
            <Grid
              item
              md={2}
              xs={12}
            >
              <TextField
                fullWidth
                label="Número"
                name="numero"
                onChange={handleChange}
                value={values.numero}
                variant="outlined"
              />
            </Grid>

            {/* uf */} 
            <Grid
              item
              md={1}
              xs={12}
            >
              <TextField
                fullWidth
                label="Estado"
                name="uf"
                onChange={handleChange}
                value={values.uf}
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
            onClick={criar}
          >
            Salvar
          </Button>
        </Box>

      </Card>
    </form>
  );
};
