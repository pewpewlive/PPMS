import {
  Body1,
  Image,
  ProgressBar,
  Subtitle2,
  makeStyles,
  mergeClasses,
  shorthands,
} from "@fluentui/react-components"

import PPMSLogo from "../assets/PPMS_Logo.svg"
import { randomFact } from "./RandomFact"

const useStyles = makeStyles({
  loadingContainer: {
    ...shorthands.margin("auto"),
  },
  centering: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  progressBar: {
    maxWidth: "15rem",
    marginTop: "1rem",
    marginBottom: "1rem",
  },
})

interface LoadingScreenProps {
  showLogo?: boolean
  showFact?: boolean
}

function LoadingScreen(props: LoadingScreenProps) {
  const styles = useStyles()
  const loadingContainer = mergeClasses(
    styles.loadingContainer,
    styles.centering
  )

  return (
    <div className={loadingContainer} style={{ height: "100vh" }}>
      {props.showLogo && (
        <div style={{ height: 72, width: 69 }}>
          <Image
            fit="contain"
            src={PPMSLogo}
            alt="PewPew Mesh Studio logo"
          ></Image>
        </div>
      )}
      <ProgressBar thickness="large" className={styles.progressBar} />
      {props.showFact && (
        <div className={styles.centering}>
          <Subtitle2>Did you know?</Subtitle2>
          <Body1>{randomFact()}</Body1>
        </div>
      )}
    </div>
  )
}

export default LoadingScreen
