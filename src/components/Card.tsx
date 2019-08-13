import * as React from "react"
import { Open } from "./Open"
import { Paid } from "./Paid"
import { Expired } from "./Expired"

export interface CardProps {
  amount: number
  status: string
  paymentUrl: string
  toggleStatus: Function
  paymentId: string
  fiatSymbol: string
}

export class Card extends React.Component<CardProps, any> {
  constructor(props: CardProps, context: any) {
    super(props, context)
    this.state = {}
  }

  render() {
    let open, expired, paid
    if (this.props.status === "open") {
      open = (
        <Open
          amount={this.props.amount}
          toggleStatus={this.props.toggleStatus}
          paymentUrl={this.props.paymentUrl}
          fiatSymbol={this.props.fiatSymbol}
        />
      )
    } else if (this.state.status === "paid") {
      paid = <Paid />
    } else if (this.state.status === "expired") {
      expired = <Expired paymentId={this.props.paymentId} />
    }
    return (
      <div className="card">
        {open}
        {paid}
        {expired}
      </div>
    )
  }
}