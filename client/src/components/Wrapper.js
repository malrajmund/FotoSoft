import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Banner from "./Banner";
import Grid from "@material-ui/core/Grid";
import GetAppIcon from "@material-ui/icons/GetApp";
import Table from "./Table";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { connect } from "react-redux";
import { getDate } from "../actions/items";
import PropTypes from "prop-types";

const fx = require("money");

fx.base = "PLN";
fx.rates = {
  EUR: 0.22,
  PLN: 1,
};

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    alignItems: "center",
    backgroundColor: "#3B4557",
    /*backgroundImage:
      "url(https://images.pexels.com/photos/220182/pexels-photo-220182.jpeg?cs=srgb&dl=pexels-pixabay-220182.jpg&fm=jpg)",*/
  },
  h1: {
    color: "#FEFEFE",
    fontFamily: "Merriweather Sans, sans-serif",
    backgroundColor: "#3B4557",
    borderRadius: "20px",
    display: "inline-block",
    margin: "5px",
  },
  h2: {
    color: "#909CB1",
    fontFamily: "Merriweather Sans, sans-serif",
    backgroundColor: "#3B4557",
    borderRadius: "20px",
    display: "inline-block",
    margin: "5px",
  },
  a: {
    color: " #5DC560",
    fontFamily: "Merriweather Sans, sans-serif",
    fontSize: "21px",
    whiteSpace: "pre",
  },
  h: {
    marginTop: "10px",
    backgroundColor: "#3B4557",
    borderRadius: "20px",
    display: "inline-block",
    opacity: 0.9,
  },
  button: {
    margin: "20px",
  },
}));

var utc =
  new Date().toLocaleDateString("pl") +
  " " +
  new Date().toLocaleTimeString("pl");

const Wrapper = ({
  items: { items, loading, updatedAt },
  isAuthenticated,
  getDate,
}) => {
  const classes = useStyles();
  useEffect(() => {
    getDate();
  }, [getDate]);

  function download(filename, text) {
    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute("download", filename);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  function getString(items, currency) {
    var string = "Pobrano dnia:\t" + utc + "\n\n";
    if (currency === "PLN") {
      items.map((item) => {
        string =
          string +
          "-" +
          item.name +
          " EAN: " +
          item.EAN +
          " Price: " +
          item.price +
          " pln  Quantity: " +
          item.quantity +
          "pcs  MinOrder: " +
          item.minOrder +
          " DeliveryTime: " +
          item.deliveryTime +
          "\n";
      });
    } else {
      items.map((item) => {
        string =
          string +
          "-" +
          item.name +
          " EAN: " +
          item.EAN +
          " Price: " +
          fx.convert(item.price, { from: "PLN", to: "EUR" }) +
          " €" +
          " Quantity: " +
          item.quantity +
          "pcs  MinOrder: " +
          item.minOrder +
          " DeliveryTime: " +
          item.deliveryTime +
          "\n";
      });
    }

    return string;
  }

  return (
    <Grid
      container
      justify='center'
      alignItems='center'
      direction='column'
      className={classes.root}
    >
      <div className={classes.h}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <h1 className={classes.h1}>Cennik sprzedaży hurtowej</h1>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <h2 className={classes.h2}>
            Ostatnia akutalizacja:{" "}
            <a className={classes.a}>{loading ? "ładowanie..." : updatedAt}</a>
          </h2>
        </Grid>
      </div>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Typography
          component='div'
          style={{
            backgroundColor: "white",
            minheight: "100vh",
            width: "100%",
            opacity: 0.96,
            marginTop: "10px",
            marginBottom: "20px",
            borderRadius: "20px",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "20px",
          }}
        >
          <Grid
            container
            justify='center'
            alignItems='center'
            direction='column'
          >
            <Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
              <Table />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              {isAuthenticated ? (
                <>
                  <Button
                    variant='contained'
                    color='default'
                    size='large'
                    className={classes.button}
                    startIcon={<AddIcon />}
                    href='addItem'
                  >
                    Dodaj pozycje
                  </Button>
                  <Button
                    variant='contained'
                    color='default'
                    size='large'
                    className={classes.button}
                    startIcon={<GetAppIcon />}
                    onClick={(e) => {
                      download("HurtPLN.txt", getString(items, "PLN"));
                    }}
                  >
                    Pobierz w PLN
                  </Button>
                  <Button
                    variant='contained'
                    color='default'
                    size='large'
                    className={classes.button}
                    startIcon={<GetAppIcon />}
                    onClick={(e) => {
                      download("HurtEUR.txt", getString(items, "EUR"));
                    }}
                  >
                    Pobierz w €
                  </Button>
                </>
              ) : (
                <></>
              )}
            </Grid>
          </Grid>
        </Typography>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  items: state.items,
  isAuthenticated: state.auth.isAuthenticated,
});

Wrapper.propTypes = {
  getDate: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { getDate })(Wrapper);
