import {
  DrawerHeader,
  DrawerHeaderTitle,
  DrawerBody,
  Tree,
  TreeItem,
  TreeItemLayout,
} from "@fluentui/react-components/unstable"

import { Button, Text } from "@fluentui/react-components"

import { Dismiss24Regular } from "@fluentui/react-icons"

import { ResizeableDrawer } from "./Drawer/ResizeableDrawer"
import { useMeshStore } from "../Meshes/Mesh"

interface Props {
  isDrawerOpen: boolean
  clickCallback: (value: boolean) => void
}

function TreeViewDrawer(props: Props) {
  const mesh = useMeshStore(state => state.mesh)

  return (
    <ResizeableDrawer isDrawerOpen={props.isDrawerOpen}>
      <DrawerHeader>
        <DrawerHeaderTitle
          action={
            <Button
              appearance="subtle"
              aria-label="Close"
              icon={<Dismiss24Regular />}
              onClick={() => props.clickCallback(false)}
            />
          }
        >
          Tree View
        </DrawerHeaderTitle>
      </DrawerHeader>

      <DrawerBody>
        <Tree aria-label="Tree">
          <TreeItem itemType="branch">
            <TreeItemLayout>Vertices</TreeItemLayout>
            <Tree>
              {mesh?.vertices.map((e, i) => (
                <TreeItem itemType="leaf" key={i}>
                  <TreeItemLayout>
                    <Text font="monospace">
                      [{i}]: X: {e.position.x}, Y: {e.position.y}, Z:{" "}
                      {e.position.z}, Color: {e.color.getHexString()}
                    </Text>
                  </TreeItemLayout>
                </TreeItem>
              ))}
            </Tree>
          </TreeItem>
          <TreeItem itemType="branch">
            <TreeItemLayout>Segments</TreeItemLayout>
            <Tree>
              {mesh?.segments.map((e, i) => (
                <TreeItem itemType="leaf" key={i}>
                  <TreeItemLayout>
                    <Text font="monospace">
                      [{i}]:{" "}
                      {JSON.stringify(e.indices)
                        .replace("[", "")
                        .replace("]", "")
                        .replace(",", " → ")}
                    </Text>
                  </TreeItemLayout>
                </TreeItem>
              ))}
            </Tree>
          </TreeItem>
        </Tree>
      </DrawerBody>
    </ResizeableDrawer>
  )
}

export default TreeViewDrawer
