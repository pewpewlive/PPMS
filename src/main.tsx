import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"

import {
  FluentProvider,
  webDarkTheme,
  useThemeClassName,
} from "@fluentui/react-components"

function ApplyToBody() {
  const classes = useThemeClassName()

  React.useEffect(() => {
    const classList = classes.split(" ")
    document.body.classList.add(...classList)

    return () => document.body.classList.remove(...classList)
  }, [classes])

  return null
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <FluentProvider theme={webDarkTheme}>
      <ApplyToBody />
      <App />
    </FluentProvider>
  </React.StrictMode>
)
