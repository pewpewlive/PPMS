import {
  makeStyles,
  shorthands,
  Button,
  Display,
  Card,
  CardFooter,
  CardHeader,
  CardPreview,
  Body1,
  Caption1,
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Field,
  Input,
  Radio,
  RadioGroup,
  Text,
  LargeTitle,
} from "@fluentui/react-components"

import {
  AddRegular,
  ArrowImportRegular,
  Dismiss24Regular,
} from "@fluentui/react-icons"

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "strech",
  },
  buttonGroup: {
    marginTop: "1rem",
    marginBottom: "1rem",
    columnGap: "15px",
    display: "flex",
  },
  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    rowGap: "1rem",
    columnGap: "1rem",
    width: "90%",
    ...shorthands.margin("1rem"),
  },
})

function MainMenu() {
  const styles = useStyles()
  return (
    <div className={styles.container}>
        <LargeTitle>PewPew Mesh Studio</LargeTitle>
      <div className={styles.buttonGroup}>
        <Dialog>
          <DialogTrigger disableButtonEnhancement>
            <Button appearance="primary" icon={<AddRegular />}>
              New
            </Button>
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
                New Project
              </DialogTitle>
              <DialogContent>
                <Field label="Project name">
                  <Input />
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
              </DialogContent>
              <DialogActions>
                <DialogTrigger disableButtonEnhancement>
                  <Button appearance="primary">Create</Button>
                </DialogTrigger>
              </DialogActions>
            </DialogBody>
          </DialogSurface>
        </Dialog>
        
        <Dialog>
        <DialogTrigger disableButtonEnhancement>
          <Button appearance="primary" icon={<ArrowImportRegular />}>
            Import
          </Button>
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
                This feature is WIP
              </DialogTitle>
            </DialogBody>
          </DialogSurface>
        </Dialog>
        
      </div>
      <div className={styles.cards}>
        <Card>
          <CardHeader header={<Body1>Sphere of mass destruction</Body1>} />
          <CardPreview>
            <img src="https://placehold.co/300x200/" />
          </CardPreview>
          <CardFooter className={styles.textContainer}>
            <Caption1 align="end">June 1st, 2023</Caption1>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader header={<Body1>Sphere of mass destruction</Body1>} />
          <CardPreview>
            <img src="https://placehold.co/300x200/" />
          </CardPreview>
          <CardFooter className={styles.textContainer}>
            <Caption1 align="end">June 1st, 2023</Caption1>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader header={<Body1>Sphere of mass destruction</Body1>} />
          <CardPreview>
            <img src="https://placehold.co/300x200/" />
          </CardPreview>
          <CardFooter className={styles.textContainer}>
            <Caption1 align="end">June 1st, 2023</Caption1>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader header={<Body1>Sphere of mass destruction</Body1>} />
          <CardPreview>
            <img src="https://placehold.co/300x200/" />
          </CardPreview>
          <CardFooter className={styles.textContainer}>
            <Caption1 align="end">June 1st, 2023</Caption1>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader header={<Body1>Sphere of mass destruction</Body1>} />
          <CardPreview>
            <img src="https://placehold.co/300x200/" />
          </CardPreview>
          <CardFooter className={styles.textContainer}>
            <Caption1 align="end">June 1st, 2023</Caption1>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader header={<Body1>Sphere of mass destruction</Body1>} />
          <CardPreview>
            <img src="https://placehold.co/300x200/" />
          </CardPreview>
          <CardFooter className={styles.textContainer}>
            <Caption1 align="end">June 1st, 2023</Caption1>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader header={<Body1>Sphere of mass destruction</Body1>} />
          <CardPreview>
            <img src="https://placehold.co/300x200/" />
          </CardPreview>
          <CardFooter className={styles.textContainer}>
            <Caption1 align="end">June 1st, 2023</Caption1>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader header={<Body1>Sphere of mass destruction</Body1>} />
          <CardPreview>
            <img src="https://placehold.co/300x200/" />
          </CardPreview>
          <CardFooter className={styles.textContainer}>
            <Caption1 align="end">June 1st, 2023</Caption1>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default MainMenu
