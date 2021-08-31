import { Component } from "react";
import { MenuItem, MenuList } from '@material-ui/core';
import { NavLink } from "react-router-dom";

class LeftMenu extends Component{
  render(){
    return (
      <MenuList>
        <MenuItem component={NavLink} to="/admin/none">Load Nothing</MenuItem>
        <MenuItem component={NavLink} to="/admin/users">Load Users</MenuItem>
      </MenuList>
    )
  }
}

export default LeftMenu;