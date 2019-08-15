import * as React from "react"
import { Popover, PopoverHeader, PopoverBody } from "reactstrap"
import ReactTooltip from "react-tooltip"
import { CopyToClipboard } from "react-copy-to-clipboard"
import Countdown from "react-countdown-now"

export interface LimitProps {
  amount: number
  symbol: string
  paymentUrl: string
  toggleUrlPopOver: Function
  toggleLimitPopOver: Function
  LimitPopoverOpen: boolean
  then: number
}

export class Limit extends React.Component<LimitProps, any> {
  constructor(props: LimitProps, context: any) {
    super(props, context)
    this.toggleUrlPopOver = this.toggleUrlPopOver.bind(this)
    this.state = {}
  }

  toggleUrlPopOver() {
    this.props.toggleUrlPopOver()
  }

  render(): JSX.Element {
    return (
      <div id="Limit">
        {/* Limit Popover */}
        <Popover
          placement="top"
          isOpen={this.props.LimitPopoverOpen}
          target="popOver"
          className="LimitPopOver"
        >
          <PopoverHeader>
            <div id="LimitHeader" className="row">
              <div className="col-md-12">
                <p id="" className="">
                  Please send your payment within{" "}
                  <span className="red">
                    {" "}
                    <Countdown zeroPadTime={0} date={this.props.then} />{" "}
                  </span>
                </p>
              </div>
              <div className="col-md-12">
                <p id="" className="">
                  1 BCH = {this.state.BCHPrice} USD
                </p>
              </div>
            </div>
          </PopoverHeader>
          <PopoverBody>
            <div id="LimitBody" className="row">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-6">
                    <p id="" className="text-left">
                      Subtotal
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p id="" className="text-right">
                      {this.props.amount} {this.props.symbol}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-6">
                    <p id="" className="text-left">
                      Network Cost
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p id="" className="text-right">
                      {this.props.amount} {this.props.symbol}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="row font-weight-bold">
                  <div className="col-md-6">
                    <p id="" className="text-left">
                      Total Cost
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p id="" className="text-right">
                      {this.props.amount} {this.props.symbol}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-12 text-center brandGreen">
                <ReactTooltip
                  id="secondCopy"
                  effect="solid"
                  type="dark"
                  place="top"
                >
                  <span>
                    This is a link that allows your wallet to receive the BCH
                    address, required amount and securely.
                  </span>
                </ReactTooltip>
                <CopyToClipboard text={this.props.paymentUrl}>
                  <div
                    data-tip
                    data-for="secondCopy"
                    onClick={this.toggleUrlPopOver}
                  >
                    Copy Payment URL <i className="brandGreen far fa-copy" />
                  </div>
                </CopyToClipboard>
              </div>
            </div>
          </PopoverBody>
        </Popover>
      </div>
    )
  }
}
