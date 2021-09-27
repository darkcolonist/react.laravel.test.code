import { Box, IconButton } from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";
import { Component } from "react";

class DataTableOptionButtons extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
      dataLoaded: false,
      dataObj: null,
      currentHash: null,
      parentState: props.parentState
    }

    this.style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };
  }

  handleEditClick = (e, itemHash) => {
    
    this.props.editButtonClicked({
      datasource: "/api/test/users/" + itemHash
    });
    
  }

  handleClose = () => {
    this.setState({ 
      modalOpen: false,
      dataLoaded: false,
      currentHash: null
    })
  }

  render() {
    let modalContent;
    let modalContent2;
    if(this.state.dataLoaded){
      modalContent = "yep:"+this.state.currentHash;
      modalContent2 = "you are viewing: "+this.state.dataObj.email;
    }
    else
      modalContent = "nah";

    return (
      <div class="DataTableOptionButtons">
        <IconButton title="edit" onClick={(e) => this.handleEditClick(e, this.props.theData.rowData[0])}><Edit /></IconButton>
        <IconButton title="delete" onClick={() => {
          window.alert("attempting to delete "+this.props.theData.rowData[0]);
          }}><Delete /></IconButton>
      </div>
    );
  }
}

export default DataTableOptionButtons;