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
          <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
            <Typography variant='body1'>
              <a className={classes.title}>Nasze sklepy:</a>
              <ul>
                <li className={classes.listItem}>
                  <Link
                    color='inherit'
                    underline='none'
                    href='https://www.fotosoft.pl/'
                  >
                    fotosoft.pl
                  </Link>
                </li>
                <li className={classes.listItem}>
                  <Link
                    color='inherit'
                    underline='none'
                    href='https://kupsiup.pl/'
                  >
                    kupsiup.pl
                  </Link>
                </li>
              </ul>
            </Typography>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
            <Typography variant='body1'>
              <a className={classes.title}>Kontakt:</a>
              <ul>
                <li className={classes.listItem}>506 427 234</li>
                <li className={classes.listItem}>MF@FOTOSOFT.PL</li>
                <li className={classes.listItem}>Skype:fylyp2000</li>
                <li className={classes.listItem}>GG:13340183</li>
              </ul>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
}
