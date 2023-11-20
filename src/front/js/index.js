//import react into the bundle
import React from "react";
//import ReactDOM from "react-dom";
import { createRoot} from "react-dom/client";

//include your index.scss file into the bundle
import "../styles/main.css";

//import your own components
import Layout from "./layout";

//render your react application

const rootElement = document.getElementById("app");
const root = createRoot(rootElement);
root.render(<Layout />);


// ReactDOM.render(<Layout />, document.querySelector("#app"));
