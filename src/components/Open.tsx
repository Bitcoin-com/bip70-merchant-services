import * as React from "react"
import QR from "../qr.png"
import ReactTooltip from "react-tooltip"
import ReactCountdownClock from "react-countdown-clock"
import { Copied } from "./Copied"
import { Details } from "./Details"

import { Popover, PopoverHeader, PopoverBody } from "reactstrap"
export interface OpenProps {
  amount: number
  paymentUrl: string
  toggleStatus: Function
}

export class Open extends React.Component<OpenProps, any> {
  popOverElement
  constructor(props: OpenProps, context: any) {
    super(props, context)
    this.toggleUrlPopOver = this.toggleUrlPopOver.bind(this)
    this.toggleDetailsPopOver = this.toggleDetailsPopOver.bind(this)
    this.toggleStatus = this.toggleStatus.bind(this)
    this.state = {
      urlPopoverOpen: false,
      detailsPopoverOpen: false
    }
  }

  toggleUrlPopOver() {
    if (this.state.urlPopoverOpen === false) {
      this.setState({
        urlPopoverOpen: !this.state.urlPopoverOpen
      })
      setTimeout(() => {
        this.setState({
          urlPopoverOpen: !this.state.urlPopoverOpen
        })
      }, 3000)
    }
  }

  toggleDetailsPopOver() {
    if (this.state.detailsPopoverOpen === false) {
      this.setState({
        detailsPopoverOpen: !this.state.detailsPopoverOpen
      })
      setTimeout(() => {
        this.setState({
          detailsPopoverOpen: !this.state.detailsPopoverOpen
        })
      }, 3000)
    }
  }

  toggleStatus() {
    this.props.toggleStatus()
  }

  render() {
    return (
      <div id="open">
        <div className="row" id="openHeader">
          <div
            data-tip
            data-for="copy"
            className="col-md-2"
            onClick={this.toggleUrlPopOver}
          >
            <i className="brandGreen far fa-copy" />
          </div>
          <ReactTooltip id="copy" effect="solid" type="dark" place="top">
            <span>Copy Payment URL</span>
          </ReactTooltip>
          <div className="col-md-8">{this.props.amount} BCH</div>
          <div
            data-tip
            data-for="details"
            className="col-md-2"
            onClick={this.toggleDetailsPopOver}
          >
            <ReactCountdownClock
              seconds={1000}
              color="#0ac18e"
              alpha={0.9}
              size={50}
              onComplete={this.toggleStatus}
            />
          </div>
          <ReactTooltip id="details" effect="solid" type="dark" place="top">
            <span>View Payment Details</span>
          </ReactTooltip>
        </div>
        <div className="row" id="qr">
          <p className="col-md-12">
            <img src={QR} alt="QR Code" />
          </p>
        </div>
        <div id="popOver" ref={popOver => (this.popOverElement = popOver)} />
        <Popover
          placement="top"
          isOpen={this.state.urlPopoverOpen}
          target="popOver"
          toggle={this.toggleUrlPopOver}
        >
          <PopoverHeader>Copied Payment URL</PopoverHeader>
          <PopoverBody>{this.props.paymentUrl}</PopoverBody>
        </Popover>
        <Popover
          placement="top"
          isOpen={this.state.detailsPopoverOpen}
          target="popOver"
          toggle={this.toggleDetailsPopOver}
        >
          <PopoverHeader>
            <div id="detailsHeader">
              <div id="" className="row">
                Please send your payment within 3:45
              </div>
              <div id="" className="row">
                1 BCH = $345.67
              </div>
            </div>
          </PopoverHeader>
          <PopoverBody>
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
          </PopoverBody>
        </Popover>
      </div>
    )
  }
}
