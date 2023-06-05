import {
  Button,
  Display,
  Image,
  LargeTitle,
  Subtitle2,
  Text,
  makeStyles,
} from "@fluentui/react-components"

import PPMSLogo from "../assets/PPMS_Logo.svg"
import { useLocation } from "wouter"

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "5rem",
    rowGap: "0.5rem",
  },
})

function NoPageFound() {
  const styles = useStyles()
  const [page, setLocation] = useLocation()

  return (
    <div className={styles.container}>
      <Image src={PPMSLogo} style={{ width: 79, height: 82 }} />
      <Display>404</Display>
      <Subtitle2>
        <Text font="monospace">{page}</Text> does not exist
      </Subtitle2>
      <Button appearance="primary" onClick={() => setLocation("/")}>
        Go to Home
      </Button>
    </div>
  )
}

export default NoPageFound
