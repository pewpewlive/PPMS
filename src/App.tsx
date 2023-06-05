import { Route, Switch } from "wouter"
import { lazy, Suspense } from "react"

import LoadingScreen from "./Utilities/LoadingScreen"
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
        <Route>Unknown path</Route>
      </Switch>
    </div>
  )
}

export default App
