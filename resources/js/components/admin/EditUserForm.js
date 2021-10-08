import { LinearProgress } from "@material-ui/core";
import { Button, FormControl, Grid, TextField } from "@material-ui/core";
import { Cancel, Save } from "@material-ui/icons";
import { Component } from "react";
import api from "../../helpers/apisauce";
import MySnackbar from "../../helpers/mysnackbar";

const defaultState = {
  componentData: {
    first_name: "",
    last_name: "",
    email: "",
    hash: ""
  },
  busy: false,
  notify: false,
  notifyMessage: "",
  notifySeverity: "info"
};

class EditUserForm extends Component {
  constructor(props) {
    super(props);

    this.state = defaultState;

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

  componentWillUnmount(){
    // this.setState({...defaultState});
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

  notifyClosed = () => {
    this.setState({
      notify: false
    });
  }

  saveCommand = async () => {
    this.setState({
      busy: true
    });

    const response = await api.put('/api/test/users/'+this.state.componentData.hash,
      this.state.componentData,
    )
    console.log("saved", this.state.componentData, "into", "/api/test/users", response);

    this.props.editSuccess(this.state.componentData); // or response?

    this.setState({
      busy: false,
      notify: true,
      notifyMessage: this.state.componentData.first_name + " has been updated."
    });
  }

  cancelCommand = () => {
    this.props.close();
    this.setState({ ...defaultState });
  }

  getBusyIndicator(){
    let theIndicator = "";

    if(this.state.busy){
      theIndicator = <LinearProgress color="secondary" />
    }

    return theIndicator;
  }

  render() {
    let busyIndicator = this.getBusyIndicator();

    let hashField = "";

    if(!this.props.isNew)
      hashField = 
        <Grid item xs={12}>
          <TextField
            name="hash"
            label="Hash"
            disabled
            value={this.state.componentData.hash || ""}
          />
        </Grid>;

    return (
      <FormControl>
        <MySnackbar
          open={this.state.notify}
          message={this.state.notifyMessage}
          onClose={this.notifyClosed}
          severity={this.state.notifySeverity}
        />
        <Grid container spacing={2}>
          <Grid item xs={12}>{busyIndicator}</Grid>
          {hashField}
          <Grid item xs={4}>
            <TextField
              required
              name="first_name"
              label="First Name"
              helperText="this is required"
              disabled={this.state.busy}
              value={this.state.componentData.first_name || ""}
              onChange={this.handleInputChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              name="last_name"
              label="Last Name"
              helperText="this is required"
              disabled={this.state.busy}
              value={this.state.componentData.last_name || ""}
              onChange={this.handleInputChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              name="email"
              label="Email"
              helperText="this is required"
              disabled={this.state.busy}
              value={this.state.componentData.email || ""}
              onChange={this.handleInputChange}
            />
          </Grid>

          <Grid item xs={12} />
          <Grid item xs={8}></Grid>
          <Grid item xs={2}>
            <Button 
            onClick={this.saveCommand}
            disabled={this.state.busy}
            ><Save />&nbsp;Save</Button></Grid>
          <Grid item xs={2}><Button 
            onClick={this.cancelCommand}
            disabled={this.state.busy}
            ><Cancel />&nbsp;Close</Button></Grid>
        </Grid>
      </FormControl>
    );
  }
}

export default EditUserForm;