import React, { Component } from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

export default class SeriesAPricing extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Box m={16}>
          <Grid item xs={5}>
            <Typography variant="h4">
              <b>Series A Pricing</b>
            </Typography>
            <Typography variant="body2">
              Figure out how much to price your Series A. You don't want to risk
              a down round, but you also want to make sure you're not getting
              diluted.
            </Typography>
          </Grid>
        </Box>
      </div>
    );
  }
}
