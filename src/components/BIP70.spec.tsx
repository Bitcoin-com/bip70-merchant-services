import * as React from "react"
import * as TestUtils from "react-addons-test-utils"
import { BIP70 } from "./BIP70"

describe("BIP70 Component", () => {
  let renderer: TestUtils.ShallowRenderer

  beforeEach(() => {
    renderer = TestUtils.createRenderer()
    renderer.render(<BIP70 compiler="testCompile" framework="testFramework" />)
  })

  it("should render correctly", () => {
    const result = renderer.getRenderOutput()
    expect(result.type).toEqual("div")
  })
})
