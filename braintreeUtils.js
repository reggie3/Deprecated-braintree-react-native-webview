import Secrets from "./secrets";
const URL = Secrets.API_URL;
import get from "lodash.get";

export const getClientToken = (options = {}) => {
  return fetch(URL + "/payment?action=get-client-token", {
    method: "POST",
    body: JSON.stringify(
        options
    )
  }).then(res => {
    let json = res.json();
    console.log(json);
    return json;
  });
};

export const postPurchase = (nonce, amount) => {
  debugger;
  console.log("in postPurchase");
  return fetch(URL + "/payment?action=purchase-item", {
    method: "POST",
    body: JSON.stringify({
      nonce,
      amount
    })
  }).then(res => {
    let json = res.json();
    console.log(json);
    return json;
  });
};
