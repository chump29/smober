import { toComma } from "./index"

describe("toComma", () => {
  it("should display comma", () => {
    expect(toComma("1000"), "Comma not found").toBe("1,000")
  })
})
