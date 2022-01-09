import { useContext, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@mui/material';
import { AuthContext } from '../../Context/AuthContext';

const user_tipo = [
  {
    value: 1,
    label: 'Adiministrador'
  },
  {
    value:  2,
    label: "Vendedor"
  }
];

export const AccountProfileDetails = (props) => {
  const { 
    user
  } = useContext(AuthContext);

  const [values, setValues] = useState(user);

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
      {...props}
    >
      <Card>
        <CardHeader
          title="Dados do Usuário"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Porfavor coloque seu primeiro nome"
                label="Primeiro Nome"
                name="user_fist_name"
                onChange={handleChange}
                required
                value={values?.user_fist_name}
                variant="outlined"
              />
            </Grid>


            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Ultimo Nome"
                name="user_last_name"
                onChange={handleChange}
                required
                value={values?.user_last_name}
                variant="outlined"
              />
            </Grid>


            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email"
                name="user_email"
                onChange={handleChange}
                required
                value={values?.user_email}
                variant="outlined"
              />
            </Grid>


            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Senha"
                name="user_password"
                onChange={handleChange}
                value={values?.user_password}
                variant="outlined"
              />
            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Tipo de Usuário"
                name="user_tipo"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values?.user_tipo}
                variant="outlined"
              >
                {user_tipo.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
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
          >
            Salvar
          </Button>
        </Box>
      </Card>
    </form>
  );
};
