// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as BRouter, Route } from "react-router-dom";
import App from "../components/App";
import "../../assets/dist/semantic.min.css";
import { createBrowserHistory } from "history";

document.addEventListener("DOMContentLoaded", () => {

  const history = createBrowserHistory();
  ReactDOM.render(
    <BRouter history={history}>
      <Route path="/" component={App} />
    </BRouter>,
    document.body.appendChild(document.createElement("div"))
  );
});
