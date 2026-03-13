import { render, screen } from "@testing-library/react"
import "vitest-localstorage-mock"

import Dashboard from "."

beforeAll(() => {
  localStorage.setItem("smoberDate", "2026-03-10")
})

afterAll(() => {
  localStorage.removeItem("smoberDate")
})

beforeEach(() => {
  render(<Dashboard />)
})

describe("Dashboard", () => {
  it("should display label", () => {
    expect(screen.queryByText("Smober since:"), "Label not found").toBeInTheDocument()
  })

  it("should display date dropdown", () => {
    expect(screen.queryByTestId("date"), "Date dropdown not found").toBeInTheDocument()
  })

  it("should display stats", () => {
    expect(screen.queryByText(/seconds/), "Stats not found").toBeInTheDocument()
  })
})
