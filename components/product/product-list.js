import { ProductCard } from "./product-card";
import { Box, Grid } from '@mui/material';
import { useEffect } from "react";
import { useProd } from "src/hooks/useProd";

export const ListProd = () => {



  const {handleLista, prods, set_open, set_sprod } = useProd()

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
      {prods.map((product) => (
        <Grid
          item
          key={product.id}
          lg={4}
          md={6}
          xs={12}
        >
          <ProductCard product={product} edit={()=>{
            set_open(true) 
            set_sprod(product)
          } } />
        </Grid>
      ))}
    </Grid>
  </Box>

  
)}

