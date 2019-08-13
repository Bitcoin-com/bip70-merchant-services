import * as React from "react"
import { BadgerButton } from "./BadgerButton"
import { PoweredBy } from "./PoweredBy"
import { Card } from "./Card"
import { Info } from "./Info"
// import txSampleData from "./bchTxSampleData"
import txSampleData from "./slpTxSampleData"

export interface BIP70Props {
  compiler: string
  framework: string
}

export class BIP70 extends React.Component<BIP70Props, any> {
  constructor(props: BIP70Props, context: any) {
    super(props, context)
    this.toggleStatus = this.toggleStatus.bind(this)
    this.state = txSampleData
  }

  componentDidMount() {
    let totalAmount: number = 0
    if (this.state.currency === "BCH") {
      this.state.outputs.forEach((output: any) => {
        totalAmount += output.amount
      })
    } else if (this.state.currency === "SLP") {
      totalAmount = this.state.outputs[0].send_amounts
    }
    this.setState({
      totalAmount: totalAmount
    })
  }

  toggleStatus() {
    this.setState({
      status: "expired"
    })
  }

  render() {
    let badgerButton
    if (this.state.status === "open") {
      badgerButton = <BadgerButton />
    }

    return (
      <div className="container">
        <Info
          status={this.state.status}
          memo={this.state.memo}
          merchantId={this.state.merchantId}
        />
        <Card
          amount={this.state.totalAmount}
          status={this.state.status}
          paymentUrl={this.state.paymentUrl}
          paymentId={this.state.paymentId}
          toggleStatus={this.toggleStatus}
          fiatSymbol={this.state.fiatSymbol}
        />
        {badgerButton}
        <PoweredBy />
      </div>
    )
  }
}
