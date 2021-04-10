import React from "react";
import logo from "../img/logo.png";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import PhoneIcon from "@material-ui/icons/Phone";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import SendIcon from "@material-ui/icons/Send";
import Brightness5Icon from "@material-ui/icons/Brightness5";

const useStyles = makeStyles((theme) => ({
  navbar: {
    background: "white",
    boxShadow: "none",
    color: "black",
    textAlign: "center",
    borderBottom: "4px solid #96c987",
    height: "120px",
  },
  logo: {
    alignItems: "center",
    maxWidth: "180px",
    maxHeight: "120px",
  },
  items: {
    color: "#505257",
    fontWeight: "bold",
    fontSize: "16px",
    textDecoration: "underline 2px #96c987",
  },
}));

export default function Navbar() {
  const classes = useStyles();
  return (
    <AppBar className={classes.navbar} position='static'>
      <Grid container justify='center' alignItems='center' direction='row'>
        <Grid item xs={6} lg={3} xl={3}>
          <a href='/'>
            <img src={logo} className={classes.logo}></img>
          </a>
        </Grid>
        <Grid
          container
          direction='row'
          alignItems='center'
          item
          xs={6}
          lg={9}
          xl={9}
          className={classes.items}
        >
          <Grid
            container
            direction='row'
            alignItems='center'
            item
            md={6}
            lg={6}
            xl={6}
          >
            <Grid item direction='row' container lg={6} xl={6} spacing={1}>
              <Grid item>
                <PhoneIcon />
              </Grid>
              <Grid item>506 427 234</Grid>
            </Grid>
            <Grid item direction='row' container lg={6} xl={6} spacing={1}>
              <Grid item>
                <AlternateEmailIcon />
              </Grid>
              <Grid item>mf@fotosoft.pl</Grid>
            </Grid>
          </Grid>
          <Grid
            container
            direction='row'
            alignItems='center'
            item
            md={6}
            lg={6}
            xl={6}
          >
            <Grid item direction='row' container lg={6} xl={6} spacing={1}>
              <Grid item>
                <SendIcon />
              </Grid>
              <Grid item>Skype: fylyp2000 </Grid>
            </Grid>
            <Grid Grid item direction='row' container lg={6} xl={6} spacing={1}>
              <Grid item>
                <Brightness5Icon />
              </Grid>
              <Grid item>GG: 13340183 </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </AppBar>
  );
}
