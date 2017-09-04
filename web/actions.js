let actions = {
  setClientToken: (clientToken)=>{
    return{
      type: "SET_CLIENT_TOKEN",
      clientToken
    }
  },
  updatePaymentStatus: function(paymentStatus, options) {
    return {
      type: "UPDATE_PAYMENT_STATUS",
      paymentStatus,
      options
    };
  },
  showActivityIndicator: function() {
    return {
      type: "SHOW_ACTIVITY_INDICATOR"
    };
  },
  hideActivityIndicator: function() {
    return {
      type: "HIDE_ACTIVITY_INDICATOR"
    };
  },
  setHTMLMessage: function(msg){
    return{
      type: "SET_HTML_MESSAGE",
      msg
    }
  },
  changeTestStatement: function(msg){
    return{
      type: "CHANGE_TEST_STATEMENT",
      msg
    }
  }
};

export default actions;
