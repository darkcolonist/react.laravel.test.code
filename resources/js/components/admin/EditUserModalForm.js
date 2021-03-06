import { Dialog, DialogContent, DialogTitle, LinearProgress } from "@material-ui/core";
import { Button, FormControl, Grid, TextField } from "@material-ui/core";
import { Cancel, Save } from "@material-ui/icons";
import { Component } from "react";
import api from "../../helpers/apisauce";
import MySnackbar from "../../helpers/mysnackbar";

const defaultState = {
  model: {
    first_name: "",
    last_name: "",
    email: "",
    hash: ""
  },
  
  hash: null,
  open: false,
  busy: false,
  notify: false,
  notifyMessage: "",
  notifySeverity: "info",

  mode: "edit" // [ "edit", "new" ]
};

class EditUserModalForm extends Component {
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
      model: {
        ...this.state.model,
        [name]: value
      }
    });
  }

  componentWillUnmount(){
    // this.setState({...defaultState});
  }

  componentDidMount() {

  }

  async componentDidUpdate(prevProps, prevState) {
    /**
     * this is for initial load of data
     */
    // console.log(prevProps.hash+" !== "+this.props.hash);
    if (prevProps.hash !== this.props.hash
      && this.props.hash !== undefined
      && this.props.hash !== "new") {
      await this.setState({
        model: {
          ...defaultState.model
          // more later on i think?
        },
        busy: true,
        hash: this.props.hash
      });
      this.loadData();
    }

    if (prevProps.hash !== this.props.hash
      && this.props.hash === "new") {
        console.log("mode: new")
        await this.setState({
          mode: "new"
        });
    }
  }

  loadDataError(args){
    this.setState({
      notify: true,
      notifyMessage: "problem loading: " + args.error,
      notifySeverity: "error",
      busy: false,
      error: args.error
    });
  }

  async loadData() {
    let datasource = "/api/test/users/"+this.state.hash;

    api.get(datasource)
      .then((result) => {
        if(result.problem){
          this.loadDataError({
            error: result.problem,
            datasource
          });
        }else{
          let loadedData = result.data.data;
          this.setState({
            busy: false,
            model: loadedData
          });
        }
      });

    // fetch(datasource)
    //   .then(res => res.json())
    //   .then(
    //     (result) => {
    //       if(result.data == undefined || result.data.hash == undefined){
    //         console.log('what are you trying to do?')
    //         this.loadDataError({
    //           error: "can't really say",
    //           datasource
    //         });
    //       }else{
    //         this.setState({
    //           busy: false,
    //           model: result.data
    //         });
    //       }
    //     },
    //     // Note: it's important to handle errors here
    //     // instead of a catch() block so that we don't swallow
    //     // exceptions from actual bugs in components.
    //     (error) => {
    //       this.loadDataError({
    //         error,
    //         datasource
    //       })
    //       // this.setState({
    //       //   notify: true,
    //       //   notifyMessage: "problem loading datasource: " + datasource,
    //       //   notifySeverity: "error",
    //       //   busy: false,
    //       //   error
    //       // });
    //     }
    //   )
    }

  notifyClosed = () => {
    this.setState({
      notify: false
    });
  }

  async saveCommandNew(){
    let response = await api.post('/api/test/users',
      this.state.model,
    )

    if (response.problem)
      await this.saveCommandFail(response);
    else
      await this.saveCommandSuccess(response);

    return response;
  }

  async saveCommandUpdate(){
    let response = await api.put('/api/test/users/' + this.state.model.hash,
      this.state.model,
    )

    if (response.problem)
      await this.saveCommandFail(response);
    else
      await this.saveCommandSuccess(response);

    return response;
  }

  async saveCommandFail(response){
    let notifySeverity = "error";
    let errorMessage = (response.data.message !== undefined)
      ? response.data.message
      : response.problem;

    let notifyMessage = "saving failed: " + errorMessage;

    await this.setState({
      busy: false,
      notify: true,
      notifyMessage,
      notifySeverity
    });
  }

  async saveCommandSuccess(response){
    this.props.editSuccess(this.state.model); // or response?

    let notifyMessage = this.state.model.first_name + " has been updated."
    if (this.state.mode === "new") {
      notifyMessage = this.state.model.first_name + " has been created."
      await this.setState({
        mode: "edit",
        model: {
          ...this.state.model,
          hash: response.data.model.hash
        }
      });
    }
    await this.setState({
      busy: false,
      notify: true,
      notifyMessage
    });
  }

  saveCommand = async () => {
    this.setState({
      busy: true
    });

    let response = "";

    if(this.state.mode === "edit"){
      response = await this.saveCommandUpdate();
    }
    else if(this.state.mode === "new"){
      response = await this.saveCommandNew();
    }
    else
      throw "unknown mode "+this.state.mode;

    // var notifyMessage;
    // var notifySeverity = "info";
    // if(response.problem){
    //   notifySeverity = "error";
    //   let errorMessage = (response.data.message !== undefined)
    //     ? response.data.message
    //     : response.problem;

    //   notifyMessage = "saving failed: "+errorMessage;
    // }else{
    //   // console.log("saved", this.state.model, "into", "/api/test/users", response);
    //   this.props.editSuccess(this.state.model); // or response?
    //   notifyMessage = this.state.model.first_name + " has been updated."
    // }

    // this.setState({
    //   busy: false,
    //   notify: true,
    //   notifyMessage,
    //   notifySeverity
    // });

  }

  modalClose = async () => {
    await this.setState({ ...defaultState });
    // console.log("closed!", this.state);
    this.props.onClose();
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

    if(this.state.mode !== "new")
      hashField = 
        <Grid item xs={12}>
          <TextField
            name="hash"
            label="Hash"
            disabled
            value={this.state.model.hash || ""}
          />
        </Grid>;

    return (
      <Dialog
          open={this.props.open}
          onClose={this.modalClose}
          fullWidth={true}>
          
        <DialogTitle>{this.props.title}</DialogTitle>
        <DialogContent>
          <MySnackbar
            open={this.state.notify}
            message={this.state.notifyMessage}
            onClose={this.notifyClosed}
            severity={this.state.notifySeverity}
          />
          <FormControl>
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
                  value={this.state.model.first_name || ""}
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
                  value={this.state.model.last_name || ""}
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
                  value={this.state.model.email || ""}
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
                onClick={this.modalClose}
                disabled={this.state.busy}
              ><Cancel />&nbsp;Close</Button></Grid>
            </Grid>
          </FormControl>
        </DialogContent>
      </Dialog>
    );
  }
}

export default EditUserModalForm;