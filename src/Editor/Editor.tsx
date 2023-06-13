import { makeStyles, shorthands } from "@fluentui/react-components"

import { useRoute } from "wouter"

import { useState } from "react"
import BottomEditorToolbar from "./Toolbars/BottomToolbar"
import InspectorToolbar from "./Toolbars/InspectorToolbar"
import EditorToolbar from "./Toolbars/Toolbar"

import TreeViewDrawer from "./Drawers/TreeView"
import Renderer from "./Renderer/Renderer"

const useStyles = makeStyles({
  root: {
    ...shorthands.overflow("hidden"),
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
  },
  content: {
    ...shorthands.flex(1),
    ...shorthands.padding("16px"),
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  renderingCanvas: {
    ...shorthands.flex(1),
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    minWidth: "10px",
    position: "relative",
  },
})

function Editor() {
  const styles = useStyles()
  const [match, params] = useRoute("/editor/:projectName")
  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false)

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <EditorToolbar
        isDrawerOpen={isDrawerOpen}
        clickCallback={value => setDrawerOpen(value)}
      />
      <div className={styles.root}>
        <TreeViewDrawer
          isDrawerOpen={isDrawerOpen}
          clickCallback={value => setDrawerOpen(value)}
        />

        <div className={styles.renderingCanvas}>
          <Renderer />
          <BottomEditorToolbar />
        </div>
        <InspectorToolbar />
      </div>
    </div>
  )
}

export default Editor
