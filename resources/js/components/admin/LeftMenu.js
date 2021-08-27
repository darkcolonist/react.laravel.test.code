import { Component } from "react";
import { MenuItem, MenuList } from '@material-ui/core';

class LeftMenu extends Component{
  render(){
    return (
      <MenuList>
        <MenuItem>Load Users</MenuItem>
        <MenuItem>Load Nothing</MenuItem>
      </MenuList>
    )
  }
}

export default LeftMenu;