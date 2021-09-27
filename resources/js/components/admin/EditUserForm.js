import { FormControl, FormHelperText, Input, InputLabel } from "@material-ui/core";
import { Component } from "react";

class EditUserForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null
    }
  }

  componentDidMount() {
    
  }

  componentDidUpdate(prevProps, prevState) {
    
  }

  render() {
    return (
      <FormControl>
        <InputLabel htmlFor="my-input">Email address</InputLabel>
        <Input id="my-input" aria-describedby="my-helper-text" />
        <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
      </FormControl>
    );
  }
}

export default EditUserForm;