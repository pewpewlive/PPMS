import MainMenu from "./MainMenu"
import { Route, Switch } from "wouter"

import { lazy, Suspense } from "react"
import {
  Caption1,
  makeStyles,
  ProgressBar,
  shorthands,
  Text,
  Image,
  Body1Strong,
} from "@fluentui/react-components"

import PpmsLogo from "./assets/PPMS_Logo.svg"

const Editor = lazy(() => import("./Editor/Editor"))

const useStyles = makeStyles({
  loadingContainer: {
    ...shorthands.margin("auto"),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    height: "90vh", // TODO: Center it vertically correctly
  },
  progressBarLength: {
    maxWidth: "15rem",
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
  },
})

function LoadingScreen() {
  const styles = useStyles()

  return (
    <div className={styles.loadingContainer}>
      <div style={{ height: 72, width: 69 }}>
        <Image fit="contain" src={PpmsLogo}></Image>
      </div>
      <ProgressBar thickness="large" className={styles.progressBarLength} />
      <Body1Strong>Did you know?</Body1Strong>
      <Caption1>PPMS was first created in C#!</Caption1>
    </div>
  )
}

function App() {
  return (
    <div>
      <Switch>
        <Route path="/" component={MainMenu} />
        <Route path="/editor/:projectName">
          <Suspense fallback={<LoadingScreen />}>
            <Editor />
          </Suspense>
        </Route>
        <Route>
          <Text>Unknown path</Text>
        </Route>
      </Switch>
    </div>
  )
}

export default App
