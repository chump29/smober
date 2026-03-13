import { type ChangeEvent, type JSX, type RefObject, useEffect, useRef, useState } from "react"

import { Cog8ToothIcon } from "@heroicons/react/24/outline"
import { daysToWeeks, formatDistanceToNowStrict } from "date-fns"
import { toZonedTime } from "date-fns-tz"
import pluralize from "pluralize"

import Cost from "../cost"
import Settings from "../settings"
import { toComma } from "../shared"

const tz: string = Intl.DateTimeFormat().resolvedOptions().timeZone

const urlParam: URLSearchParams = new URLSearchParams(window.location.search)
const smoberDateFormat = /^\d{4}-\d{1,2}-\d{1,2}$/ // YYYY-MM-DD

const Dashboard = (): JSX.Element => {
  const getDateFromString = (date: string): Date => {
    return new Date(toZonedTime(date, tz))
  }

  const getNewDate = (date: Date | null = null): string => {
    const dateNow: Date = date || new Date()
    return `${dateNow.getFullYear()}-${(dateNow.getMonth() + 1).toString().padStart(2, "0")}-${dateNow.getDate().toString().padStart(2, "0")}`
  }

  const smoberDate: string = localStorage.getItem("smoberDate") || getNewDate()

  const getShowCost = (): string | null => {
    return localStorage.getItem("smoberDate-showCost")
  }

  const getCost = (): string | null => {
    return localStorage.getItem("smoberDate-cost")
  }

  const [date, setDate] = useState<Date>(getDateFromString(smoberDate))
  const [seconds, setSeconds] = useState<string>("")
  const [minutes, setMinutes] = useState<string>("")
  const [hours, setHours] = useState<string>("")
  const [days, setDays] = useState<string>("")
  const [weeks, setWeeks] = useState<string>("")
  const [months, setMonths] = useState<string>("")
  const [years, setYears] = useState<string>("")
  const [showSettings, setShowSettings] = useState<boolean>(false)
  const [showCost, setShowCost] = useState<boolean>(Boolean(getShowCost()))
  const [cost, setCost] = useState<number>(Number(getCost()))

  const loadedDateFromUrl: RefObject<boolean> = useRef<boolean>(false)

  if (urlParam.has("smoberDate") && !loadedDateFromUrl.current) {
    const smoberDateParam = urlParam.get("smoberDate")
    if (smoberDateParam && smoberDateFormat.test(smoberDateParam)) {
      setDate(getDateFromString(smoberDateParam))
      loadedDateFromUrl.current = true
    }
  }

  if (getShowCost() === null || getCost() === null) {
    localStorage.setItem("smoberDate-showCost", true.toString())
    localStorage.setItem("smoberDate-cost", "0")
  }

  const parse = (str: string): string => {
    return str.startsWith("0") ? "" : str
  }

  const setSmoberDate = (str: string): void => {
    if (localStorage.getItem("smoberDate") !== str) {
      localStorage.setItem("smoberDate", str)
    }
  }

  const setNewSmoberDate = (date: Date): void => {
    setDate(date)
    setSmoberDate(getNewDate(date))
  }

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewSmoberDate(new Date(toZonedTime((e.target.value ||= getNewDate()), tz)))
    e.target.blur()
  }

  const handleShowSettings = (): void => {
    setShowSettings(!showSettings)
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies(setNewSmoberDate): not a dependency
  // biome-ignore lint/correctness/useExhaustiveDependencies(showCost): is a dependency
  // biome-ignore lint/correctness/useExhaustiveDependencies(cost): is a dependency
  useEffect(() => {
    if (!date) {
      return
    }

    const interval: number = setInterval(() => {
      setNewSmoberDate(new Date(toZonedTime(date, tz)))
    }, 1000)

    setSeconds(
      toComma(
        formatDistanceToNowStrict(date, {
          roundingMethod: "floor",
          unit: "second"
        })
      )
    )
    setMinutes(
      toComma(
        formatDistanceToNowStrict(date, {
          roundingMethod: "floor",
          unit: "minute"
        })
      )
    )
    setHours(
      toComma(
        formatDistanceToNowStrict(date, {
          roundingMethod: "floor",
          unit: "hour"
        })
      )
    )
    const d: string = formatDistanceToNowStrict(date, {
      roundingMethod: "floor",
      unit: "day"
    })
    setDays(toComma(d))
    setWeeks(toComma(pluralize("week", daysToWeeks(parseInt(d)), true)))
    setMonths(
      toComma(
        formatDistanceToNowStrict(date, {
          roundingMethod: "floor",
          unit: "month"
        })
      )
    )
    setYears(
      toComma(
        formatDistanceToNowStrict(date, {
          roundingMethod: "floor",
          unit: "year"
        })
      )
    )

    return (): void => clearInterval(interval)
  }, [
    date,
    showCost,
    cost
  ])

  return (
    <>
      <Cog8ToothIcon
        className="size-7 absolute top-2 right-2 text-[#cccccc] cursor-pointer"
        onClick={handleShowSettings}
        title="Settings"
      />
      {showSettings ? (
        <Settings
          cost={cost}
          handleShowSettings={handleShowSettings}
          setCost={setCost}
          setShowCost={setShowCost}
          showCost={showCost}
        />
      ) : null}
      <div className="text-center mt-20 font-bold">
        <form>
          <label className="text-3xl italic text-[#66cc00] text-shadow-[3px_3px_6px_#000000]" htmlFor="date">
            Smober since:
          </label>
          <div>
            <input
              className="text-center border rounded-xl w-40 mt-2 text-[#ccffff] cursor-text"
              data-testid="date"
              defaultValue={date?.toISOString().substring(0, 10)}
              max={getNewDate()}
              onChange={handleDateChange}
              title="Smober date"
              type="date"
            />
          </div>
        </form>
      </div>
      <div className="text-4xl text-center font-bold mt-20 text-[#66ccff] font-counter">
        {seconds}
        {parse(minutes) ? <br /> : null}
        {parse(minutes)}
        {parse(hours) ? <br /> : null}
        {parse(hours)}
        {parse(days) ? <br /> : null}
        {parse(days)}
        {parse(weeks) ? <br /> : null}
        {parse(weeks)}
        {parse(months) ? <br /> : null}
        {parse(months)}
        {parse(years) ? <br /> : null}
        {parse(years)}
      </div>
      {showCost ? <Cost cost={cost} days={parseInt(days)} showCost={showCost} /> : null}
    </>
  )
}

export default Dashboard
