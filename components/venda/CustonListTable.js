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


import { SellItensContext } from 'src/Context/SellItensContext';



export const CustonListTable = (props) => {

  const { 
    remove_itens_sell_list,

    itensSellList,
    total
   } = useContext(SellItensContext);
  
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
                  <TableCell> Preço total </TableCell>
                  <TableCell> Açoes </TableCell>
  
                </TableRow>
              </TableHead>
  
  
              <TableBody>
                {itensSellList.map((order, i) => (
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
                      R$ {order.total}
                    </TableCell>

                    <TableCell>
                      <Fab 
                        size="small" 
                        color="secondary" 
                        aria-label="add"
                        onClick={() => {
                            remove_itens_sell_list(order, i)
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


