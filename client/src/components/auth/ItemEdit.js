import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getItem, updateItem, deleteItem } from "../../actions/items";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
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

const ItemEdit = ({
  getItem,
  updateItem,
  deleteItem,
  items: { items, loading },
  match,
}) => {
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

  useEffect(() => {
    getItem(match.params.id);
    setFormData({
      name: loading ? "" : items.name,
      category: loading ? "" : items.category,
      EAN: loading ? "" : items.EAN,
      price: loading ? "" : items.price,
      quantity: loading ? "" : items.quantity,
      minOrder: loading ? "" : items.minOrder,
      deliveryTime: loading ? "" : items.deliveryTime,
      isDiscount: loading ? false : items.isDiscount,
      isActive: loading ? false : items.isActive,
    });
  }, [loading]);

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

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return loading ? (
    <div></div>
  ) : (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component='h1' variant='h5'>
          Edytuj pozycję.
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            updateItem(match.params.id, formData);
            <Redirect push to='/' />;
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
            <Grid item xs={6} style={{ fontSize: "18px" }}>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='default'
                className={classes.submit}
                size='large'
              >
                Zaktualizuj
              </Button>
            </Grid>
            <Grid item xs={6} style={{ fontSize: "18px" }}>
              <Button
                fullWidth
                variant='contained'
                color='secondary'
                className={classes.submit}
                size='large'
                onClick={
                  handleClickOpen
                  //deleteItem(match.params.id);
                }
              >
                Usuń
              </Button>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
              >
                <DialogTitle id='alert-dialog-title'>
                  {"Czy napewno chcesz usunąć tę pozycję?"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id='alert-dialog-description'>
                    {"Pozycja "}
                    <b>{items.name}</b> {" zostanie usunięta! "}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color='primary'>
                    Anuluj
                  </Button>
                  <Button
                    onClick={(e) => {
                      deleteItem(match.params.id);
                      handleClose();
                    }}
                    color='primary'
                    autoFocus
                  >
                    Usuń
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

ItemEdit.propTypes = {
  getItem: PropTypes.func.isRequired,
  updateItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  items: state.items,
});

export default connect(mapStateToProps, { getItem, updateItem, deleteItem })(
  ItemEdit
);
