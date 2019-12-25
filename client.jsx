const React = require("react");
const ReactDOM = require("react-dom");

const { hot } = require("react-hot-loader/root");
import App from "./component/App.jsx";

const Hot = hot(App);

ReactDOM.render(<Hot />, document.querySelector("#root"));
