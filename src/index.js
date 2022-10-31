import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
// on importe le Provider
import { Provider } from "react-redux";
import  Store  from "./api/Store";
 
import App from "./App";
 
const rootElement = document.getElementById("root");
ReactDOM.render(
    // Le Provider doit englober toute l'application !
    <Provider store={Store}>
        <StrictMode>
            <App />
        </StrictMode>
    </Provider>,
    rootElement
);
