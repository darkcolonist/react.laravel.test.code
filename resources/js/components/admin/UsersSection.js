import { Component } from "react";
import MUIDataTable from "mui-datatables";
import DataTableOptionButtons from "./DataTableOptionButtons";
import MyAjaxModal from "../MyAjaxModal";
import EditUserForm from "./EditUserForm";

class UsersSection extends Component{
  constructor(props){
    super(props);
    this.state = {
      myModalProps: {
        open: false,
        datasource: null,
      },
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

  editButtonClicked = (args) => {
    this.setState({
      myModalProps: {
        ...this.state.myModalProps,
        open: true,
        datasource: args.datasource,
        title: args.title
      }
    });
  }

  deleteButtonClicked = (args) => {
    console.log("delete button clicked", args)
    // this.setState({
    //   myModalProps: {
    //     ...this.state.myModalProps,
    //     open: true,
    //     datasource: args.datasource,
    //     title: args.title
    //   }
    // });
  }

  modalOnClose = () => {
    this.setState({
      myModalProps: {
        ...this.state.myModalProps,
        open: false,
        datasource: null
      }
    });
  }

  render(){
    const { error, isLoaded, items } = this.state;
    var parentState = this.state;
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
      }, 
      {
        "name": "Options",
        "options": {
          filter: true,
          sort: false,
          empty: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <DataTableOptionButtons 
                theData={tableMeta} 
                editTitle={"editing " + tableMeta.rowData[1] + " " + tableMeta.rowData[2]}
                editDatasource={"/api/test/users/" + tableMeta.rowData[0]}
                editButtonClicked={this.editButtonClicked} 
                deleteTitle={"deleting " + tableMeta.rowData[1] + " " + tableMeta.rowData[2]}
                deleteDatasource={"/api/test/users/" + tableMeta.rowData[0]}
                deleteButtonClicked={this.deleteButtonClicked}
              />
            );
          }
        }
      }
    ];

    const data = items;
    const options = {
      filterType: 'checkbox',
    };
    if(isLoaded){
      return (
        <div>
          <MUIDataTable
            title={"Employee List"}
            data={data}
            columns={columns}
            options={options}
          />
          <MyAjaxModal 
            open={this.state.myModalProps.open}
            onClose={this.modalOnClose}
            datasource={this.state.myModalProps.datasource}
            title={this.state.myModalProps.title}
            content={<EditUserForm />}
          />
        </div>
      )
    }else{
      return "please wait, loading your data...";
    }
  }
}

export default UsersSection;