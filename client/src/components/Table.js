import React, { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { TableFooter } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Checkbox from "@material-ui/core/Checkbox";
import GetAppIcon from "@material-ui/icons/GetApp";
import Grid from "@material-ui/core/Grid";

import { connect } from "react-redux";
import { getAllItems, swapUp, swapDown } from "../actions/items";
import { getCurrency } from "../actions/euro";
import PropTypes from "prop-types";
const { convert } = require("exchange-rates-api");

// EURO to PLN
const fx = require("money");

fx.base = "PLN";
fx.rates = {
  EUR: 0.22,
  PLN: 1,
};

//CSS
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#ECF0F6",
    color: "#97A2B2",
    fontWeight: "bold",
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const useStyles = makeStyles((theme) => ({
  "@keyframes colorChange": {
    "0%": {
      backgroundColor: "white",
    },
    "50%": {
      backgroundColor: "#eb7971",
    },
    "100%": {
      backgroundColor: "white",
    },
  },
  skeleton: {
    //marginRight: "100px",
    color: "#5DC560",
  },
  container: {
    [theme.breakpoints.up("lg")]: {
      width: "1000px",
    },
  },
  authenticatedContainer: {
    [theme.breakpoints.up("lg")]: {
      width: "1100px",
    },
  },
  table: {
    marginTop: "20px",
    marginBottom: "20px",
    maxWidth: "100%",
    borderRadius: "10px",
    overflowX: "auto",
  },
  discount: {
    backgroundColor: "#eb7971",
    animationName: "$colorChange",
    animationIterationCount: "infinite",
    animationDuration: "3s",
    animationFillMode: "forwards",
  },
  category: {
    backgroundColor: "white",
    textAlign: "center",
    fontSize: "25px",
    paddingTop: "30px",
  },
  unactive: {
    display: "none",
  },
  unactiveauth: {
    backgroundColor: "#5892c4",
  },
  both: {
    backgroundColor: "#A88497",
  },
  button: {
    marginTop: "20px",
    marginLeft: "15px",
  },
  name: {
    [theme.breakpoints.up("lg")]: {
      minWidth: "300px",
    },
  },
}));
const StyledTableRow = withStyles((theme) => ({
  root: {},
}))(TableRow);

const CustomizedTables = ({
  getAllItems,
  getCurrency,
  swapUp,
  swapDown,
  items: { items, loading, euroPrice },
  isAuthenticated,
}) => {
  const classes = useStyles();

  const [disable, setDisable] = useState(false);

  useEffect(() => {
    getAllItems();
  }, [getAllItems]);
  useEffect(() => {
    getCurrency();
  }, [getCurrency]);

  const getCategories = (data) => {
    var array = new Array();
    data.map((item) => {
      array.push(item.category);
    });
    return array;
  };

  const onlyUnique = (value, index, self) => {
    return self.indexOf(value) === index;
  };

  const getUniqueCategories = (data) => {
    var array = [];

    return loading ? null : (array = getCategories(data).filter(onlyUnique));
  };

  var fileStringPL =
    "Utworzono: " +
    new Date().toLocaleDateString("pl") +
    " " +
    new Date().toLocaleTimeString("pl") +
    "\n\n";

  var fileStringENG =
    "Created at: " +
    new Date().toLocaleDateString("pl") +
    " " +
    new Date().toLocaleTimeString("pl") +
    "\n\n";

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

  const handleClick = (event) => {
    if (event.target.checked) {
      var clickedItem = items.find((x) => x.name === event.target.name);
      fileStringPL =
        fileStringPL +
        "-" +
        clickedItem.name +
        ", EAN: " +
        clickedItem.EAN +
        ", Cena: " +
        clickedItem.price +
        "zł, Ilość: " +
        clickedItem.quantity +
        "pcs \n";

      fileStringENG =
        fileStringENG +
        "-" +
        clickedItem.name +
        ", EAN: " +
        clickedItem.EAN +
        ", Price: " +
        clickedItem.priceEUR +
        "€, Quantity: " +
        clickedItem.quantity +
        "pcs \n";
    } else {
    }
  };

  return loading ? (
    <CircularProgress
      className={classes.skeleton}
      size={300}
    ></CircularProgress>
  ) : (
    <>
      {getUniqueCategories(items).map((category) => (
        <TableContainer
          component={Paper}
          elevation={0}
          key={category}
          style={{ overflowX: "auto" }}
          className={
            isAuthenticated ? classes.authenticatedContainer : classes.container
          }
        >
          <a className={classes.category}>{category}</a>
          <Table className={classes.table} aria-label='customized table'>
            <TableHead>
              <TableRow>
                {isAuthenticated ? (
                  <>
                    <StyledTableCell
                      align='right'
                      style={{ borderTopLeftRadius: "20px" }}
                    ></StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell className={classes.name}>
                      Nazwa
                    </StyledTableCell>
                  </>
                ) : (
                  <StyledTableCell
                    className={classes.name}
                    style={{ borderTopLeftRadius: "20px" }}
                  >
                    Nazwa
                  </StyledTableCell>
                )}

                <StyledTableCell align='right'>EAN</StyledTableCell>
                <StyledTableCell align='right'>Cena PLN/szt</StyledTableCell>

                <StyledTableCell align='right'>Ilość</StyledTableCell>
                <StyledTableCell align='right'>MOK</StyledTableCell>

                {isAuthenticated ? (
                  <>
                    <StyledTableCell align='right'>
                      Przybliżony czas wysyłki
                    </StyledTableCell>

                    <StyledTableCell
                      align='right'
                      style={{ borderTopRightRadius: "20px" }}
                    ></StyledTableCell>
                  </>
                ) : (
                  <StyledTableCell
                    align='right'
                    style={{ borderTopRightRadius: "20px" }}
                  >
                    Przybliżony czas wysyłki
                  </StyledTableCell>
                )}
              </TableRow>
            </TableHead>

            <TableBody>
              {items.map((item) =>
                item.category === category ? (
                  <StyledTableRow
                    key={item.index}
                    className={
                      isAuthenticated && !item.isActive
                        ? classes.unactiveauth
                        : item.isActive
                        ? null
                        : classes.unactive
                    }
                  >
                    {isAuthenticated ? (
                      <>
                        <StyledTableCell
                          className={
                            item.isDiscount
                              ? item.isActive
                                ? classes.discount
                                : classes.both
                              : null
                          }
                        >
                          <Button
                            variant='contained'
                            disabled={disable}
                            disableElevation={true}
                            style={{
                              borderRadius: "50%",
                              background: "inherit",
                            }}
                            onClick={(e) => {
                              e.preventDefault();
                              setDisable(true);
                              swapUp(item.index);
                              setTimeout(() => setDisable(false), 1500);
                            }}
                          >
                            <ExpandLessIcon />
                          </Button>
                          <Button
                            variant='contained'
                            disabled={disable}
                            disableElevation={true}
                            style={{
                              borderRadius: "50%",
                              background: "inherit",
                            }}
                            onClick={(e) => {
                              e.preventDefault();
                              setDisable(true);
                              swapDown(item.index);
                              setTimeout(() => setDisable(false), 1500);
                            }}
                          >
                            <ExpandMoreIcon />
                          </Button>
                        </StyledTableCell>
                        <StyledTableCell
                          className={
                            item.isDiscount
                              ? item.isActive
                                ? classes.discount
                                : classes.both
                              : null
                          }
                        >
                          <form>
                            <Checkbox
                              color='primary'
                              name={item.name}
                              onClick={handleClick}
                            />
                          </form>
                        </StyledTableCell>
                      </>
                    ) : null}
                    <StyledTableCell
                      component='th'
                      scope='row'
                      className={
                        item.isDiscount
                          ? item.isActive
                            ? classes.discount
                            : classes.both
                          : null
                      }
                    >
                      {item.name}
                    </StyledTableCell>
                    <StyledTableCell
                      align='right'
                      className={
                        item.isDiscount
                          ? item.isActive
                            ? classes.discount
                            : classes.both
                          : null
                      }
                    >
                      {item.EAN}
                    </StyledTableCell>
                    <StyledTableCell
                      align='right'
                      style={{ whiteSpace: "nowrap" }}
                      className={
                        item.isDiscount
                          ? item.isActive
                            ? classes.discount
                            : classes.both
                          : null
                      }
                    >
                      {item.price + " zł"}
                    </StyledTableCell>
                    <StyledTableCell
                      align='right'
                      className={
                        item.isDiscount
                          ? item.isActive
                            ? classes.discount
                            : classes.both
                          : null
                      }
                    >
                      {item.quantity}
                    </StyledTableCell>
                    <StyledTableCell
                      align='right'
                      className={
                        item.isDiscount
                          ? item.isActive
                            ? classes.discount
                            : classes.both
                          : null
                      }
                    >
                      {item.minOrder}
                    </StyledTableCell>
                    <StyledTableCell
                      align='right'
                      className={
                        item.isDiscount
                          ? item.isActive
                            ? classes.discount
                            : classes.both
                          : null
                      }
                    >
                      {item.deliveryTime}
                    </StyledTableCell>
                    {isAuthenticated ? (
                      <>
                        <StyledTableCell
                          className={
                            item.isDiscount
                              ? item.isActive
                                ? classes.discount
                                : classes.both
                              : null
                          }
                        >
                          <Button
                            variant='contained'
                            href={`editItem/${item._id}`}
                            startIcon={<EditIcon />}
                          >
                            Edytuj
                          </Button>
                        </StyledTableCell>
                      </>
                    ) : null}
                  </StyledTableRow>
                ) : null
              )}
            </TableBody>
            <TableFooter
              style={{
                backgroundColor: "#ECF0F6",
              }}
            >
              <TableRow>
                <StyledTableCell
                  align='right'
                  style={{
                    borderBottomLeftRadius: "20px",
                    borderBottom: "none",
                  }}
                ></StyledTableCell>
                {/*<StyledTableCell
                align='right'
                style={{ borderBottom: "none" }}
              ></StyledTableCell>*/}
                <StyledTableCell
                  align='right'
                  style={{ borderBottom: "none" }}
                ></StyledTableCell>
                <StyledTableCell
                  align='right'
                  style={{ borderBottom: "none" }}
                ></StyledTableCell>
                <StyledTableCell
                  align='right'
                  style={{ borderBottom: "none" }}
                ></StyledTableCell>
                <StyledTableCell
                  align='right'
                  style={{ borderBottom: "none" }}
                ></StyledTableCell>
                {isAuthenticated ? (
                  <>
                    <StyledTableCell
                      align='right'
                      style={{ borderBottom: "none" }}
                    ></StyledTableCell>
                    <StyledTableCell
                      align='right'
                      style={{ borderBottom: "none" }}
                    ></StyledTableCell>
                    <StyledTableCell
                      align='right'
                      style={{ borderBottom: "none" }}
                    ></StyledTableCell>
                    <StyledTableCell
                      align='right'
                      style={{
                        borderBottomRightRadius: "20px",
                        borderBottom: "none",
                      }}
                    ></StyledTableCell>
                  </>
                ) : (
                  <StyledTableCell
                    align='right'
                    style={{
                      borderBottomRightRadius: "20px",
                      borderBottom: "none",
                    }}
                  ></StyledTableCell>
                )}
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      ))}
      {isAuthenticated ? (
        <Grid
          container
          direction='row'
          justifyContent='flex-start'
          alignItems='flex-start'
        >
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Button
              variant='contained'
              color='default'
              size='large'
              language='pl'
              className={classes.button}
              startIcon={<GetAppIcon />}
              onClick={(e) => {
                download("HurtPLN.txt", fileStringPL);
              }}
            >
              Pobierz zaznaczone w PLN
            </Button>

            <Button
              variant='contained'
              color='default'
              size='large'
              language='eng'
              className={classes.button}
              startIcon={<GetAppIcon />}
              onClick={(e) => {
                download("Hurt€.txt", fileStringENG);
              }}
            >
              Pobierz zaznaczone w €
            </Button>
          </Grid>
        </Grid>
      ) : null}
    </>
  );
};

CustomizedTables.propTypes = {
  getAllItems: PropTypes.func.isRequired,
  getCurrency: PropTypes.func.isRequired,
  swapUp: PropTypes.func.isRequired,
  swapDown: PropTypes.func.isRequired,
  items: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  items: state.items,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  getAllItems,
  getCurrency,
  swapUp,
  swapDown,
})(CustomizedTables);
