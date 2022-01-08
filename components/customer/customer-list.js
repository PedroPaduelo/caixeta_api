import { CustomerCard } from "./customer-card";
import { Box, Grid } from '@mui/material';
import { useEffect } from "react";
import { useCustumer } from "../../hooks/useCustumer";

export const CustomerProd = () => {



  const {handleLista, clientes, set_open, set_cliente } = useCustumer()

  useEffect(() => {
    
    async function getUser() {
      try {
        await handleLista()
      } catch (error) {
        console.log(error);
      }
    }
    getUser(); 
  }, []);





return(

  <Box sx={{ pt: 3 }}>
    <Grid
      container
      spacing={3}
    >
      {clientes.map((product) => (
        <Grid
          item
          key={product.id}
          lg={4}
          md={6}
          xs={12}
        >
          <CustomerCard product={product} edit={()=>{
            set_open(true) 
            set_cliente(product)
          } } />
        </Grid>
      ))}
    </Grid>
  </Box>

  
)}

