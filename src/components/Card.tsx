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
  symbol: string
  time: string
  expires: string
  qr: string
}

export class Card extends React.Component<CardProps, any> {
  constructor(props: CardProps, context: any) {
    super(props, context)
    this.toggleStatus = this.toggleStatus.bind(this)
    this.state = {}
  }

  toggleStatus(): void {
    this.props.toggleStatus()
  }

  setUri(): string {
    return `bitcoincash:?r=${this.props.paymentUrl}`
  }

  render(): JSX.Element {
    let open, expired, paid
    if (this.props.status === "open") {
      open = (
        <Open
          amount={this.props.amount}
          toggleStatus={this.toggleStatus}
          paymentUri={this.setUri()}
          symbol={this.props.symbol}
          time={this.props.time}
          expires={this.props.expires}
          qr={this.props.qr}
        />
      )
    } else if (this.props.status === "paid") {
      paid = <Paid />
    } else if (this.props.status === "expired") {
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
