import {
  makeStyles,
  Button,
  shorthands,
  Text,
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  Tab,
  TabList,
  Divider,
  SpinButton,
  Label,
  Subtitle2,
  Field,
  tokens,
  Subtitle1,
  Body1Stronger,
} from "@fluentui/react-components"

import {
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  DrawerInline,
  Tree,
  TreeItem,
  TreeItemLayout,
} from "@fluentui/react-components/unstable"

import { useRoute } from "wouter"

import EditorToolbar from "./Toolbar"
import { Dismiss24Regular } from "@fluentui/react-icons"
import { useState } from "react"
import { Subtitle } from "@fluentui/keyboard-keys"

const useStyles = makeStyles({
  root: {
    ...shorthands.overflow("hidden"),
    display: "flex",
    height: "90vh",
  },
  content: {
    ...shorthands.flex(1),
    ...shorthands.padding("16px"),
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  inspectorDivider: {
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
  },
  multiValueField: {
    display: "flex",
    flexWrap: "wrap",
    columnGap: "0.5rem",
    rowGap: "0.5rem",
  },
  valueField: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    columnGap: "5px",
    paddingLeft: "5px",
    width: "80px",
  },
})

interface Props {
  color: string
  label: string
}

function ValueField(props: Props) {
  const styles = useStyles()

  return (
    <div
      className={styles.valueField}
      style={{ backgroundColor: props.color, borderRadius: "4.6px" }}
    >
      <Body1Stronger>{props.label}</Body1Stronger>
      <SpinButton appearance="filled-darker" size="small" />
    </div>
  )
}

function Editor() {
  const styles = useStyles()
  const [match, params] = useRoute("/editor/:projectName")
  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false)

  return (
    <div>
      <EditorToolbar
        isDrawerOpen={isDrawerOpen}
        clickCallback={value => setDrawerOpen(value)}
      />
      <div className={styles.root}>
        <DrawerInline separator open={isDrawerOpen}>
          <DrawerHeader>
            <DrawerHeaderTitle
              action={
                <Button
                  appearance="subtle"
                  aria-label="Close"
                  icon={<Dismiss24Regular />}
                  onClick={() => setDrawerOpen(false)}
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
        </DrawerInline>
        <div className={styles.content}>
          <Text>{params?.projectName}</Text>
        </div>
        <DrawerInline separator position="right" open>
          <DrawerHeader>
            <DrawerHeaderTitle>Inspector</DrawerHeaderTitle>
          </DrawerHeader>

          <DrawerBody>
            <Accordion collapsible>
              <AccordionItem value="1">
                <AccordionHeader size="large">Meshes</AccordionHeader>
                <AccordionPanel>
                  <div>
                    <TabList defaultSelectedValue="mesh0" vertical>
                      <Tab value="mesh0">Mesh 1</Tab>
                      <Tab value="mesh1">Mesh 2</Tab>
                      <Tab value="mesh2">Mesh 3</Tab>
                      <Tab value="mesh3">Mesh 4</Tab>
                    </TabList>
                  </div>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
            <Divider className={styles.inspectorDivider} />

            <Subtitle1>Vertex</Subtitle1>
            <Field label="Position">
              <div className={styles.multiValueField}>
                {/*<Field label="X" size="large">
                  <SpinButton defaultValue={10} />
                </Field>
                <Field label="Y" size="large">
                  <SpinButton defaultValue={10} />
                </Field>
                <Field label="Z" size="large">
                  <SpinButton defaultValue={10} />
                </Field>*/}
                <ValueField
                  color={tokens.colorPaletteRedBackground3}
                  label="X"
                />
                <ValueField
                  color={tokens.colorPaletteLightGreenBackground3}
                  label="Y"
                />
                <ValueField
                  color={tokens.colorCompoundBrandStrokePressed}
                  label="Z"
                />
              </div>
            </Field>
          </DrawerBody>
        </DrawerInline>
      </div>
    </div>
  )
}

export default Editor
