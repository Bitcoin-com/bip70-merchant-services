import * as React from "react"
import { NeedHelp } from "./NeedHelp"
import VerifiedCheck from "../verified-account-48.png"

export interface InfoProps {
  status: string
  memo: string
  merchantVerified: boolean
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
    let image = <img className="logo" src={this.props.image}/>
    let check = this.props.merchantVerified ? <img className="check" src={VerifiedCheck}/> : ""
    let name = <h1>Pay To: {this.props.merchant} {check}</h1>
    return (
      <div className="info">
        <h1>{this.props.memo}</h1>
        {name}
        {needHelp}
      </div>
    )
  }
}
