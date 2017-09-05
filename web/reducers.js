export default function reducer(componentState = {}, action) {
  switch (action.type) {
    case "SET_CLIENT_TOKEN":
      return Object.assign({}, componentState, {
        clientToken: action.clientToken,
        paymentStatus: "CLIENT_TOKEN_RECEIVED"
      });

    case "UPDATE_PAYMENT_STATUS":
      return Object.assign({}, componentState, {
        paymentStatus: action.paymentStatus
      });

    case "SHOW_ACTIVITY_INDICATOR":
      return Object.assign({}, componentState, { showActivityIndicator: true });
    case "HIDE_ACTIVITY_INDICATOR":
      return Object.assign({}, componentState, {
        showActivityIndicator: false
      });
      case "SET_HTML_MESSAGE":
      return Object.assign({}, componentState, {
        messageFromHTML: action.msg
      })
    case "CHANGE_TEST_STATEMENT":
      return Object.assign({}, componentState, {
        testData: action.msg
      })
    default:
      return componentState;
  }
}
