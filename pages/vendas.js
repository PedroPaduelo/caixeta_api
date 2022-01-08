import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { SellProvider } from '../Context/SellContext';
import { SellItensProvider } from '../Context/SellItensContext';
import { CustumerProvider } from '../Context/CustumerContext';
import { CustonListTableSellFull } from '../components/venda/historico/CustonListTableSellFull';

const Venda = () => (
  <>
    <Head>
      <title>
        Vendas | Adega.Caixeta
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <SellProvider>
        <SellItensProvider>
          <CustumerProvider>
            <Container maxWidth={false}>
              {/* <CustonToolbar title="Vendas" />
              <CustonListTable/> */}
              <CustonListTableSellFull/>
            </Container>
          </CustumerProvider>
        </SellItensProvider>
      </SellProvider>

    </Box>
  </>
);
Venda.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Venda;
