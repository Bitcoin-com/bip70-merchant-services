import * as React from "react"

export interface BadgerButtonProps {}

export class BadgerButton extends React.Component<BadgerButtonProps, any> {
  constructor(props: BadgerButtonProps, context: any) {
    super(props, context)
    this.state = {}
  }

  render(): JSX.Element {
    return (
      <div id="badgerButton">
        <button>Badger Button</button>
      </div>
    )
  }
}
