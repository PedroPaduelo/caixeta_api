import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { ProductForme } from './product-forme';
import { useProd } from '../../hooks/useProd';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ProductCriaModal() {
  const { set_open, open } = useProd()



  const handleClickOpen = () => {
    set_open(true);
  };

  const handleClose = () => {
    set_open(false);
  };

  return (
    <>
      <Button
        color="primary"
        variant="contained"
        onClick={handleClickOpen}
      >
        Criar produtos
      </Button>


      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Criar Produto
            </Typography>
          </Toolbar>
        </AppBar>



        <ProductForme />


      </Dialog>
    </>
  );
}