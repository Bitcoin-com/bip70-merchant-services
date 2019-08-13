import * as React from "react"
import { NeedHelp } from "./NeedHelp"

export interface InfoProps {
  status: string
  memo: string
  merchantId: string
}

export class Info extends React.Component<InfoProps, any> {
  // this constructor is necessary to make the props work
  constructor(props: InfoProps, context: any) {
    super(props, context)
    this.state = {}
  }

  render() {
    let needHelp
    if (this.props.status === "open") {
      needHelp = <NeedHelp />
    }
    return (
      <div className="info">
        <h1>{this.props.memo}</h1>
        <h2>{this.props.merchantId}</h2>
        {needHelp}
      </div>
    )
  }
}
