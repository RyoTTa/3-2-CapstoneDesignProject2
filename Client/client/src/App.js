import React, { Component } from "react";
import Customer from "./components/Customer";
import "./App.css";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  root: {
    width: "100%",

    marginTop: theme.spacing.unit * 3,

    overflowX: "auto",
  },

  table: {
    minWidth: 1080,
  },

  progress: {
    margin: theme.spacing.unit * 2,
  },
});

class App extends Component {
  state = {
    customers: "",

    completed: 0,
  };

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);

    this.callApi()

      .then((res) => this.setState({ customers: res }))

      .catch((err) => console.log(err));
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  callApi = async () => {
    const response = await fetch("/api/customers");

    const body = await response.json();

    return body;
  };

  progress = () => {
    const { completed } = this.state;

    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  };

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <Table className={classes.table} align="right">
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>

              <TableCell>이미지</TableCell>

              <TableCell>카메라 번호</TableCell>

              <TableCell>날짜</TableCell>

              <TableCell>시간</TableCell>

              <TableCell>인원</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {this.state.customers ? (
              this.state.customers.map((c) => {
                return (
                  <Customer
                    key={c.id}
                    id={c.id}
                    image={c.image}
                    camera={c.camera}
                    day={c.day}
                    time={c.time}
                    count={c.count}
                  />
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan="6" align="center">
                  <CircularProgress
                    className={classes.progress}
                    variant="determinate"
                    value={this.state.completed}
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(App);
