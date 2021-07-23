import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Alert as MaterialAlert } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  "@keyframes opacityChange": {
    "0%": {
      opacity: 0,
    },
    "50%": {
      opacity: 1,
    },
    "100%": {
      opacity: 0,
    },
  },

  alert: {
    marginLeft: "25%",
    marginRight: "auto",
    fontSize: "20px",
    position: "absolute",
    zIndex: "1000",
    width: "50%",
    height: "80px",
    animationName: "$opacityChange",
    animationIterationCount: "infinite",
    animationDuration: "5s",
    animationFillMode: "forwards",
  },
}));

const Alert = ({ alerts }) => {
  const classes = useStyles();
  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => (
      <MaterialAlert
        key={alert.id}
        severity={`${alert.alertType}`}
        className={classes.alert}
      >
        {alert.msg}
      </MaterialAlert>
    ))
  );
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
