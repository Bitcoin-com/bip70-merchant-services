import * as React from "react"
import ReactTooltip from "react-tooltip"
import { Copied } from "./Copied"
import { Details } from "./Details"
import { Limit } from "./Limit"
import { Popover, PopoverBody } from "reactstrap"
import axios from "axios"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { AxiosResponse } from "axios"
import { css } from "@emotion/core"
import { CircleLoader } from "react-spinners"
import { BadgerBadge } from "badger-components-react"

const override = css`
  display: block;
  margin: 0 auto;
`

export interface OpenProps {
  amount: number
  paymentUri: string
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
    this.state = {
      urlPopoverOpen: false,
      detailsPopoverOpen: false,
      limitPopoverOpen: false,
      BCHPrice: 0,
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

        <div className="row" id="openHeader">
          <div id="badgerButton">
            <BadgerBadge
              paymentRequestUrl={this.props.paymentUri}
              tag={"Pay Invoice"}
              successFn={(tx) => console.log(tx)}
              failFn={(err) => console.log(err)}
            />
          </div>

          {/* Copy to Clipboard */}
          <CopyToClipboard text={this.props.paymentUri}>
            <div
              data-tip
              data-for="copy"
              className="col-md-2"
              id="copyButton"
              onClick={this.toggleUrlPopOver}
            >
              <i className="brandGreen far fa-copy" />
            </div>
          </CopyToClipboard>

          {/* Tooltip */}
          <ReactTooltip id="copy" effect="solid" type="dark" place="top">
            <span>Copy Payment URL</span>
          </ReactTooltip>
        </div>

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
            <Copied paymentUrl={this.props.paymentUri} />
          </PopoverBody>
        </Popover>

        {/* Details Popover */}
        <Details
          amount={this.props.amount}
          symbol={this.props.symbol}
          paymentUri={this.props.paymentUri}
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
          paymentUri={this.props.paymentUri}
          toggleLimitPopOver={this.toggleLimitPopOver}
          limitPopoverOpen={this.state.limitPopoverOpen}
          then={this.state.then}
        />
      </div>
    )
  }
}
