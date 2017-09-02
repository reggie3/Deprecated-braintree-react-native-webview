import { createStore, compose, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import rootReducer from "./reducers";

export let defaultState = {
  componentState: {
    paymentStatus: undefined,
    showActivityIndicator: false,
    testData: 'this is some test data'
  },
};

const logger = createLogger();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  defaultState,
  composeEnhancers(applyMiddleware(logger))
);


