import * as React from "react"

export interface NeedHelpProps {}

export class NeedHelp extends React.Component<NeedHelpProps, any> {
  // this constructor is necessary to make the props work
  constructor(props: NeedHelpProps, context: any) {
    super(props, context)
    this.state = {}
  }

  render(): JSX.Element {
    return (
      <p id="needHelp">
        <a
          className="brandGreen"
          href="https://developer.bitcoin.com"
          target="_blank"
        >
          Need Help?
        </a>
      </p>
    )
  }
}
