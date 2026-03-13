import { render, screen } from "@testing-library/react"

import Cost from "."

beforeEach(() => {
  render(<Cost cost={14} days={10} showCost={true} />)
})

describe("Cost", () => {
  it("should display cost", () => {
    expect(screen.queryByText("$20.00"), "Cost not found").toBeInTheDocument()
  })
})
