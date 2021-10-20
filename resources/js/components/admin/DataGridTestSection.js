import { Component } from "react";
import { DataGrid } from '@material-ui/data-grid';
import api from "../../helpers/apisauce";

class DataGridTestSection extends Component{
  defaultState = {
    dgSort: {},
    dgTotal: 0,

    error: null,
    isLoaded: false,
    items: [
      {
        hash: "empty",
        first_name: "empty",
        last_name: "empty",
        email: "empty",
      }
    ]
  };

  constructor(props){
    super(props);
    this.state = this.defaultState;
  }

  componentDidUpdate(prevProps, prevState){
    // if(!prevState.dgSort.is(this.state.dgSort)){
    //   console.log("dgSort has been changed")
    // }
  }

  async reloadTable(){
    let result = await api.get("/api/test/users");

    
    if(result.problem){
      /**
       * do something with error
       */
    }else{
      let response = result.data;
      await this.setState({
        isLoaded: true,
        items: response.data,
        dgTotal: response.total
      });
    }
  }

  componentDidMount(){
    this.reloadTable();
  }

  handleSortChange = (model) => {
    let dgSort = model[0];
    if (JSON.stringify(this.state.dgSort) !== JSON.stringify(dgSort)){
      console.log("new sort", dgSort);
      this.setState({
        dgSort: dgSort
      });
    }
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
    ];

    return (
      <div style={{ height: 500, width: '100%' }}>
        <DataGrid 
          disableSelectionOnClick={true}
          density={"compact"}
          getRowId={(r) => r.hash}
          rows={items}
          rowCount={this.state.dgTotal}
          columns={columns}
          pageSize={10}
          paginationMode={"server"}

          /**
           * sorting mode doesn't work for now because when you enable
           * it, it will infinite loop as you setState. needs more 
           * research
           */
          onSortModelChange={this.handleSortChange}
          sortingMode={"server"}

          rowsPerPageOptions={[5, 10, 20]}
          loading={!isLoaded}
        />
      </div>
    )
  }
}
export default DataGridTestSection;