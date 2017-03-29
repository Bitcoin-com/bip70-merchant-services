/**
 * ======================================
 * This the root component for your app.
 * ======================================
 */

// import root less file here as an entry point for all other less files. these are imported
// in index.less (including bootstrap).
// You can also import less files in other tsx files instead of importing them in index.less.
import "./index.less";

// import "React" here to prevent the error "TS2686 [...]refers to a UMD global[...]"
import * as React from "react";
import * as ReactDOM from "react-dom";

import {Hello} from "./components/Hello";

ReactDOM.render(
    <Hello compiler="TypeScript" framework="ReactJS"/>,
    document.getElementById("app")
);