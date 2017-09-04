// download and use react an react-dom from local directory
// to avoid conflicts with Expo version of react
import React from "./react.min";
import ReactDOM from "./react-dom.min";
import { Provider, connect } from "react-redux";
import actions from "./actions";
import {store} from "./store";
import renderIf from "render-if";
import { Spinner } from "react-activity";
import dropin from "braintree-web-drop-in";
import glamorous from "glamorous";

const Button = glamorous.span({
  borderRadius: "2px",
  padding: "2px 10px 2px 10px",
  backgroundColor: "#2ecc71",
  fontSize: "1.25em",
  color: "white",
  fontFamily: "arial",
  boxShadow: "0 1px 4px rgba(0, 0, 0, .6)"
});
const PaymentBackground = glamorous.div({
  backgroundColor: "#FED2F1",
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
});

const PrintElement = data => {
  var el = document.createElement("pre");
  var str = JSON.stringify(data);
  el.innerHTML = str;
  document.getElementById("messages").appendChild(el);
};

class BraintreeHTMLComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      currentPaymentStatus: null
    };
  }

  componentDidMount = () => {
    try {
      window.postMessage("componentDidMount", "*");
      PrintElement("componentDidMount success");
    } catch (error) {
      PrintElement(error);
    }

    this.props.dispatch(actions.setHTMLMessage("Hello from HTML"));
  };

  componentWillReceiveProps = nextProps => {
    console.log({ nextProps });
    PrintElement({
      msg: "componentWillReceiveProps",
      nextProps
    });
    if (nextProps.paymentStatus !== this.state.currentPaymentStatus) {
      switch (nextProps.paymentStatus) {
        case "CLIENT_TOKEN_RECEVIED":
          PrintElement({
            msg: "CLIENT_TOKEN_RECEVIED",
            token: this.props.componentState.clientToken
          });
          getBraintreeUIElement(this.props.componentState.clientToken);
          break;
        default:
          console.log("ignoring paymentStatusChange");
          break;
      }
      console.log(nextProps.paymentAPIResponse);
      this.setState({ currentPaymentStatus: nextProps.paymentStatus });
    }
  };

  getBraintreeUIElement = clientToken => {
    let that = this;
    PrintElement({
      msg: "getBraintreeUIElement",
      token: clientToken
    });
    this.props.dispatch(actions.updatePaymentStatus("REQUEST_UI_PENDING"));

    dropin
      .create({
        authorization: this.props.componentState.clientToken,
        container: "#dropin-container"
      })
      .then(instance => {
        this.props.dispatch(
          actions.updatePaymentStatus("REQUEST_UI_FULFILLED", {
            instance
          })
        );
      })
      .catch(function(err) {
        // Handle any errors that might've occurred when creating Drop-in
        this.props.dispatch(
          actions.updatePaymentStatus("REQUEST_UI_REJECTED", {
            err
          })
        );
      });
  };
     submitPurchase = () => {
    PrintElement({
      msg: "submitPurchase clicked"
    });
    this.props.dispatch(actions.setHTMLMessage("submitPurchase clicked"));
  };

  render = () => {
    return (
      <Provider store={store}>
        <PaymentBackground
          ref={component => {
            this.webComponent = component;
          }}
        >
          <div id="dropin-container" />
          <div>HTML component</div>
          <div>{this.props.componentState.testData}</div>
          <Button id="submit-button" onClick={this.submitPurchase}>
            Submit Purchase
          </Button>
          <div id="messages" />
        </PaymentBackground>
      </Provider>
    );
  };
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

const BraintreeHTML = connectWithStore(
  store,
  BraintreeHTMLComponent,
  mapStateToProps
);

ReactDOM.render(<BraintreeHTML />, document.getElementById("root"));


  /*constructor() {
    super();
    this.state = {
      paymentState: null,
      clientToken: null,
      instance: null,
      nonce: null,
      msg: null,
      message: "blank"
    };
  }

  componentDidMount = () => {
     // add an event listener for messages from the parent React Native component
    this.webComponent.addEventListener(
      "message",
      (event) => {
        alert("Received post message", that.handlePostMesage);
      },
      false
    );
    this.setState({ message: "componentDidMount" });

    window.postMessage(
      JSON.stringify({
        type: "event",
        meta: {
          eventName: "eventName"
        },
        payload: "eventData"
      }),
      "*"
    );
  };

  componentWillUnmount() {
    // Make sure to remove the DOM listener when the component is unmounted.
    this.webComponent.removeEventListener("message", this.handlePostMessage);
  }

  // handle messages received from parrent
  handlePostMessage = event => {
    this.setState({ message: { event } });
    console.log("handlePostMesage:", event);
    alert({ event });
  };

  getClientToken = () => {
    // get handle to that for use later
    let that = this;

    // get the client token from our server
    // and ensure state variables are empty of previous information
    this.setState(
      {
        paymentState: "RequestClientTokenPending",
        clientToken: null,
        instance: null,
        nonce: null,
        msg: null
      },
      () => {
        brainTreeUtils.getClientToken().then(res => {
          console.log({ res });
          if (res.type === "success") {
            let clientToken = res.response.result.clientToken;
            this.setState({
              clientToken,
              paymentState: "RequestClientTokenFulfilled"
            });

            // request the braintree UI
            this.createBraintreeUI();
          } else {
            this.setState({
              paymentState: "RequestClientTokenRejected"
            });
          }
        });
      }
    );
  };

  createBraintreeUI = () => {
    
  };

  submitPaymentMethod = () => {
    this.state.instance.requestPaymentMethod(function(err, payload) {
      if (err) {
        this.setState({
          paymentState: "SubmitPaymentMethodRejected"
        });
      } else {
        // Submit payload.nonce to your server
        console.log({ payload });
        this.setState({
          paymentState: "SubmitPaymentMethodFulfilled",
          nonce: payload
        });
      }
    });
  };

  postPurchase = () => {
    brainTreeUtils
      .postPurchase(json.payload.nonce, this.props.cart.totalPrice)
      .then(response => {
        console.log({ response });
        if (response.type === "success") {
          this.webview.emit("purchaseSuccess");
        } else {
          this.webview.emit("purchaseFailure", { payload: json.err });
        }
      });
  };

  renderBody = state => {
    console.log("here");
    // select renderable based on the payment state
    switch (state) {
      case "RequestClientTokenPending":
        return <Spinner size={20} />;
        break;
      case "RequestClientTokenFufilled":
        return <div>RequestClientTokenFufilled</div>;
        break;
      case "RequestClientTokenRejected":
        return <div>RequestClientTokenRejected</div>;
        break;
      case "RequestUIPending":
        return <Spinner size={20} />;
        break;
      case "RequestUIFullfilled":
        return (
          <div>
            <button id="submit-button" onClick={this.submitPaymentMethod}>
              Submit Purchase
            </button>
          </div>
        );
        break;
      case "RequestUIRejected":
        return <div>RequestUIRejected</div>;
        break;
      case "SubmitPaymentMethodPending":
        return <Spinner size={20} />;
        break;
      case "SubmitPaymentMethodFulfilled":
        return <div>SubmitPaymentMethodFulfilled</div>;
        break;
      case "SubmitPaymentMethodRejected":
        return <div>SubmitPaymentMethodRejected</div>;
        break;
      case "SubmitNoncePending":
        return <Spinner size={20} />;
        break;
      case "SubmitNonceFulfilled":
        return <div>SubmitNonceFulfilled</div>;
        break;
      case "SubmitNonceRejected":
        return <div>SubmitNonceRejected</div>;
        break;
      default:
        return <div>default</div>;
        break;
    }
  };
 */

 