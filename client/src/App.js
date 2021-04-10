import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Wrapper from "./components/Wrapper";

const App = () => (
  <Router>
    <Box m={0}>
      <Grid container justify='center' alignItems='center' direction='row'>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Navbar />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
          <Wrapper />
        </Grid>
      </Grid>
    </Box>
  </Router>
);

export default App;
