import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Fab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useContext } from 'react';

import { ProdContext } from '../../Context/ProdsContext';



export const CustonListTableLancaProd = (props) => {

  const { 
    remove_itens_lanca_list,

    itensLancaList,
    total
   } = useContext(ProdContext);
  
  return(
    <Box sx={{ mt: 3, mb: 6 }}>
      <Card {...props}>
  
        <Box
          component="main"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap'
          }}
        >
          <CardHeader title="Itens" />
  
          
          <CardHeader title={`Total da compra: R$ ${total}`} />
        </Box>
  
        <PerfectScrollbar>
  
          <Box sx={{ minWidth: 800 }}>
            <Table>
  
              <TableHead>
                <TableRow>

                  <TableCell> Imagem </TableCell>  
                  <TableCell> Codigo de Barras </TableCell>
                  <TableCell> Descrição do produtos </TableCell>
                  <TableCell> Quantidade </TableCell>
                  <TableCell> Preço de custo</TableCell>
                  <TableCell> Preço total </TableCell>
                  <TableCell> Açoes </TableCell>
  
                </TableRow>
              </TableHead>
  
  
              <TableBody>
                {itensLancaList.map((order, i) => (
                  <TableRow
                    hover
                    key={order.id}
                  >
                    <TableCell>
                      <Avatar src={order.midia}/> 
                    </TableCell>
                    <TableCell>
                      {order.codigo_de_barras}
                    </TableCell>
                    <TableCell>
                      {order.descricao_prod}
                    </TableCell>
                    <TableCell>
                      {order.quantidade}
                    </TableCell>
                    <TableCell>
                      R$ {order.preco_de_custo_new}
                    </TableCell>
                    <TableCell>
                      R$ {order.total}
                    </TableCell>

                    <TableCell>
                      <Fab 
                        size="small" 
                        color="secondary" 
                        aria-label="add"
                        onClick={() => {
                          remove_itens_lanca_list(order, i)
                        }}
                      >
                        <DeleteForeverIcon />
                      </Fab>
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>
  
  
            </Table>
          </Box>
  
        </PerfectScrollbar>
  
      </Card>
    </Box>
  )
}


