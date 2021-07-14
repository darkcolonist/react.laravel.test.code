import React, { useState } from "react";
import { Button } from '@material-ui/core';
import { makeStyles, ThemeProvider, createTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

export interface IUser {
    name: string;
    age: number;
}

const App = () => {
    const [users, setUsers] = useState<IUser[]>([
        {
            name: "Bijaya",
            age: 25,
        },
        {
            name: "Ram",
            age: 25,
        },
    ]);

    const palletType = "dark";
    const darkTheme = createTheme({
        palette: {
            type: palletType,
        }
    });

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    }));

    const classes = useStyles();

    return (
        <ThemeProvider theme={darkTheme}>
          <div>
            <div className={classes.root}>
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
            </div>

            <h1>Users list</h1>
            <ul>
                {users.map((user: IUser) => {
                    return (
                        <li key={user.name}>
                            {user.name} is {user.age} years old
                            <Button color="primary">Hello World</Button>
                        </li>
                    );
                })}
            </ul>
          </div>
        </ThemeProvider>
    );
};

export default App;