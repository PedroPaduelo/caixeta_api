import React, {  memo } from 'react';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';


function TextComponente(props) {
  return (
    <Grid
      item
      md={props.md}
      xs={props.xs}
    >
      <Typography
        sx={props.sx}
        variant={props.variant}
      >
        {props.text}
      </Typography>
    </Grid>
  );
}

export const Text = memo(TextComponente);