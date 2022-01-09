import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { SellProvider } from '../Context/SellContext';
import { SellItensProvider } from '../Context/SellItensContext';
import { CustumerProvider } from '../Context/CustumerContext';
import { CustonListTableSellFull } from '../components/venda/historico/CustonListTableSellFull';

import { CustonToolbarVendas } from '../components/venda/CustonToolbarVendas';
import { CustonListTableVendas } from '../components/venda/CustonListTableVendas';
import TabelaFilter from '../components/venda/historico/TabelaFilter';
import { CaixaProvider } from '../Context/CaixaContext';


const header = [
  {
    Header: 'Method',
    accessor: 'api_method',
    align: "left",
  },

  {
    Header: 'Titulo',
    accessor: 'api_titulo',
    align: "left"
  },

  {
    Header: 'Path',
    accessor: 'api_path',
    align: "left",
  },

  {
    Header: 'ações',
    accessor: 'pendentes',
    align: "center",
  }
]

const headerHides = [
  'created_at',
  'updated_at',
]




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
