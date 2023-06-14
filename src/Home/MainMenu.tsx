import {
  makeStyles,
  shorthands,
  Card,
  CardFooter,
  CardHeader,
  CardPreview,
  Body1,
  Caption1,
  LargeTitle,
  InputProps,
} from "@fluentui/react-components"

import { useState } from "react"

import { useLocation } from "wouter"

import ProjectTable from "./ProjectTable"
import ImportDialog from "./Dialogs/ImportDialog"
import NewProjectDialog from "./Dialogs/NewProjectDialog"

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "5rem",
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
  dataGrid: {
    width: "90%",
    ...shorthands.margin("1rem"),
  },
})

function MainMenu() {
  const styles = useStyles()
  const [_, setLocation] = useLocation()

  const [value, setValue] = useState<string>("NewProject")
  const onChange: InputProps["onChange"] = (ev, data) => {
    setValue(data.value)
  }
  return (
    <div className={styles.container}>
      <LargeTitle>PewPew Mesh Studio</LargeTitle>
      <div className={styles.buttonGroup}>
        <NewProjectDialog />
        <ImportDialog />
      </div>
      <div className={styles.dataGrid}>
        <ProjectTable />
      </div>
      {/*<div className={styles.cards}>
        {[...Array(10)].map((x, i) => (
          <Card
            onClick={() =>
              setLocation(`/editor/project${encodeURIComponent(i)}`)
            }
            key={i}
          >
            TODO: Replace Key with useable ID
            <CardHeader header={<Body1>Sphere of mass destruction</Body1>} />
            <CardPreview>
              <img src="https://placehold.co/300x200/" />
            </CardPreview>
            <CardFooter className={styles.textContainer}>
              <Caption1 align="end">June 1st, 2023</Caption1>
            </CardFooter>
          </Card>
        ))}
        </div>*/}
    </div>
  )
}

export default MainMenu
