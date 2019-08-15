import * as React from "react"

// THIS COMPONENT ISN"T CURRENTLY USED
export interface DetailsProps {}

export class Details extends React.Component<DetailsProps, any> {
  constructor(props: DetailsProps, context: any) {
    super(props, context)
    this.state = {}
  }

  render(): JSX.Element {
    return (
      <div id="details">
        <div id="detailsHeader">
          <div id="" className="row">
            Please send your payment within 3:45
          </div>
          <div id="" className="row">
            1 BCH = $345.67
          </div>
        </div>
        <div id="detailsBody">
          <div id="" className="row">
            <div className="col-md-12">Subtotal 0.01 BCH</div>
            <div id="" className="row">
              Network Cost 0.01 BCH
            </div>
            <div id="" className="row">
              Total 0.01 BCH
            </div>
            <div id="" className="row">
              Copy Payment URL
            </div>
          </div>
        </div>
      </div>
    )
  }
}
