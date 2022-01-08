import Head from 'next/head';
import { Box, Container, Grid, Pagination } from '@mui/material';
import { ProductListToolbar } from '../components/product/product-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { ListProd } from '../components/product/product-list';
import { ProdsProvider } from '../Context/ProdsContext';

const Products = () => (
  <>

  
    <Head>
      <title>
        Produtos | Adega.Caixeta
      </title>
    </Head>
    
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <ProdsProvider>
        <Container maxWidth={false}>
          <ProductListToolbar />
          <ListProd/>
        </Container>
      </ProdsProvider>
      
    </Box>


  </>
);

Products.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Products;
