import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React, { Component } from "react";
import WhiteTextField from "../../components/WhiteTextField/WhiteTextField";
import NPSPieChart from "../../components/NPSPieChart/NPSPieChart";
import NPSProvider from "../../providers/NPSProvider";
import { Tweet } from "react-twitter-widgets";
import Alert from "@material-ui/lab/Alert";
import Select from "@material-ui/core/Select";

import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import DataTable from "../../components/DataTable/DataTable";
import { CircularProgress } from "@material-ui/core";

export default class TwitterNPS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
      tweets: [],
      loading: false,
      promoters: [],
      passives: [],
      detractors: [],
      error: null,
      sortType: 0,
      hasLoaded: {},
      renderTweets: false,
    };
    this.handleSort = this.handleSort.bind(this);
  }

  async deriveNPS() {
    this.setState({ loading: true, tweets: [], error: null, hasLoaded: {} });
    try {
      let res = await NPSProvider.findAndScoreTweets(this.state.searchValue);
      var promoters = [];
      var passives = [];
      var detractors = [];

      res.forEach((item) => {
        if (item.score >= 0.1) {
          promoters.push(item.id);
        } else if (item.score >= -0.3 && item.score < 0.1) {
          passives.push(item.id);
        } else {
          detractors.push(item.id);
        }
      });
      this.setState({
        loading: false,
        tweets: res,
        promoters: promoters,
        passives: passives,
        detractors: detractors,
      });
    } catch (e) {
      this.setState({ loading: false, error: e });
    }
  }

  handleSort(sortType) {
    if (sortType == 0) {
      return;
    }
    this.setState((prevState) => {
      var tweets = [].concat(prevState.tweets);

      switch (sortType) {
        case 1:
          tweets = tweets.sort((a, b) => b.score - a.score);
          break;
        case 2:
          tweets = tweets.sort((a, b) => a.score - b.score);
          break;
        case 3:
          tweets = tweets.sort((a, b) => Math.abs(b.score) - Math.abs(a.score));
          break;
      }
      return { tweets, sortType };
    });
  }
  render() {
    return (
      <div className="App">
        {this.state.error && (
          <Alert
            severity="error"
            style={{ position: "absolute", width: "100%" }}
          >
            {this.state.error.message ||
              "Something went wrong. Please try again."}
          </Alert>
        )}

        <Grid container justify="center">
          <Box m={16}>
            <Grid container direction="row">
              <Grid item xs={6}>
                <Typography variant="h4">
                  <b>Twitter NPS</b>
                </Typography>
                <Typography variant="body2">
                  This tool uses Twitter's API to find tweets about a company or
                  product, and then uses sentiment analysis to estimate the
                  company's Net Promoter Score. Only uses the most recent 50
                  tweets because of API quota.
                </Typography>
                <WhiteTextField
                  value={this.state.searchValue}
                  onChange={(e) => {
                    this.setState({ searchValue: e.target.value });
                  }}
                  placeholder={"Enter company name (e.g. @copy_ai)"}
                  width="100%"
                />
                <Box mt={4}>
                  <Button
                    onClick={() => this.deriveNPS()}
                    disabled={this.state.loading}
                  >
                    Derive NPS
                  </Button>
                </Box>

                <Box maxWidth={0.6}>
                  {this.state.promoters.length > 0 && (
                    <NPSPieChart
                      data={[
                        {
                          title: "Promoters",
                          value: this.state.promoters.length,
                          color: "green",
                        },
                        {
                          title: "Neutral",
                          value: this.state.passives.length,
                          color: "gray",
                        },
                        {
                          title: "Detractors",
                          value: this.state.detractors.length,
                          color: "#fe2933",
                        },
                      ]}
                    />
                  )}
                </Box>
                {this.state.promoters.length > 0 && (
                  <Typography variant="body1">
                    Net Promoter Score ={" "}
                    {Math.round(
                      ((this.state.promoters.length -
                        this.state.detractors.length) /
                        (this.state.promoters.length +
                          this.state.detractors.length +
                          this.state.passives.length)) *
                        100
                    )}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={6}>
                {this.state.tweets.length > 0 && (
                  <Box ml={8} mr={0}>
                    <div>
                      Sort by:{" "}
                      <Select
                        placeholder="Sort by"
                        value={this.state.sortType}
                        onChange={(e) => this.handleSort(e.target.value)}
                      >
                        <MenuItem value={1}>
                          <Typography variant="body2">Best</Typography>
                        </MenuItem>
                        <MenuItem value={2}>
                          <Typography variant="body2">Worst</Typography>
                        </MenuItem>
                        <MenuItem value={3}>
                          <Typography variant="body2">Magnitude</Typography>
                        </MenuItem>
                        <MenuItem value={0}>
                          {" "}
                          <Typography variant="body2">None</Typography>
                        </MenuItem>
                      </Select>
                    </div>
                    <span>
                      {" "}
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={this.state.renderTweets}
                            onChange={(e) => {
                              this.setState((prevState) => {
                                return {
                                  renderTweets: !prevState.renderTweets,
                                };
                              });
                            }}
                            inputProps={{ "aria-label": "primary checkbox" }}
                          />
                        }
                        label={
                          <Typography variant="body2">
                            Render tweets?
                          </Typography>
                        }
                      />
                    </span>
                    <DataTable>
                      {this.state.tweets.map((tweet) => (
                        <div
                          style={{
                            boxShadow:
                              "0px 0px 5px " +
                              (tweet.score > 0.3
                                ? "green"
                                : tweet.score < -0.3
                                ? "#fe2933"
                                : "gray"),
                            borderRadius: 16,
                            maxWidth: 550,
                            textAlign: "center",
                            backgroundColor: "white",
                            marginBottom: 10,
                          }}
                        >
                          {this.state.renderTweets ? (
                            <Tweet
                              tweetId={tweet.id}
                              options={{
                                cards: "hidden",
                              }}
                              placeholder={
                                <span>
                                  <CircularProgress />
                                </span>
                              }
                            />
                          ) : (
                            <div style={{ textAlign: "left", padding: 16 }}>
                              {"Tweet ID: " + tweet.id}
                              <br />
                              {"Score: " + tweet.score}
                              <br />
                              {"Text: " + tweet.text}
                            </div>
                          )}
                        </div>
                      ))}
                    </DataTable>
                  </Box>
                )}
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </div>
    );
  }
}
