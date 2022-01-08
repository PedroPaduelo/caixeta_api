import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { CustomerListToolbar } from '../components/customer/customer-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { CustumerProvider } from '../Context/CustumerContext';
import { CustomerProd } from '../components/customer/customer-list';
import { SellProvider } from '../Context/SellContext';
import { PagamentoProvider } from '../Context/PagamentoContext';

const Customers = () => (
  <>
    <Head>
      <title>
        Clientes | Adega.Caixeta
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <CustumerProvider>
        <SellProvider>
          <PagamentoProvider>

            <Container maxWidth={false}>
              <CustomerListToolbar />
              
              <CustomerProd/>
            </Container>

          </PagamentoProvider>
        </SellProvider>
      </CustumerProvider>

    </Box>
  </>
);
Customers.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Customers;
