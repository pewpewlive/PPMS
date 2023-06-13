import { useCallback } from "react"
import {
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  DrawerInline,
} from "@fluentui/react-components/unstable"
import {
  makeStyles,
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
import { useMeshStore } from "../Meshes/Mesh"
import { selectedVertexStore } from "../EditorState"
const useStyles = makeStyles({
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
interface ValueFieldProps {
  color: string
  label: string
  value: number
  onChange: (value: number | null | undefined) => void
}

function ValueField(props: ValueFieldProps) {
  const styles = useStyles()

  const onSpinButtonChange: SpinButtonProps["onChange"] = useCallback(
    (_ev: SpinButtonChangeEvent, data: SpinButtonOnChangeData) => {
      //console.log("onSpinButtonChange", data.value, data.displayValue)
      if (data.value !== undefined) {
        props.onChange(data.value)
      } else if (data.displayValue !== undefined) {
        const newValue = parseFloat(data.displayValue)
        if (!Number.isNaN(newValue)) {
          props.onChange(data.value)
        } else {
          console.error(`Cannot parse "${data.displayValue}" as a number.`)
        }
      }
    },
    [props.onChange]
  )
  return (
    <div
      className={styles.valueField}
      style={{ backgroundColor: props.color, borderRadius: "4.6px" }}
    >
      <Body1Stronger>{props.label}</Body1Stronger>
      <SpinButton
        appearance="filled-darker"
        size="small"
        defaultValue={props.value}
        onChange={onSpinButtonChange}
      />
    </div>
  )
}
export default function InspectorToolbar() {
  const styles = useStyles()
  const [mesh, setMesh] = useMeshStore(state => [state.mesh, state.setMesh])
  const [selectedVertex] = selectedVertexStore(state => [state.selectedVertex])
  return (
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
              value={mesh?.vertices[selectedVertex].position.x}
              onChange={value => {
                if (value === null || value === undefined) value = 0
                mesh?.vertices[selectedVertex].position.setX(value)
                setMesh(mesh)
              }}
            />
            <ValueField
              color={tokens.colorPaletteLightGreenBackground3}
              label="Y"
              value={mesh?.vertices[selectedVertex].position.y}
              onChange={value => {
                if (value === null || value === undefined) value = 0
                mesh?.vertices[selectedVertex].position.setY(value)
                setMesh(mesh)
              }}
            />
            <ValueField
              color={tokens.colorCompoundBrandStrokePressed}
              label="Z"
              value={mesh?.vertices[selectedVertex].position.z}
              onChange={value => {
                if (value === null || value === undefined) value = 0
                mesh?.vertices[selectedVertex].position.setZ(value)
                setMesh(mesh)
              }}
            />
          </div>
        </Field>
      </DrawerBody>
    </DrawerInline>
  )
}
