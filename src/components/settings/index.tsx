import { type ChangeEvent, type Dispatch, type JSX, type MouseEvent, type SetStateAction } from "react"

const Settings = ({
  handleShowSettings,
  showCost,
  setShowCost,
  cost,
  setCost
}: {
  handleShowSettings: Dispatch<SetStateAction<boolean>>
  showCost: boolean
  setShowCost: Dispatch<SetStateAction<boolean>>
  cost: number
  setCost: Dispatch<SetStateAction<number>>
}): JSX.Element => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault()
    setShowCost(e.target.checked)
    localStorage.setItem("smoberDate-showCost", e.target.checked.toString())
  }

  const handleCost = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault()
    setCost(Number(e.target.value))
    localStorage.setItem("smoberDate-cost", e.target.value)
  }

  const handleClose = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    handleShowSettings(false)
  }

  return (
    <div className="fixed inset-0 bg-gray-800 flex items-center justify-center">
      <div className="bg-white p-5 rounded-xl w-50">
        <div className="text-xl font-bold mb-5">Settings</div>
        <div>
          <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
            <input
              checked={showCost}
              className="checked:right-0 checked:border-[#1e2939] absolute block w-6 h-6 rounded-full bg-gray-800 border-4 appearance-none cursor-pointer"
              id="cost"
              onChange={handleChange}
              title="Show Cost"
              type="checkbox"
            />
            <label
              className="peer-checked:bg-[#d1d5dc] block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
              htmlFor="cost"></label>
          </div>
          <label className="text-sm" htmlFor="cost">
            Show weekly cost
          </label>
        </div>
        {showCost ? (
          <div>
            <input
              className="mt-2 w-40 p-1 rounded-xl border"
              onChange={handleCost}
              placeholder="Weekly Amount"
              title="Weekly Amount"
              type="text"
              value={cost}></input>
          </div>
        ) : null}
        <div className="text-center">
          <button
            className="mt-5 text-white text-sm bg-gray-800 px-5 py-2 rounded-xl cursor-pointer"
            onClick={handleClose}
            title="Close">
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default Settings
