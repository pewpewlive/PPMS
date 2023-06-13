import {
  Dropdown,
  Label,
  Menu,
  MenuButton,
  MenuButtonProps,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Slider,
  SliderProps,
  SpinButton,
  SplitButton,
  ToggleButton,
  Toolbar,
  ToolbarButton,
  ToolbarDivider,
  ToolbarGroup,
  ToolbarRadioButton,
  ToolbarRadioGroup,
  Tooltip,
  makeStyles,
  shorthands,
  tokens,
  useId,
} from "@fluentui/react-components"
import {
  Cursor24Regular,
  Drag24Regular,
  Edit24Regular,
  Braces24Regular,
  QuestionCircle24Regular,
  MathFormula24Regular,
  PlayCircleHint24Regular,
  Warning24Regular,
  MyLocation24Regular,
  ZoomFit24Regular,
} from "@fluentui/react-icons"
import React from "react"

const useStyles = makeStyles({
  bottomToolbar: {
    justifyContent: "space-between",
    backgroundColor: tokens.colorNeutralBackground2,
    ...shorthands.padding("8px", "12px"),
    position: "absolute",
    bottom: "10px",
  },
  toolbarGroup: {
    display: "flex",
    columnGap: "8px",
    alignItems: "center",
  },
})

function BottomEditorToolbar() {
  const styles = useStyles()
  const id = useId()
  const [zoomLevel, setZoomLevel] = React.useState<number>(100)
  const onZoomLevelChange: SliderProps["onChange"] = (_, data) =>
    setZoomLevel(data.value)
  const resetZoom = () => setZoomLevel(100)

  return (
    <Toolbar
      size="large"
      className={styles.bottomToolbar}
      style={{ borderRadius: "5px" }}
    >
      <ToolbarGroup className={styles.toolbarGroup}>
        <Menu positioning="above-end">
          <MenuTrigger disableButtonEnhancement>
            {(triggerProps: MenuButtonProps) => (
              <SplitButton
                menuButton={triggerProps}
                icon={<PlayCircleHint24Regular />}
              >
                Explode
              </SplitButton>
            )}
          </MenuTrigger>

          <MenuPopover>
            <MenuList>
              <MenuItem>Item a</MenuItem>
              <MenuItem>Item b</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>
        <ToolbarDivider />
        <Dropdown appearance="filled-darker" placeholder="Wireframe" />
        <ToolbarDivider />
        <Tooltip
          content="The mesh has more vertices than PewPew Live can handle."
          relationship="description"
        >
          <div>
            <Warning24Regular color={tokens.colorPaletteYellowForeground1} />
          </div>
        </Tooltip>
        <Label disabled>Vertex count: 1560</Label>
        <ToolbarDivider />
        <Label disabled>Segment count: 69</Label>
      </ToolbarGroup>
      <ToolbarGroup className={styles.toolbarGroup}>
        <ToolbarButton icon={<MyLocation24Regular />} />
        <ToolbarButton
          icon={<ZoomFit24Regular />}
          onClick={() => resetZoom()}
        />
        <Slider
          min={1}
          max={200}
          onChange={onZoomLevelChange}
          value={zoomLevel}
        />
        <Label htmlFor={id}>{zoomLevel}%</Label>
      </ToolbarGroup>
    </Toolbar>
  )
}

export default BottomEditorToolbar
