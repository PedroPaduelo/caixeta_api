import React, { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import AddIcon from '@mui/icons-material/Add';
import { Avatar, Box, Card, CardContent, Fab, Grid, InputAdornment, List, ListItem, ListItemButton, ListItemText, SvgIcon, TextField } from '@mui/material';

import { Search as SearchIcon } from '../../icons/search';
import { ProdContext } from '../../Context/ProdsContext';
import { CustonListTableLancaProd } from './CustonListTableLancaProd';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ProductEntradaModal() {
  const { handleAtualiza, 
    set_open_lanca, 
    openLanca, 
    prodsLanca, 
    handleListaLikeLanca, 
    set_sprods_lanca, 
    set_itens_lanca_list,
    handleAtualizaLotLanca,
    itensLancaList
  } = useContext(ProdContext);

 

  const [produtoPesquisa, sprodutoPesquisa] = useState("");

  const [produtoItemLanca, sprodutoItemLanca] = useState();

  const [preco_custo, spreco_custo] = useState(0);
  const [total, stotal] = useState(0);
  const [quantidade, squantidade] = useState(0);

  const handleClickOpen = () => {
    set_open_lanca(true);
  };

  const handleClose = () => {
    set_open_lanca(false);
  };

  const handleChangeProdSell = async(dado) => {
    sprodutoItemLanca(dado);
    sprodutoPesquisa(dado.descricao_prod);
    spreco_custo(dado.preco_de_custo)
    set_sprods_lanca([])
  };

  const handleChange_produtoPesquisa = async(e) => {
    sprodutoPesquisa(e.target.value);
    if(e.target.value !== ""){
      await handleListaLikeLanca(e.target.value)
    }else{
      set_sprods_lanca([])
    }
  };

  const handleChangeQtdSell = async(dado) => {
    squantidade(dado)
  };

  const handleChangeprodutoSellList = async() => {

    if(produtoItemLanca){
      set_itens_lanca_list({
        descricao_prod: produtoItemLanca.descricao_prod,
        midia: produtoItemLanca.midia,
        codigo_de_barras: produtoItemLanca.codigo_de_barras,
        id: produtoItemLanca.id,
        
        preco_de_custo: produtoItemLanca.preco_de_custo,
        preco_de_custo_new: preco_custo,

        markup: produtoItemLanca.markup,
        markup_new: produtoItemLanca.markup,

        quantidade: quantidade,
        quantidade_new: parseFloat(quantidade) +  parseFloat(produtoItemLanca.qtd_em_estoque),
        
        total: ((parseFloat(quantidade) *  parseFloat(preco_custo)).toFixed(2))
      })


      sprodutoPesquisa("")
      squantidade(0)
      stotal("0.00")
      sprodutoItemLanca()
      
      
    }else{
      alert("Selecione um produto")
    }
  };

  return (
    <>
      <Button
        sx={{ mr: 2 }}
        color="primary"
        variant="contained"
        onClick={handleClickOpen}
      >
        Entrada de produtos
      </Button>


      <Dialog
        fullScreen
        open={openLanca}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Entrada de Produto
            </Typography>

            <Button autoFocus color="inherit" onClick={async()=>{
                await handleAtualizaLotLanca(itensLancaList);
              }}
            >
              Gravar Lançamento
            </Button>
          </Toolbar>
        </AppBar>

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
                      {prodsLanca.map(produto => (
                        
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

                {/* Preço Custo */} 
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
                    required
                    label="Valor Custo"
                    value={preco_custo}
                    onChange={(e)=>{spreco_custo(e.target.value)}}
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
                    disabled
                    required
                    label="Total"
                    name="total"
                    value={ ((parseFloat(quantidade) *  parseFloat(preco_custo)).toFixed(2)) || 0}
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
                  <Fab 
                    color="primary" 
                    size="medium" 
                    aria-label="add" 
                    onClick={handleChangeprodutoSellList}
                  >
                    <AddIcon/>
                  </Fab>
                </Grid>

              </Grid>
            </CardContent>
          </Card>
        </Box>

        <CustonListTableLancaProd/>

      </Dialog>
    </>
  );
}