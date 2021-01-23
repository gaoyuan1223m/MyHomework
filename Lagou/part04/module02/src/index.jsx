import React from "react";
import ReactDOM from "react-dom";
import AppleBucket from './pages';
import AppleStore from "./store";

const store = new AppleStore();
const component = <AppleBucket store={store} />;
const domElement = document.getElementById("root");

ReactDOM.render(component, domElement);