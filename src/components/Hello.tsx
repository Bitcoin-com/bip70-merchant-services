import * as React from "react"

export interface HelloProps {
  compiler: string
  framework: string
}

export class Hello extends React.Component<HelloProps, any> {
  // this constructor is necessary to make the props work
  constructor(props: HelloProps, context: any) {
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
      memo: "Payment request for invoice F7MvZJhNm2VJEsMTjtMCHX",
      fiatSymbol: "BCH",
      fiatRate: 1,
      paymentUrl: "https://pay.bitcoin.com/i/F7MvZJhNm2VJEsMTjtMCHX",
      paymentId: "F7MvZJhNm2VJEsMTjtMCHX"
    }
  }

  render() {
    return (
      <div className="container">
        <h1>{this.state.memo}</h1>
        <h2>{this.state.merchantId}</h2>
        <p>
          <a href="https://developer.bitcoin.com" target="_blank">
            Need Help?
          </a>
        </p>
        <div className="jumbotron">
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
        <h2>
          <button>Badger Button</button>
        </h2>
        <h2>Powered by bitcoin.com</h2>
      </div>
    )
  }
}
