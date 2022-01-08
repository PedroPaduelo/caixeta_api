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
import { useContext, useEffect, useMemo } from 'react';
import { SellContex } from 'src/Context/SellContext';



export const CustonListTableSellFull = (props) => {
  const { 
    vendas,
    totalSell,
    handleSumFull,
    handleLista,
    handleDeleta
  } = useContext(SellContex);

  
  useEffect(() => {
    
    async function getUser() {
      try {
        await handleSumFull()
        await handleLista()

      } catch (error) {
        console.log(error);
      }
    }
    getUser(); 
  }, []);










  return(
    <Box sx={{ mt: 3 }}>
      <Card {...props}>
  
        <Box
          component="main"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap'
          }}
        >
          <CardHeader title="Vendas" />
          <CardHeader title={`Total vendido: R$ ${totalSell || 0.00}`} />
        </Box>
  
        <PerfectScrollbar>
  
          <Box sx={{ minWidth: 800 }}>
            <Table>
  




              <TableHead>
                <TableRow>

                  <TableCell> ID </TableCell>  
                  <TableCell> Tipo </TableCell>
                  <TableCell> Itens </TableCell>
                  <TableCell> Preço </TableCell>
                  <TableCell> Meio de pagamento </TableCell>
                  <TableCell> Açoes </TableCell>
  
                </TableRow>
              </TableHead>
  
  




              <TableBody>
                {vendas.map((order, i) => (
                  <TableRow
                    key={i}
                    hover
                    key={order.id}
                  >
                    <TableCell>
                      {order.id}
                    </TableCell>

                    <TableCell>
                      {order.tipo}
                    </TableCell>

                    <TableCell>
                      {order.itens.map((item, i) => (
                        <Box
                          key={item.id}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                          }}
                        >
                        {item.quantidade} X {item.descricao_prod}
                        </Box>
                      ))}
                    </TableCell>

                    <TableCell>
                      R$ {order.preco_final}
                    </TableCell>

                    <TableCell>
                      {order.meio_pagto}
                    </TableCell>

                    <TableCell>
                      <Fab 
                        size="small" 
                        color="secondary" 
                        aria-label="add"
                        onClick={ async() => {
                          await handleDeleta(order.id)
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


