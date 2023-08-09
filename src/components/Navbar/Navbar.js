import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import decode from 'jwt-decode';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import memories from '../../images/memories.png';
import useStyles from './styles.js';

function Navbar() {
  const classes = useStyles();

  const { token, user } = useSelector((state) => state.auth);

  // Sign In with Google
  const dispatch = useDispatch();

  const history = useNavigate();

  const logout = () => {
    dispatch({ type: 'LOGOUT' });

    history('/');
  };

  useEffect(() => {
    if (token) {
      const decodedToken = decode(token);

      // if(decodedToken.exp * 1 < new Date().getTime()) logout();
      history('/');
    }
  }, []);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to="/"
          className={classes.heading}
          variant="h2"
          align="center"
        >
          Memories
        </Typography>
        <img
          className={classes.image}
          src={memories}
          alt="memories"
          height="60"
        />
      </div>

      <Toolbar className={classes.toolbar}>
        {token ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user?.name}
              src={user?.imageUrl}
            >
              {user?.name && user.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user?.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign in
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
