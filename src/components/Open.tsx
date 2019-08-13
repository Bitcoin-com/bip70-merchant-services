import * as React from "react"
import QR from "../qr.png"
import ReactTooltip from "react-tooltip"
import { Copied } from "./Copied"
import { Details } from "./Details"

export interface OpenProps {
  paymentUrl: string
}

export class Open extends React.Component<OpenProps, any> {
  // this constructor is necessary to make the props work
  constructor(props: OpenProps, context: any) {
    super(props, context)
    this.state = {}
  }

  render() {
    return (
      <div id="open">
        <div className="row" id="openHeader">
          <div data-tip data-for="copy" className="col-md-2">
            <i className="brandGreen far fa-copy" />
          </div>
          <ReactTooltip id="copy" effect="solid" type="dark" place="top">
            <span>Copy Payment URL</span>
          </ReactTooltip>
          <div className="col-md-8">0.003133 BCH</div>
          <div data-tip data-for="details" className="col-md-2">
            <span className="brandGreen glyphicon glyphicon-off" />
          </div>
          <ReactTooltip id="details" effect="solid" type="dark" place="top">
            <span>View Payment Details</span>
          </ReactTooltip>
        </div>
        <div className="row">
          <p className="col-md-12">
            <img src={QR} alt="QR Code" />
          </p>
        </div>
        <Copied paymentUrl={this.props.paymentUrl} />
        <Details />
      </div>
    )
  }
}
