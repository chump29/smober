import { render, screen } from "@testing-library/react"

import Settings from "."

beforeEach(() => {
  render(<Settings cost={0} handleShowSettings={vi.fn()} setCost={vi.fn()} setShowCost={vi.fn()} showCost={false} />)
})

describe("Settings", () => {
  it("should display settings", () => {
    expect(screen.queryByText("Settings"), "Settings not found").toBeInTheDocument()
  })
})
