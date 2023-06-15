import {
  makeStyles,
  shorthands,
  LargeTitle,
  Image,
} from "@fluentui/react-components"

import PPMSLogo from "../assets/PPMS_Logo.svg"

import ProjectTable from "./ProjectTable"
import ImportDialog from "./Dialogs/ImportDialog"
import NewProjectDialog from "./Dialogs/NewProjectDialog"
import { useTitle } from "react-use"

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
  heroContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
})

function MainMenu() {
  const styles = useStyles()
  useTitle("PewPew Mesh Studio: Home")

  return (
    <div className={styles.container}>
      <div className={styles.heroContainer}>
        <Image
          fit="contain"
          src={PPMSLogo}
          alt="PewPew Mesh Studio logo"
          style={{ width: 79, height: 82, marginRight: "1rem" }}
        ></Image>
        <LargeTitle>PewPew Mesh Studio</LargeTitle>
      </div>
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
