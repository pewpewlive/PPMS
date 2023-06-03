import {
  makeStyles,
  shorthands,
  LargeTitle,
  Toolbar,
  ToolbarGroup,
  ToolbarButton,
  tokens,
  ToolbarDivider,
  Image,
  MenuButton,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
} from "@fluentui/react-components"

import {
  AppsAddIn24Regular,
  BoxArrowLeftRegular,
  BoxMultiple24Regular,
  Braces24Regular,
  Cursor24Regular,
  DataLine24Regular,
  DismissSquareRegular,
  Drag24Regular,
  Edit24Regular,
  PaintBrush24Regular,
  QuestionCircle24Regular,
} from "@fluentui/react-icons"

import { useLocation } from "wouter"

import reactLogo from "./assets/react.svg"

const useStyles = makeStyles({
  toolbar: {
    justifyContent: "space-between",
    backgroundColor: tokens.colorNeutralBackground2,
    ...shorthands.padding("8px", "24px"),
  },
  toolbarGroup: {
    display: "flex",
    columnGap: "4px",
  },
  revtoolbarGroup: {
    display: "flex",
    columnGap: "4px",
    flexDirection: "row-reverse",
  },
})

function Editor() {
  const styles = useStyles()

  return (
    <div>
      <Toolbar size="large" className={styles.toolbar}>
        <ToolbarGroup className={styles.toolbarGroup}>
          <Image src={reactLogo}></Image>
          <ToolbarDivider />
          <Menu>
            <MenuTrigger disableButtonEnhancement>
              <MenuButton appearance="primary">File</MenuButton>
            </MenuTrigger>
            <MenuPopover>
              <MenuList>
                <MenuItem>Item 1</MenuItem>
                <MenuItem>Item 2</MenuItem>
              </MenuList>
            </MenuPopover>
          </Menu>
          <ToolbarDivider />
          <ToolbarButton icon={<Cursor24Regular />} />
          <ToolbarButton icon={<Drag24Regular />} />
          <ToolbarButton icon={<Edit24Regular />} />
          <ToolbarDivider />
          {/*@ts-expect-error*/}
          <ToolbarButton appearance="secondary" icon={<DataLine24Regular />}>
            Connect vertices
          </ToolbarButton>
          {/*@ts-expect-error*/}
          <ToolbarButton appearance="secondary" icon={<DismissSquareRegular />}>
            Disconnect vertices
          </ToolbarButton>
          {/*@ts-expect-error*/}
          <ToolbarButton appearance="secondary" icon={<PaintBrush24Regular />}>
            Color vertices
          </ToolbarButton>
        </ToolbarGroup>
        <ToolbarGroup className={styles.revtoolbarGroup}>
          <ToolbarButton
            appearance="primary"
            icon={<QuestionCircle24Regular />}
          >
            Help
          </ToolbarButton>
          <ToolbarDivider />
          {/*@ts-expect-error*/}
          <ToolbarButton appearance="secondary" icon={<AppsAddIn24Regular />}>
            Plugins
          </ToolbarButton>
          {/*@ts-expect-error*/}
          <ToolbarButton appearance="secondary" icon={<BoxArrowLeftRegular />}>
            Open Marketplace
          </ToolbarButton>
          {/*@ts-expect-error*/}
          <ToolbarButton appearance="secondary" icon={<BoxMultiple24Regular />}>
            Prefabs
          </ToolbarButton>
          {/*@ts-expect-error*/}
          <ToolbarButton appearance="secondary" icon={<Braces24Regular />}>
            Tree view
          </ToolbarButton>
        </ToolbarGroup>
      </Toolbar>
      <LargeTitle>Editor</LargeTitle>
    </div>
  )
}

export default Editor
