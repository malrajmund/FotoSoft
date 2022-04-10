import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addItem, getAllItems } from "../../actions/items";
import { getCurrency } from "../../actions/euro";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Redirect, useHistory } from "react-router-dom";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: "130px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    padding: "40px",
    borderRadius: "5px",
    marginBottom: "20px",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  euroContainer: {
    textAlign: "center",
    textDecoration: "none",
    fontStyle: "normal",
    fontSize: "18px",
    marginTop: "10px",
  },
  euroFont: {
    textAlign: "center",
    textDecoration: "none",
    fontStyle: "normal",
    fontFamily: "Arial",
    fontWeight: "100",
  },
}));

const ItemForm = ({
  addItem,
  getCurrency,
  getAllItems,
  items: { items, loading },
  euro: { euroPrice, loadingEuro },
}) => {
  const classes = useStyles();
  const history = useHistory();
  useEffect(() => {
    getCurrency();
  }, [loadingEuro]);
  useEffect(() => {
    getAllItems();
  }, [getAllItems]);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    EAN: "",
    price: "",
    priceEUR: "",
    quantity: "",
    minOrder: "",
    deliveryTime: "",
    isDiscount: false,
    isActive: true,
  });

  const {
    name,
    category,
    EAN,
    price,
    priceEUR,
    quantity,
    minOrder,
    deliveryTime,
    isDiscount,
    isActive,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onInputChange = (e, input) =>
    setFormData({ ...formData, category: input });

  const onEuroChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component='h1' variant='h5'>
          Dodaj nową pozycję.
        </Typography>
        <Grid item xs={12} className={classes.euroContainer}>
          {loadingEuro ? (
            <h1 className={classes.euroFont}>Kurs €: 4.5</h1>
          ) : (
            <a className={classes.euroFont}>Kurs €: {euroPrice}</a>
          )}
        </Grid>
        <form
          className={classes.form}
          noValidate
          onSubmit={(e) => {
            e.preventDefault();

            if (priceEUR === "") {
              return alert("Wprowadz cenę euro!");
            }
            addItem(formData);
            history.push("/");
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} xl={12}>
              <TextField
                autoComplete='fname'
                name='firstName'
                variant='outlined'
                required
                fullWidth
                id='firstName'
                label='Nazwa'
                name='name'
                onChange={(e) => onChange(e)}
                value={name}
              />
            </Grid>
            <Grid item xs={12}>
              {loading ? null : (
                <Autocomplete
                  freeSolo
                  variant='outlined'
                  name='category'
                  type='category'
                  id='category'
                  autoComplete='category'
                  onInputChange={(e, input) => onInputChange(e, input)}
                  inputValue={category}
                  options={getUniqueCategories(items)}
                  selectOnFocus
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label='Kategoria *'
                      variant='outlined'
                    />
                  )}
                />
              )}
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                variant='outlined'
                fullWidth
                id='EAN'
                label='EAN'
                name='EAN'
                autoComplete='EAN'
                onChange={(e) => onChange(e)}
                value={EAN}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='price'
                label='Cena PLN'
                type='price'
                id='price'
                autoComplete='price'
                onChange={(e) => onChange(e)}
                value={price}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant='outlined'
                fullWidth
                name='priceEUR'
                label={`${
                  price
                    ? ((price * (1 / euroPrice)) / 1.23).toFixed(2) + " €"
                    : ""
                }`}
                type='priceEUR'
                id='priceEUR'
                autoComplete='priceEUR'
                onChange={(e) => onEuroChange(e)}
                onClick={(e) => {
                  e.target.value = "";
                }}
                value={priceEUR}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='quantity'
                label='Dostępność'
                type='quantity'
                id='quantity'
                autoComplete='quantity'
                onChange={(e) => onChange(e)}
                value={quantity}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='minOrder'
                label='Min. zamówienie'
                type='minOrder'
                id='minOrder'
                autoComplete='minOrder'
                onChange={(e) => onChange(e)}
                value={minOrder}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='deliveryTime'
                label='Czas dostawy'
                type='deliveryTime'
                id='deliveryTime'
                autoComplete='deliveryTime'
                onChange={(e) => onChange(e)}
                value={deliveryTime}
              />
            </Grid>
            <Grid item xs={6} style={{ fontSize: "18px" }}>
              <Checkbox
                value='allowExtraEmails'
                color='secondary'
                name='isDiscount'
                checked={isDiscount}
                //value={isDiscount}
                onClick={(e) => {
                  setFormData({
                    ...formData,
                    [e.target.name]: e.target.checked,
                  });
                }}
              />
              Przecena?
            </Grid>
            <Grid item xs={6} style={{ fontSize: "18px" }}>
              <Checkbox
                value='allowExtraEmails'
                color='primary'
                name='isActive'
                checked={isActive}
                //value={isActive}
                onClick={(e) => {
                  setFormData({
                    ...formData,
                    [e.target.name]: e.target.checked,
                  });
                }}
              />
              Aktywna?
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='default'
            className={classes.submit}
            size='large'
          >
            Dodaj
          </Button>
        </form>
      </div>
    </Container>
  );
};

ItemForm.propTypes = {
  addItem: PropTypes.func.isRequired,
  getAllItems: PropTypes.func.isRequired,
  getCurrency: PropTypes.func.isRequired,
  euro: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  euro: state.euro,
  items: state.items,
});

export default connect(mapStateToProps, { addItem, getCurrency, getAllItems })(
  ItemForm
);
