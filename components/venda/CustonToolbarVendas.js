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
  Avatar,
  Fab
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { useContext, useState } from 'react';
import { SellItensContext } from '../../Context/SellItensContext';
import { useSell } from '../../hooks/useSell';
import { Search as SearchIcon } from '../../icons/search';
import CriaModal from './CriaModal';
import AbreCaixa from './AbreCaixa';
import { AuthContext } from '../../Context/AuthContext';
import FecharCaixa from './FecharCaixa';






export const CustonToolbarVendas = ( {title, ...props} ) => {

  const {handleListaLike, produtoslist, sprodutoslist} = useSell()
  const { set_itens_sell_list } = useContext(SellItensContext);
  const { 
    user
  } = useContext(AuthContext);


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
        quantidade_estoque: produtoSell.qtd_em_estoque,
        total: total
      })
      
      sprodutoPesquisa("")
      squantidade(0)
      stotal("0.00")
      sprodutoSell()
      
      
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
  
  
        <Box sx={{ m: 1, display: "flex" }}>

          {
            user?.caixa_aberto !== "Sim" &&
            <Box sx={{ m: 1 }}>
              <AbreCaixa/>
            </Box>
          }

          {
            user?.caixa_aberto === "Sim" &&
            <>
              <Box sx={{ m: 1 }}>
                <FecharCaixa />
              </Box>

              <Box sx={{ m: 1 }}>
                <CriaModal titulo={"Venda"}/>
              </Box>
            </>
          }
          

        </Box>

      </Box>

      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Grid
              container
              spacing={1}
              columns={16}
            >
              {/* Produto */} 
              <Grid
                item
                md={9}
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
                  md={16}
                  xs={16}
                  marginTop={2}
                  marginLeft={2}
                >
                  <List>
                    {produtoslist.map(produto => (
                      
                      <ListItem 
                        key={produto.id} 
                        disablePadding 
                        onClick={()=>{handleChangeProdSell(produto)}} 
                      >
                        <ListItemButton 
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: "100%",
                            padding: "10px"
                          }}
                        >
                          <Grid
                            item
                            xs={2}
                          >
                            <Avatar src={produto.midia }/> 
                          </Grid>
                          <Grid
                            item
                            xs={9}
                          >
                            <ListItemText primary={produto.descricao_prod}/>
                          </Grid>
                          <Grid
                            item
                            xs={1}
                          >
                            <ListItemText primary={produto.qtd_em_estoque}/>
                          </Grid>
                          
                          
                          
                        </ListItemButton>

                      </ListItem>

                    ))}
                  </List>
                </Grid>

              </Grid>

              {/* Quantidades 2*/} 
              <Grid
                item
                md={2}
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

              {/* Preço Unitario 2 */} 
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
                  disabled
                  required
                  label="Valor Unitário"
                  name="Unidade"
                  value={produtoSell?.preco_de_venda || 0}
                  variant="outlined"
                />
              </Grid>
  
              {/* Total 2*/} 
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

              {/* Adicionar 2*/} 
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
