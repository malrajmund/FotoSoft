import React from "react";
import logo from "../img/logo.png";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../actions/auth";

import PhoneIcon from "@material-ui/icons/Phone";
import MailIcon from "@material-ui/icons/Mail";
import Brightness5Icon from "@material-ui/icons/Brightness5";
import SendIcon from "@material-ui/icons/Send";

const useStyles = makeStyles((theme) => ({
  navbar: {
    [theme.breakpoints.down("sm")]: {
      height: "70px",
    },
    background: "white",
    boxShadow: "none",
    height: "120px",
    color: "#ECF0F6",
    fontWeight: "500",
    fontSize: "25px",
    backgroundColor: "#5DC560",
    borderBottom: "3px solid darkgreen",
  },
  logo: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
    maxWidth: "180px",
    maxHeight: "120px",
    textAlign: "center",
    display: "block",
  },
  items: {
    fontSize: "16px",
  },
  item: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "16px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "20px",
    },
    "&:hover": {
      color: "darkgreen",
      cursor: "default",
    },
  },
  materialIcons: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
    display: "inline-flex",
    verticalAlign: "middle",
    marginRight: "10px",
  },
  logout: {
    border: "3px solid darkgreen",
    borderRadius: "20px",
    padding: "5px",
    "&:hover": {
      backgroundColor: "darkgreen",
      cursor: "pointer",
    },
  },
  container: {
    [theme.breakpoints.down("sm")]: {
      direction: "column",
    },
    direfction: "row",
  },
}));

const Navbar = (props) => {
  const classes = useStyles();
  const onClick = (e) => {
    e.preventDefault();
    props.logout();
  };
  return (
    <AppBar className={classes.navbar} position='static'>
      <Grid
        container
        alignItems='center'
        wrap='nowrap'
        className={classes.container}
      >
        <Grid
          item
          direction='row'
          container
          xs={3}
          sm={3}
          md={3}
          lg={3}
          xl={3}
          justify='center'
          className={classes.item}
        >
          <Grid item>
            <PhoneIcon className={classes.materialIcons}></PhoneIcon>
          </Grid>
          <Grid item>506 427 234</Grid>
        </Grid>
        <Grid
          item
          direction='row'
          container
          xs={3}
          sm={3}
          md={3}
          lg={3}
          xl={3}
          justify='center'
          className={classes.item}
          spacing={0}
        >
          <Grid item>
            <MailIcon className={classes.materialIcons}></MailIcon>
          </Grid>
          <Grid item>mf@fotosoft.pl</Grid>
        </Grid>
        <Grid
          item
          xs={3}
          sm={3}
          md={3}
          lg={3}
          xl={2}
          justify='center'
          className={classes.logo}
        >
          <img src={logo} className={classes.logo}></img>
        </Grid>
        <Grid
          item
          direction='row'
          container
          xs={3}
          sm={3}
          md={3}
          lg={3}
          xl={3}
          justify='center'
          className={classes.item}
          spacing={0}
        >
          <Grid item>
            <SendIcon className={classes.materialIcons} />
          </Grid>
          <Grid item>Skype: fylyp2000 </Grid>
        </Grid>

        <Grid
          item
          direction='row'
          container
          xs={3}
          sm={3}
          md={3}
          lg={3}
          xl={3}
          justify='center'
          className={classes.item}
          spacing={0}
        >
          <Grid item>
            <Brightness5Icon className={classes.materialIcons} />
          </Grid>
          <Grid item>GG: 13340183 </Grid>
        </Grid>
        {props.isAuthenticated ? (
          <Grid item>
            <buttom className={classes.logout} onClick={(e) => onClick(e)}>
              Wyloguj{" "}
            </buttom>
          </Grid>
        ) : null}
      </Grid>
    </AppBar>
  );
};

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool,
  logout: PropTypes.func,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Navbar);
