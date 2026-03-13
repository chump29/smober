import { type JSX } from "react"

import { toComma } from "../shared"

const Cost = ({ weeks, showCost, cost }: { weeks: number; showCost: boolean; cost: number }): JSX.Element => {
  return (
    <>
      {showCost && cost > 0 ? (
        <div className="font-counter text-center mt-20 text-3xl text-[#66cc00] font-bold">
          Cost Savings: <span className="text-[#cc0000]">${toComma((cost * weeks).toString())}</span>
          <div>
            <sup className="ml-5 text-xs italic align-top -left-20 -z-1">
              @ <span className="text-[#cc0000]">$</span>
              {cost}/week
            </sup>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default Cost
