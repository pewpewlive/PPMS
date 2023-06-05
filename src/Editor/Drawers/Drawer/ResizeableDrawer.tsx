import {
  makeStyles,
  mergeClasses,
  shorthands,
  tokens,
} from "@fluentui/react-components"
import { DrawerInline } from "@fluentui/react-components/unstable"
import * as React from "react"

const useStyles = makeStyles({
  root: {
    ...shorthands.overflow("hidden"),
    display: "flex",
  },

  drawerResizer: {
    ...shorthands.borderRight("1px", "solid", tokens.colorNeutralBackground5),

    width: "8px",
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    cursor: "col-resize",
    resize: "horizontal",

    ":hover": {
      borderRightWidth: "4px",
    },
  },

  drawerResizing: {
    borderRightWidth: "4px",
    borderRightColor: tokens.colorNeutralBackground5Pressed,
  },

  content: {
    ...shorthands.margin(tokens.spacingVerticalXL, tokens.spacingHorizontalXL),
    ...shorthands.flex(1),
  },
})

interface Props {
  isDrawerOpen: boolean
  children: React.ReactNode
}

export const ResizeableDrawer = (props: Props) => {
  const styles = useStyles()

  const sidebarRef = React.useRef<HTMLDivElement>(null)
  const [isResizing, setIsResizing] = React.useState(false)
  const [sidebarWidth, setSidebarWidth] = React.useState(320)

  const startResizing = React.useCallback(() => setIsResizing(true), [])
  const stopResizing = React.useCallback(() => setIsResizing(false), [])

  const resize = React.useCallback(
    ({ clientX }: MouseEvent) => {
      requestAnimationFrame(() => {
        if (isResizing && sidebarRef.current) {
          setSidebarWidth(
            clientX - sidebarRef.current.getBoundingClientRect().left
          )
        }
      })
    },
    [isResizing]
  )

  React.useEffect(() => {
    window.addEventListener("mousemove", resize)
    window.addEventListener("mouseup", stopResizing)
    return () => {
      window.removeEventListener("mousemove", resize)
      window.removeEventListener("mouseup", stopResizing)
    }
  }, [resize, stopResizing])

  return (
    <div className={styles.root}>
      <DrawerInline
        open={props.isDrawerOpen}
        separator
        ref={sidebarRef}
        style={{ width: `${sidebarWidth}px` }}
        onMouseDown={e => e.preventDefault()}
      >
        <div
          className={mergeClasses(
            styles.drawerResizer,
            isResizing && styles.drawerResizing
          )}
          onMouseDown={startResizing}
        />

        {props.children}
      </DrawerInline>
    </div>
  )
}
