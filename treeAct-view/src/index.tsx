import { StylesProvider } from "@material-ui/core/styles";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { MessageData } from "../../common/types";
import App from "./components/App";
import rootReducer from "./module";

declare const vscode: vscode;

type vscode = {
  getState(): any;
  setState(state: any): void;
  postMessage(message: MessageData): void;
};

console.log("vscode getstate", vscode.getState());

// vscode.postMessage({ command: "init" });

const composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 25 });

const store = createStore(rootReducer, composeEnhancers());

ReactDOM.render(
  <Provider store={store}>
    <StylesProvider injectFirst>
      <App />
    </StylesProvider>
  </Provider>,
  document.getElementById("root")
);
