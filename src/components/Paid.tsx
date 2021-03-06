import * as React from "react"

export interface PaidProps {}

export class Paid extends React.Component<PaidProps, any> {
  constructor(props: PaidProps, context: any) {
    super(props, context)
    this.state = {}
  }

  render(): JSX.Element {
    return (
      <div id="paid">
        <p>
          <span className="glyphicon glyphicon-ok" />
        </p>
        <p className="cardTitle">Success!</p>
        <p className="cardText">You have fully paid the invoice.</p>
        <p>
          <a href="https://www.bitcoin.com/" className="universal-menu-link">
            All Done
          </a>
        </p>
      </div>
    )
  }
}
