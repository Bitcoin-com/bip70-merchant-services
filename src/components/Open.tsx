import * as React from "react"
import ReactTooltip from "react-tooltip"
import { Copied } from "./Copied"
import { Details } from "./Details"
import { Limit } from "./Limit"
import { Popover, PopoverHeader, PopoverBody } from "reactstrap"
import axios from "axios"
import { CopyToClipboard } from "react-copy-to-clipboard"
import Countdown from "react-countdown-now"
import { AxiosResponse } from "axios"
import { css } from "@emotion/core"
import { CircleLoader } from "react-spinners"
const override = css`
  display: block;
  margin: 0 auto;
`

export interface OpenProps {
  amount: number
  paymentUrl: string
  toggleStatus: Function
  symbol: string
  time: string
  expires: string
  qr: string
}

export class Open extends React.Component<OpenProps, any> {
  popOverElement: HTMLDivElement
  constructor(props: OpenProps, context: any) {
    super(props, context)
    this.toggleUrlPopOver = this.toggleUrlPopOver.bind(this)
    this.toggleDetailsPopOver = this.toggleDetailsPopOver.bind(this)
    this.toggleLimitPopOver = this.toggleLimitPopOver.bind(this)
    this.toggleStatus = this.toggleStatus.bind(this)
    // calculate time
    let then: Date = new Date(this.props.expires)
    let now: Date = new Date()
    let diff: number = then.getTime() - now.getTime()
    let seconds: number = diff / 1000
    // let secondsBetweenDates = Math.abs(seconds)
    this.state = {
      urlPopoverOpen: false,
      detailsPopoverOpen: false,
      limitPopoverOpen: false,
      BCHPrice: 0,
      secondsBetweenDates: then.getTime(),
      loading: true,
      then: then.getTime()
    }
  }

  async componentDidMount(): Promise<any> {
    const response: AxiosResponse = await axios.get(
      `https://index-api.bitcoin.com/api/v0/cash/price/usd`
    )
    this.setState({
      BCHPrice: response.data.price / 100,
      loading: false
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

  toggleLimitPopOver() {
    this.setState({
      limitPopoverOpen: !this.state.limitPopoverOpen
    })
  }

  toggleStatus(): void {
    this.props.toggleStatus()
  }

  render(): JSX.Element {
    return (
      <div id="open">
        {/* Loader */}
        <CircleLoader
          css={override}
          sizeUnit={"px"}
          size={150}
          color="#0ac18e"
          loading={this.state.loading}
        />

        <div className="row" id="openHeader">
          {/* Copy to Clipboard */}
          <CopyToClipboard text={this.props.paymentUrl}>
            <div
              data-tip
              data-for="copy"
              className="col-md-2"
              onClick={this.toggleUrlPopOver}
            >
              <i className="brandGreen far fa-copy" />
            </div>
          </CopyToClipboard>

          {/* Tooltip */}
          <ReactTooltip id="copy" effect="solid" type="dark" place="top">
            <span>Copy Payment URL</span>
          </ReactTooltip>

          {/* Amount and Symbol */}
          <div className="col-md-8">
            {this.props.amount} {this.props.symbol}
          </div>

          {/* Toggle Details Popover */}
          <div
            data-tip
            data-for="details"
            className="col-md-2"
            id="detailsCountdown"
            onClick={this.toggleDetailsPopOver}
          >
            <Countdown zeroPadTime={0} date={this.state.then} />{" "}
          </div>

          {/* Tooltip */}
          <ReactTooltip id="details" effect="solid" type="dark" place="top">
            <span>View Payment Details</span>
          </ReactTooltip>
        </div>

        {/* QR Code */}
        {/* Copy to Clipboard */}
        <CopyToClipboard text={this.props.paymentUrl}>
          <div className="row" id="qr" onClick={this.toggleUrlPopOver}>
            <p className="col-md-12">
              <img src={this.props.qr} alt="QR Code" />
            </p>
          </div>
        </CopyToClipboard>

        {/* Popover */}
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

        {/* Details Popover */}
        <Details
          amount={this.props.amount}
          symbol={this.props.symbol}
          paymentUrl={this.props.paymentUrl}
          toggleUrlPopOver={this.toggleUrlPopOver}
          toggleDetailsPopOver={this.toggleDetailsPopOver}
          detailsPopoverOpen={this.state.detailsPopoverOpen}
          then={this.state.then}
          BCHPrice={this.state.BCHPrice}
        />

        {/* Limit Popover */}
        <Limit
          amount={this.props.amount}
          symbol={this.props.symbol}
          paymentUrl={this.props.paymentUrl}
          toggleLimitPopOver={this.toggleLimitPopOver}
          limitPopoverOpen={this.state.limitPopoverOpen}
          then={this.state.then}
        />
      </div>
    )
  }
}
