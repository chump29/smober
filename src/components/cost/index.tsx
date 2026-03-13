import { type JSX } from "react"

import { daysInWeek } from "date-fns/constants"

import { toComma } from "../shared"

const Cost = ({ days, showCost, cost }: { days: number; showCost: boolean; cost: number }): JSX.Element => {
  return (
    <>
      {showCost && cost > 0 ? (
        <div className="font-counter text-center text-3xl text-[#66cc00] font-bold py-10">
          Cost Savings: <span className="text-[#cc0000]">${toComma(((cost / daysInWeek) * days).toFixed(2))}</span>
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
