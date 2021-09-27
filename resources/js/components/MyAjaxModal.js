import { Box, IconButton, Modal, Typography } from "@material-ui/core";
import { Component } from "react";

class MyAjaxModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataLoaded: false,
      dataObj: null,
      open: props.open,
      datasource: props.datasource
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

  componentDidMount() {
    
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.open !== prevProps.open 
      && this.props.open){
      this.loadData(this.props.datasource)
    }
  }

  loadData(datasource){
    fetch(datasource)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            dataLoaded: true,
            dataObj: result.data
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            dataLoaded: true,
            error
          });
        }
      )
  }

  render() {
    let modalContent = "sample 1";
    let modalContent2 = "sample 2";
    // let modalContent2;
    // if (this.state.dataLoaded) {
    //   modalContent = "yep:" + this.state.currentHash;
    //   modalContent2 = "you are viewing: " + this.state.dataObj.email;
    // }
    // else
    //   modalContent = "nah";

    return (
      <div class="MyAjaxModal">
        <Modal
          open={this.props.open}
          onClose={this.props.onClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={this.style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal: {modalContent}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {modalContent2}
            </Typography>
          </Box>
        </Modal>
      </div>
    );
  }
}

export default MyAjaxModal;