import { Box, Grid } from '@mui/material';

import { CustonListTable } from "./CustonListTable";
import { useSell } from "src/hooks/useSell";

export const CustonList = () => {



  const {handleLista, clientes, set_open, set_cliente } = useSell()

  // useEffect(() => {
    
  //   async function getUser() {
  //     try {
  //       await handleLista()
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   getUser(); 
  // }, []);





return(

  <Box sx={{ pt: 3 }}>
    <Grid
      container
      spacing={3}
    >
      {[].map((product) => (
        <Grid
          item
          key={product.id}
          lg={4}
          md={6}
          xs={12}
        >
          

        </Grid>
      ))}

      <CustonListTable/>

    </Grid>
  </Box>

  
)}

