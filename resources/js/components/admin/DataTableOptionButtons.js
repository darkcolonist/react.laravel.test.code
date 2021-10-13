import { IconButton } from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";
import { Component } from "react";

class DataTableOptionButtons extends Component {
  constructor(props) {
    super(props);

    this.style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };
  }

  handleEditClick = (e) => {
    this.props.editButtonClicked({
      model: this.props.theData,
      // datasource: this.props.editDatasource,
      title: this.props.editTitle
    });
  }

  handleDeleteClick = (e) => {

    this.props.deleteButtonClicked({
      // datasource: this.props.deleteDatasource,
      title: this.props.deleteTitle,
      model: this.props.theData,
    });
  }

  render() {
    return (
      <div className="DataTableOptionButtons">
        <IconButton title={this.props.editTitle} onClick={this.handleEditClick}><Edit /></IconButton>
        <IconButton title={this.props.deleteTitle} onClick={this.handleDeleteClick}><Delete /></IconButton>
      </div>
    );
  }
}

export default DataTableOptionButtons;