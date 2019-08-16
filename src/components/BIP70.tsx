import * as React from "react"
import { BadgerButton } from "./BadgerButton"
import { PoweredBy } from "./PoweredBy"
import { Card } from "./Card"
import { Info } from "./Info"
import axios from "axios"
import { AxiosResponse } from "axios"
import { css } from "@emotion/core"
import { w3cwebsocket } from "websocket"
// First way to import
import { RingLoader } from "react-spinners"
const override = css`
  display: block;
  margin: 0 auto;
`

// Sample requests
// import txSampleRequest from "./bchTxSampleRequest"
import txSampleRequest from "./slpTxSampleRequest"

// Sample Responses
// import txSampleResponse from "./bchTxSampleResponse"
// import txSampleResponse from "./slpTxSampleResponse"

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
    // GET existing invoice using websocket
    let splitPath = location.pathname.split('/')
    const paymentId: string = splitPath[splitPath.length - 1]
    // let paymentId: string = "EW4CNuFCmYrPa7PjvwPcv8"

    const client = new w3cwebsocket (`wss://pay.bitcoin.com/s/${paymentId}`, "echo-protocol");

    client.onerror = function() {
        console.log("Connection Error");
    }

    const self = this
    client.onmessage = async function(e: any) {
      if (typeof e.data === "string") {
          self.updateInvoice(JSON.parse(e.data))
          console.log(e);
      }
    }

    // POST to create new invoice
    // const invoice: AxiosResponse = await axios.post(
    //   `https://pay.bitcoin.com/create_invoice`,
    //   txSampleRequest
    // )

    // Uncomment for Sample Response
    // this.updateInvoice(txSampleResponse)

    // Uncomment for actual Response
    // this.updateInvoice(invoice.data)
  }

  async updateInvoice(invoice: object): Promise<any> {
    this.setState(invoice)
    this.setState({
      loading: false,
      qr: `https://pay.bitcoin.com/qr/${this.state.paymentId}`
    })

    // Merchant data endpoint
    const merchantData: AxiosResponse = await axios.get(
      `https://pay.bitcoin.com/m/${this.state.paymentId}`,
      { headers: { Accept: "application/json" } }
    )

    this.setState(merchantData.data)
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
          email={this.state.email}
          merchant={this.state.name}
          paymentId={this.state.paymentId}
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
