import { Button } from '@material-ui/core';
import { NavLink } from "react-router-dom";
import AcUnitIcon from '@material-ui/icons/AcUnit';
import { Component } from 'react';

class TopNav extends Component{
  render(){

    const { classes } = this.props;

    return(
      <div>

        <Button component={NavLink} activeClassName="MuiButton-textPrimary" exact to="/"><AcUnitIcon /></Button>
        <Button component={NavLink} activeClassName="MuiButton-textPrimary" strict to="/home">Home</Button>
        <Button component={NavLink} activeClassName="MuiButton-textPrimary" strict to="/about">About</Button>
      </div>
    )
  }
}


export default TopNav;