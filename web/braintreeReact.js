// download and use react an react-dom from local directory
// to avoid conflicts with Expo version of react
import React from "./react.min";
import ReactDOM from "./react-dom.min";
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

// from user Dryymoon at this Github thread
// : https://github.com/facebook/react-native/issues/11594
// fixes issue that caused postMessage to not reach WebView
function awaitPostMessage() {
  let isReactNativePostMessageReady = !!window.originalPostMessage;
  const queue = [];
  let currentPostMessageFn = function store(message) {
    if (queue.length > 100) queue.shift();
    queue.push(message);
  };
  if (!isReactNativePostMessageReady) {
    // const originalPostMessage = window.postMessage;
    Object.defineProperty(window, "postMessage", {
      configurable: true,
      enumerable: true,
      get() {
        return currentPostMessageFn;
      },
      set(fn) {
        currentPostMessageFn = fn;
        isReactNativePostMessageReady = true;
        setTimeout(sendQueue, 0);
      }
    });
  }

  function sendQueue() {
    while (queue.length > 0) window.postMessage(queue.shift());
  }
}

// print something in an html element
const PrintElement = data => {
  var el = document.createElement("pre");
  var str = JSON.stringify(data);
  el.innerHTML = str;
  document.getElementById("messages").appendChild(el);
};

class BraintreeHTML extends React.Component {
  constructor() {
    super();
    this.state = {
      currentPaymentStatus: null
    };
  }

  componentWillMount = () => {
    awaitPostMessage();
    this.addEventListeners();
  };

  componentWillUnmount = () => {
    window.removeEventListener("message", this.handleMessage);
    document.removeEventListener("message", this.handleMessage);
  };

  componentDidMount = () => {
    try {
      window.postMessage("componentDidMount", "*");
      PrintElement("componentDidMount success");
    } catch (error) {
      PrintElement(error);
    }
  };

  addEventListeners = () => {
    // add an event listener to receive messages from parent WebView
    document.addEventListener("message", this.handleMessage);
    window.addEventListener("message", this.handleMessage);
  };

  handleMessage = event => {
    debugger;
    console.log("Received post message", event);
    let data = JSON.parse(event.nativeEvent.data);
    PrintElement(data.name.eventName);
    switch (data.name.eventName) {
      case "CLIENT_TOKEN_RECEIVED":
        getBraintreeUIElement(data.payload.clientToken);
        break;
      default:
        PrintElement("Unhandled case in handleMessage");
        break;
    }
  };

  // create the Braintree UI element
  getBraintreeUIElement = clientToken => {
    let that = this;
    PrintElement({
      msg: "getBraintreeUIElement",
      token: clientToken
    });

    // create the Braintree UI in the div
    dropin
      .create({
        authorization: clientToken,
        container: "#dropin-container"
      })
      .then(instance => {
        window.postMessage(
          JSON.stringify({
            type: "event",
            name: "REQUEST_UI_FULFILLED"
          }),
          "*"
        );
        document
          .getElementById("submit-button")
          .addEventListener(
            "click",
            handleSubmitPurchaseButtonClicked.bind(instance)
          );
      })
      .catch(function(err) {
        // Handle any errors that might've occurred when creating Drop-in
        this.props.dispatch(
          window.postMessage(
            JSON.stringify({
              type: "event",
              name: "REQUEST_UI_REJECTED",
              payload: err
            }),
            "*"
          )
        );
      });
  };

  // hnadler for when the purchase button is clicke
  handleSubmitPurchaseButtonClicked = instance => {
    PrintElement({
      msg: "submitPurchase clicked",
      instance
    });

    // send a message to the parent WebView so that it
    // can display feedback to user
    this.props.dispatch(
      window.postMessage(
        JSON.stringify({
          type: "event",
          name: "PURCHASE_SUBMITED",
          payload
        }),
        "*"
      )
    );

    // request a purchase nonce from the Braintree server
    instance.requestPaymentMethod(function(err, payload) {
      if (err) {
        // notify the parent WebView if there is an error
        this.props.dispatch(
          window.postMessage(
            JSON.stringify({
              type: "event",
              name: "PURCHASE_REJECTED",
              payload: err
            }),
            "*"
          )
        );
      } else {
        // pass the nonce to the parent WebView if the purchase is successful
        this.props.dispatch(
          window.postMessage(
            JSON.stringify({
              type: "event",
              name: "PURCHASE_FULFILLED",
              payload
            }),
            "*"
          )
        );
      }
    });
  };

  render = () => {
    return (
      <PaymentBackground
        ref={component => {
          this.webComponent = component;
        }}
      >
        <div id="dropin-container" />
        <div>HTML component</div>
        <Button id="submit-button" onClick={this.submitPurchase}>
          Submit Purchase
        </Button>
        <div id="messages" />
      </PaymentBackground>
    );
  };
}

ReactDOM.render(<BraintreeHTML />, document.getElementById("root"));
