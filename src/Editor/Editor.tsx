import { makeStyles, shorthands } from "@fluentui/react-components"
import { useRoute } from "wouter"
import { useState } from "react"
import { useTitle, useBeforeUnload } from "react-use"

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
  const [match, params] = useRoute("/editor/:projectId")
  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false)
  // const [isSaved, setIsSaved]= useState<boolean>(false)
  
  useTitle(`PewPew Mesh Studio: ${params?.projectId}`)
  // useBeforeUnload(!isSaved, "You have unsaved changes, are you sure?")

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
