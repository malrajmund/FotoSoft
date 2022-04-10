import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "min(100px)",
    marginTop: "auto",
    backgroundColor: "#2A2F36",
    color: "white",
  },
  title: {
    fontSize: "25px",
    textAlign: "center",
    listStylePosition: "inside",
  },
  listItem: {
    fontSize: "22px",
    color: "grey",
  },
  list: {
    textAlign: "center",
    listStylePosition: "inside",
    [theme.breakpoints.down("md")]: {
      listStyleType: "none",
    },
  },
  ul: {
    margin: 0,
    padding: 0,
  },
}));

export default function StickyFooter() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container>
        <Grid container justify='center' direction='row'>
          <Grid item xs={6} sm={12} md={12} lg={12} xl={12}>
            <Typography variant='body1'>
              <Grid
                container
                justify='center'
                direction='row'
                alignItems='center'
              >
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                  className={classes.title}
                >
                  Contact
                </Grid>
              </Grid>
              <ul className={classes.ul}>
                <Grid
                  container
                  justify='center'
                  direction='row'
                  className={classes.list}
                >
                  <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
                    <li className={classes.listItem}>506 427 234</li>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
                    <li className={classes.listItem}>MF@FOTOSOFT.PL</li>
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
                    <li className={classes.listItem}>Skype:fylyp2000</li>
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
                    <li className={classes.listItem}>GG:13340183</li>
                  </Grid>
                </Grid>
              </ul>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
}
