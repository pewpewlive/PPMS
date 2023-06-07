import { Route, Switch } from "wouter"
import { lazy, Suspense } from "react"

import LoadingScreen from "./Utilities/LoadingScreen"
import NoPageFound from "./Utilities/404"

import MainMenu from "./Home/MainMenu"

const Editor = lazy(() => import("./Editor/Editor"))
const NothingToSeeHere = lazy(() => import("./Utilities/NothingHere"))

function App() {
  return (
    <div>
      <Switch>
        <Route path="/" component={MainMenu} />
        <Route path="/editor/:projectName">
          <Suspense fallback={<LoadingScreen showFact showLogo />}>
            <Editor />
          </Suspense>
        </Route>
        <Route path="/xlkfa">
          <Suspense fallback={<LoadingScreen />}>
            <NothingToSeeHere />
          </Suspense>
        </Route>
        <Route component={NoPageFound} />
      </Switch>
    </div>
  )
}

export default App
