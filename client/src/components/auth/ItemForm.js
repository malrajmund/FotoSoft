import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addItem } from "../../actions/items";
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

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    padding: "40px",
    borderRadius: "20px",
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
}));

const ItemForm = ({ addItem }) => {
  const classes = useStyles();
  const history = useHistory();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    EAN: "",
    price: "",
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
    quantity,
    minOrder,
    deliveryTime,
    isDiscount,
    isActive,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleCheckboxChange = (e) => setFormData(e.target.value);

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component='h1' variant='h5'>
          Dodaj nową pozycję.
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
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
              <TextField
                variant='outlined'
                required
                fullWidth
                name='category'
                label='Kategoria'
                type='category'
                id='category'
                autoComplete='category'
                onChange={(e) => onChange(e)}
                value={category}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                variant='outlined'
                required
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
            <Grid item xs={6}>
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
};

export default connect(null, { addItem })(ItemForm);
