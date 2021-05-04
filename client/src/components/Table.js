import React, { useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { TableFooter } from "@material-ui/core";

import { connect } from "react-redux";
import { getAllItems } from "../actions/items";
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

const useStyles = makeStyles({
  table: {
    marginTop: "20px",
    marginBottom: "20px",
    maxWidth: "100%",
    borderRadius: "10px",
  },
  discount: {
    backgroundColor: "#eb7971",
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
});
const StyledTableRow = withStyles((theme) => ({
  root: {},
}))(TableRow);

//Group categories

const unique = (value, index, self) => {
  return self.indexOf(value) === index;
};

const CustomizedTables = ({
  getAllItems,
  items: { items, loading },
  isAuthenticated,
}) => {
  const classes = useStyles();
  useEffect(() => {
    getAllItems();
  }, [getAllItems]);

  function getCategories(items) {
    var array = new Array();
    items.map((item) => {
      array.push(item.category);
    });
    return array;
  }

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  function getUniqueCategories() {
    var array = [];
    return loading ? null : (array = getCategories(items).filter(onlyUnique));
  }

  return loading ? (
    <CircularProgress color='green' />
  ) : (
    getUniqueCategories().map((category) => (
      <TableContainer component={Paper} elevation={0} key={category}>
        <a className={classes.category}>{category}</a>
        <Table className={classes.table} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell style={{ borderTopLeftRadius: "20px" }}>
                Nazwa
              </StyledTableCell>
              <StyledTableCell align='right'>EAN</StyledTableCell>
              <StyledTableCell align='right'>
                Cena PLN brutto/szt
              </StyledTableCell>
              <StyledTableCell align='right'>
                Cena EURO brutto/szt
              </StyledTableCell>
              <StyledTableCell align='right'>
                Dostępność (ilość)
              </StyledTableCell>
              <StyledTableCell align='right'>
                Minimalne zamówienie
              </StyledTableCell>

              {isAuthenticated ? (
                <>
                  <StyledTableCell align='right'>
                    Czas zamówienia
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
                  Czas zamówienia
                </StyledTableCell>
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {items.map((item) =>
              item.category === category ? (
                <StyledTableRow
                  key={item.name}
                  className={
                    isAuthenticated && !item.isActive
                      ? classes.unactiveauth
                      : item.isActive
                      ? null
                      : classes.unactive
                  }
                >
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
                    {
                      /*fx(item.price).from("PLN").to("EUR").toFixed(2)*/ fx.convert(
                        item.price,
                        { from: "PLN", to: "EUR" }
                      ) + " €"
                    }
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
    ))
  );
};

CustomizedTables.propTypes = {
  getAllItems: PropTypes.func.isRequired,
  items: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  items: state.items,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getAllItems })(CustomizedTables);
