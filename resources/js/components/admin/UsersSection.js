import { Component } from "react";
import DataTableOptionButtons from "./DataTableOptionButtons";
import MyAjaxModal from "../MyAjaxModal";
import EditUserForm from "./EditUserForm";
import { DataGrid, GridToolbarContainer } from '@material-ui/data-grid';
import { Button, TextField } from "@material-ui/core";
import { Add, Search } from "@material-ui/icons";

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
      dgPage: 0,
      dgTotal: 0,
      dgSearch: "",

      error: null,
      isLoaded: false,
      items: []
    };
  }

  refreshDatatable(){
    let params = "?page="+this.state.dgPage
                +"&limit="+this.state.dgPageSize
                +"&search="+this.state.dgSearch;

    this.setState({ isLoaded: false });

    fetch("/api/test/users"+params)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.data,
            dgTotal: result.total
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


  dgNewClick = async(props) => {
    console.log(props);
  }

  dgSearchChange = async(props) => {
    await this.setState({
      dgSearch: props.target.value
    })
    this.refreshDatatable();
  }

  async dgPageSizeChange(newPageSize){
    await this.setState({ 
      dgPageSize: newPageSize 
    });
    this.refreshDatatable();
  }

  async dgPageChange(newPage){
    await this.setState({
      dgPage: newPage
    });
    this.refreshDatatable();
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
    // console.log("userssection", "save success", args);
    this.refreshDatatable();
  }

  modalDataLoaded = (componentData) => {
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
    
    return (
      <div style={{ height: 500, width: '100%' }}>
        <DataGrid 
          density={"compact"}
          getRowId={(r) => r.hash}
          rows={data}
          rowCount={this.state.dgTotal}
          columns={columns}
          pageSize={this.state.dgPageSize}
          onPageSizeChange={(newPageSize) => this.dgPageSizeChange(newPageSize)}
          onPageChange={(newPage) => this.dgPageChange(newPage)}
          rowsPerPageOptions={[5, 10, 20]}
          paginationMode={"server"}
          loading={!this.state.isLoaded}
          components={{
            Toolbar: MyCustomToolbar
          }}
          componentsProps={{
            toolbar: {
              handleNewClick: this.dgNewClick,
              handleSearchChange: this.dgSearchChange
            }
          }}
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
  }
}

class MyCustomToolbar extends Component{
  render(){
    return (
      <GridToolbarContainer>
        <Button onClick={(clickProps) => { this.props.handleNewClick(clickProps) }}
        ><Add /> New User</Button>
        <TextField
          onChange={(searchProps) => { this.props.handleSearchChange(searchProps) }}
          InputProps={{
            endAdornment: <Search />
          }}
        />
      </GridToolbarContainer>
    );
  }
}

export default UsersSection;