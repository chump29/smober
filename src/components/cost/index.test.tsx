import { render, screen } from "@testing-library/react"

import Cost from "."

beforeEach(() => {
  render(<Cost cost={10} showCost={true} weeks={10} />)
})

describe("Cost", () => {
  it("should display cost", () => {
    expect(screen.queryByText("$100"), "Cost not found").toBeInTheDocument()
  })
})
