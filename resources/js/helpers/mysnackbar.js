import { Snackbar } from "@material-ui/core";
import { Component } from "react";

const defaultState = {
  open: false
}

class MySnackbar extends Component{
  constructor(props){
    super(props);

    this.state = {
      ...this.defaultState
      // ...this.props
    };
  }

  handleClose = () => {
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
        onClose={this.handleClose}
        message="empty snackbar"
        {...this.props}
        open={this.state.open}
      />
    )
  }
}

export default MySnackbar;