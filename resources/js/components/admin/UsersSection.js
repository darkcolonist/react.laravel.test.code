import { Component } from "react";
import DataTableOptionButtons from "./DataTableOptionButtons";
import { DataGrid } from '@material-ui/data-grid';
import MyCustomDataGridToolbar from "../MyCustomDataGridToolbar";
import EditUserModalForm from "./EditUserModalForm";

class UsersSection extends Component{
  constructor(props){
    super(props);
    this.state = {
      myModalProps: {
        open: false,
        datasource: null,
        componentData: {},
        isNew: true
      },

      dgPageSize: 10,
      dgPage: 0,
      dgTotal: 0,
      dgSearch: "",
      dgSearchReady: true,

      error: null,
      isLoaded: false,
      items: []
    };
  }

  refreshDatatable(){
    let params = "?page="+this.state.dgPage
                +"&limit="+this.state.dgPageSize
                +"&search="+this.state.dgSearch;

    this.setState({ 
      isLoaded: false,
      dgSearchReady: false
    });

    fetch("/api/test/users"+params)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            dgSearchReady: true,
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
            dgSearchReady: true,
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
        isNew: false,
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


  dgNewClick = async(args) => {
    await this.setState({
      myModalProps: {
        ...this.state.myModalProps,
        open: true,
        isNew: true,
        datasource: args.datasource,
        title: args.title
      }
    });
  }

  dgSearchChange = async (keyword) => {
    await this.setState({
      dgSearch: keyword
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
        headerAlign: "center",
        align: "center",
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
          disableSelectionOnClick={true}
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
            Toolbar: MyCustomDataGridToolbar
          }}
          componentsProps={{
            toolbar: {
              handleNewClick: this.dgNewClick,
              handleSearchChange: this.dgSearchChange,
              searchReady: this.state.dgSearchReady
            }
          }}
        />

        <EditUserModalForm 
          open={this.state.myModalProps.open}
          onClose={this.modalOnClose}
          modalDataLoaded={this.modalDataLoaded}
          datasource={this.state.myModalProps.datasource}
          title={this.state.myModalProps.title}
          editSuccess={this.editSuccess}
          isNew={this.state.myModalProps.isNew}
        />
      </div>
    )
  }
}
export default UsersSection;