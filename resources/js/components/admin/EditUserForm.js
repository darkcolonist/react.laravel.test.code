import { Button, FormControl, Grid, TextField } from "@material-ui/core";
import { Cancel, Save } from "@material-ui/icons";
import { Component } from "react";

class EditUserForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      componentData: {
        first_name: "unknown",
        last_name: "unknown",
        email: "unknown"
      }
    }

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event){
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      componentData: {
        ...this.state.componentData,
        [name]: value
      }
    });
  }

  componentDidMount() {
    
  }

  componentDidUpdate(prevProps, prevState) {
    /**
     * this is for initial load of data
     */
    if(prevProps.componentData.hash !== this.props.componentData.hash){
      this.setState({
        componentData: this.props.componentData
      });
    }
  }

  render() {
    return (
      <FormControl>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="hash"
              label="Hash"
              disabled
              value={this.state.componentData.hash}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              name="first_name"
              label="First Name"
              helperText="this is required"
              value={this.state.componentData.first_name}
              onChange={this.handleInputChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              name="last_name"
              label="Last Name"
              helperText="this is required"
              value={this.state.componentData.last_name}
              onChange={this.handleInputChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              name="email"
              label="Email"
              helperText="this is required"
              value={this.state.componentData.email}
              onChange={this.handleInputChange}
            />
          </Grid>

          <Grid item xs={8}></Grid>
          <Grid item xs={2}><Button><Save />&nbsp;Save</Button></Grid>
          <Grid item xs={2}><Button><Cancel />&nbsp;Cancel</Button></Grid>
        </Grid>
      </FormControl>
    );
  }
}

export default EditUserForm;