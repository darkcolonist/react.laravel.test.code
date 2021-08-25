import { React, Component } from 'react';
import { BrowserRouter, Link, Route, Switch, useHistory } from "react-router-dom";
import { Button } from '@material-ui/core';
import { makeStyles, createTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AcUnitIcon from '@material-ui/icons/AcUnit';

import HomePage from '../pages/home';
import AboutPage from '../pages/about';
import TopNav from './TopNav';
import UsersPage from '../pages/users';

function App() {
  const myTheme = createTheme({
    palette: {
      // type: 'light',
      type: 'dark',

      primary: {
        // Purple and green play nicely together.
        main: '#00b599',
      },
      // secondary: {
      //   // This is green.A700 as hex.
      //   main: '#11cb5f',
      // },

    },
  });

  const useStyles = makeStyles((myTheme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: myTheme.spacing(2),
      textAlign: 'center',
      // color: myTheme.palette.text.secondary,
      // color: myTheme.palette.secondary,
      // color: '#11cb5f',
    },
  }));

  const classes = useStyles();
  
  let routeChange = () => {
    let path = `newPath`;
    let history = useHistory();
    history.push(path);
  }

  return (
    <ThemeProvider theme={myTheme}>
      <CssBaseline />
      <BrowserRouter>
        <TopNav classes={classes} />

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>xs=12</Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>xs=6</Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper} color="secondary">
              <Switch>
                <Route path="/about" component={AboutPage} />
                <Route path="/home" component={HomePage} />
                <Route path="/users" component={UsersPage} />
                <Route path="/">nothing to see here lmao</Route>
              </Switch>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>xs=3</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>xs=3</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>xs=3</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>xs=3</Paper>
          </Grid>

          <Grid item xs={2}>
            <Paper className={classes.paper}>page left nav go here</Paper>
          </Grid>

          <Grid item xs={10}>
            <Paper className={classes.paper}>page content go here</Paper>
          </Grid>
        </Grid>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;