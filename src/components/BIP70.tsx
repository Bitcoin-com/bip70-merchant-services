import * as React from "react"
import { BadgerButton } from "./BadgerButton"
import { PoweredBy } from "./PoweredBy"
import { Card } from "./Card"
import { Info } from "./Info"

export interface BIP70Props {
  compiler: string
  framework: string
}

export class BIP70 extends React.Component<BIP70Props, any> {
  // this constructor is necessary to make the props work
  constructor(props: BIP70Props, context: any) {
    super(props, context)
    this.toggleStatus = this.toggleStatus.bind(this)
    this.state = {
      network: "main",
      currency: "BCH",
      outputs: [
        {
          script: "76a914018a532856c45d74f7d67112547596a03819077188ac",
          amount: 7500,
          address: "199PArEUmwmcch2LsjxVpegDXsomKdgYi",
          type: "P2PKH"
        },
        {
          script: "76a9145d02663da9af3acde02fcd138abd998ab9edd56d88ac",
          amount: 10500,
          address: "19UniZ1obAjU1tgUydYLzhyvaMignd1oNE",
          type: "P2PKH"
        }
      ],
      time: "2019-08-13T19:08:24.672Z",
      expires: "2019-08-13T19:23:24.672Z",
      status: "open",
      merchantId: "00000000-0000-0000-0000-000000000000",
      memo: "Payment request for invoice Ejw1vDyG4VELGKa3LMYnJa",
      fiatSymbol: "BCH",
      fiatRate: 1,
      paymentUrl: "https://pay.bitcoin.com/i/Ejw1vDyG4VELGKa3LMYnJa",
      paymentId: "Ejw1vDyG4VELGKa3LMYnJa"
    }
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
