import * as React from "react";
import { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import NavigateNext from "@material-ui/icons/NavigateNext";
import NavigateBefore from "@material-ui/icons/NavigateBefore";

class DataTable extends Component {
  constructor(props) {
    super(props);
    this.numPerPage = props.numPerPage || 3;
    this.state = {
      index: 0,
    };
  }

  render() {
    return (
      <div className="DataTable">
        {this.props.children.map((child, i) => (
          <span>
            {this.state.index + this.numPerPage > i &&
              this.state.index <= i && <span>{child}</span>}
          </span>
        ))}
        <span style={{ float: "right" }}>
          {this.state.index >= this.numPerPage && (
            <IconButton
              aria-label="Last"
              onClick={() => {
                this.setState((prevState) => {
                  return {
                    index: prevState.index - this.numPerPage,
                  };
                });
              }}
            >
              <NavigateBefore />
            </IconButton>
          )}
          {this.state.index <= this.props.children.length - this.numPerPage && (
            <IconButton
              aria-label="Next"
              onClick={() => {
                this.setState((prevState) => {
                  return {
                    index: prevState.index + this.numPerPage,
                  };
                });
              }}
            >
              <NavigateNext />
            </IconButton>
          )}
        </span>
      </div>
    );
  }
}
export default DataTable;
