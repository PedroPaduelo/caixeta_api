import PropTypes from 'prop-types';
import { Avatar, Box, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import SellIcon from '@mui/icons-material/Sell';

export const ProductCard = ({ product, edit, ...rest }) => (
  <Card
    sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}
    {...rest}
    onClick={edit}
  >
    <CardContent>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          pb: 1
        }}
      >
        <Avatar
        sx={{ width: 90, height: 90 }}
          src={product.midia}
        />
      </Box>
      <Typography
        align="center"
        color="textPrimary"
        gutterBottom
        variant="body1"
      >
        {product.descricao_prod}
      </Typography>
      <Typography
        align="center"
        color="textPrimary"
        variant="body1"
      >
      </Typography>
    </CardContent>
    <Box sx={{ flexGrow: 1 }} />
    <Divider />
    <Box sx={{ p: 2 }}>
      <Grid
        container
        spacing={2}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid
          item
          sx={{
            alignItems: 'center',
            display: 'flex'
          }}
        >
          <SellIcon color="action" />
          <Typography
            color="textSecondary"
            display="inline"
            sx={{ pl: 1 }}
            variant="body2"
          >
           R$ {product.preco_de_venda}
          </Typography>
        </Grid>
        <Grid
          item
          sx={{
            alignItems: 'center',
            display: 'flex'
          }}
        >
          <Typography
            color="textSecondary"
            display="inline"
            sx={{ pl: 1 }}
            variant="body2"
          >
            {product.qtd_em_estoque}
            {' '}
            Total
          </Typography>
        </Grid>
      </Grid>
    </Box>
  </Card>
);

ProductCard.propTypes = {
  product: PropTypes.object.isRequired
};
