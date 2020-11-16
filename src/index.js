import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import "./index.scss";
import "./styles/_animations.scss";

let theme = createMuiTheme({
  palette: {
    primary: {
      light: "#207ab2",
      main: "#2eafff",
      dark: "#57bfff",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#fd5b76",
      dark: "#ba000d",
      contrastText: "#000",
    },
    text: {
      primary: "#404040",
      secondary: "#808080",
    },
  },
  spacing: 4,

  typography: {
    button: {
      textTransform: "none",
    },
    fontSize: 16,
    fontWeightRegular: 300,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    fontFamily: ['"Poppins"', '"sans-serif"'].join(","),
    h1: {
      fontSize: 48,
      color: "white",
    },
    h3: {
      fontSize: 24,
      color: "white",
    },
  },
  overrides: {
    // Style sheet name ⚛️
    MuiButton: {
      // Name of the rule
      text: {
        // Some CSS
        background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
        borderRadius: 3,
        border: 0,
        color: "white",
        height: 48,
        padding: "0 30px",
        boxShadow: "0 2px 4px 2px rgba(255, 105, 135, .3)",
      },
    },
    textfield: {
      color: "white",
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
