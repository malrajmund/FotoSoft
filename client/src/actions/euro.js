import { GET_CURRENCY } from "./types";

export const getCurrency = () => async (dispatch) => {
  let response = () => {
    return new Promise(function (res, rej) {
      fetch("https://api.nbp.pl/api/exchangerates/rates/a/eur", {
        method: "GET",
        mode: "cors",
        body: JSON.stringify(),
      }).then((response) => {
        res(response.json());
      });
    });
  };
  let responseData = await response();
  dispatch({
    type: GET_CURRENCY,
    payload: responseData.rates[0].mid,
  });
};
