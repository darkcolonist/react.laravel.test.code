import { React, Component } from 'react';
import { BrowserRouter, Link, useHistory } from "react-router-dom";
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
  
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {/* <Routes */}
      <BrowserRouter>
        <Link to="/home">Home</Link>
        <Link to="/somewhere">clickme</Link>
        <Link to="/somewhere">clickme</Link>
      </BrowserRouter>
      <Button onClick={routeChange}>Home</Button>
      <Button>About</Button>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>xs=12</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>xs=6</Paper>
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

    </ThemeProvider>
  );
}

export default App;