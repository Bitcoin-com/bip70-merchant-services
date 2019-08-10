import * as React from "react"

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
      status: "expired",
      merchantId: "00000000-0000-0000-0000-000000000000",
      memo: "Payment request for invoice F7MvZJhNm2VJEsMTjtMCHX",
      fiatSymbol: "BCH",
      fiatRate: 1,
      paymentUrl: "https://pay.bitcoin.com/i/F7MvZJhNm2VJEsMTjtMCHX",
      paymentId: "F7MvZJhNm2VJEsMTjtMCHX"
    }
  }

  render() {
    let needHelp, open, expired
    if (this.state.status !== "expired") {
      needHelp = (
        <p>
          <a href="https://developer.bitcoin.com" target="_blank">
            Need Help?
          </a>
        </p>
      )

      open = (
        <div id="open">
          <h1>
            Hello from{" "}
            <span className="myCustomStyleClass">{this.props.compiler}</span>{" "}
            and {this.props.framework}!
          </h1>
          <p>
            Here is a fantastic Glyphicon{" "}
            <span className="glyphicon glyphicon-ok" />
          </p>
        </div>
      )
    } else {
      expired = (
        <div id="expired">
          <p>
            <span className="glyphicon glyphicon-remove" />
          </p>
          <p className="cardTitle">Invoice Expired</p>
          <p className="cardText">
            An invoice is only valid for 15 minutes. Return to the merchant if
            you would like to resubmit a payment.
          </p>
          <p id="invoiceIdLabel">Invoice ID</p>
          <p id="invoiceId" className="cardText">
            {this.state.paymentId}
          </p>
          <p>
            <a href="https://developer.bitcoin.com" target="_blank">
              Try Again
            </a>
          </p>
        </div>
      )
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
          {expired}
        </div>
        <h2>
          <button>Badger Button</button>
        </h2>
        <div id="poweredBy">
          <p>
            <span className="glyphicon glyphicon-lock" />
          </p>
          <p>Powered by </p>
          <p>
            <a href="https://www.bitcoin.com/" className="universal-menu-link">
              <img
                src="data:image/png;base64,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"
                alt="Bitcoin.com"
              />
            </a>
          </p>
        </div>
      </div>
    )
  }
}
