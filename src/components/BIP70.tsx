import * as React from "react"
import { BadgerButton } from "./BadgerButton"
import { PoweredBy } from "./PoweredBy"
import { Card } from "./Card"
import { Info } from "./Info"
import axios from "axios"
import { AxiosResponse } from "axios"
import { css } from "@emotion/core"
// First way to import
import { RingLoader } from "react-spinners"
const override = css`
  display: block;
  margin: 0 auto;
`

// import txSampleData from "./bchTxSampleData"
import txSampleData from "./slpTxSampleData"
// import txSampleData from "./bchTxSampleData"
// import txSampleRequest from "./slpTxSampleRequest"
import txSampleRequest from "./bchTxSampleRequest"

export interface BIP70Props {
  compiler: string
  framework: string
}

export class BIP70 extends React.Component<BIP70Props, any> {
  constructor(props: BIP70Props, context: any) {
    super(props, context)
    this.toggleStatus = this.toggleStatus.bind(this)
    this.state = {
      loading: true
    }
  }

  async componentDidMount(): Promise<any> {
    // GET existing invoice
    // const invoice: AxiosResponse = await axios.get(
    //   "https://pay.bitcoin.com/s/EWe9kqdfnV2CnLNyxP9Fc9",
    //   { headers: { Accept: "application/json" } }
    // )

    // POST to create new invoice
    const invoice: AxiosResponse = await axios.post(
      `https://pay.bitcoin.com/create_invoice`,
      txSampleRequest
    )

    this.setState(invoice.data)
    this.setState({
      loading: false,
      qr: `https://pay.bitcoin.com/qr/${this.state.paymentId}`
    })
    let totalAmount: number = 0
    if (this.state.currency === "BCH") {
      this.setState({
        symbol: "BCH"
      })
      this.state.outputs.forEach(
        (output: {
          address: string
          amount: number
          script: string
          type: string
        }) => {
          totalAmount += output.amount
        }
      )
      totalAmount = totalAmount / 100000000
    } else if (this.state.currency === "SLP") {
      const response: AxiosResponse = await axios.get(
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

  toggleStatus(): void {
    this.setState({
      status: "expired"
    })
  }

  render(): JSX.Element {
    let badgerButton: any
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
        <RingLoader
          css={override}
          sizeUnit={"px"}
          size={150}
          color="#0ac18e"
          loading={this.state.loading}
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
          qr={this.state.qr}
        />
        {badgerButton}
        <PoweredBy />
      </div>
    )
  }
}
