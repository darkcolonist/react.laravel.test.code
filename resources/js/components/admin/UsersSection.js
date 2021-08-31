import { Component } from "react";
import { MenuItem, MenuList } from '@material-ui/core';
import { NavLink } from "react-router-dom";
import MUIDataTable from "mui-datatables";

class UsersSection extends Component{
  constructor(props){
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount(){
    fetch("/api/test/users")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.data
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render(){
    const { error, isLoaded, items } = this.state;
    const columns = [
      {
        "name": "hash",
        "label": "HASH"
      },
      {
        "name": "first_name",
        "label": "First Name"
      },
      {
        "name": "last_name",
        "label": "Last Name"
      },
      {
        "name": "email",
        "label": "E-Mail Address"
      }
    ];

    const data = items;
    const options = {
      filterType: 'checkbox',
    };
    if(isLoaded){
      return (
        <MUIDataTable
          title={"Employee List"}
          data={data}
          columns={columns}
          options={options}
        />
      )
    }else{
      return "please wait, loading your data...";
    }
  }
}

export default UsersSection;