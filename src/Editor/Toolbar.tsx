import {
  makeStyles,
  shorthands,
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
  ToolbarRadioButton,
  ToolbarRadioGroup,
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

import { useLocation, useRoute } from "wouter"

import PpmsLogo from "../assets/PPMS_Logo.svg"

const useStyles = makeStyles({
  toolbar: {
    justifyContent: "space-between",
    backgroundColor: tokens.colorNeutralBackground2,
    ...shorthands.padding("8px", "12px"),
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


function EditorToolbar() {
  const styles = useStyles()
  const [_, setLocation] = useLocation()

  return (
    <Toolbar
      size="large"
      className={styles.toolbar}
      defaultCheckedValues={{
        currentCursorOptions: ["select"],
      }}
    >
      <ToolbarGroup className={styles.toolbarGroup}>
        <ToolbarButton
          icon={<Image src={PpmsLogo}></Image>}
          onClick={() => setLocation("/")}
        />
        <ToolbarDivider />
        <Menu>
          <MenuTrigger disableButtonEnhancement>
            <MenuButton appearance="primary">File</MenuButton>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItem>Save</MenuItem>
              <MenuItem onClick={() => setLocation("/")}>Exit</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>
        <ToolbarDivider />
        <ToolbarRadioGroup>
          <ToolbarRadioButton
            name="currentCursorOptions"
            value="select"
            appearance="subtle"
            size="medium"
            icon={<Cursor24Regular />}
          />
          <ToolbarRadioButton
            name="currentCursorOptions"
            value="move"
            appearance="subtle"
            size="medium"
            icon={<Drag24Regular />}
          />
          <ToolbarRadioButton
            name="currentCursorOptions"
            value="edit"
            size="medium"
            appearance="subtle"
            icon={<Edit24Regular />}
          />
        </ToolbarRadioGroup>
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
        <ToolbarButton appearance="primary" icon={<QuestionCircle24Regular />}>
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
  )
}
export default EditorToolbar
