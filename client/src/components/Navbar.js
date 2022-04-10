import React, { useEffect, useState } from "react";
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
    [theme.breakpoints.down("md")]: {
      height: "60px",
    },
    background: "rgba(29,147,72,1)",
    boxShadow: "none",
    height: "120px",
    color: "#ECF0F6",
    fontWeight: "500",
    fontSize: "25px",
    opacity: 0.95,
    //background:
    //"linear-gradient(90deg, rgba(93,197,96,1) 0%, rgba(29,147,72,1) 50%, rgba(93,197,96,1) 100%)", //"#5DC560",
    borderBottom: "2px solid darkgreen",
  },
  logo: {
    [theme.breakpoints.down("md")]: {
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
    [theme.breakpoints.down("md")]: {
      fontSize: "20px",
    },
    "&:hover": {
      color: "darkgreen",
      cursor: "default",
    },
  },
  materialIcons: {
    display: "inline-flex",
    verticalAlign: "middle",
    marginRight: "10px",
  },
  logout: {
    border: "3px solid darkgreen",
    padding: "5px",
    "&:hover": {
      backgroundColor: "darkgreen",
      cursor: "pointer",
      color: "white",
    },
    [theme.breakpoints.down("md")]: {
      marginTop: "2px",
    },
    position: "absolute",
    zIndex: "100",
    background: "rgba(29,147,72,1)",
    borderBottomRightRadius: "5px",
    borderBottomLeftRadius: "5px",
    borderTop: "none",
    marginTop: "5px",
  },
  scrolledLogout: {
    border: "3px solid darkgreen",
    padding: "5px",
    "&:hover": {
      backgroundColor: "darkgreen",
      cursor: "pointer",
      color: "white",
    },
    [theme.breakpoints.down("md")]: {
      marginTop: "2px",
    },
    position: "absolute",
    zIndex: "100",
    background: "rgba(29,147,72,1)",
    borderBottomRightRadius: "5px",
    borderBottomLeftRadius: "5px",
    borderTop: "none",
    marginTop: "-5px",
  },
  container: {
    [theme.breakpoints.down("sm")]: {
      direction: "column",
      flexWrap: "wrap",
    },
    //flexWrap: "nowrap",
    direfction: "row",
  },
  scrolled: {
    [theme.breakpoints.up("md")]: {
      //height: "100px",
      animation: `$resizeNavbar 1000ms`,
      background: "rgb(29,147,72,1)",
      boxShadow: "none",
      height: "60px",
      color: "#ECF0F6",
      fontWeight: "500",
      fontSize: "25px",
      borderBottom: "2px solid darkgreen",
    },
    background: "rgb(29,147,72,1)",
    boxShadow: "none",
    height: "60px",
    color: "#ECF0F6",
    fontWeight: "500",
    fontSize: "25px",
    borderBottom: "2px solid darkgreen",
    opacity: 0.95,
  },
  "@keyframes resizeNavbar": {
    "0%": {
      height: "120px",
    },
    "100%": {
      height: "60px",
    },
  },
  scrolledLogo: {
    maxWidth: "180px",
    maxHeight: "120px",
    textAlign: "center",
    animation: `$hideLogo 1000ms 1 forwards`,
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  "@keyframes hideLogo": {
    "0%": {
      opacity: "1",
      transform: "translateY(0%)",
    },
    "100%": {
      opacity: "0",
      transform: "translateY(-100%)",
      display: "none",
      position: "absolute",
    },
  },
  scrolledItem: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "16px",
      animation: "none",
      marginTop: "0px",
    },
    [theme.breakpoints.down("md")]: {
      marginTop: "0px",
      fontSize: "20px",
      animation: "none",
    },
    "&:hover": {
      color: "darkgreen",
      cursor: "default",
    },
    marginTop: "15px",
    animation: `$hideItem 5000ms 1 forwards`,
  },
  "@keyframes hideItem": {
    "0%": {
      opacity: 0,
      transform: "translateX(100%)",
    },
    "100%": {
      opacity: 1,
      transform: "translateX(0%)",
    },
  },
}));

const Navbar = (props) => {
  const classes = useStyles();
  const [scrolled, setScrolled] = useState(false);
  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  });
  const onClick = (e) => {
    e.preventDefault();
    props.logout();
  };
  return (
    <AppBar
      className={scrolled ? classes.scrolled : classes.navbar}
      position='fixed'
    >
      <Grid
        container
        alignItems='center'
        className={classes.container}
        direction='row'
        justify='center'
      >
        <Grid
          item
          direction='row'
          container
          xs={6}
          sm={6}
          md={6}
          lg={2}
          xl={2}
          justify='center'
          className={scrolled ? classes.scrolledItem : classes.item}
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
          xs={6}
          sm={6}
          md={6}
          lg={2}
          xl={2}
          justify='center'
          className={scrolled ? classes.scrolledItem : classes.item}
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
          lg={2}
          xl={2}
          justify='center'
          className={scrolled ? classes.scrolledLogo : classes.logo}
        >
          <a href='/'>
            <img src={logo} className={classes.logo}></img>
          </a>
        </Grid>
        <Grid
          item
          direction='row'
          container
          xs={6}
          sm={6}
          md={6}
          lg={2}
          xl={2}
          justify='center'
          className={scrolled ? classes.scrolledItem : classes.item}
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
          xs={6}
          sm={6}
          md={6}
          lg={2}
          xl={2}
          justify='center'
          className={scrolled ? classes.scrolledItem : classes.item}
          spacing={0}
        >
          <Grid item>
            <Brightness5Icon className={classes.materialIcons} />
          </Grid>
          <Grid item>GG: 13340183 </Grid>
        </Grid>
        {props.isAuthenticated ? (
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            xl={6}
            justify='flex-end'
            className={scrolled ? classes.scrolledItem : classes.item}
            spacing={0}
            direction='row'
            container
          >
            <buttom
              className={scrolled ? classes.scrolledLogout : classes.logout}
              onClick={(e) => onClick(e)}
            >
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
