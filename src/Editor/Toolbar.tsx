import {
  makeStyles,
  shorthands,
  Text,
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
  Tooltip,
  ToolbarProps,
  ToggleButton,
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
import { useState } from "react"

import PpmsLogo from "../assets/PPMS_Logo.svg"

const useStyles = makeStyles({
  toolbar: {
    justifyContent: "space-between",
    backgroundColor: tokens.colorNeutralBackground2,
    ...shorthands.padding("8px", "12px"),
  },
  toolbarGroup: {
    display: "flex",
    columnGap: "8px",
  },
})

interface Props {
  isDrawerOpen: boolean
  clickCallback: (value: boolean) => void
}

function EditorToolbar(props: Props) {
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
        <Tooltip content="Home" relationship="label">
          <ToolbarButton
            icon={<Image src={PpmsLogo}></Image>}
            onClick={() => setLocation("/")}
          />
        </Tooltip>
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
        <ToolbarRadioGroup className={styles.toolbarGroup}>
          <Tooltip content="Select" relationship="label">
            <ToolbarRadioButton
              name="currentCursorOptions"
              value="select"
              size="medium"
              icon={<Cursor24Regular />}
            />
          </Tooltip>

          <Tooltip content="Move" relationship="label">
            <ToolbarRadioButton
              name="currentCursorOptions"
              value="move"
              size="medium"
              icon={<Drag24Regular />}
            />
          </Tooltip>
          <Tooltip content="Edit" relationship="label">
            <ToolbarRadioButton
              name="currentCursorOptions"
              value="edit"
              size="medium"
              icon={<Edit24Regular />}
            />
          </Tooltip>
        </ToolbarRadioGroup>
        <ToolbarDivider />
        <Tooltip
          content="Connects vertices into a segment."
          relationship="description"
        >
          {/*@ts-expect-error*/}
          <ToolbarButton appearance="secondary" icon={<DataLine24Regular />}>
            Connect vertices
          </ToolbarButton>
        </Tooltip>
        <Tooltip
          content="Disconnects vertices from a segment."
          relationship="description"
        >
          {/*@ts-expect-error*/}
          <ToolbarButton appearance="secondary" icon={<DismissSquareRegular />}>
            Disconnect vertices
          </ToolbarButton>
        </Tooltip>
        {/*@ts-expect-error*/}
        <ToolbarButton appearance="secondary" icon={<PaintBrush24Regular />}>
          Color vertices
        </ToolbarButton>
      </ToolbarGroup>
      <ToolbarGroup className={styles.toolbarGroup}>
        <ToggleButton
          checked={props.isDrawerOpen}
          onClick={() => props.clickCallback(!props.isDrawerOpen)}
          icon={<Braces24Regular />}
        >
          Tree view
        </ToggleButton>
        {/*@ts-expect-error*/}
        <ToolbarButton appearance="secondary" icon={<BoxMultiple24Regular />}>
          Prefabs
        </ToolbarButton>
        {/*@ts-expect-error*/}
        <ToolbarButton appearance="secondary" icon={<BoxArrowLeftRegular />}>
          Open Marketplace
        </ToolbarButton>
        {/*@ts-expect-error*/}
        <ToolbarButton appearance="secondary" icon={<AppsAddIn24Regular />}>
          Plugins
        </ToolbarButton>
        <ToolbarDivider />
        <Tooltip content="Join our Discord server" relationship="description">
          <ToolbarButton
            appearance="primary"
            icon={<QuestionCircle24Regular />}
            as="a"
            href="https://discord.gg/NSYtnxxSPN"
            target="_blank"
          >
            Help
          </ToolbarButton>
        </Tooltip>
      </ToolbarGroup>
    </Toolbar>
  )
}
export default EditorToolbar
