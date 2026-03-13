import { StrictMode } from "react"

import { createRoot } from "react-dom/client"

import Dashboard from "./components/dashboard"

const getVersion = (version: string): string => {
  return version.length ? `v${version}` : "N/A"
}

document.getElementById("frontend")!.innerText = getVersion(import.meta.env.PACKAGE_VERSION)

if (import.meta.env.DEV) {
  createRoot(document.getElementById("root")!).render(<Dashboard />)
} else {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <Dashboard />
    </StrictMode>
  )
}
