import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

import { CustonFormeAbrirCaixa } from './CustonFormeAbrirCaixa';
import { CaixaContext } from '../../Context/CaixaContext';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AbreCaixa() {
 
  const { 
    open,
    set_open,
  } = useContext(CaixaContext);


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
        Abrir caixa
      </Button>


      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
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
              Abrir o caixa
            </Typography>
          </Toolbar>
        </AppBar>

        
        <CustonFormeAbrirCaixa/>
      





      </Dialog>
    </>
  );
}