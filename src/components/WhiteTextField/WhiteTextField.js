import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React, { Component } from "react";

const style = withStyles(
  (theme) => ({
    root: (props) => ({
      backgroundColor: "white",
      borderRadius: 4,
      width: props.width || "60%",
      ...props,
    }),
  }),
  { withTheme: true }
);

const WhiteTextField = style(
  class extends Component {
    rendered = 0;

    render() {
      const { classes, theme, backgroundColor } = this.props;
      return (
        <TextField
          className={classes.root}
          variant="outlined"
          color="primary"
          {...this.props}
        />
      );
    }
  }
);

export default WhiteTextField;
