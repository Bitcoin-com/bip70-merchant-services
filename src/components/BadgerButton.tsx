import * as React from "react"

export interface BadgerButtonProps {}

export class BadgerButton extends React.Component<BadgerButtonProps, any> {
  // this constructor is necessary to make the props work
  constructor(props: BadgerButtonProps, context: any) {
    super(props, context)
    this.state = {}
  }

  render() {
    return (
      <div id="badgerButton">
        <button>Badger Button</button>
      </div>
    )
  }
}
