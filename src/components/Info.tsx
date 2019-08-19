import * as React from "react"
import { NeedHelp } from "./NeedHelp"

export interface InfoProps {
  status: string
  memo: string
  merchantId: string
  email: string
  merchant: string
  paymentId: string
  image: string
}

export class Info extends React.Component<InfoProps, any> {
  constructor(props: InfoProps, context: any) {
    super(props, context)
    this.state = {}
  }

  render(): JSX.Element {
    let needHelp: any
    if (this.props.status === "open") {
      needHelp = (
        <NeedHelp
          email={this.props.email}
          merchant={this.props.merchant}
          paymentId={this.props.paymentId}
        />
      )
    }
    return (
      <div className="info">
        <h1>{this.props.memo}</h1>
        <img src={this.props.image}/>
        {needHelp}
      </div>
    )
  }
}
