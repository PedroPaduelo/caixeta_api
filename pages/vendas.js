import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { SellProvider } from '../Context/SellContext';
import { SellItensProvider } from '../Context/SellItensContext';
import { CustumerProvider } from '../Context/CustumerContext';
import { CustonListTableSellFull } from '../components/venda/historico/CustonListTableSellFull';

import { CustonToolbarVendas } from '../components/venda/CustonToolbarVendas';
import { CustonListTableVendas } from '../components/venda/CustonListTableVendas';
import { CaixaProvider } from '../Context/CaixaContext';





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
            <CaixaProvider>
              <Container maxWidth={false}>
                <CustonToolbarVendas title="Vendas" />
                <CustonListTableVendas/>
                <CustonListTableSellFull/>
              </Container>
            </CaixaProvider>
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
