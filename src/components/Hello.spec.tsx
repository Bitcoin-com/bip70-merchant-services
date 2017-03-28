import * as React from "react";
import * as TestUtils from "react-addons-test-utils";
import {Hello} from "./Hello";

describe("Hello Component", () => {
   let renderer: TestUtils.ShallowRenderer;

   beforeEach(() => {
      renderer = TestUtils.createRenderer();
      renderer.render(<Hello compiler="testCompile" framework="testFramework"/>);
   });

   it("should render correctly", () => {
      const result = renderer.getRenderOutput();
      expect(result.type).toEqual("div");
   });
});