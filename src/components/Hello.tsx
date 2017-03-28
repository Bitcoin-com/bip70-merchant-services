import * as React from "react";

export interface HelloProps {
   compiler: string;
   framework: string;
}

export class Hello extends React.Component<HelloProps, any> {
   render() {
      return <div className="container">
         <div className="jumbotron">
            <h1>Hello from <span className="myCustomStyleClass">Bla</span> and Blupp!</h1>
            <p>Here is a fantastic Glyphicon <span className="glyphicon glyphicon-ok"></span></p>
         </div>
      </div>;
   }
}