import "./App.scss";
import Routes from "./Routes";
import logo from "./assets/logo-light.png";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import React, { Component } from "react";
import { useHistory } from "react-router-dom";

const flexContainer = {
  display: "flex",
  flexDirection: "row",
  padding: 4,
};

const App = () => {
  const history = useHistory();
  const routeChange = (path) => {
    history.push(path);
  };
  return (
    <div>
      <Grid container>
        <Grid item xs={12} className="header">
          <Grid item xs={2}>
            <img src={logo} />
          </Grid>
          <span className="menu-item" onClick={() => routeChange("series-a")}>
            <p className="hvr-underline-from-left">Series A Pricing</p>
          </span>
          <span className="menu-item" onClick={() => routeChange("interview")}>
            <p className="hvr-underline-from-left">Mock interview</p>
          </span>
          <span className="menu-item" onClick={() => routeChange("nps")}>
            <p variant="h3" className="hvr-underline-from-left">
              Twitter NPS
            </p>
          </span>
        </Grid>
        <Routes />
      </Grid>
    </div>
  );
};

export default App;
