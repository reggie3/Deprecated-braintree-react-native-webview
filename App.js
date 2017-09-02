import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BraintreePaymentWebview from "./web/BraintreePaymentWebview";
import * as brainTreeUtils from "./braintreeUtils";

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      clientToken: "",
      paymentAPIResponse: ""
    };
  }

  componentDidMount = () => {
    brainTreeUtils
      .getClientToken({
        merchantAccountID: null,
        customerID: '12345678'
      })
      .then(response => {
        // console.log({ response });
        if (response.type === "success") {
          let clientToken = response.response.result.clientToken;
          this.setState({
            clientToken
          });
        }
      });
  };

  /******
   * called by BraintreePaymentWebview once a nonce is recieved by
   * the webview and posts the purchase to the applicationServer
   */
  nonceObtainedCallback = nonce => {
    // make api call to purchase the item using the nonce received
    // from BraintreeWebView Component
    
    brainTreeUtils
      .postPurchase(nonce, this.props.cart.totalPrice, {})
      .then(response => {
        console.log({ response });
        if (response.type === "success") {
          this.setState({ paymentAPIResponse: "purchaseSuccess" });
          this.props.dispatch(actions.cartActions.emptyCart());
        } else {
          this.setState({ paymentAPIResponse: "purchaseFailure" });
        }
      });
  };

  purchaseCompleteCallback = response => {
    console.log("purchaseCompleteCallback");
  };

  // enables payment webview to display a button that navigates back
  // to home page even though it doesn't have access to router
  navigationBackCallback = () => {
    this.props.dispatch(actions.navActions.navigateTo("Home"));
  };


  render() {
    return (
       <BraintreePaymentWebview
            clientToken={this.state.clientToken}
            nonceObtainedCallback={this.nonceObtainedCallback}
            paymentAPIResponse={this.state.paymentAPIResponse}
            navigationBackCallback={this.navigationBackCallback}
            options={{
              creditCard: true
            }}
          />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
