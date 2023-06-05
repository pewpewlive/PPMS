import { Route, Switch } from "wouter"
import { lazy, Suspense } from "react"

import LoadingScreen from "./Utilities/LoadingScreen"
import NoPageFound from "./Utilities/404"

import MainMenu from "./MainMenu"

const Editor = lazy(() => import("./Editor/Editor"))

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
        <Route component={NoPageFound} />
      </Switch>
    </div>
  )
}

export default App
