import "index.less";
import {Hello} from "./components/Hello";

ReactDOM.render(
    <Hello compiler="TypeScript" framework="React"/>,
    document.getElementById("app")
);