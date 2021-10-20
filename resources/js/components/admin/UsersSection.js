import { Component } from "react";
import DataTableOptionButtons from "./DataTableOptionButtons";
import { DataGrid } from '@material-ui/data-grid';
import MyCustomDataGridToolbar from "../MyCustomDataGridToolbar";
import EditUserModalForm from "./EditUserModalForm";
import api from "../../helpers/apisauce";
import MySnackbar from "../../helpers/mysnackbar";

class UsersSection extends Component{
  defaultState = {
    myEditModalProps: {
      open: false,
      hash: null,
      title: "edit modal"
    },

    dgPageSize: 10,
    dgPage: 0,
    dgTotal: 0,
    dgSearch: "",
    dgSearchReady: true,
    dgSort: {},

    notifyOpen: false,
    notifyMessage: "",
    notifySeverity: "info",

    error: null,
    isLoaded: false,
    items: []
  };

  constructor(props){
    super(props);
    this.state = this.defaultState;
  }

  refreshDatatable(){
    let params = "?page="+this.state.dgPage
                +"&limit="+this.state.dgPageSize
                +"&search="+this.state.dgSearch;

    if (this.state.dgSort !== undefined 
      && this.state.dgSort.field !== undefined){
      params += "&order[field]=" + this.state.dgSort["field"] 
        + "&order[sort]=" + this.state.dgSort["sort"];
    }

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

  dgNewClick = async(args) => {
    await this.setState({
      myEditModalProps: {
        ...this.state.myEditModalProps,
        open: true,
        title: args.title,
        hash: "new"
      }
    });
  }


  editButtonClicked = (args) => {
    this.setState({
      myEditModalProps: {
        ...this.state.myEditModalProps,
        open: true,
        hash: args.model.hash,
        title: args.title
      }
    });
  }

  notifyClosed = () => {
    this.setState({
      notifyOpen: false
    });
  }

  deleteButtonClicked = async (args) => {
    let hash = args.model.hash;
    let results = await api.delete('/api/test/users/' + hash);

    let name = results.data.data.model.first_name 
      ? results.data.data.model.first_name
      : "";


    this.setState({
      notifyOpen: true,
      notifyMessage: "deleted " + name
    });

    this.refreshDatatable();
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

  dgSortChange = async (model) => {
    let dgSort = model[0];
    let dgPage = 0; // when sort is changed, always return to first page
    
    if(JSON.stringify(dgSort) !== JSON.stringify(this.state.dgSort)){
      // console.log("new sort", dgSort);

      await this.setState({
        dgSort,
        dgPage
      });
      this.refreshDatatable();
    }
  }

  modalOnClose = () => {
    // console.log("userssection", "modal closed");

    this.setState({
      myEditModalProps: {
        ...this.state.myEditModalProps,
        open: false,
        datasource: null,
        hash: undefined
      }
    });
  }

  editSuccess = (args) => {
    // console.log("userssection", "save success", args);
    this.refreshDatatable();
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
              // editDatasource={"/api/test/users/" + params.id}
              editButtonClicked={this.editButtonClicked}
              deleteTitle={"deleting " + row.first_name}
              // deleteDatasource={"/api/test/users/" + params.id}
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
          paginationMode={"server"}

          /**
           * sorting mode doesn't work for now because when you enable
           * it, it will infinite loop as you setState. needs more 
           * research
           */
          onSortModelChange={this.dgSortChange}
          sortingMode={"server"}

          rowsPerPageOptions={[5, 10, 20]}
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

        <MySnackbar
          open={this.state.notifyOpen}
          message={this.state.notifyMessage}
          onClose={this.notifyClosed}
          severity={this.state.notifySeverity}
        />

        <EditUserModalForm 
          {...this.state.myEditModalProps}
          // open={this.state.myEditModalProps.open}
          onClose={this.modalOnClose}
          // title={this.state.myEditModalProps.title}
          editSuccess={this.editSuccess}
        />
      </div>
    )
  }
}
export default UsersSection;