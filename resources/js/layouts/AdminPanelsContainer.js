import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Component } from "react";
import { MenuItem, MenuList } from '@material-ui/core';
import LeftMenu from '../components/admin/LeftMenu';

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
          <Paper className={classes.paper}>page content go here</Paper>
        </Grid>
      </Grid>
    )
  }
}

export default AdminPanelsContainer;