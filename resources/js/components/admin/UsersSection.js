import { Component } from "react";
import DataTableOptionButtons from "./DataTableOptionButtons";
import MyAjaxModal from "../MyAjaxModal";
import EditUserForm from "./EditUserForm";
import { DataGrid } from '@material-ui/data-grid';

class UsersSection extends Component{
  constructor(props){
    super(props);
    this.state = {
      myModalProps: {
        open: false,
        datasource: null,
        componentData: {}
      },

      dgPageSize: 10,

      error: null,
      isLoaded: false,
      items: []
    };
  }

  refreshDatatable(){
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

  componentDidMount(){
    this.refreshDatatable();
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
    // console.log("userssection", "modal closed");

    this.setState({
      myModalProps: {
        ...this.state.myModalProps,
        open: false,
        datasource: null,
        componentData: {}
      }
    });
  }

  editSuccess = (args) => {
    console.log("userssection", "save success", args);
    this.refreshDatatable();
  }

  modalDataLoaded = (componentData) => {
    // console.log("modal completed loading...", componentData)

    this.setState({
      myModalProps: {
        ...this.state.myModalProps,
        componentData
      }
    });
  }

  render(){
    const { error, isLoaded, items } = this.state;
    const columns = [
      {
        field: "first_name",
        headerName: "First Name",
        flex: 2
      }
      ,{
        field: "last_name",
        headerName: "Last Name",
        flex: 2
      }
      ,{
        field: "email",
        headerName: "Email",
        flex: 2
      }
      ,{
        field: "options",
        headerName: "Options",
        sortable: false,
        flex: 1,
        disableColumnMenu: true,
        renderCell: (params) => {
          const row = params.row;

          return (
            <DataTableOptionButtons
              theData={row}
              editTitle={"edit " + row.first_name}
              editDatasource={"/api/test/users/" + params.id}
              editButtonClicked={this.editButtonClicked}
              deleteTitle={"deleting " + row.first_name}
              deleteDatasource={"/api/test/users/" + params.id}
              deleteButtonClicked={this.deleteButtonClicked}
            />
          );
        }
      }
    ];

    const data = items;
    if(isLoaded){
      return (
        <div style={{ height: 455, width: '100%' }}>
          <DataGrid 
            density={"compact"}
            getRowId={(r) => r.hash}
            rows={data}
            columns={columns}
            pageSize={this.state.dgPageSize}
            onPageSizeChange={(newPageSize) => this.setState({ dgPageSize: newPageSize})}
            rowsPerPageOptions={[5, 10, 20]}
          />
          <MyAjaxModal 
            open={this.state.myModalProps.open}
            onClose={this.modalOnClose}
            modalDataLoaded={this.modalDataLoaded}
            datasource={this.state.myModalProps.datasource}
            title={this.state.myModalProps.title}
            content={
              <EditUserForm componentData={this.state.myModalProps.componentData}
                editSuccess={this.editSuccess}
                close={this.modalOnClose}
              />
            }
          />
        </div>
      )
    }else{
      return "please wait, loading your data...";
    }
  }
}

export default UsersSection;