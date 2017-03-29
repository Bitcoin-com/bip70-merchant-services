import * as React from "react";

export interface HelloProps {
   compiler: string;
   framework: string;
}

export class Hello extends React.Component<HelloProps, any> {

   // this constructor is necessary to make the props work
   constructor(props: HelloProps, context: any) {
      super(props, context);
   }

   render() {
      return <div className="container">
         <div className="jumbotron">
            <h1>Hello from <span className="myCustomStyleClass">{this.props.compiler}</span> and {this.props.framework}!</h1>
            <p>Here is a fantastic Glyphicon <span className="glyphicon glyphicon-ok"></span></p>
         </div>
      </div>;
   }
}