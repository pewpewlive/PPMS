import {
  Dialog,
  DialogTrigger,
  Button,
  DialogSurface,
  DialogBody,
  DialogTitle,
  DialogContent,
  Field,
  Input,
  RadioGroup,
  Radio,
  CompoundButton,
  DialogActions,
  InputProps,
  Text,
  Tooltip,
} from "@fluentui/react-components"
import {
  ArrowImportRegular,
  Dismiss24Regular,
  Folder24Regular,
} from "@fluentui/react-icons"
import { useState } from "react"
import { useLocation } from "wouter"

const idCharRegex = /[^a-zA-Z0-9\-]/g

function ImportDialog() {
  const [_, setLocation] = useLocation()

  const [value, setValue] = useState<string>("New Project")
  const [valueId, setValueId] = useState<string>("new-project")
  const onChangeName: InputProps["onChange"] = (ev, data) => {
    setValue(data.value)
    if (data.value !== "")
      setValueId(data.value.toLowerCase().replaceAll(idCharRegex, "-"))
    else setValueId("-")
  }
  const onChangeId: InputProps["onChange"] = (ev, data) => {
    if (data.value !== "")
      setValueId(data.value.toLowerCase().replaceAll(idCharRegex, "-"))
    else setValueId("-")
  }

  return (
    <Dialog>
      <DialogTrigger disableButtonEnhancement>
        <Tooltip
          content="Import a mesh. (coming soon)"
          relationship="description"
        >
          <Button appearance="primary" disabled icon={<ArrowImportRegular />}>
            Import
          </Button>
        </Tooltip>
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle
            action={
              <DialogTrigger action="close">
                <Button
                  appearance="subtle"
                  aria-label="close"
                  icon={<Dismiss24Regular />}
                />
              </DialogTrigger>
            }
          >
            Import Project
          </DialogTitle>
          <DialogContent>
            <Field label="Project name">
              <Input onChange={onChangeName} defaultValue="New Project" />
            </Field>
            <Field label="Project ID">
              <Input
                onChange={onChangeId}
                defaultValue="new-project"
                value={valueId}
              />
            </Field>
            <Field label="Project type">
              <RadioGroup>
                <Radio
                  value="mesh"
                  label={
                    <>
                      Mesh
                      <br />
                      <Text size={200}>
                        A mesh project without animation support.
                      </Text>
                    </>
                  }
                  defaultChecked={true}
                />
                <Radio
                  value="animation"
                  label={
                    <>
                      Animation (coming soon)
                      <br />
                      <Text size={200}>
                        A mesh project with advanced animations.
                      </Text>
                    </>
                  }
                  disabled
                />
              </RadioGroup>
            </Field>
            <Field label="Import type">
              <RadioGroup>
                <Radio
                  value="mesh"
                  label={
                    <>
                      JSON
                      <br />
                      <Text size={200}>
                        A JSON representation of a mesh table.
                      </Text>
                    </>
                  }
                  defaultChecked={true}
                />
                <Radio
                  value="animation"
                  label={
                    <>
                      Lua
                      <br />
                      <Text size={200}>
                        A mesh file. Fixedpoint numbers are not supported.
                        <br /> Helper support is coming soon.
                      </Text>
                    </>
                  }
                />
              </RadioGroup>
            </Field>
            <Field label="">
              <CompoundButton
                icon={<Folder24Regular />}
                secondaryContent="Your mesh file here"
              >
                Upload
              </CompoundButton>
            </Field>
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button
                onClick={() =>
                  setLocation(`/editor/${encodeURIComponent(valueId)}`)
                }
                appearance="primary"
              >
                Import
              </Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  )
}

export default ImportDialog
