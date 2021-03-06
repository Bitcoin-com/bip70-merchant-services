import * as React from "react"
import Logo from "../logo.png"

export interface PoweredByProps {}

export class PoweredBy extends React.Component<PoweredByProps, any> {
  constructor(props: PoweredByProps, context: any) {
    super(props, context)
    this.state = {}
  }

  render(): JSX.Element {
    return (
      <div id="poweredBy">
        <p>
          <span className="brandGreen glyphicon glyphicon-lock" />
        </p>
        <p>Powered by </p>
        <p>
          <a href="https://www.bitcoin.com/" className="universal-menu-link">
            <img src={Logo} alt="Bitcoin.com" />
          </a>
        </p>
      </div>
    )
  }
}
