import * as React from "react"

export interface NeedHelpProps {
  email: string
  merchant: string
  paymentId: string
}

export class NeedHelp extends React.Component<NeedHelpProps, any> {
  constructor(props: NeedHelpProps, context: any) {
    super(props, context)
    this.state = {}
  }

  render(): JSX.Element {
    return (
      <p id="needHelp">
        <a
          className="brandGreen"
          href={`mailto:${
            this.props.email
          }?subject=pay.bitcoin.com Support. Merchant: ${
            this.props.merchant
          } Payment Id: ${this.props.paymentId}`}
        >
          Need Help?
        </a>
      </p>
    )
  }
}
