import React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

class Customer extends React.Component {
  render() {
    return (
      <TableRow>
        <TableCell>{this.props.id}</TableCell>
        <TableCell>
          <img src={this.props.image} alt="profile" width="200" height="200" />
        </TableCell>
        <TableCell>{this.props.camera}</TableCell>
        <TableCell>{this.props.day}</TableCell>
        <TableCell>{this.props.time}</TableCell>
        <TableCell>{this.props.count}</TableCell>
      </TableRow>
    );
  }
}

export default Customer;
