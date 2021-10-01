import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { Component } from "react";

const defaultState = {
  open: false
}

class MySnackbar extends Component{
  constructor(props){
    super(props);

    this.state = {
      ...defaultState
      // ...this.props
    };
  }

  handleClose = () => {
    this.props.onClose()

    this.setState({
      open: false
    });
  }

  componentDidUpdate(prevProps, prevState){
    if(this.props.open !== prevProps.open){
      this.setState({
        open: this.props.open
      });
    }
  }

  componentDidMount(){
    
  }

  componentWillUnmount(){
    // console.log("memory cleared for mysnackbar");
  }

  render(){
    return (
      <Snackbar
        autoHideDuration={5000}
        message="empty snackbar"
        {...this.props}
        onClose={this.handleClose}
        open={this.state.open}>
          <Alert
            severity={this.props.severity}>
            {this.props.message}
          </Alert>
      </Snackbar>
    )
  }
}

export default MySnackbar;