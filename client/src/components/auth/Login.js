import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { login } from "../../actions/auth";
import PropTypes from "prop-types";
//Table imports
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Redirect } from "react-router-dom";

const Login = (props) => {
  const [formData, setFormData] = useState({
    login: "",
    password: "",
  });

  const { login, password } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();

    if (password === "123") {
      props.setAlert("Błędne hasło!", "error");
    } else {
      props.login({ login, password });
    }
  };

  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: "220px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: "#96c987",
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  const classes = useStyles();
  if (props.isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <>
      <Container
        component='main'
        maxWidth='xs'
        style={{
          backgroundColor: "white",
          borderRadius: "20px",
          marginBottom: "210px",
        }}
      >
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Panel administracyjny
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={(e) => onSubmit(e)}
          >
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              placeholder='Nazwa admina'
              name='login'
              label='Login'
              type='login'
              id='login'
              autoComplete='current-login'
              value={login}
              onChange={(e) => onChange(e)}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              placeholder='Hasło'
              name='password'
              label='Hasło'
              type='password'
              id='password'
              autoComplete='current-password'
              value={password}
              onChange={(e) => onChange(e)}
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              Zaloguj
            </Button>
          </form>
        </div>
      </Container>
    </>
  );
};

Login.propTypes = {
  setAlert: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, login })(Login);
