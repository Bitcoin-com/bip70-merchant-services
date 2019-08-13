import * as React from "react"
import { BadgerButton } from "./BadgerButton"
import { PoweredBy } from "./PoweredBy"
import { Card } from "./Card"
import { Info } from "./Info"
import bchTxSampleData from "./bchTxSampleData"
// import slpTxSampleData from "./slpTxSampleData"

export interface BIP70Props {
  compiler: string
  framework: string
}

export class BIP70 extends React.Component<BIP70Props, any> {
  constructor(props: BIP70Props, context: any) {
    super(props, context)
    this.toggleStatus = this.toggleStatus.bind(this)
    this.state = bchTxSampleData
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
          amount={this.state.outputs[0].amount}
          status={this.state.status}
          paymentUrl={this.state.paymentUrl}
          paymentId={this.state.paymentId}
          toggleStatus={this.toggleStatus}
        />
        {badgerButton}
        <PoweredBy />
      </div>
    )
  }
}
