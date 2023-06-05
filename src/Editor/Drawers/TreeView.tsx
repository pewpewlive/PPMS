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

interface Props {
  isDrawerOpen: boolean
  clickCallback: (value: boolean) => void
}

function TreeViewDrawer(props: Props) {
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
              <TreeItem itemType="leaf">
                <TreeItemLayout>
                  <Text font="monospace">
                    [0]: X: 0, Y: 0, Z: 50, Color: 0xff00ffff
                  </Text>
                </TreeItemLayout>
              </TreeItem>
              <TreeItem itemType="leaf">
                <TreeItemLayout>
                  <Text font="monospace">
                    [1]: X: 100, Y: 0, Z: 50, Color: 0xff00ffff
                  </Text>
                </TreeItemLayout>
              </TreeItem>
              <TreeItem itemType="leaf">
                <TreeItemLayout>
                  <Text font="monospace">
                    [2]: X: 100, Y: 100, Z: 50, Color: 0xff00ffff
                  </Text>
                </TreeItemLayout>
              </TreeItem>
              <TreeItem itemType="leaf">
                <TreeItemLayout>
                  <Text font="monospace">
                    [3]: X: 0, Y: 100, Z: 50, Color: 0xff00ffff
                  </Text>
                </TreeItemLayout>
              </TreeItem>
            </Tree>
          </TreeItem>
          <TreeItem itemType="branch">
            <TreeItemLayout>Segments</TreeItemLayout>
            <Tree>
              <TreeItem itemType="leaf">
                <TreeItemLayout>
                  <Text font="monospace">
                    [0]: 0 -&gt; 1 -&gt; 2 -&gt; 3 -&gt; 0
                  </Text>
                </TreeItemLayout>
              </TreeItem>
              <TreeItem itemType="leaf">
                <TreeItemLayout>
                  <Text font="monospace">[1]: 3 -&gt; 1</Text>
                </TreeItemLayout>
              </TreeItem>
            </Tree>
          </TreeItem>
        </Tree>
      </DrawerBody>
    </ResizeableDrawer>
  )
}

export default TreeViewDrawer
