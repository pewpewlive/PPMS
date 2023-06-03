import MainMenu from "./MainMenu"
import { Route } from "wouter"

import { lazy, Suspense } from "react"
import { makeStyles, shorthands, Spinner } from "@fluentui/react-components"

const Editor = lazy(() => import("./Editor"))

const useStyles = makeStyles({
  loadingContainer: {
    ...shorthands.margin("auto") /*TODO: Center it vertically*/,
  },
})

function LoadingScreen() {
  const styles = useStyles()

  return (
    <div className={styles.loadingContainer}>
      <Spinner size="huge" labelPosition="after" label="Loading..." />
    </div>
  )
}

function App() {
  return (
    <div>
      <Route path="/" component={MainMenu} />
      <Route path="/editor">
        <Suspense fallback={<LoadingScreen />}>
          <Editor />
        </Suspense>
      </Route>
    </div>
  )
}

export default App
