import React, { Component } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import Dictaphone from "./Dictaphone";
import CompletionProvider from "../../providers/CompletionProvider";
import WhiteTextField from "../../components/WhiteTextField/WhiteTextField";
import { CircularProgress } from "@material-ui/core";

export default class MockInterview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInterviewing: false,
      conversationText: `Investor: So, let's get started. What's your company?\nYou:`,
      newestInput: "",
    };
    this.startInterview = this.startInterview.bind(this);
  }

  formatText(text) {
    var split = text.split("Investor:");

    return split.map((item) => {
      if (item.trim().length > 0) {
        return (
          <p>
            <b>Investor:</b>
            {item.split("\n").map((str, i) => {
              if (i > 0) {
                return <p>{str}</p>;
              } else {
                return str;
              }
            })}
          </p>
        );
      }
    });
  }

  async completeText() {
    this.setState({ isLoading: true });
    try {
      var text =
        this.state.conversationText +
        " " +
        this.state.newestInput +
        "\nInvestor:";
      this.setState({ conversationText: text, newestInput: "" });

      let res = await CompletionProvider.complete(text);
      console.log(res);
      this.setState({
        conversationText: text + res.text + "You:",
        isLoading: false,
      });
    } catch (e) {
      this.setState({ isLoading: false });
    }
  }

  startInterview() {
    this.setState({ isInterviewing: true });
  }
  render() {
    return (
      <div>
        <Box m={16}>
          {!this.state.isInterviewing ? (
            <div>
              <Typography variant="h5">
                <b>Mock interview</b>
              </Typography>
              <Typography variant="body2">
                Practice your pitching skills so you're ready for any question.
                Even the best founders can pitch to dozens of investors before
                they succeed.
              </Typography>
              <Button onClick={this.startInterview}>Begin</Button>
            </div>
          ) : (
            <div>
              <Typography variant={"subtitle1"}>
                {this.formatText(this.state.conversationText)}
              </Typography>
              {this.state.isLoading ? (
                <CircularProgress />
              ) : (
                <div>
                  <WhiteTextField
                    value={this.state.newestInput}
                    onChange={(e) =>
                      this.setState({ newestInput: e.target.value })
                    }
                    width="100%"
                  />
                  <Dictaphone
                    onResult={(result) => {
                      this.setState({ newestInput: result });
                    }}
                    onSend={() => this.completeText()}
                    showSend={this.state.newestInput.length > 0}
                  />
                </div>
              )}
            </div>
          )}
        </Box>
      </div>
    );
  }
}
