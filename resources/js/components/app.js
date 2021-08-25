import { React, Component } from 'react';
import { BrowserRouter, Link, Route, Switch, useHistory } from "react-router-dom";
import { Button } from '@material-ui/core';
import { makeStyles, createTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
function App() {
  const myTheme = createTheme({
    palette: {
      // type: 'light',
      type: 'dark',

      primary: {
        // Purple and green play nicely together.
        main: '#9600aa',
      },
      secondary: {
        // This is green.A700 as hex.
        main: '#11cb5f',
      },

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
      color: '#11cb5f',
    },
  }));

  const classes = useStyles();
  
  let routeChange = () => {
    let path = `newPath`;
    let history = useHistory();
    history.push(path);
  }
  
  function AboutPage(){
    return (
      "you are in the about page"
    )
  }
  
  function HomePage(){
    return (
      "home page is here"
    )
  }

  return (
    <ThemeProvider theme={myTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Button component={Link} to="/home">Home</Button>
        <Button component={Link} to="/about">About</Button>

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
                <Route exact path="/about" component={AboutPage} />
                <Route exact path="/home" component={HomePage} />
                <Route exact path="/">nothing to see here lmao</Route>
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
        </Grid>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;