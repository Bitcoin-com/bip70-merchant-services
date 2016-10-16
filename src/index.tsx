import * as React from "react";
import * as ReactDOM from "react-dom";
import {Hello} from "./components/Hello";

import "./index.less";

ReactDOM.render(
    <Hello compiler="TypeScript" framework="React"/>,
    document.getElementById("app")
);