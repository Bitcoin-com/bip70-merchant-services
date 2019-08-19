import * as React from "react"

export interface BadgerButtonProps {
  paymentUrl: string
}

export class BadgerButton extends React.Component<BadgerButtonProps, any> {
  constructor(props: BadgerButtonProps, context: any) {
    super(props, context)
    this.payInvoice = this.payInvoice.bind(this)
    this.state = { web4bch: null, badger: true }
  }

  componentDidMount() {
    if (typeof window.web4bch === "undefined") {
      this.setState({
        badger: false
      });
    } else {
      web4bch = new Web4Bch(web4bch.currentProvider)
      this.setState({
        web4bch: web4bch
      })
    }
  }

  payInvoice(): void {
    let web4bch = this.state.web4bch
    let {paymentUrl} = this.props
    let txParams = {
      paymentRequestUrl: paymentUrl
    }

    web4bch.bch.sendTransaction(txParams, (err, res) => {
      if (!err) {
        console.log("txid: ", res)
      }
    })

  }

  render(): JSX.Element {
    if (this.state.badger) {
      return (
        <div id="badgerButton">
          <button onClick={this.payInvoice}>Badger Button</button>
        </div>
      )
    } else {
      return null
    }
  }
}
