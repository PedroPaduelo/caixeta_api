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
import { useProd } from '../../hooks/useProd';


const states = [
  {
    value: 'Ativo',
    label: 'Ativo'
  },
  {
    value: 'Inativo',
    label: 'Inativo'
  }
];

const marca = [
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

const categorias = [
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

const fornecedor = [
  {
    value: 1,
    label: 'Atacadão'
  },
  {
    value: 2,
    label: 'Coca Cola'
  },
  {
    value: 3,
    label: 'Petropólis'
  },
  {
    value: 4,
    label: 'Beiço'
  },
  {
    value: 5,
    label: 'AmBev'
  },
  {
    value: 6,
    label: 'Serra Dourada'
  },
  {
    value: 7,
    label: 'Imperio'
  },
  {
    value: 8,
    label: 'Top Gelo'
  },
  {
    value: 9,
    label: 'Guaraná Mineiro'
  }
];

const unidade = [
  {
    value: "Lata",
    label: 'Lata'
  },
  {
    value: "Litro",
    label: 'Litro'
  },
  {
    value: "Pct",
    label: 'Pct'
  },
  {
    value: "Kg",
    label: 'Kg'
  },
  {
    value: "Peça",
    label: 'Peça'
  }
];








export const ProductForme = () => {

  const { handleCria,handleAtualiza, prod, set_open } = useProd()

  const [values, setValues] = useState(
    prod ||
    {
    codigo_de_barras: '',
    categorias: 1,
    marca: 1,
    peso_liquido: '',
    peso_bruto: '',
    preco_de_custo: '',
    markup: '',
    preco_de_venda: '',
    unidade: 'Lata',
    fornecedor: 1,
    qtd_em_estoque: '',
    qtd_estoque_min: '',
    qtd_estoque_max: '',
    status: 'Ativo',
    promocao: 'Não',
    descricao_prod: '',
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const criar = useCallback(async() => {

    if(prod){
      await handleAtualiza({
        id: prod.id,
        categorias: values.categorias,
        codigo_de_barras: values.codigo_de_barras,
        descricao_prod: values.descricao_prod,
        fornecedor: values.fornecedor,
        marca: values.marca,
        markup: parseFloat(values.markup),
        midia: values.midia,
        preco_de_custo: parseFloat(values.preco_de_custo),
        preco_de_venda: ((parseFloat(values.preco_de_custo) * (parseFloat(values.markup)/100)) + parseFloat(values.preco_de_custo )).toFixed(2),
        promocao: values.promocao,
        qtd_em_estoque: parseFloat(values.qtd_em_estoque),
        qtd_estoque_max: parseFloat(values.qtd_estoque_max),
        qtd_estoque_min: parseFloat(values.qtd_estoque_min),
        status: values.status,
        unidade: values.unidade,
        descricao_prod_lowercase: values.descricao_prod.toLowerCase()
      })
    }else{
      await handleCria({
        categorias: values.categorias,
        codigo_de_barras: values.codigo_de_barras,
        descricao_prod: values.descricao_prod,
        fornecedor: values.fornecedor,
        marca: values.marca,
        markup: parseFloat(values.markup),
        midia: values.midia,
        preco_de_custo: parseFloat(values.preco_de_custo),
        preco_de_venda: ((parseFloat(values.preco_de_custo) * (parseFloat(values.markup)/100)) + parseFloat(values.preco_de_custo )).toFixed(2),
        promocao: values.promocao,
        qtd_em_estoque: parseFloat(values.qtd_em_estoque),
        qtd_estoque_max: parseFloat(values.qtd_estoque_max),
        qtd_estoque_min: parseFloat(values.qtd_estoque_min),
        status: values.status,
        unidade: values.unidade,
        descricao_prod_lowercase: values.descricao_prod.toLowerCase()
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

            {/* Codigo de Barras (Cod) */} 
            <Grid
              item
              md={2}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Código que vem no produto."
                label="Código de barras"
                name="codigo_de_barras"
                onChange={handleChange}
                value={values.codigo_de_barras}
                variant="outlined"
              />
            </Grid>

            {/* Nome do produto (Text)*/} 
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Descrição do Produto"
                name="descricao_prod"
                onChange={handleChange}
                required
                value={values.descricao_prod}
                variant="outlined"
              />
            </Grid>

            {/* Categorias do produto (Select) */} 
            <Grid
              item
              md={4}
              xs={12}
            >
              <TextField
                fullWidth
                label="Categoria"
                name="categorias"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.categorias}
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

            {/* imagem do produto (Text)*/} 
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                label="Imagem"
                name="midia"
                onChange={handleChange}
                required
                value={values.midia}
                variant="outlined"
              />
            </Grid>







            {/* Marcas do produtos (Select) */}
            <Grid
              item
              md={3}
              xs={12}
            >
              <TextField
                fullWidth
                label="Marca"
                name="marca"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.marca}
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

            {/* Fornecedor (Select) */}
            <Grid
              item
              md={3}
              xs={12}
            >
              <TextField
                fullWidth
                label="Fornecedor"
                name="fornecedor"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.fornecedor}
                variant="outlined"
              >
                
                {fornecedor.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>

            {/* Unidadoe (Select) */}
            <Grid
              item
              md={2}
              xs={12}
            >
              <TextField
                fullWidth
                label="Unidade"
                name="unidade"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.unidade}
                variant="outlined"
              >
                
                {unidade.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>







            {/* Preço de custo */}
            <Grid
              item
              md={2}
              xs={12}
            >
              <TextField
                fullWidth
                label="Preço de custo"
                name="preco_de_custo"
                onChange={handleChange}
                required
                value={values.preco_de_custo}
                variant="outlined"
              />
            </Grid>

            {/* markup */}
            <Grid
              item
              md={2}
              xs={12}
            >
              <TextField
                min="1" 
                max="100"
                fullWidth
                label="Markup"
                name="markup"
                onChange={(event) => {
                  handleChange(event)
                }}
                type='number'
                required
                value={values.markup}
                variant="outlined"
              />
            </Grid>

            {/* Preco de venda */}
            <Grid
              item
              md={2}
              xs={12}
            >
              <TextField
                fullWidth
                label="Preço de venda"
                name="preco_de_venda"
                onChange={handleChange}
                disabled
                required
                value={
                  values.markup === "" ? values.preco_de_custo 
                  :
                  ((parseFloat(values.preco_de_custo) * (parseFloat(values.markup)/100)) + parseFloat(values.preco_de_custo )).toFixed(2)
                }
                variant="outlined"
              />
            </Grid>

            

            {/* Total no estoque atual */}
            <Grid
              item
              md={2}
              xs={12}
            >
              <TextField
                fullWidth
                label="Total em estoque"
                name="qtd_em_estoque"
                onChange={handleChange}
                type="number"
                required
                value={values.qtd_em_estoque}
                variant="outlined"
              />
            </Grid>

            {/* Estoque mínimo */}
            <Grid
              item
              md={2}
              xs={12}
            >
              <TextField
                fullWidth
                label="Estoque mínimo"
                name="qtd_estoque_min"
                onChange={handleChange}
                type="number"
                required
                value={values.qtd_estoque_min}
                variant="outlined"
              />
            </Grid>

            {/* Estoque máximo */}
            <Grid
              item
              md={2}
              xs={12}
            >
              <TextField
                fullWidth
                label="Estoque máximo"
                name="qtd_estoque_max"
                onChange={handleChange}
                type="number"
                required
                value={values.qtd_estoque_max}
                variant="outlined"
              />
            </Grid>




            {/* Status Select */}
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Status"
                name="status"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.status}
                variant="outlined"
              >
                {states.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>

            {/* promocao Select */}
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Promoção"
                name="promocao"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.promocao}
                variant="outlined"
              >
                <option value="Não"> Não </option>
                <option value="Sim"> Sim </option>
                
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
            onClick={criar}
          >
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};
