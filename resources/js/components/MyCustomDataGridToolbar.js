import { GridToolbarContainer } from '@material-ui/data-grid';
import { Button, TextField } from "@material-ui/core";
import { Add, Search } from "@material-ui/icons";
import { Component } from 'react';

class MyCustomDataGridToolbar extends Component{
  constructor(props){
    super(props);

    this.state = {
      searchError: false,
      searchString: "",
      searchReady: true
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.searchReady !== prevProps.searchReady) {
      this.setState({
        searchReady: this.props.searchReady
      });
    }
  }

  async validateSearchString(str){
    let ourString = str.trim();

    if(ourString.length > 2 || ourString == ""){
      await this.setState({
        searchError: false,
        searchString: ourString
      });
    }else{
      await this.setState({
        searchError: true
      });
    }
  }

  async handleSearchChange(event){
    if(event.keyCode == 13){
      await this.validateSearchString(event.target.value);

      if(!this.state.searchError)
        this.props.handleSearchChange(this.state.searchString);
    }
  }

  render(){
    return (
      <GridToolbarContainer>
        <Button onClick={(clickProps) => { this.props.handleNewClick(clickProps) }}
        ><Add /> New User</Button>
        <TextField
          disabled={!this.state.searchReady}
          error={this.state.searchError}
          helperText={this.state.searchError ? "2 characters at least to search": ""}
          placeholder="search"
          onKeyDown={(searchProps) => { this.handleSearchChange(searchProps) }}
          InputProps={{
            endAdornment: <Search />,
            maxLength: 50
          }}
        />
      </GridToolbarContainer>
    );
  }
}

export default MyCustomDataGridToolbar;