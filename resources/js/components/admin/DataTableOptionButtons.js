import { Box, IconButton, Modal, Typography } from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";
import { Component } from "react";

class DataTableOptionButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      dataLoaded: false,
      currentHash: null
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
    this.setState({ modalOpen: true });
    
    /**
     * simulate ajax call
     */
    setTimeout(() => {
      this.setState({ 
        dataLoaded: true,
        currentHash: itemHash 
      });
    }, 1000);
  }

  handleClose = () => {
    this.setState({ 
      modalOpen: false,
      dataLoaded: false,
      currentHash: null
    })
  }

  render() {
    let modalContent
    if(this.state.dataLoaded)
      modalContent = "yep:"+this.state.currentHash;
    else
      modalContent = "nah";

    return (
      <div class="DataTableOptionButtons">
        <IconButton title="edit" onClick={(e) => this.handleEditClick(e, this.props.theData.rowData[0])}><Edit /></IconButton>
        <IconButton title="delete" onClick={() => {
          window.alert("attempting to delete "+this.props.theData.rowData[0]);
          }}><Delete /></IconButton>
        <Modal
          open={this.state.modalOpen}
          onClose={this.handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={this.style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal: {modalContent}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Modal>
      </div>
    );
  }
}

export default DataTableOptionButtons;