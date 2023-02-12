import React, { useEffect, useState } from "react";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import decode from 'jwt-decode'
import useStyles from "./styles.js";
import memories from "../../images/memories.png";

function Navbar() {
  const classes = useStyles();

  const {token, user} = useSelector((state) => state.auth);


  // Sign In with Google
  const dispatch = useDispatch();

  const history = useNavigate();

  const location = useLocation();

  const logout = () => {
    dispatch({ type: 'LOGOUT' });

    history('/');
  }

  useEffect(() => {

    if(token) {
      const decodedToken = decode(token);
      
      // if(decodedToken.exp * 1 < new Date().getTime()) logout();
      history("/")
    }
  }, []);


  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">
          Memories
        </Typography>
        <img
          className={classes.image}
          src={memories}
          alt="memories"
          height="60"
        />
      </div>

      <Toolbar className={classes.toolbar} >
        {token ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user?.name} src={user?.imageUrl}>{user?.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant="h6">{user?.name}</Typography>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">Sign in</Button>
        ) } 
      </Toolbar>

    </AppBar>
  );
}

export default Navbar;
