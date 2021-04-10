import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Banner from "./Banner";
import { mergeClasses } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    alignItems: "center",
  },
}));

export default function Wrapper() {
  const classes = useStyles();
  return (
    <Grid
      container
      justify='center'
      alignItems='center'
      direction='row'
      className={classes.root}
    >
      <CssBaseline />
      <Container fixed>
        <Typography
          component='div'
          style={{
            backgroundColor: "white",
            height: "100vh",
            opacity: 0.5,
            marginTop: "10px",
            borderRadius: "20px",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Banner />
        </Typography>
      </Container>
    </Grid>
  );
}
