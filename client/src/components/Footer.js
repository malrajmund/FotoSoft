import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    backgroundColor: "#2A2F36",
    color: "white",
  },
  title: {
    fontSize: "20px",
  },
  listItem: {
    fontSize: "18px",
    color: "grey",
  },
}));

export default function StickyFooter() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container>
        <Grid container justify='center' direction='row'>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={4}>
            <Typography variant='body1'>
              <a className={classes.title}>O nas:</a>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={4}>
            <Typography variant='body1'>
              <a className={classes.title}>Nasze sklepy:</a>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={4}>
            <Typography variant='body1'>
              <a className={classes.title}>Kontakt:</a>
              <ul>
                <li className={classes.listItem}>Telefon</li>
                <li className={classes.listItem}>Email</li>
                <li className={classes.listItem}>Skype</li>
                <li className={classes.listItem}>GG</li>
              </ul>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
}
