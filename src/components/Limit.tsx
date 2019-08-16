import * as React from "react"
import { Popover, PopoverHeader, PopoverBody } from "reactstrap"
import { CopyToClipboard } from "react-copy-to-clipboard"
import Countdown from "react-countdown-now"

export interface LimitProps {
  amount: number
  symbol: string
  paymentUrl: string
  toggleLimitPopOver: Function
  limitPopoverOpen: boolean
  then: number
}

export class Limit extends React.Component<LimitProps, any> {
  constructor(props: LimitProps, context: any) {
    super(props, context)
    this.toggleLimitPopOver = this.toggleLimitPopOver.bind(this)
    this.state = {}
  }

  toggleLimitPopOver() {
    this.props.toggleLimitPopOver()
  }

  render(): JSX.Element {
    return (
      <div id="limit">
        {/* Limit Popover */}
        <Popover
          placement="top"
          isOpen={this.props.limitPopoverOpen}
          target="popOver"
          className="limitPopOver"
        >
          <PopoverHeader>
            <div id="limitHeader" className="row">
              <div className="col-md-12">
                <p id="" className="">
                  <i className="brandGreen fas fa-clock" /> Awaiting Payment
                </p>
              </div>
            </div>
          </PopoverHeader>
          <PopoverBody>
            <div id="LimitBody" className="row">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-12">
                    This invoice will expire soon. Please send your payment
                    within{" "}
                    <span className="red">
                      <Countdown zeroPadTime={0} date={this.props.then} />{" "}
                    </span>{" "}
                  </div>
                </div>
              </div>
              <div className="col-md-12 text-center brandGreen">
                <div onClick={this.toggleLimitPopOver}>
                  GOT IT <span className="glyphicon glyphicon-ok" />
                </div>
              </div>
            </div>
          </PopoverBody>
        </Popover>
      </div>
    )
  }
}
