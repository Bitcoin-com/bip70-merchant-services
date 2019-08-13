import * as React from "react"

export interface PaidProps {}

export class Paid extends React.Component<PaidProps, any> {
  // this constructor is necessary to make the props work
  constructor(props: PaidProps, context: any) {
    super(props, context)
    this.state = {}
  }

  render() {
    return (
      <div id="paid">
        <p>PAID</p>
      </div>
    )
  }
}
