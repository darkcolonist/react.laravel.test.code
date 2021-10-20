import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Component } from "react";
import { MenuItem, MenuList } from '@material-ui/core';
import LeftMenu from '../components/admin/LeftMenu';
import { Route, Switch } from 'react-router-dom';
import UsersSection from '../components/admin/UsersSection';
import DataGridTestSection from '../components/admin/DataGridTestSection';

class AdminPanelsContainer extends Component{
  render(){
    const { classes } = this.props;

    return (
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <Paper className={classes.paper}>
            <LeftMenu />
          </Paper>
        </Grid>

        <Grid item xs={10}>
          <Paper className={classes.paper}>
            <Switch>
              <Route path="/admin/users">
                <UsersSection />
              </Route>
              <Route exact path="/admin">
                starting admin landing page
              </Route>
              <Route path="/admin/datagridtest">
                <DataGridTestSection />
              </Route>
              <Route>
                non-existent page
              </Route>
            </Switch>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default AdminPanelsContainer;