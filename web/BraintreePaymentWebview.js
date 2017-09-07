import React from "react";
import { Text, View, Button, WebView } from "react-native";
import actions from "./actions";
import { Provider, connect } from "react-redux";
import { store } from "./store";

class BraintreePaymentWebviewComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      currentPaymentStatus: null
    };
  }

  componentWillMount = () => {
    this.props.dispatch(
      actions.changeTestStatement("Braintree Payment Webview Mounted")
    );
  };

  componentWillReceiveProps = nextProps => {
    if (!this.state.clientToken && nextProps.clientToken) {
      // debugger;
      this.sendMessageToWebview("CLIENT_TOKEN_RECEIVED", nextProps.clientToken);
      this.setState({ clientToken: nextProps.clientToken });
    }
  };

  sendMessageToWebview = (eventName, eventData) => {
    this.webview.postMessage(
      JSON.stringify({
        type: "event",
        name: eventName,
        payload: eventData
      })
    );
  };

  onMessage = event => {
    // debugger;
    console.log("from HTML: ", event.nativeEvent.data);
  };

  render() {
    return (
      <Provider store={store}>
        <View
          style={{
            flex: 1,
            backgroundColor: `lightblue`
          }}
        >
          <WebView
            onLoad={this.sendClientTokenToWebView}
            source={require("../dist/index.html")}
            style={{ flex: 1 }}
            ref={webview => (this.webview = webview)}
            onMessage={this.onMessage}
          />
          <Text>Webview Component</Text>
        </View>
      </Provider>
    );
  }
}

const mapStateToProps = state => {
  return Object.assign(
    {},
    {
      componentState: state.componentState
    }
  );
};

function connectWithStore(store, WrappedComponent, ...args) {
  var ConnectedWrappedComponent = connect(...args)(WrappedComponent);
  return function(props) {
    return <ConnectedWrappedComponent {...props} store={store} />;
  };
}

export default (BraintreePaymentWebview = connectWithStore(
  store,
  BraintreePaymentWebviewComponent,
  mapStateToProps
));
