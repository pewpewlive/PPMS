import {
  makeStyles,
  shorthands,
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  Tab,
  TabList,
  Divider,
  SpinButton,
  Field,
  tokens,
  Subtitle1,
  Body1Stronger,
  SpinButtonProps,
  SpinButtonChangeEvent,
  SpinButtonOnChangeData,
} from "@fluentui/react-components"


import { useRoute } from "wouter"

import { useCallback, useEffect, useRef, useState } from "react"
import BottomEditorToolbar from "./Toolbars/BottomToolbar"
import InspectorToolbar from "./Toolbars/InspectorToolbar"
import EditorToolbar from "./Toolbars/Toolbar"

import TreeViewDrawer from "./Drawers/TreeView"
import Renderer from "./Renderer/Renderer"
import { Mesh, Vertex, MeshSegment, useMeshStore } from "./Meshes/Mesh"
import { selectedVertexStore } from "./EditorState"

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
          <Renderer/>
          <BottomEditorToolbar />
        </div>
        <InspectorToolbar/>
        
      </div>
    </div>
  )
}

export default Editor
