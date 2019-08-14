import * as React from "react"

export interface CopiedProps {
  paymentUrl: string
}

export class Copied extends React.Component<CopiedProps, any> {
  // this constructor is necessary to make the props work
  constructor(props: CopiedProps, context: any) {
    super(props, context)
    this.state = {}
  }

  render(): JSX.Element {
    return (
      <div id="copied" className="brandGreenBackground row">
        <div className="col-md-1" />
        <div className="col-md-10">
          <p id="clipboard">
            <i className="fas fa-clipboard" />
          </p>

          <p id="copiedTitle">Copied Payment URL</p>
          <p>{this.props.paymentUrl}</p>
        </div>
        <div className="col-md-1" />
      </div>
    )
  }
}
