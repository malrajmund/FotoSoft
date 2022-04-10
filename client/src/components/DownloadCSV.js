import React, { useEffect, useState, useRef } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import CircularProgress from "@material-ui/core/CircularProgress";
import { CSVLink, CSVDownload } from "react-csv";
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
    backgroundColor: "#3B4557", //"#5DC560", //"#ECF0F6",
    color: "white", //"#97A2B2",
    fontWeight: "bold",
  },
  body: {
    fontSize: "16px",
    //backgroundColor: "white",
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
    marginTop: "50px",
    padding: "5px",
    backgroundColor: "#EDEDED",
    boxShadow:
      "rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px;",
    [theme.breakpoints.up("lg")]: {
      //width: "1000px",
      padding: "20px 40px 20px 40px",
    },
  },
  authenticatedContainer: {
    marginTop: "50px",
    padding: "5px",
    backgroundColor: "#EDEDED",
    boxShadow:
      "rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px;",
    [theme.breakpoints.up("lg")]: {
      //width: "1100px",
      padding: "20px 40px 20px 40px",
    },
  },
  table: {
    marginTop: "20px",
    marginBottom: "20px",
    maxWidth: "100%",
    borderRadius: "10px",
    overflowX: "auto",
    boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
  },
  discount: {
    backgroundColor: "#eb7971",
    animationName: "$colorChange",
    animationIterationCount: "infinite",
    animationDuration: "3s",
    animationFillMode: "forwards",
  },
  category: {
    //backgroundColor: "white",
    textAlign: "center",
    fontSize: "45px",
    paddingTop: "20px",
    marginTop: "100px",
    borderBottom: "2px solid darkgreen",
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
  downloadWrapper:{
    height: "90vh",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    fontSize: '70px',
    "&>a":{
      color: '#5DC560'
    }
  }
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
  const headers = [
    { label: "Name", key: "name" },
    { label: "EAN", key: "EAN" },
    { label: "Price", key: "price" },
    { label: "Quantity", key: "quantity" },
    { label: "Delivery", key: "delivery" }
  ];
  const [csvReport, setCsvReport] = useState({
    data: [],
    headers: headers,
    filename: 'FotoSoft.csv'
  })

  const [isDataReady, setDataReady] = useState(false)

  useEffect(() => {
    getAllItems();
  }, [getAllItems]);
  useEffect(() => {
    getCurrency();
  }, [getCurrency]);

  const btnRef = useRef(null)

  useEffect(() => {
    if(!loading){
      let dataForDownload = items.filter((item) => item.isActive)
      dataForDownload = dataForDownload.map((item) => ({
        name: item.name,
        EAN: item.EAN,
        price: item.priceEUR + "€",
        quantity: item.quantity,
        delivery: item.deliveryTime
      }))
      setCsvReport({
        data: dataForDownload,
        headers: headers,
        filename: 'FotoSoft.csv'
      })
      setDataReady(true)
    }
  }, [loading])

  useEffect(()=>{
    if(isDataReady){
      btnRef.current?.click()
    }
  }, [isDataReady])

 

  return loading ? (
    <div className={classes.downloadWrapper}> <CircularProgress
    className={classes.skeleton}
    size={300}
  ></CircularProgress></div>
   
  ) : (
    <div className={classes.downloadWrapper}>
      <h1>Downloading CSV file...</h1>
    <CSVLink data={csvReport.data} headers={csvReport.headers} filename={csvReport.filename}>
    <span ref={btnRef} />
    
    </CSVLink>
    </div>
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
