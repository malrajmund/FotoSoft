import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Wrapper from "./components/Wrapper";
import Login from "././components/auth/Login";
import ItemForm from "././components/auth/ItemForm";
import ItemEdit from "././components/auth/ItemEdit";
import Alert from "././components/Alert";
import StickyFooter from "././components/Footer";

//Redux
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import { Provider } from "react-redux";
import store from "./store";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Grid container justify='center' alignItems='center'>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Navbar />
          </Grid>
          <Grid container justify='center' direction='row'>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
              style={{
                minHeight: "100%", //"calc(100vh - 100px)",
                backgroundColor: "#3B4557",
              }}
            >
              <section className='container'>
                <Alert />
                <Switch>
                  <Route exact path='/login' component={Login}></Route>
                  <Route exact path='/addItem' component={ItemForm}></Route>
                  <Route
                    exact
                    path='/editItem/:id'
                    component={ItemEdit}
                  ></Route>
                </Switch>
              </section>
              <Route exact path='/' component={Wrapper}></Route>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <StickyFooter></StickyFooter>
            </Grid>
          </Grid>
        </Grid>
      </Router>
    </Provider>
  );
};

export default App;
