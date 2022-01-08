import {
  Box,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon, Typography, Grid, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemText, 
  ListItemAvatar, 
  Avatar,
  Fab
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { useContext, useState } from 'react';
import { SellItensContext } from '../../Context/SellItensContext';
import { useSell } from '../../hooks/useSell';
import { Search as SearchIcon } from '../../icons/search';
import CriaModal from './CriaModal';






export const CustonToolbar = ( {title, ...props} ) => {

  const {handleListaLike, produtoslist, sprodutoslist} = useSell()
  const { set_itens_sell_list } = useContext(SellItensContext);


  const [produtoPesquisa, sprodutoPesquisa] = useState("");
  const [produtoSell, sprodutoSell] = useState();
  const [total, stotal] = useState(0);
  const [quantidade, squantidade] = useState(0);
  

  const handleChange_produtoPesquisa = async(e) => {
    sprodutoPesquisa(e.target.value);
    if(e.target.value !== ""){
      await handleListaLike(e.target.value)
    }else{
      sprodutoslist([])
    }
  };

  const handleChangeProdSell = async(dado) => {
    sprodutoSell(dado);
    sprodutoPesquisa(dado.descricao_prod);
    sprodutoslist([])
  };

  const handleChangeQtdSell = async(dado) => {
    squantidade(dado);
    stotal((dado *  parseFloat(produtoSell.preco_de_venda)).toFixed(2));
  };

  const handleChangeprodutoSellList = async() => {

    if(produtoSell){
      sprodutoPesquisa("")
      squantidade(0)
      stotal("0.00")
      sprodutoSell()
      
      set_itens_sell_list({
        categorias: produtoSell.categorias,
        codigo_de_barras: produtoSell.codigo_de_barras,
        descricao_prod: produtoSell.descricao_prod,
        fornecedor: produtoSell.fornecedor,
        id: produtoSell.id,
        marca: produtoSell.marca,
        markup: produtoSell.markup,
        midia: produtoSell.midia,
        preco_de_custo: produtoSell.preco_de_custo,
        preco_de_venda: produtoSell.preco_de_venda,
        promocao: produtoSell.promocao,
        unidade: produtoSell.unidade,
        quantidade: quantidade,
        total: total
      })
    }else{
      alert("Selecione um produto")
    }
  };


  return (
    <Box {...props}>

      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          m: -1
        }}
      >
        <Typography
          sx={{ m: 1 }}
          variant="h4"
        >
          {title}
        </Typography>
  
  
        <Box sx={{ m: 1 }}>
          <CriaModal titulo={"Venda"}/>
        </Box>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
  
            <Grid
              container
              spacing={2}
            >

              {/* Produto */} 
              <Grid
                item
                md={7}
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




                <Grid
                  item
                  md={12}
                  xs={12}
                  marginTop={2}
                  marginLeft={2}
                >
                  <List>
                    {produtoslist.map(produto => (
                      
                      <ListItem key={produto.id} disablePadding onClick={()=>{handleChangeProdSell(produto)}} >
                        <ListItemAvatar>
                          <Avatar src={produto.midia }/> 
                        </ListItemAvatar>

                        <ListItemButton>
                          <ListItemText primary={produto.descricao_prod }/>
                        </ListItemButton>
                      </ListItem>

                    ))}
                  </List>
                </Grid>

              </Grid>

              {/* Quantidades */} 
              <Grid
                item
                md={1}
                xs={12}
              >
                <TextField
                  fullWidth
                  required
                  label="Quantidade"
                  name="quantidade"
                  value={quantidade}
                  onChange={(e)=>{handleChangeQtdSell(e.target.value)}}
                  variant="outlined"
                />
              </Grid>

              {/* Preço Unitario */} 
              <Grid
                item
                md={1}
                xs={12}
              >
                <TextField
                  fullWidth
                  required
                  label="Unidade"
                  name="Unidade"
                  value={produtoSell?.preco_de_venda || 0}
                  variant="outlined"
                />
              </Grid>
  
              {/* Total */} 
              <Grid
                item
                md={2}
                xs={12}
              >
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <p>R$</p>
                      </InputAdornment>
                    )
                  }}
                  fullWidth
                  required
                  label="Total"
                  name="total"
                  value={total}
                  onChange={(e)=>{stotal(e.target.value)}}
                  variant="outlined"
                />
              </Grid>

              {/* Adicionar */} 
              <Grid
                item
                md={1}
                xs={12}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
              >
                
                <Fab color="primary" size="medium" aria-label="add" onClick={handleChangeprodutoSellList}>
                  <AddIcon />
                </Fab>
              </Grid>
              
            </Grid>
          </CardContent>
        </Card>
      </Box>

    
    </Box>
  )

}
