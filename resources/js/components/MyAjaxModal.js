import { Button,
  Dialog,
  DialogContent,
  DialogTitle,
  LinearProgress } from "@material-ui/core";
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
      <div className="MyAjaxModal">
        <Dialog
          open={this.props.open}
          onClose={this.modalClose}
          fullWidth={true}>
          
          <DialogTitle>{this.props.title}</DialogTitle>
          <DialogContent>
            {this.state.dataLoaded ? this.props.content : <LinearProgress />}
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default MyAjaxModal;