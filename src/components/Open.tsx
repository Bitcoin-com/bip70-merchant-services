import * as React from "react"
import QR from "../qr.png"

export interface OpenProps {}

export class Open extends React.Component<OpenProps, any> {
  // this constructor is necessary to make the props work
  constructor(props: OpenProps, context: any) {
    super(props, context)
    this.state = {}
  }

  render() {
    return (
      <div id="open">
        <div className="row">
          <div className="col-md-3">
            <span className="brandGreen glyphicon glyphicon-copy" />
          </div>
          <div className="col-md-6">0.003133 BCH</div>
          <div className="col-md-3">
            <span className="brandGreen glyphicon glyphicon-off" />
          </div>
        </div>
        <p>
          <img src={QR} alt="QR Code" />
        </p>
      </div>
    )
  }
}
