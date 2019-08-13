import * as React from "react"
import { Expired } from "./Expired"
import { Paid } from "./Paid"
import { Open } from "./Open"
import { NeedHelp } from "./NeedHelp"
import { BadgerButton } from "./BadgerButton"
import Logo from "../logo.png"

export interface BIP70Props {
  compiler: string
  framework: string
}

export class BIP70 extends React.Component<BIP70Props, any> {
  // this constructor is necessary to make the props work
  constructor(props: BIP70Props, context: any) {
    super(props, context)
    this.state = {
      network: "main",
      currency: "SLP",
      outputs: [
        {
          script:
            "6a04534c500001010453454e44204de69e374a8ed21cbddd47f2338cc0f479dc58daa2bbe11cd604ca488eca0ddf08000000001dcd6500",
          amount: 0,
          token_id:
            "4de69e374a8ed21cbddd47f2338cc0f479dc58daa2bbe11cd604ca488eca0ddf",
          send_amounts: [500000000],
          type: "SLP"
        },
        {
          script: "76a914eed376878448bf27739ecf8497752f2b4033d60388ac",
          amount: 546,
          address: "1Nmo9N3ZVsL8GFrv6uNfr55a9ni4RoT7Fn",
          type: "P2PKH"
        }
      ],
      time: "2019-08-08T05:36:19.643Z",
      expires: "2019-08-08T05:51:19.643Z",
      status: "open",
      merchantId: "00000000-0000-0000-0000-000000000000",
      // merchantId: "Bitcoin Donation",
      // memo: "Wikimedia Foundation",
      memo: "Payment request for invoice E1BifGbS9wCHBKopaGE38Z",
      fiatSymbol: "BCH",
      fiatRate: 1,
      paymentUrl: "https://pay.bitcoin.com/i/F7MvZJhNm2VJEsMTjtMCHX",
      paymentId: "F7MvZJhNm2VJEsMTjtMCHX"
    }
  }

  render() {
    let needHelp, open, expired, paid, badgerButton
    if (this.state.status === "open") {
      // open
      needHelp = <NeedHelp />

      open = <Open paymentUrl={this.state.paymentUrl} />

      badgerButton = <BadgerButton />
    } else if (this.state.status === "paid") {
      // paid
      paid = <Paid />
    } else if (this.state.status === "expired") {
      // expired
      expired = <Expired paymentId={this.state.paymentId} />
    }

    return (
      <div className="container">
        <div className="info">
          <h1>{this.state.memo}</h1>
          <h2>{this.state.merchantId}</h2>
          {needHelp}
        </div>
        <div className="card">
          {open}
          {paid}
          {expired}
        </div>
        {badgerButton}
        <div id="poweredBy">
          <p>
            <span className="brandGreen glyphicon glyphicon-lock" />
          </p>
          <p>Powered by </p>
          <p>
            <a href="https://www.bitcoin.com/" className="universal-menu-link">
              <img src={Logo} alt="Bitcoin.com" />
            </a>
          </p>
        </div>
      </div>
    )
  }
}
