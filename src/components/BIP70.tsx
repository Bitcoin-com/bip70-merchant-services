import * as React from "react"
import { BadgerButton } from "./BadgerButton"
import { PoweredBy } from "./PoweredBy"
import { Card } from "./Card"
import { Info } from "./Info"
import axios from "axios"

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

  async componentDidMount() {
    let totalAmount: number = 0
    if (this.state.currency === "BCH") {
      this.setState({
        symbol: "BCH"
      })
      this.state.outputs.forEach((output: any) => {
        totalAmount += output.amount
      })
      totalAmount = totalAmount / 100000000
    } else if (this.state.currency === "SLP") {
      const response = await axios.get(
        `https://rest.bitcoin.com/v2/slp/list/${this.state.outputs[0].token_id}`
      )
      totalAmount = this.state.outputs[0].send_amounts.reduce(
        (a: number, b: number) => a + b / 10 ** response.data.decimals,
        0
      )
      this.setState({
        symbol: response.data.symbol
      })
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
          symbol={this.state.symbol}
          time={this.state.time}
          expires={this.state.expires}
        />
        {badgerButton}
        <PoweredBy />
      </div>
    )
  }
}
