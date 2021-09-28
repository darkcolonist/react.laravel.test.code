import { Box, IconButton, LinearProgress, Modal, Typography } from "@material-ui/core";
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

  componentWillUnmount(){
    
  }

  modalClose = () => {
    this.setState({
      dataLoaded: false,
      dataObj: null
    });

    this.props.onClose();
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.open !== prevProps.open 
      && this.props.open){
      this.loadData(this.props.datasource)
    }
  }

  loadData(datasource){
    let modalDataLoaded = this.props.modalDataLoaded;

    fetch(datasource)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            dataLoaded: true,
            dataObj: result.data
          });

          modalDataLoaded(result.data);
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
    return (
      <div class="MyAjaxModal">
        <Modal
          open={this.props.open}
          onClose={this.modalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={this.style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">{this.props.title}</Typography>
            {this.state.dataLoaded ? this.props.content : <LinearProgress />}
          </Box>
        </Modal>
      </div>
    );
  }
}

export default MyAjaxModal;