import { FormControl, FormHelperText, Input, InputLabel, TextField } from "@material-ui/core";
import { Component } from "react";

class EditUserForm extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   data: null
    // }
  }

  componentDidMount() {
    
  }

  componentDidUpdate(prevProps, prevState) {
    
  }

  render() {
    return (
      <FormControl>
        <TextField
          required
          id="txtFirstName"
          label="First Name"
          helperText="this is required"
          value={this.props.componentData.first_name}
        />
      </FormControl>
    );
  }
}

export default EditUserForm;