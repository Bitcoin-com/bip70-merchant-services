import * as React from "react"
import QR from "../qr.png"
import ReactTooltip from "react-tooltip"
import ReactCountdownClock from "react-countdown-clock"
import { Copied } from "./Copied"
import { Popover, PopoverHeader, PopoverBody } from "reactstrap"
import axios from "axios"

export interface OpenProps {
  amount: number
  paymentUrl: string
  toggleStatus: Function
  symbol: string
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
      detailsPopoverOpen: false,
      BCHPrice: 0
    }
  }

  async componentDidMount() {
    const response = await axios.get(
      `https://index-api.bitcoin.com/api/v0/cash/price/usd`
    )
    this.setState({
      BCHPrice: response.data.price / 100
    })
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
          <div className="col-md-8">
            {this.props.amount} {this.props.symbol}
          </div>
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
        <div className="row" id="qr" onClick={this.toggleUrlPopOver}>
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
          fade="true"
          className="urlPopOver"
        >
          <PopoverBody>
            <Copied paymentUrl={this.props.paymentUrl} />
          </PopoverBody>
        </Popover>
        <Popover
          placement="top"
          isOpen={this.state.detailsPopoverOpen}
          target="popOver"
          toggle={this.toggleDetailsPopOver}
          className="detailsPopOver"
        >
          <PopoverHeader>
            <div id="detailsHeader" className="row">
              <div className="col-md-12">
                <p id="" className="">
                  Please send your payment within 3:45
                </p>
              </div>
              <div className="col-md-12">
                <p id="" className="">
                  1 BCH = {this.state.BCHPrice}
                </p>
              </div>
            </div>
          </PopoverHeader>
          <PopoverBody>
            <div id="detailsBody" className="row">
              <div className="col-md-12">
                <p id="" className="">
                  Subtotal 0.01 BCH
                </p>
              </div>
              <div className="col-md-12">
                <p id="" className="">
                  Network Cost 0.01 BCH
                </p>
              </div>
              <div className="col-md-12">
                <p id="" className="">
                  Total 0.01 BCH
                </p>
              </div>
              <div className="col-md-12">
                <p id="" className="">
                  Copy Payment URL
                </p>
              </div>
            </div>
          </PopoverBody>
        </Popover>
      </div>
    )
  }
}
