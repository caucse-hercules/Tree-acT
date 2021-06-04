import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { Hello } from "./components/App";
import rootReducer from "./module";
import { StylesProvider } from "@material-ui/core/styles";
const composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 25 });

const store = createStore(rootReducer, composeEnhancers());

ReactDOM.render(
  <Provider store={store}>
    <StylesProvider injectFirst>
      <div style={{ backgroundColor: "rgb(30,30,30)" }}>
        <Hello />
      </div>
    </StylesProvider>
  </Provider>,
  document.getElementById("root")
);
