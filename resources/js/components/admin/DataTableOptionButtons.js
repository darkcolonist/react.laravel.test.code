import { Button, ButtonGroup, IconButton } from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";
import { Component } from "react";

class DataTableOptionButtons extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="DataTableOptionButtons">
        <IconButton title="edit"><Edit /></IconButton>
        <IconButton title="delete" onClick={() => {
          window.alert("attempting to delete "+this.props.theData.rowData[0]);
          }}><Delete /></IconButton>
      </div>
    );
  }
}

export default DataTableOptionButtons;