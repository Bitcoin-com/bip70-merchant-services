import * as React from "react"

export interface HelloProps {
  compiler: string
  framework: string
}

export class Hello extends React.Component<HelloProps, any> {
  // this constructor is necessary to make the props work
  constructor(props: HelloProps, context: any) {
    super(props, context)
  }

  render() {
    return (
      <div className="container">
        <h1>Wikimedia Foundation</h1>
        <h2>Bitcoin Donation</h2>
        <p>Need Help?</p>
        <div className="jumbotron">
          <h1>
            Hello from{" "}
            <span className="myCustomStyleClass">{this.props.compiler}</span>{" "}
            and {this.props.framework}!
          </h1>
          <p>
            Here is a fantastic Glyphicon{" "}
            <span className="glyphicon glyphicon-ok" />
          </p>
        </div>
        <h2>
          <button>Badger Button</button>
        </h2>
        <h2>Powered by bitcoin.com</h2>
      </div>
    )
  }
}
