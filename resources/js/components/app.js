import { React, Component } from 'react';
import { BrowserRouter, Link, Route, Switch, useHistory } from "react-router-dom";
import { Button } from '@material-ui/core';
import { makeStyles, createTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
function App() {
  const darkTheme = createTheme({
    palette: {
      type: 'dark',
    },
  });

  const useStyles = makeStyles((darkTheme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: darkTheme.spacing(2),
      textAlign: 'center',
      color: darkTheme.palette.text.secondary,
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
    <ThemeProvider theme={darkTheme}>
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
            <Paper className={classes.paper}>
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