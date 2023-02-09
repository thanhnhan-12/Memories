import React from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutLinedIcon from '@material-ui/icons/LockOpenOutlined';

import useStyles from './styles';

function Auth() {
  const classes = useStyles();


  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutLinedIcon/>
        </Avatar>
      </Paper>
    </Container>
  )
}

export default Auth